import { LoginRequestInterface } from './../types/loginRequest.interface';
import { AuthResponseInterface } from './../types/authResponse.interface';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInterface } from './../types/registerRequest.interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInputInterface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient){}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users`;

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/login`;

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`;

    return this.http
      .get<AuthResponseInterface>(url)
      .pipe(map(this.getUser));
  }

  updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/user`;

    return this.http.put(url, currentUserInput)
      .pipe(
        map(this.getUser)
      );
  }
}
