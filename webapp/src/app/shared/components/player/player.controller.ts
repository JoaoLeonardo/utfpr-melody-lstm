import { Injectable } from "@angular/core";
import { Player } from "@magenta/music";

// aplicação
import { Melody } from "./models/melody";

@Injectable()
export class PlayerController {

    /**
     * @description Melodia (MIDI) repassada ao player
     */
    private _melody?: Melody;
    
    /**
     * @description Sequência gerada pela I.A. (texto)
     */
    private _sequence?: string;
    
    /**
     * @description Gênero da melodia
     */
    private _genre?: number;
    
    /**
     * @description Flag de avaliação (avaliada true/não avaliada false)
     */
    private _rated = false;
    
    public get melody(): Melody | undefined { return this._melody; }
    public set melody(val: Melody | undefined) { 
        this._melody = val; 
        this.rated = false;
    }
    
    public get sequence(): string | undefined { return this._sequence; }
    public set sequence(val: string | undefined) { this._sequence = val; }

    public get genre(): number | undefined { return this._genre; }
    public set genre(val: number | undefined) { this._genre = val; }
    
    public get rated(): boolean { return this._rated; }
    public set rated(val: boolean) { this._rated = val; }

}