<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import SideMenu from '../uiParts/SideMenu.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

interface Chart {
    type: string;
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string;
            borderColor?: string
        }[];
    };
    options: {
        plugins: {
            legend: {
                display: boolean;
            };
        };
    };
}
const chartData = ref<{ [key: string]: Chart }>({
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
});
const activeTab = ref<string>('steps');
const changeTab = (chartKey: string) => {
    activeTab.value = chartKey;
};
const currentPath = route.path.slice(1);
onMounted(() => {
    const canvas: any = document.getElementById(`canvas-${currentPath}`);
    new Chart(canvas, (chartData as any).value[currentPath]);
});
</script>

<template>
    <div class="content-container">
        <SideMenu />
        <div class="category-container">
            <div class="tab-content">
                <canvas :id="`canvas-${currentPath}`"></canvas>
            </div>
        </div>
    </div>
</template>