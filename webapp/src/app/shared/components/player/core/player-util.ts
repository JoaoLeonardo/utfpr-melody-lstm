import { MelodyNote } from "../models/melody-note";

export class PlayerUtil {

    public convertToInputSequence(str: string): any {
        const totalTime = this.getTotalTime(str);
        const totalNotes = this.getTotalNotes(str);

        let notes: MelodyNote[] = [];
        let lastIndex: number = str.indexOf('notes');
        for (let i = 0; i < totalNotes; i++) {
            const res = this.getNote(str, lastIndex);
            lastIndex = res.lastIndex;
            notes.push(res.note);
        }

        return {
            notes: notes,
            totalTime: totalTime,
            totalQuantizedSteps: 8,
            tempos: [ { qpm: 60 }],
            quantizationInfo: {
                stepsPerQuarter: 4
            },
        };
    }

    private getTotalTime(str: string): number {
        const maxLoops = 20;

        let timeStr = '';
        let currentLoop = 1;

        while (str.charAt(str.length - currentLoop) !== ' ' && currentLoop <= maxLoops) {
            const timeChar = str.charAt(str.length - currentLoop);
            timeStr = timeChar.concat(timeStr);
            currentLoop++;
        }

        return +timeStr;
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
                start_time: this.getPropNumber(noteStr, 'start_time'),
                end_time: this.getPropNumber(noteStr, 'end_time'),
                quantizedStartStep: 4,
                quantizedEndStep: 8
            },
            lastIndex: noteEnd
        };
    }

    private getPropNumber(str: string, search: string): number {
        const propIndex = str.indexOf(search);
        if (propIndex < 0) { return 0; }
        const propLastIndex = str.indexOf('\r', propIndex);

        const maxLoops = 20;
        let propStr = '';
        let currentLoop = 1;
        while (str.charAt(propLastIndex - currentLoop) !== ' ' && currentLoop <= maxLoops) {
            const char = str.charAt(propLastIndex - currentLoop);
            propStr = char.concat(propStr);
            currentLoop++;
        }

        return +propStr;
    }

}