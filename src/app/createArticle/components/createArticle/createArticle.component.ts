import { ArticleInputInterface } from './../../../shared/types/articleInput.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
})
export class CreateArticleComponent {
  initialValues: ArticleInputInterface = {
    title: 'Foo',
    description: 'descrip',
    body: 'abaz',
    tagList: ['foo', 'article', 'test']
  };

  onSubmit(res: any): void {
    console.log('on submit parent', res)
  }
}
