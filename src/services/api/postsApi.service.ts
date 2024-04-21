import {
  IComment,
  ICommentsRequestFilters,
  IPost,
  IPostCreate,
  IPostsRequestFilters,
} from 'src/models/profile/post.model';
import api from 'src/services/base/api.service';
import { IPagination } from 'src/models/base/pagination.model'

export class PostsApiService {
  public static async getPosts(filters?: IPostsRequestFilters): Promise<IPagination<Array<IPost>>> {
    return await api.post('/publications/publication/all', filters, { showError: true });
  }

  public static async createPost(postData: IPostCreate): Promise<void> {
    return await api.post('/publications/publication', postData);
  }

  public static async likePost(postId: number): Promise<void> {
    return await api.post(`/publications/publication/${postId}/favorites`);
  }

  public static async addComment(postId: number, text: string): Promise<void> {
    return await api.post('/publications/comment', { publication_id: postId, text: text });
  }

  public static async getAllComments(filters: ICommentsRequestFilters): Promise<IPagination<Array<IComment>>> {
    return await api.post('/publications/comment/all', filters, { showError: true });
  }

  public static async loadUserPosts(userId: number): Promise<Array<IPost>> {
    return await api.get(`/publications/publication/user/${userId}`);
  }

  public static async deletePost(postId: number): Promise<void> {
    return await api.delete(`/publications/publication/${postId}`);
  }

  public static async getFavouritePosts(): Promise<Array<IPost>> {
    return await api.get('/publications/publication/favorites');
  }
}
