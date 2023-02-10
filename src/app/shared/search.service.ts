import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl = 'https://api.github.com/users/';

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }


  public getUser(username: string): Observable<any> {    
    return this.http.get(`${this.baseUrl}${username}`);
  }

  public getRepository(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${username}`+ '/repos')
  }

  message(msg : string) : void{
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

}
