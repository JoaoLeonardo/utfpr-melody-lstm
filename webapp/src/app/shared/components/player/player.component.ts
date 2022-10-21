import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// magenta
import { NoteSequence } from '@magenta/music';
import * as mm from '@magenta/music';

// aplicação
import { errorTransform } from '../../pipes/error-transform';
import { PlayerController } from './player.controller';
import { PlayerService } from './core/player-service';

@Component({
    selector: 'app-player',
    templateUrl: 'player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    @Output() ratingEvt: EventEmitter<boolean>;

    @Input() service?: PlayerService;

    public midiPlayer: mm.Player;

    public isPlaying: boolean;

    public isLoading: boolean;

    constructor(
        private controller: PlayerController,
        private snackBar: MatSnackBar,
    ) {
        this.midiPlayer = new mm.Player();
        this.ratingEvt = new EventEmitter();
        this.isPlaying = false;
        this.isLoading = false;;
    }

    ngOnInit() { }

    public get noteSequence(): NoteSequence {
        return this.controller.melody?.input_sequence;
    }

    public get isRated(): boolean {
        return this.controller.rated;
    }

    public async play() {
        if (!this.noteSequence) { return; }
        this.isPlaying = !this.isPlaying;

        if (!this.midiPlayer.isPlaying()) {
            this.isPlaying = true;

            await this.midiPlayer.start({
                notes: this.noteSequence.notes,
                totalTime: this.noteSequence.totalTime
            });

            this.isPlaying = false;
        } else {
            this.midiPlayer.stop();
        }
    }

    public rate(rating: boolean) {
        if (!this.service) {
            this.snackBar.open('Serviço indisponível.', 'OK');
            return;
        }
        if (!this.controller.melody) {
            this.snackBar.open('Nenhuma melodia gerada! Por favor, gere uma melodia e tente novamente.', 'OK');
            return;
        }

        this.isLoading = true;
        this.service.rate({
            melody: JSON.stringify(this.controller.melody),
            sequence: this.controller.sequence!,
            rating: rating,
            genre: this.controller.genre!,
        }).subscribe(() => {
            this.isLoading = false;
            this.snackBar.open('A avaliação foi salva com sucesso!', 'Ok');
            this.controller.rated = true;
            this.ratingEvt.next(rating);
        }, error => {
            this.isLoading = false;
            this.snackBar.open(errorTransform(error) + '', 'Ok');
        });
    }

}

