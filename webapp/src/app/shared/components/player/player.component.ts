import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// magenta
import { NoteSequence } from '@magenta/music';
import * as mm from '@magenta/music';

// aplicação
import { MelodyDTO } from './models/melody-dto';

@Component({
    selector: 'app-player',
    templateUrl: 'player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {

    @Input() melody?: MelodyDTO;

    public noteSequence?: NoteSequence;

    public midiPlayer: mm.Player;

    public isPlaying: boolean;

    constructor() {
        this.midiPlayer = new mm.Player();
        this.isPlaying = false;
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

    public rate() { }

}

