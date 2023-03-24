<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick, watch, computed } from "vue";
import { useUserStore } from '../../store/user';
import Chart from '../uiParts/Chart.vue';

const userStore = useUserStore();
const chartDom1 = ref<InstanceType<typeof Chart> | null>(null);
const chartDom2 = ref<InstanceType<typeof Chart> | null>(null);
const chartDom3 = ref<InstanceType<typeof Chart> | null>(null);

// 初期表示設定
const currentDatasetIndex = ref(0);
const isMonthRange = ref(true);
const currentYearMonth = ref("2022-08");

// 表示するデータ
const chartData = ref([]);
const averageNumber = ref({
    month: 0,
    twoWeek: [0, 0],
})

onMounted(() => {
    setupChart();
});

const setupChart = () => {
    chartData.value = userStore.getYearMonthChartData(currentYearMonth.value, "steps");
    const monthChartData = chartData.value;
    const twoWeekChartData = [chartData.value.slice(0, 15), chartData.value.slice(15, 31)]

    chartDom1.value?.drawChart(userStore.monthChartDays, monthChartData)
    chartDom2.value?.drawChart(userStore.twoWeekChartDays[0], twoWeekChartData[0])
    chartDom3.value?.drawChart(userStore.twoWeekChartDays[1], twoWeekChartData[1])
    averageNumber.value.month = calculateAverageSteps(monthChartData)
    averageNumber.value.twoWeek[0] = calculateAverageSteps(twoWeekChartData[0])
    averageNumber.value.twoWeek[1] = calculateAverageSteps(twoWeekChartData[1])
}

const calculateAverageSteps = (data: number[]) => {
    const average = data.reduce((before, after) => before + after, 0) / data.length;
    return Math.floor(average);
}



const changeIndex = (index: string) => {
    currentDatasetIndex.value = index === '0' ? 0 : 1;
}
const changeRange = (range: string) => {
    isMonthRange.value = range === "month";
}

const currentTerm = computed(() => {
    if (isMonthRange.value) {
        return `${currentYearMonth.value}-01〜${currentYearMonth.value}-31`
    } else {
        return currentDatasetIndex.value === 0 ? `${currentYearMonth.value}-01〜${currentYearMonth.value}-15` : `${currentYearMonth.value}-16〜${currentYearMonth.value}-31`
    }
})

const currentAverage = computed(() => {
    if (isMonthRange.value) {
        return averageNumber.value.month;
    } else {
        return currentDatasetIndex.value === 0 ? averageNumber.value.twoWeek[0] : averageNumber.value.twoWeek[1]
    }

})

const isLoading = ref(false);

const onYearMonthChange = () => {
    isLoading.value = true;
    nextTick(() => {
        isLoading.value = false;
        setTimeout(() => {
            setupChart();
        }, 200);

    })
};

watch(currentYearMonth, onYearMonthChange);
</script>

<template>
    <div class="main-container">
        <div class="tab-container">
            <button class="tab" :class="{ 'active': !isMonthRange }" @click="() => changeRange('2week')">
                2週間
            </button>
            <button class="tab" :class="{ 'active': isMonthRange }" @click="() => changeRange('month')">
                4週間
            </button>
        </div>
        <div class="nav-container">
            <select class="select-box" v-model="currentYearMonth">
                <option v-for="ym in userStore.availableYearMonths" :key="ym" :value="ym">{{ ym }}</option>
            </select>
            <div class="information-area">
                <div class="average">平均 {{ currentAverage }} 歩</div>
                <div class="term">{{ currentTerm }}</div>
            </div>
            <div class="index-button-area">
                <template v-if="!isMonthRange">
                    <button class="back-button" @click="() => changeIndex('0')">
                        <span class="back-arrow"></span>
                    </button>
                    <button class="forward-button" @click="() => changeIndex('1')">
                        <span class="forward-arrow"></span>
                    </button>
                </template>
            </div>
        </div>
        <div class="content-container">
            <div class="category-container" v-if="!isLoading">
                <Chart ref="chartDom1" barKey="1" type="bar" v-show="isMonthRange === true" />
                <Chart ref="chartDom2" barKey="2" type="bar" v-show="currentDatasetIndex === 0 && isMonthRange === false" />
                <Chart ref="chartDom3" barKey="3" type="bar" v-show="currentDatasetIndex === 1 && isMonthRange === false" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/page.scss";
</style>