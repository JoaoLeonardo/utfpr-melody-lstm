import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({ selector: '[appProgressBar]' })
export class ProgressBarDirective implements OnInit, OnChanges {

    @Input() public isPlaying?: boolean;

    @Input() public maxTime!: number;

    private interval?: any;

    private progress?: number;

    constructor(private el: ElementRef<HTMLElement>) { }

    ngOnInit(): void {
        this.clearProgress();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isPlaying']) {
            this.clearProgress();

            if (this.isPlaying) {
                this.increaseProgress(1);
                this.startProgress();
            }
        }
    }

    private startProgress() {
        const percentile = this.maxTime * 10;
        this.interval = setInterval(() => {
            this.increaseProgress(1);
        }, percentile);
    }

    private increaseProgress(percentile: number) {
        this.progress! += percentile;
        this.el.nativeElement.style.width = this.progress! + '%';

        if (this.progress! >= 100) {
            clearInterval(this.interval);
        }
    }

    private clearProgress() {
        this.progress = 0;
        this.el.nativeElement.style.width = 0 + '%';

        if (this.interval) {
            clearInterval(this.interval);
        }
    }

}