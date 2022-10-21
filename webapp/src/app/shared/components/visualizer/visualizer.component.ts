import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

// magenta
import { NoteSequence } from '@magenta/music';
import * as mm from '@magenta/music';

// aplicação
import { COLDS, WARMS } from './data/note-color';

@Component({
    selector: 'app-visualizer',
    templateUrl: 'visualizer.component.html'
})
export class VisualizerComponent implements OnInit, OnChanges {

    /**
     * @description Elemento SVG do template ("caixa" do visualizador)
     */
    @ViewChild('visualizer', { static: true })
    private visualizerSvg!: ElementRef<SVGSVGElement>;

    /**
     * @description Vetor de notas no padrão NoteSequence
     */
    @Input() public noteSequence!: NoteSequence;

    /**
     * @description Visualizador "Piano Roll" do Magenta
     */
    private pianoRollVisualizer!: mm.PianoRollSVGVisualizer;

    constructor() { }

    ngOnInit(): void {
        this.drawVisualizer();

        if (this.noteSequence) {
            this.drawNotes(this.visualizerSvg.nativeElement);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.pianoRollVisualizer) {
            this.pianoRollVisualizer.redraw(this.noteSequence);
            this.drawNotes(this.visualizerSvg.nativeElement);
        }
    }

    private drawVisualizer() {
        this.pianoRollVisualizer = new mm.PianoRollSVGVisualizer(
            this.noteSequence,
            this.visualizerSvg.nativeElement,
            { noteHeight: 14, pixelsPerTimeStep: 40 }
        );
    }

    // #region Código adaptado do Magenta (js)

    private drawNotes(svg: SVGSVGElement) {
        const rects = svg.querySelectorAll('rect');
        let previousPitch = this.noteSequence.notes[0].pitch;

        this.noteSequence.notes.forEach((note: any, i: number) => {
            if (note.pitch > 37) {
                const text = this.pitchToNote(note.pitch);
                rects[i].style.fill = this.color(note.pitch - previousPitch);
                previousPitch = note.pitch;
    
                const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                textEl.setAttribute('x', (+(rects[i].getAttribute('x') || 0) + 6) + '');
                textEl.setAttribute('y', (+(rects[i].getAttribute('y') || 0) + 12) + '');
                textEl.setAttribute('fill', 'white');
                textEl.textContent = text;
                svg.appendChild(textEl);
            }
        });
    }

    private pitchToNote(p: number) {
        const n = mm.NoteSequence.KeySignature.Key[(p - 36) % 12];
        return n.replace('_SHARP', '#');
    }

    private color(d: any) {
        return (d < 0) ? COLDS[Math.abs(d) % 13] : WARMS[d % 13];
    }

    // #endregion 

}