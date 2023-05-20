import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = 'http://localhost:5000/clubInformations';

  constructor(private http: HttpClient) { }

  getClubData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 
  updateClubData(userId: string, updates: any): Observable<any> {
  return this.http.put('http://localhost:5000/clubInformations/6467e6dda7693057687a6d3f', updates);
}
}
