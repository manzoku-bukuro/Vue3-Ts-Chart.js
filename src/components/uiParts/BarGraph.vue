<script setup>
import { onMounted, ref, reactive } from "vue";
import { Chart, BarController, CategoryScale, LinearScale } from "chart.js/auto";
Chart.register(BarController, CategoryScale, LinearScale);

const props = defineProps({
    barKey: String,
});
const chart = ref(null);
const drawChart = (labels, data) => {
    chart.value = new Chart(document.getElementById(`bar-chart-${props.barKey}`), {
        type: "bar",
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
    });
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