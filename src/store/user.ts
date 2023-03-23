import { defineStore, type _GettersTree } from "pinia";
export interface UserState {
    userData: any[];
    dateGroupList: any;
    monthGroupList: any;
}

export interface UserGetters extends _GettersTree<UserState> {}
export interface UserActions {}
export const useUserStore = defineStore<string, UserState, UserGetters, UserActions>({
    id: 'user',
    state: () => ({
        userData: [],
        dateGroupList: {},
        monthGroupList: {},
    }),
    getters: {},
    actions: {},
})
