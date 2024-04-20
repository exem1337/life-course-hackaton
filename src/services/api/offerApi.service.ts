import api from 'src/services/base/api.service';
import { IOffer } from 'src/models/offer.model';

export class OfferApiService {
  public static async loadOffers(): Promise<Array<IOffer>> {
    return await api.get('/vacancies/vacancy')
  }

  public static async loadOneOffer(offerId:number): Promise<IOffer> {
    return await api.get(`vacancies/vacancy/one/${offerId}`)
  }

  public static async responseOffer(offerId: number, subscriberId: number): Promise<IOffer> {
    return await api.patch(`vacancies/vacancy/subscribe/${offerId}`, { subscriber_id: subscriberId })
  }
}
