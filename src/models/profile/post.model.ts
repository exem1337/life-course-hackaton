export interface IPostAuthor {
  avatar_salt: string;
  first_name: string;
  last_name: string;
}

export interface IPost {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  author: IPostAuthor;
}

export interface IPostCreate {
  title: string;
  content: string;
  author_id?: number;
  tags: Array<string>;
  file_keys: Array<string>;
}
