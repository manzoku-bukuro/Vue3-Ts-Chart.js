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

const startDate = new Date("2022-08-01");
const endDate = new Date("2022-08-31");

const filterTermData = data.filter((d) => {
  const date = new Date(d.date);
  return date >= startDate && date <= endDate;
});

interface DataGroup {
  [key: string]: UserVitalData[]
}
userStore.augustDateGroupList = filterTermData.reduce((group: DataGroup, dayData: UserVitalData) => {
  const currentDate = new Date(dayData.date);
  if (currentDate >= startDate && currentDate <= endDate) {
    const key = dayData.date;
    if (!group[key]) {
      group[key] = [];
    }
    group[key].push(dayData);
  }
  return group;
}, {});
</script>

<template>
  <router-view></router-view>
</template>


<style>
@import "./assets/chart.css";
</style>

