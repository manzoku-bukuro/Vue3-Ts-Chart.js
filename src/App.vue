<template>
  <section>
    <div class="content-container">
      <div class="tab-container">
        <button id="defaultOpen" class="tab-links" @click="changeTab('steps')">
          歩数
        </button>
        <button class="tab-links" @click="changeTab('hours-of-sleep')">
          睡眠時間
        </button>
        <button class="tab-links" @click="changeTab('heartbeats')">
          心拍数
        </button>
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
  </section>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  data() {
    return {
      stepsData: {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5', '6'],
          datasets: [
            {
              data: [10, 20, 5, 20, 40, 5],
              backgroundColor: '#17A220',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      },
      sleepTimeData: {
        type: 'bar',
        data: {
          labels: ['1', '2', '3', '4', '5', '6'],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: '#17A220',
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      },
      heartRateData: {
        type: 'line',
        data: {
          labels: ['1', '2', '3', '4', '5', '6'],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: '#17A220',
              borderColor: 'green'
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      },
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
    }
  },
  mounted() {
    new Chart(document.getElementById('stepsChart'), this.stepsData);
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

