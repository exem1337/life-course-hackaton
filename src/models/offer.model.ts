import { IUser } from './user.model';

export interface IOffer{
    id: number,
    header: string,
    description: string,
    author_id: number,
    createdAt: Date,
    updatedAt: Date,
    users: Array<IUser>,
    author: IUser
}
