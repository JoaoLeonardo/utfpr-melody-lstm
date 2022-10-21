export interface MelodyNote {
    pitch: number;
    velocity: number;
    start_time: number;
    end_time: number;
    quantizedStartStep: number;
    quantizedEndStep: number;
}