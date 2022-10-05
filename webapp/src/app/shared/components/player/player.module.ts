import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// aplicação
import { ProgressBarDirective } from './directives/progress-bar.directive';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { PlayerBtnPipe } from './pipes/player-btn.pipe';
import { PlayerComponent } from './player.component';

@NgModule({
    declarations: [
        PlayerComponent,

        // pipes
        PlayerBtnPipe,

        // directives
        ProgressBarDirective,
    ],
    imports: [
        CommonModule,

        // material
        MatButtonModule,
        MatIconModule,

        // aplicação
        VisualizerModule,
    ],
    exports: [
        PlayerComponent,
    ],
    providers: [],
})
export class PlayerModule { }
