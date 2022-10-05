import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    public rate(dto: MelodyDTO): Observable<void> {
        return this.http.post<void>(this.baseUrl + 'rate-melody', dto);
    }

}