import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { IResponse } from 'src/app/shared/interfaces/IResponse';
import { User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private helper: HelperService) { }
  
  getAllUser(): Observable<IResponse> {
    return this.http.get<IResponse>(environment.user).pipe(
      retry(1),
      catchError(this.helper.handleError)
    );
  }
  
  createUser(user: User): Observable<IResponse> {
    return this.http.post<IResponse>(environment.user,user).pipe(
      retry(1),
      catchError(this.helper.handleError)
    );
  }

  getUserById(id: String) {
    return this.http.get<IResponse>(`${environment.user}/${id}`).pipe(
      retry(1),
      catchError(this.helper.handleError)
    );
  }

  updateUserById(user: User,id: String = '') {
    return this.http.put<IResponse>(`${environment.user}/${id}`,user).pipe(
      retry(1),
      catchError(this.helper.handleError)
    );
  }

  deleteUerById(id: String) {
    return this.http.delete<IResponse>(`${environment.user}/${id}`).pipe(
      retry(1),
      catchError(this.helper.handleError)
    );
  }
}
