<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
interface Tab {
    label: string;
    chart: string;
}
const tabs = ref<Tab[]>([
    { label: '歩数', chart: 'steps' },
    { label: '睡眠', chart: 'sleep' },
    { label: '心拍数', chart: 'heart' }
]);
const router = useRouter();
const changeTab = (chartKey: string) => {
    router.push(`/${chartKey}`);
};
</script>
<template>
    <div class="tab-container">
        <button class="tab-links" v-for="(tab, tabIndex) in tabs" :key="`tab-${tabIndex}`" @click="changeTab(tab.chart)">
            {{ tab.label }}
        </button>
    </div>
</template>