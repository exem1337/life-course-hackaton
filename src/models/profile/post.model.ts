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
  comments?: Array<string>;
  tags?: Array<string>;
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
}

export interface IPostsFilters {
  university?: Array<number>;
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
  },
  includes?: Array<IAssociation>;
}
