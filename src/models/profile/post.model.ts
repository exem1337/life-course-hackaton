import { IUser } from 'src/models/user.model';

export interface IComment {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user_id: number | null; // Если user_id может быть null
  publication_id: number;
  photo: string;
  user: IUser;
}

export interface IPostAuthor {
  avatar_salt: string;
  first_name: string;
  last_name: string;
}

export interface IPost {
  id: number;
  file_keys: Array<string>;
  title: string;
  content: string;
  createdAt: string;
  comments?: Array<IComment>;
  tags?: Array<string>;
  author_id: number;
  likes: number;
  author: IPostAuthor;
}

export interface IPostCreate {
  title: string;
  content: string;
  author_id?: number;
  tags: Array<string>;
  file_keys: Array<string>;
  university_id?: number;
  section: string;
}

export interface IPostsFilters {
  university?: Array<number> | null;
  section?: Array<string> | null;
}

export interface IAssociation {
  association: string;
}

export interface IPostsRequestFilters {
  fields: {
    university_id?: {
      operator: string,
      value: Array<number>,
    },
    section?: {
      operator: string,
      value: Array<string>,
    }
  },
  includes?: Array<IAssociation>;
}

export interface IOffersRequestFilters {
  fields: {
    locality_id?: {
      operator: string,
      value: Array<number>,
    },
    organization_id?: {
      operator: string,
      value: Array<number>,
    }
  },
  includes?: Array<IAssociation>;
}

export interface ICommentsRequestFilters {
  fields: {
    publication_id?: {
      operator: string,
      value: number,
    },
  },
  includes?: Array<IAssociation>;
}
