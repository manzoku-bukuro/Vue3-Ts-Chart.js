<script lang="ts" setup>
import { onMounted, ref, nextTick, watch, computed } from "vue";
import { useUserStore } from '@/store/user';
import Chart from '@/components/uiParts/Chart.vue';

const userStore = useUserStore();
const chartDom1 = ref<InstanceType<typeof Chart> | null>(null);
const chartDom2 = ref<InstanceType<typeof Chart> | null>(null);
const chartDom3 = ref<InstanceType<typeof Chart> | null>(null);

const props = defineProps({
    currentType: {
        type: String,
        default: "steps",
    },
});

const chartType = props.currentType === "heartRate" ? "line" : "bar";

// 初期表示設定
const currentDatasetIndex = ref(0);
const isMonthRange = ref(true);
const currentYearMonth = ref("2022-08");

// 表示するデータ
const chartData = ref<number[]>([]);
const averageNumber = ref({
    month: {},
    twoWeek: [{}, {}],
});

onMounted(() => {
    setupChart();
});

const setupChart = () => {
    chartData.value = userStore.getYearMonthChartData(currentYearMonth.value, props.currentType);
    const monthChartData = chartData.value;
    const twoWeekChartData = [chartData.value.slice(0, 15), chartData.value.slice(15, 31)]

    chartDom1.value?.drawChart(userStore.monthChartDays, monthChartData)
    chartDom2.value?.drawChart(userStore.twoWeekChartDays[0], twoWeekChartData[0])
    chartDom3.value?.drawChart(userStore.twoWeekChartDays[1], twoWeekChartData[1])
    averageNumber.value.month = calculateAverage(props.currentType, monthChartData)
    averageNumber.value.twoWeek[0] = calculateAverage(props.currentType, twoWeekChartData[0])
    averageNumber.value.twoWeek[1] = calculateAverage(props.currentType, twoWeekChartData[1])
}

const calculateAverage = (type: string, data: number[]) => {
    switch (type) {
        case "sleep":
            const averageSleep = data.reduce((before, after) => before + after, 0) / data.length;
            const hours = Math.floor(averageSleep);
            const minutes = Math.round((averageSleep - hours) * 60);
            return { hours, minutes };
        case "steps":
            const averageSteps = data.reduce((before, after) => before + after, 0) / data.length;
            return Math.floor(averageSteps);
        case "heartRate":
            const max = Math.max(...data);
            const min = Math.min(...data);
            return { max: Math.floor(max), min: Math.floor(min) };
        default:
            return {};
    }
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
        return currentDatasetIndex.value === 0 ? `${ currentYearMonth.value } -01〜${ currentYearMonth.value } -15` : `${ currentYearMonth.value } -16〜${ currentYearMonth.value } -31`
    }
})

interface CurrentAverage {
    [key: string]: number | {
        hours? : number,
        minutes? : number,
        min? : number,
        max? : number,
    }
}
const currentAverage = computed<CurrentAverage>(() => {
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
            <div class="information-area" v-if="props.currentType === 'steps'">
                <div class="average">平均 {{ currentAverage }} 歩</div>
                <div class="term">{{ currentTerm }}</div>
            </div>
            <div class="information-area" v-else-if="props.currentType === 'sleep'">
                <div class="average">平均睡眠時間 {{ currentAverage.hours }} 時間 {{ currentAverage.minutes }}分</div>
                <div class="term">{{ currentTerm }}</div>
            </div>
            <div class="information-area" v-else>
                <div class="average"><span>範囲</span> {{ currentAverage.min }} / {{ currentAverage.max }}<span>脈 / 分</span></div>
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
                <Chart ref="chartDom1" barKey="1" :type="chartType" v-show="isMonthRange === true" />
                <Chart ref="chartDom2" barKey="2" :type="chartType" v-show="currentDatasetIndex === 0 && isMonthRange === false" />
                <Chart ref="chartDom3" barKey="3" :type="chartType" v-show="currentDatasetIndex === 1 && isMonthRange === false" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/template.scss";
</style>