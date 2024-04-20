import { api } from 'src/boot/axios';
import { IOffer } from 'src/models/offer.model';

export class OfferApiService {
  public static async loadOffers(): Promise<Array<IOffer>> {
    return await api.get('/vacancies/vacancy')
  }

  public static async loadOneOffer(offerId:number): Promise<IOffer> {
    return await api.get(`vacancies/vacancy/one/${offerId}`)
  }
}
