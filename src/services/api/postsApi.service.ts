import { IPost, IPostCreate, IPostsRequestFilters } from 'src/models/profile/post.model'
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
}
