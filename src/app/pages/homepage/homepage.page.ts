import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// shared
import { Melody } from 'src/app/shared/components/player/models/melody';
import { LabelValue } from 'src/app/shared/models/label-value';

// mock data
import * as dataSet from '../../data/dataset.json';

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

    // enum options
    public generoOptions: LabelValue[];
    public generoFilteredOptions?: Observable<LabelValue[]>;

    constructor(public service: HomepageService) {
        this.generoControl = new FormControl(null, { validators: Validators.required });
        this.generoOptions = getGeneroOptions();
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

        const randomIndex = Math.floor(Math.random() * 0);
        const dto: Melody = dataSet[randomIndex];
        this.melodia = dto;
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