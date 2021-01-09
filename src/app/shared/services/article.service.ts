import { GetArticleResponseInterface } from '../types/getArticleResponse.interface';
import { map } from 'rxjs/operators';
import { ArticleInterface } from '../types/article.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .get<GetArticleResponseInterface>(fullUrl)
      .pipe(map((response: GetArticleResponseInterface) => response.article));
  }
}
