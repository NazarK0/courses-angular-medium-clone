import { GetPopularTagsResponseInterface } from './../types/getPopularTagsResponse.interface';
import { map } from 'rxjs/operators';
import { PopularTagType } from './../../../types/popularTag.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class PopularTagsService {
  constructor(private httpClient: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = `${environment.apiUrl}/tags`;
    return this.httpClient
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(
        map((response: GetPopularTagsResponseInterface): PopularTagType[] => {
        return response.tags;
        }),
      );
  }
}
