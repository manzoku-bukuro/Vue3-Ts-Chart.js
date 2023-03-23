<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
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
const route = useRoute();
const changeTab = (chartKey: string) => {
    router.push(`/${chartKey}`);
};
const currentPath = ref(route.path.slice(1));
watch(
    () => route.path,
    (newQuery) => {
        currentPath.value = route.path.slice(1)
    },
)
</script>
<template>
    <div class="side-menu">
        <button class="side-menu-link" :class="{ 'active': currentPath === tab.chart }" v-for="(tab, tabIndex) in tabs"
            :key="`tab-${tabIndex}`" @click="changeTab(tab.chart)">
            {{ tab.label }}
        </button>
    </div>
</template>

<style scoped>
.side-menu {
    background-color: #aaa;
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 20px 0 0 20px;
}

.side-menu-link {
    background-color: #aaa;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-align: left;
    margin-bottom: 10px;
}

.side-menu-link:hover {
    background-color: #999;
}

.side-menu-link.active {
    background-color: #fff;
    color: #333;
}
</style>