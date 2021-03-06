import { SaveArticleResponseInterface } from '../../shared/types/saveArticleResponse.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from '../../shared/types/articleInput.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleInput: ArticleInputInterface,
  ): Observable<ArticleInterface> {
    const url = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .put<SaveArticleResponseInterface>(url, articleInput)
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
