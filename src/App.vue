<template>
  <div class="content-container">
    <div class="tab-container">
      <button id="defaultOpen" class="tab-links" onclick="changeTab(event, 'steps')">歩数</button>
      <button class="tab-links" onclick="changeTab(event, 'hours-of-sleep')">睡眠時間</button>
      <button class="tab-links" onclick="changeTab(event, 'heartbeats')">心拍数</button>
    </div>
    <div class="category-container">
      <div id="steps" class="tab-content">
        <canvas id="stepsChart"></canvas>
      </div>
      <div id="hours-of-sleep" class="tab-content">
        <canvas id="sleepTimeChart"></canvas>
      </div>
      <div id="heartbeats" class="tab-content">
        <canvas id="heartRateChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import jsonData from '../data/user.json';
import { base64 } from 'base64-js';
export default {
  data() {
    return {
      activeTab: 'steps',
      json: jsonData,
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    }
  },
  async mounted() {
    const response = await fetch('http://localhost:5222/user');
    const binaryData = await response.arrayBuffer();
    const base64Data = base64.fromByteArray(new Uint8Array(binaryData));
  }
}
</script>

<style>
.content-container {
  display: flex;
  width: 80%;
  border: 1px solid #ccc;
}

.tab-container {
  display: flex;
  flex-direction: column;
  width: 20%;
  background-color: #f1f1f1;
}

.tab-container .tab-links {
  width: 100%;
  display: block;
  padding: 22px 16px;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
  font-size: 17px;
  font-weight: 700;
}

.tab-container .tab-links:hover {
  background-color: #ddd;
}

.tab-container .tab-links.active {
  background-color: #fff;
}

.category-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  margin-left: 10px;
}

.category-container .tab-content {
  display: flex;
  flex-direction: column;
}

.category-container .tab-content .title {
  width: 100%;
  height: 20%;
}
</style>

