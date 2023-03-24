<script setup>
import { onMounted, ref, reactive, nextTick } from "vue";
import { useUserStore } from '../../store/user';
import Chart from '../uiParts/Chart.vue';

const userStore = useUserStore();
const chartDom1 = ref(null);
const chartDom2 = ref(null);
const chartDom3 = ref(null);

// 初期表示設定
const currentDatasetIndex = ref(0);
const isMonthRange = ref(true);
const currentYearMonth = ref("2022-08");

// 表示するデータ
const stepsData = ref([]);

onMounted(() => {
    stepsData.value = userStore.getYearMonthChartData(currentYearMonth.value, "steps");
    chartDom1.value.drawChart(userStore.monthChartDays, stepsData.value)
    chartDom2.value.drawChart(userStore.twoWeekChartDays[0], stepsData.value.slice(0, 15))
    chartDom3.value.drawChart(userStore.twoWeekChartDays[1], stepsData.value.slice(15, 31))
});

const changeIndex = (index) => {
    currentDatasetIndex.value = index === '0' ? 1 : 0;
}
const changeRange = (range) => {
    isMonthRange.value = range === "month";
}
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
            <div class="index-button-area" v-if="!isMonthRange">
                <button class="back-button" @click="() => changeIndex('0')">
                    <span class="back-arrow"></span>
                </button>
                <button class="forward-button" @click="() => changeIndex('1')">
                    <span class="forward-arrow"></span>
                </button>
            </div>
        </div>
        <div class="content-container">
            <div class="category-container">
                <Chart ref="chartDom1" barKey="1" type="line" v-show="isMonthRange === true" />
                <Chart ref="chartDom2" barKey="2" type="line" v-show="currentDatasetIndex === 0 && isMonthRange === false" />
                <Chart ref="chartDom3" barKey="3" type="line" v-show="currentDatasetIndex === 1 && isMonthRange === false" />
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
</style>