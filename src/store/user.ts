import { defineStore, type _GettersTree } from "pinia";
export interface UserVitalData {
    date: string;
    heartRate: number;
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

export interface DayGroupList {
    [key: string]: UserVitalData[]
}

export interface MonthGroupList {
    [key: string]: {
        [key: string]: ChartData;
    };
}

export interface ChartData {
    steps: number;
    sleep: number;
    heartRate: {
        average: number;
        max: number;
        min: number;
    };
}
export interface UserState {
    userData: UserVitalData[];
    dayGroupList: DayGroupList;
    monthGroupList: MonthGroupList;
    dayAverageList: {
        [key: string]: ChartData
    };
}

export interface UserGetters extends _GettersTree<UserState> { }
export interface UserActions { }
export const useUserStore = defineStore<string, UserState, UserGetters, UserActions>({
    id: 'user',
    state: () => ({
        userData: [],
        dayGroupList: {},
        dayAverageList: {},
        monthGroupList: {},
    }),
    getters: {},
    actions: {},
})
