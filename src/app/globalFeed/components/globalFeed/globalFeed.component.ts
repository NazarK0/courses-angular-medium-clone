import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.scss']
})
export class GlobalFeedComponent {
  apiUrl = '/articles';
  popularTags = ['tag1', 'tag2', 'tag22'];
}
