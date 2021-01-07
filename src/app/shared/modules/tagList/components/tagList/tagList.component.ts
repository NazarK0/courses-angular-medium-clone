import { PopularTagType } from './../../../../types/popularTag.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tagList.component.html',
  styleUrls: ['./tagList.component.scss']
})
export class tagListComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('tags') tagsProps: PopularTagType[] = [];
}
