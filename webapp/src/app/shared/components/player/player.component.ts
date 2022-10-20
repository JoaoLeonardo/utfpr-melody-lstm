import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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

    @Output() ratingEvt: EventEmitter<void>;

    @Input() melody?: Melody;
    
    @Input() genre?: number;

    @Input() service?: PlayerService;

    public noteSequence?: NoteSequence;

    public midiPlayer: mm.Player;

    public isPlaying: boolean;

    public isLoading: boolean;

    public isRated: boolean;

    constructor(private snackBar: MatSnackBar) {
        this.midiPlayer = new mm.Player();
        this.ratingEvt = new EventEmitter();
        this.isPlaying = false;
        this.isLoading = false;
        this.isRated = false;
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
            rating: rating,
            genre: this.genre!
        }).subscribe(() => {
            this.isLoading = false;
            this.snackBar.open('A avaliação foi salva com sucesso!', 'Ok');
            this.ratingEvt.next();
        }, error => {
            this.isLoading = false;
            this.snackBar.open(errorTransform(error) + '', 'Ok');
        });
    }

}

