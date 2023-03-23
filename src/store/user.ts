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
        twoWeekChartDays: [["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"],
        ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
        ],
        monthChartDays: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14",
            "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
        ]
    }),
    getters: {
        availableYearMonths:(state) => {
            return Object.keys(state.monthGroupList)
        }
    },
    actions: {
        getYearMonthChartData(yearMonth: string, type: "steps" | "sleep" | "heartRate") {
            const stepsData = [];

            for (const day of this.monthChartDays) {
                if (this.monthGroupList[yearMonth][day]) {
                    stepsData.push(this.monthGroupList[yearMonth][day][type]);
                } else {
                    stepsData.push(0)
                }
            }
            return stepsData;
        },
        getMonthSleepAverage(yearMonth: string) {
            const data = this.monthGroupList[yearMonth];
            const sleepData = Object.keys(data).map((key) => data[key].sleep);
            const averageSleep = sleepData.reduce((before, after) => before + after, 0) / sleepData.length

            // 平均睡眠時間を時間と分に変換
            const hours = Math.floor(averageSleep);
            const minutes = Math.round((averageSleep - hours) * 60);

            return { hours, minutes }
        },
        getMonthStepsAverage(yearMonth: string) {
            const data = this.monthGroupList[yearMonth];
            const stepsData = Object.keys(data).map((key) => data[key].steps);
            const averageSteps = stepsData.reduce((before, after) => before + after, 0) / stepsData.length;
            return Math.floor(averageSteps);
        },
        getMonthHeartRateAverage(yearMonth: string) {

        }
    },
})
