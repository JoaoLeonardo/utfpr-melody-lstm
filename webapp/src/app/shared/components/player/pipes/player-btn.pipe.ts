import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'playerBtn'
})

export class PlayerBtnPipe implements PipeTransform {

    transform(isPlaying: boolean): any {
        return isPlaying ? 'stop_circle' : 'play_arrow';
    }

}