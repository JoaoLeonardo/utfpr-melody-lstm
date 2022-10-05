import { Observable } from 'rxjs';

// models
import { MelodyDTO } from '../models/melody-dto';

export interface PlayerService {

    rate(dto: MelodyDTO): Observable<void>;

}