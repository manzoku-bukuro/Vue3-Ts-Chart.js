import { defineStore, type _GettersTree } from "pinia";
export interface ChartState {}

export interface ChartGetters extends _GettersTree<ChartState> {}
export interface ChartActions {}
export const useChartStore = defineStore<string, ChartState, ChartGetters, ChartActions>({
    id: 'chart',
    state: () => ({}),
    getters: {},
    actions: {},
})
