import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { PlayerController } from 'src/app/shared/components/player/player.controller';
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
        PlayerController,
    ]
})
export class HomepageComponent implements OnInit {

    /**
     * @description FormControl de gênero
     */
    public generoControl: FormControl;

    // enum options
    public generoOptions: LabelValue[];
    public generoFilteredOptions?: Observable<LabelValue[]>;

    // variáveis do template
    public loading: boolean;

    constructor(
        private snackBar: MatSnackBar,
        public playerController: PlayerController,
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
        if (this.playerController.melody && !this.playerController.rated) {
            this.snackBar.open('Por favor, avalie a melodia antes de gerar uma nova.', 'Ok');
            return;
        }

        this.playerController.genre = this.generoOptions.findIndex(item => 
            item.label === this.generoControl.value) + 1;
        
        this.loading = true;
        this.service.generate(this.playerController.genre).subscribe(res => {
            this.loading = false;
            this.playerController.sequence = res;
            this.playerController.melody = {
                input_sequence: this.service.playerUtil.convertToInputSequence(res)
            }
            this.onClickLogo();
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
     * @description Filtra as opções de gênero
     */
    private filterGenero(value: string): LabelValue[] {
        const filterValue = value.toUpperCase();
        return this.generoOptions.filter(item => item.value.includes(filterValue));
    }

}