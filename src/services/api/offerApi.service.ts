import api from 'src/services/base/api.service';
import { IOffer } from 'src/models/offer.model';
import { ICreateVacancy } from 'src/models/university.model'
import { IPagination } from 'src/models/base/pagination.model'
import { IOffersRequestFilters } from 'src/models/profile/post.model'
import { IOrganization } from 'src/models/region.model'

export class OfferApiService {
  public static async loadOffers(filters: IOffersRequestFilters): Promise<Array<IOffer>> {
    return (await api.post<IPagination<Array<IOffer>>>('/vacancies/vacancy/all', filters))?.data || [];
  }

  public static async loadOrganizations(): Promise<Array<IOrganization>> {
    return await api.get('/vacancies/organizations')
  }

  public static async loadOneOffer(offerId:number): Promise<IOffer> {
    return await api.get(`vacancies/vacancy/one/${offerId}`)
  }

  public static async getVacanciesByUserId(userId: number): Promise<Array<IOffer>> {
    return await api.get(`/vacancies/vacancy/author/${userId}`)
  }

  public static async responseOffer(offerId: number, subscriberId: number): Promise<IOffer> {
    return await api.patch(`vacancies/vacancy/subscribe/${offerId}`, { subscriber_id: subscriberId })
  }

  public static async createOffer(data: ICreateVacancy): Promise<void> {
    return await api.post('/vacancies/vacancy', data);
  }
}
