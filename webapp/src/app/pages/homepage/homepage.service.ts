import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// environment
import { environment } from "src/environments/environment";

// shared
import { PlayerService } from 'src/app/shared/components/player/core/player-service';
import { MelodyDTO } from 'src/app/shared/components/player/models/melody-dto';

@Injectable()
export class HomepageService implements PlayerService {

    /**
     * @description Armazena a url base do sistema
     */
    public baseUrl = environment.api;

    constructor(
        public http: HttpClient,
    ) { }

    public generate(genre: number): Observable<string> {
        const headers = new HttpHeaders()
        headers.set('Content-Type', 'text/plain; charset=utf-8');
        headers.set('Accept', 'text/plain; charset=utf-8')
        const params = new HttpParams().append('genre', genre)
        return this.http.get<string>(this.baseUrl + 'generate-melody', { 
            headers: headers, 
            params: params,
            responseType: 'text' as any
        });
    }

    public rate(dto: MelodyDTO): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'rate-melody', dto);
    }

}