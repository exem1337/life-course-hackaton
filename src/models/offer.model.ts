import { IUser } from './user.model';

export interface IOffer{
    id: number,
    header: string,
    description: string,
    author_id: number,
    createdAt: string,
    updatedAt: string,
    users: Array<IUser>,
    author: IUser
}
