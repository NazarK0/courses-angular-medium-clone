import { FormGroup, FormBuilder } from '@angular/forms';
import { BackendErrorsInterface } from './../../../../types/backendErrors.interface';
import { ArticleInputInterface } from './../../../../types/articleInput.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: ArticleInputInterface;
  @Input('isSubmitting') isSubmittingProps!: boolean;
  @Input('errors') errorsProps!: BackendErrorsInterface | null;

  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  initializeForm(): void {
    const { title, description, body, tagList } = this.initialValuesProps;
    this.form = this.fb.group({
      title,
      description,
      body,
      tagList: tagList.join(' '),
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    const { title, description, body, tagList } = this.form.value;
    const article: ArticleInputInterface = {
      title,
      description,
      body,
      tagList: tagList.split(' '),
    };

    this.articleSubmitEvent.emit(this.form.value);
  }
}
