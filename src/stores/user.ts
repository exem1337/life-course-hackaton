import { defineStore } from 'pinia';
import { IUser } from 'src/models/user.model';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user?.id,
    roleName: (state) => state.user?.role,
    getUserName: (state) => [state.user.lastName, state.user.name, state.user.middleName].filter((el) => !!el).join(' '),
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    logout() {
      this.user = {} as IUser;
    },
  },
});
