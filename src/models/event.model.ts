import { IAssociation } from 'src/models/profile/post.model'
import { IUniversity } from 'src/models/university.model'
import { PostSectionEnum } from 'src/enums/postSection.enum'
import { IUser } from 'src/models/user.model'

export interface IEvent {
  id: number;
  name: string;
  description: string;
  date_beg: string;
  date_end: string;
  section: string;
  university_id: number;
  createdAt: string;
  updatedAt: string;
  university: IUniversity;
  participants: Array<IUser>,
}

export interface IGetEventsRequestParams {
  fields: {
    university_id?: {
      operator: string,
      value: Array<number>,
    },
  },
  includes?: Array<IAssociation>;
}

export interface IEventCreateRequest {
  name: string;
  description: string;
  date_beg: string;
  date_end: string;
  section: PostSectionEnum;
  university_id: number;
}
