<template>
  <section>
    <div class="content-container">
      <div class="tab-container">
        <button class="tab-links" v-for="(tab, tabIndex) in tabs" :key="`tab-${tabIndex}`" @click="changeTab(tab.chart)">
          {{ tab.label }}
        </button>
      </div>
      <div class="category-container">
        <div class="tab-content" v-show="activeTab === chartKey" v-for="(chart, chartKey) in chartData"
          :key="`chart-${chartKey}`">
          <canvas :ref="`canvas-${chartKey}`"></canvas>
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
      chartData: {
        steps: {
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
        sleep: {
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
        heart: {
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
      },
      tabs: [{ label: '歩数', chart: 'steps' }, { label: '睡眠', chart: 'sleep' }, { label: '心拍数', chart: 'heart' }],
      activeTab: 'steps',
    }
  },
  mounted() {
    this.tabs.forEach((tab) => {
      new Chart(this.$refs[`canvas-${tab.chart}`], this.chartData[tab.chart]);
    })
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    }
  },
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

