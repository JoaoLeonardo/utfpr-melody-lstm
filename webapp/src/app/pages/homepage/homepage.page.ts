import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { Melody } from 'src/app/shared/components/player/models/melody';
import { errorTransform } from 'src/app/shared/pipes/error-transform';
import { LabelValue } from 'src/app/shared/models/label-value';

// aplicação
import { getGeneroOptions } from './models/enums/genero';
import { HomepageService } from './homepage.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.page.html',
    styleUrls: ['./homepage.page.scss'],
    providers: [
        HomepageService,
    ]
})
export class HomepageComponent implements OnInit {

    /**
     * @description Melodia (MIDI) repassada ao player
     */
    public melodia?: Melody;

    /**
     * @description FormControl de gênero
     */
    public generoControl: FormControl;

    /**
     * @description Flag que controla o estado "melodia avaliada"
     */
    public isAvaliada?: boolean;

    // enum options
    public generoOptions: LabelValue[];
    public generoFilteredOptions?: Observable<LabelValue[]>;

    // variáveis do template
    public loading: boolean;
    public currentMelodyGenre?: number;
    
    // variáveis do ts
    private currentNoteSequence?: string;

    constructor(
        private snackBar: MatSnackBar,
        public service: HomepageService,
    ) {
        this.generoControl = new FormControl(null, { validators: Validators.required });
        this.generoOptions = getGeneroOptions();
        this.loading = false;
    }

    ngOnInit(): void {
        this.implementChanges();
    }

    private implementChanges() {
        this.generoFilteredOptions = this.generoControl.valueChanges.pipe(
            startWith(''), map(value => this.filterGenero(value)),
        );
    }

    /**
     * @description Busca um índice aleatório no JSON de dados
     */
    public generate() {
        this.generoControl.updateValueAndValidity();

        if (!this.generoControl.valid) { return; }
        if (this.melodia && !this.isAvaliada) {
            this.snackBar.open('Por favor, avalie a melodia antes de gerar uma nova.', 'Ok');
        }

        this.currentMelodyGenre = this.generoOptions.findIndex(item => 
            item.label === this.generoControl.value) + 1;
        
        this.loading = true;
        this.service.mock(this.currentMelodyGenre).subscribe(res => {
            this.loading = false;
            this.currentNoteSequence = res;
            this.melodia = {
                input_sequence: this.service.playerUtil.convertToInputSequence(res)
            }
            // TODO: conveter NoteSequence (textplain) para Melody
            // this.melodia = this.currentNoteSequence...  
        }, error => {
            this.loading = false;
            this.snackBar.open(errorTransform(error), 'Ok');
        });
    }

    /**
     * @description Executa no click do logo
     * * Leva o scroll até o footer
     */
    public onClickLogo() {
        const footer = document.getElementsByTagName('footer');
        footer[0].scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * @description Executa no evento de avaliação da melodia
     */
    public onMelodiaAvaliada() {
        this.isAvaliada = true;
    }

    /**
     * @description Filtra as opções de gênero
     */
    private filterGenero(value: string): LabelValue[] {
        const filterValue = value.toUpperCase();
        return this.generoOptions.filter(item => item.value.includes(filterValue));
    }

}