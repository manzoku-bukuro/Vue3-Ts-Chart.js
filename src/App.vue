<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore, type UserVitalData, type DayGroupList, type MonthGroupList, type ChartData } from './store/user';
import SideMenu from './components/uiParts/SideMenu.vue';

const userStore = useUserStore();

const getUserData = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`);
  const data: UserVitalData[] = await response.json();

  const dayGroupList = convertToDayGroupList(data);

  calculateAverageData(dayGroupList);

  const monthGroupList = convertToMonthGroupList(userStore.dayAverageList);

  userStore.userData = data;
  userStore.dayGroupList = dayGroupList;
  userStore.monthGroupList = monthGroupList;
}

const convertToDayGroupList = (data: UserVitalData[]): DayGroupList => {
  return data.reduce((group: DayGroupList, dayData: UserVitalData) => {
    const key = dayData.date;
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(dayData);
    return group;
  }, {});
}

const convertToMonthGroupList = (dayGroupList: { [key: string]: ChartData }): MonthGroupList => {
  const monthGroupList: MonthGroupList = {};

  for (const date of Object.keys(dayGroupList)) {
    const dayData = dayGroupList[date];
    const month = date.slice(0, 7);
    const day = date.slice(-2);

    if (!monthGroupList[month]) {
      monthGroupList[month] = {};
    }

    monthGroupList[month][day] = userStore.dayAverageList[date];
  }

  return monthGroupList;
}

// 歩数, 睡眠時間, 心拍数(平均, 最大値, 最小値)を取得
// 数値が0の場合バイタルデータを使用していないとみなし除外する
const calculateAverageData = (dayGroupList: DayGroupList) => {
  for (const date of Object.keys(dayGroupList)) {
    const dayData = dayGroupList[date];

    // 歩数を取得
    const stepsArray = dayData.filter(data => data.steps > 0).map(data => data.steps);
    const averageSteps = stepsArray.reduce((sum: number, steps: number) => sum + steps, 0) / dayData.length;

    // 睡眠時間を取得
    const sleepArray = dayData.filter(data => data.sleep > 0).map(data => data.sleep);
    const averageSleep = sleepArray.reduce((sum: number, sleep: number) => sum + sleep, 0) / dayData.length;;

    // 心拍数平均、最大値、最小値を取得
    const heartRateArray = dayData.map(data => data.heartRate).filter(hr => hr > 0);
    const averageHeartRate = heartRateArray.reduce((sum: number, hr: number) => sum + hr, 0) / heartRateArray.length;


    userStore.dayAverageList[date] = {
      heartRate: averageHeartRate,
      steps: averageSteps,
      sleep: averageSleep
    };
  }
}
const isLoading = ref(true);
onMounted(async () => {
  await getUserData();
  isLoading.value = false;
})
</script>

<template>
  <div class="chart-container">
    <SideMenu />
    <router-view v-if="!isLoading"></router-view>
  </div>
</template>


<style lang="scss">
.chart-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}
</style>

