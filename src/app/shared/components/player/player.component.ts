import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// magenta
import { NoteSequence } from '@magenta/music';
import * as mm from '@magenta/music';

// aplicação
import { Melody } from './models/melody';
import { PlayerService } from './core/player-service';
import { errorTransform } from '../../pipes/error-transform';

@Component({
    selector: 'app-player',
    templateUrl: 'player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {

    @Input() melody?: Melody;

    @Input() service?: PlayerService;

    public noteSequence?: NoteSequence;

    public midiPlayer: mm.Player;

    public isPlaying: boolean;

    public isLoading: boolean;

    constructor(private snackBar: MatSnackBar) {
        this.midiPlayer = new mm.Player();
        this.isPlaying = false;
        this.isLoading = false;
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['melody']) {
            this.noteSequence = this.melody ? this.melody.input_sequence : null;
        }
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
        if (!this.melody) {
            this.snackBar.open('Nenhuma melodia gerada! Por favor, gere uma melodia e tente novamente.', 'OK');
            return;
        }

        this.isLoading = true;
        this.service.rate({
            melody: JSON.stringify(this.melody),
            rating: rating
        }).subscribe(() => {
            this.isLoading = false;
            this.snackBar.open('A avaliação foi salva com sucesso!', 'Ok');
        }, error => {
            this.isLoading = false;
            this.snackBar.open(errorTransform(error) + '', 'Ok');
        });
    }

}

