import { Observable } from 'rxjs';

// models
import { MelodyDTO } from '../models/melody-dto';
import { PlayerUtil } from './player-util';

export interface PlayerService {

    playerUtil: PlayerUtil;

    rate(dto: MelodyDTO): Observable<void>;

}