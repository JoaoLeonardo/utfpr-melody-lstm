import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisualizerComponent } from './visualizer.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [VisualizerComponent],
    exports: [VisualizerComponent],
    providers: [],
})
export class VisualizerModule { }
