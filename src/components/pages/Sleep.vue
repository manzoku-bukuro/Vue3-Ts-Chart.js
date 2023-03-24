<script setup>
import { onMounted, ref, reactive, nextTick, watch, computed } from "vue";
import { useUserStore } from '../../store/user';
import BarGraph from '../uiParts/BarGraph.vue';

const userStore = useUserStore();
const barGraph1 = ref(null);
const barGraph2 = ref(null);
const barGraph3 = ref(null);

// 初期表示設定
const currentDatasetIndex = ref(0);
const isMonthRange = ref(true);
const currentYearMonth = ref("2022-08");
const average = ref(0);

// 表示するデータ
const chartData = ref([]);
const averageNumber = ref({
    month: {
        hours: 0,
        minutes: 0,
    },
    twoWeek: [
        {
            hours: 0,
            minutes: 0,
        },
        {
            hours: 0,
            minutes: 0,
        }
    ],
})

onMounted(() => {
    setupChart()
});

const setupChart = () => {
    chartData.value = userStore.getYearMonthChartData(currentYearMonth.value, "sleep");
    const monthChartData = chartData.value;
    const twoWeekChartData = [chartData.value.slice(0, 15), chartData.value.slice(15, 31)]

    barGraph1.value.drawChart(userStore.monthChartDays, monthChartData)
    barGraph2.value.drawChart(userStore.twoWeekChartDays[0], twoWeekChartData[0])
    barGraph3.value.drawChart(userStore.twoWeekChartDays[1], twoWeekChartData[1])
    averageNumber.value.month = calculateAverageSleep(monthChartData)
    averageNumber.value.twoWeek[0] = calculateAverageSleep(twoWeekChartData[0])
    averageNumber.value.twoWeek[1] = calculateAverageSleep(twoWeekChartData[1])
}

const calculateAverageSleep = (data) => {
    const average = data.reduce((before, after) => before + after, 0) / data.length;
    // 平均睡眠時間を時間と分に変換
    const hours = Math.floor(average);
    const minutes = Math.round((average - hours) * 60);

    return { hours, minutes }
}

const changeIndex = (index) => {
    currentDatasetIndex.value = index === '0' ? 0 : 1;
}
const changeRange = (range) => {
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

const onYearMonthChange = (newValue, oldValue) => {
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
    <div>
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
                <div class="average">平均睡眠時間 {{ currentAverage.hours }} 時間 {{ currentAverage.minutes }}分</div>
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
                <BarGraph ref="barGraph1" barKey="1" v-show="isMonthRange === true" />
                <BarGraph ref="barGraph2" barKey="2" v-show="currentDatasetIndex === 0 && isMonthRange === false" />
                <BarGraph ref="barGraph3" barKey="3" v-show="currentDatasetIndex === 1 && isMonthRange === false" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.controller-container {
    display: flex;
    justify-content: space-between;
    width: 80%;
}

.tab-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.tab {
    background-color: #fff;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 200px;
}

.tab:hover {
    background-color: #ddd;
}

.tab.active {
    background-color: #eee;
    color: #333;
}

.btn {
    background-color: #1e90ff;
    color: #fff;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #0070d1;
}

.content-container {
    width: 100%;
    padding: 20px;
    border: none;
}

.category-container {
    width: 100%;
    height: 100%;
}

.back-button,
.forward-button {
    background-color: #f4f4f4;
    border: none;
    color: #333;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin: 0;
    padding: 0 15px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    white-space: nowrap;
}

.back-button:hover,
.forward-button:hover {
    background-color: #ddd;
}

.back-arrow,
.forward-arrow {
    display: inline-block;
    height: 0;
    margin-right: 5px;
    margin-top: -1px;
    width: 0;
}

.back-arrow {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #333;
}

.forward-arrow {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #333;
}

.nav-container {
    height: 40px;
    display: flex;
    justify-content: space-between;
}

.index-button-area {
    width: 90px;
}

.information-area {
    display: flex;
    align-items: center;
}

.information-area .average {
    font-size: 20px;
    font-weight: bold;
    margin-right: 12px;
}
</style>