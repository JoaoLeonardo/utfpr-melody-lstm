import { MelodyNote } from "../models/melody-note";

export class PlayerUtil {

    private STEP = 4;
    private MAX_LOOP = 20;

    private currentQuantizedStep!: number;

    public convertToInputSequence(str: string): any {
        const totalNotes = this.getTotalNotes(str);
        this.currentQuantizedStep = 0;

        const notes: MelodyNote[] = [];
        let lastIndex: number = str.indexOf('notes');
        for (let i = 0; i < totalNotes; i++) {
            const res = this.getNote(str, lastIndex);
            
            if (res.note.pitch > 60) {
                notes.push(res.note);
            }
            
            lastIndex = res.lastIndex;
            this.currentQuantizedStep += this.STEP;
        }

        return {
            notes: notes,
            tempos: [this.getTempo(str)],
            totalTime: this.getTotalTime(str),
            ticksPerQuarter: this.getTicksPerQuarter(str),
            totalQuantizedSteps: this.currentQuantizedStep,
            quantizationInfo: { stepsPerQuarter: 4 },
        };
    }

    private parseStringAsNumber(str: string, separator: string) {
        let numberStr = '';
        let currentLoop = 1;

        while (str.charAt(str.length - currentLoop) !== separator && currentLoop <= this.MAX_LOOP) {
            const char = str.charAt(str.length - currentLoop);
            numberStr = char.concat(char);
            currentLoop++;
        }

        return +numberStr;
    }

    private getTotalTime(str: string): number {
        return this.parseStringAsNumber(str, ' ');
    }

    private getTempo(str: string): { qpm: number } {
        const qpmStr = str.slice(str.indexOf('qpm'));
        return { qpm: this.parseStringAsNumber(qpmStr.slice(0, qpmStr.indexOf('\n')), ' ') };
    }

    private getTicksPerQuarter(str: string): number {
        const ticksStr = str.slice(str.indexOf('ticks_per_quarter'));
        return this.parseStringAsNumber(ticksStr.slice(0, ticksStr.indexOf('\n')), ' ');
    }

    private getTotalNotes(str: string) {
        return (str.match(/notes/g) || []).length;
    }

    private getNote(str: string, lastIndex: number): { note: MelodyNote, lastIndex: number } {
        const noteStart = lastIndex + 1;
        const noteEnd = str.indexOf('}', noteStart);

        const noteStr = str.slice(noteStart, noteEnd);

        return {
            note: {
                pitch: this.getPropNumber(noteStr, 'pitch'),
                velocity: this.getPropNumber(noteStr, 'velocity'),
                startTime: this.getPropNumber(noteStr, 'start_time'),
                endTime: this.getPropNumber(noteStr, 'end_time'),
                quantizedStartStep: this.currentQuantizedStep,
                quantizedEndStep: this.currentQuantizedStep + this.STEP
            },
            lastIndex: noteEnd
        };
    }

    private getPropNumber(str: string, search: string): number {
        const propIndex = str.indexOf(search);
        if (propIndex < 0) { return 0; }
        const propLastIndex = str.indexOf('\n', propIndex);

        let propStr = '';
        let currentLoop = 1;
        while (str.charAt(propLastIndex - currentLoop) !== ' ' && currentLoop <= this.MAX_LOOP) {
            const char = str.charAt(propLastIndex - currentLoop);
            propStr = char.concat(propStr);
            currentLoop++;
        }

        return +propStr;
    }

}