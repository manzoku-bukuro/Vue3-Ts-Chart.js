<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { Chart, BarController, CategoryScale, LinearScale } from "chart.js/auto";
Chart.register(BarController, CategoryScale, LinearScale);

const props = defineProps({
    barKey: String,
    type: String,
});
const chart = ref<any>(null);
const drawChart = (labels: string, data: number[]) => {
    chart.value = new Chart((document as any).getElementById(`bar-chart-${props.barKey}`), {
        type: props.type,
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
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
    } as any);
}
const destroyChart = () => {
    chart.value.destroy();
}
defineExpose({
    drawChart,
    destroyChart,
});
</script>
<template>
    <div class="tab-content">
        <canvas :id="`bar-chart-${props.barKey}`" ref="chart"></canvas>
    </div>
</template>