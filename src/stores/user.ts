import { defineStore } from 'pinia';
import { IUser } from 'src/models/user.model';
import { IUniversity } from 'src/models/university.model'
import { EUserRole } from 'src/enums/userTypes.enum'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as IUser,
    avatar: '',
    adminUniversity: {} as IUniversity,
  }),
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!state.user?.id,
    downloadedAvatar: (state) => state.avatar,
    getUniversity: (state) =>
      state.user.role === EUserRole.Admin
        ? state.adminUniversity.id
        : state.user?.groups?.[0]?.direction?.department?.faculty?.university_id,
    getAdminUniversity: (state) => state.adminUniversity,
    getRole: (state) => state.user?.role,
    getUserName: (state) => [state.user.last_name, state.user.first_name, state.user.middle_name].filter((el) => !!el).join(' '),
  },
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
    logout() {
      this.user = {} as IUser;
      this.avatar = '';
    },
    setAvatar(avatarInfo: string) {
      this.avatar = avatarInfo;
    },
    setAdminUniversity(university: IUniversity) {
      this.adminUniversity = university;
    },
  },
});
