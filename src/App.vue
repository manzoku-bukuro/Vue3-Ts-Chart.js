<script setup lang="ts">
import { useUserStore } from './store/user';
const userStore = useUserStore();
interface UserVitalData {
  date: string;
  time: string;
  heartRate: number;
  heartRateVariability: number;
  sbp: number;
  dbp: number;
  steps: number;
  sleep: number;
  temperature: number;
  spo2: number;
  bloodGlucose: number;
  bodyFatPercentage: number;
  latitude: number;
  longitude: number;
  altitude: number;
  batteryLevel: number;
  sos: number;
  highLowHeartRate: number;
}
const response = await fetch('http://localhost:5222/user');
const data: UserVitalData[] = await response.json();

const sortData = data.sort((before, after) => {
  const dateBefore = new Date(before.date);
  const dateAfter = new Date(after.date);
  return dateBefore.getTime() - dateAfter.getTime();
})

interface DateGroup {
  [key: string]: UserVitalData[]
}
const dateGroupList = sortData.reduce((group: DateGroup, dayData: UserVitalData) => {
    const key = dayData.date;
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(dayData);
  return group;
}, {});

interface MonthGroup {
  [key: string]: {
    [key: string]: UserVitalData[];
  };
}

const monthGroupList: MonthGroup = {};

Object.keys(dateGroupList).forEach((date) => {
  const month = date.slice(0, 7); // ex. 2022-07
  const day = date.slice(-2); // ex. 08

  if (!monthGroupList[month]) {
    monthGroupList[month] = {};
  }
  monthGroupList[month][day] = dateGroupList[date];
});

userStore.dateGroupList = dateGroupList;
userStore.monthGroupList = monthGroupList;
</script>

<template>
  <router-view></router-view>
</template>


<style>
@import "./assets/chart.css";
</style>

