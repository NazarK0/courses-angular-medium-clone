import { GetArticleResponseInterface } from './../../../types/getArticleResponse.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http.post<GetArticleResponseInterface>(url, {}).pipe(
      map(this.getArticle),
    );
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);

    return this.http.delete<GetArticleResponseInterface>(url).pipe(
      map(this.getArticle),
    );
  }
}
