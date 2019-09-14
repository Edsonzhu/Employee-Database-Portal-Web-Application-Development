import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Position } from "./position";

@Injectable({
  providedIn: 'root'
})

export class PositionService {

  private url = "https://shrouded-crag-99446.herokuapp.com";

  constructor(private http: HttpClient) { }

  //Functions
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/positions`);
  }

  savePosition(position: Position): Observable<any> {
    return this.http.put<Position>(`${this.url}/position/${position._id}`, position);
  }

  getPosition(id: string): Observable<Position> {
    return this.http.get<Position>(`${this.url}/position/${id}`);
  }  
}