import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mc-your-feed',
  templateUrl: './yourFeed.component.html',
  styleUrls: ['./yourFeed.component.scss']
})
export class YourFeedComponent {
  apiUrl = '/articles/feed';
}
