import { IUser } from 'src/models/user.model'

export interface ITopStudent {
  user_id: number;
  totalPoints: string;
  avatar: string;
  user: IUser;
}
