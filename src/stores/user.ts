import { defineStore } from 'pinia';
import { IUser } from 'src/models/user.model';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    avatar: '',
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user?.id,
    downloadedAvatar: (state) => state.avatar,
    // roleName: (state) => state.user?.role,
    getUserName: (state) => [state.user.last_name, state.user.first_name, state.user.middle_name].filter((el) => !!el).join(' '),
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    logout() {
      this.user = {} as IUser;
    },
    setAvatar(avatarInfo: string) {
      this.avatar = avatarInfo;
    },
  },
});
