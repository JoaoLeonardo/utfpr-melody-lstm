export interface MelodyNote {
    pitch: number;
    velocity: number;
    startTime: number;
    endTime: number;
    quantizedStartStep: number;
    quantizedEndStep: number;
}