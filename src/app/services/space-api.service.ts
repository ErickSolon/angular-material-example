import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceApiService {
  constructor(private httpClient: HttpClient) { }

  urlAPI: string = 'https://api.spaceflightnewsapi.net/v4/articles/'

  getAllArticles(limit: string, offset: string, search?: string, updated_at_gte?: string, updated_at_lte?: string): Observable<any> {
    const httpParams = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('search', search ?? '')
      .set('updated_at_lte', updated_at_lte ? `${updated_at_lte}T23:59:59Z` : '')
      .set('updated_at_gte', updated_at_gte ? `${updated_at_gte}T23:59:59Z` : '')
    return this.httpClient.get<any>(this.urlAPI, { params: httpParams })
  }
}
