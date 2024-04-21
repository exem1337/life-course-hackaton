interface IUserRole {
  id: number;
  userId: number;
  roleId: number;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  UserRoles: IUserRole;
}
