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
    heartRate: number;
}
export interface UserState {
    userData: UserVitalData[];
    dayGroupList: DayGroupList;
    monthGroupList: MonthGroupList;
    dayAverageList: {
        [key: string]: ChartData
    };
}

export interface UserGetters extends _GettersTree<UserState> {
    availableYearMonths: (state: UserState) => string[]
}
export interface UserActions {
    getYearMonthChartData: (yearMonth: string, type: string) => number[];
}
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
        getYearMonthChartData(yearMonth, type) {
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
    },
})
