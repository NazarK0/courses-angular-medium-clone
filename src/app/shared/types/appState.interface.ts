import { PopularTagStateInterface } from './../modules/popularTags/types/popularTagsState.interface';
import { FeedStateInterface } from './../modules/feed/types/feedState.interface';
import { AuthStateInterface } from './../../auth/types/authState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagStateInterface;
}
