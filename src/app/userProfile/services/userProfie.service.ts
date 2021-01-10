import { map } from 'rxjs/operators';
import { GetUserProfileResponseInterface } from './../types/getUserProfileResponse.interface';
import { ProfileInterface } from './../../shared/types/profile.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable()
export class UserProfileService {
  constructor(
    private http: HttpClient,
  ) {}

  getUserProfile(slug: string): Observable<ProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;

    return this.http.get<GetUserProfileResponseInterface>(url).pipe(
      map((response: GetUserProfileResponseInterface) => response.profile)
    );
  }
}