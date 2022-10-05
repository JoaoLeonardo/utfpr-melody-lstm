import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// aplicação
import {
    ToolbarButtonActionType,
    getToolbarButtonActionAnonOptions
} from './models/enums/toolbar-button-action';
import { LabelValue } from '../../models/label-value';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    /**
     * @description Flag que identifica usuário logado
     */
    public isAuthenticated: boolean;

    // enum options
    public buttonOptions: LabelValue[];
    public logoutOpt: ToolbarButtonActionType;

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription: Subscription;

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog,
    ) {
        // inicializa os enums
        this.buttonOptions = getToolbarButtonActionAnonOptions();
        this.logoutOpt = 'LOGOUT';
        // inicializa as variáves do template
        this.isAuthenticated = false;
        // inicializa o subscription
        this.subscription = new Subscription();
    }

    ngOnInit() { }


    /**
     * @description Chamado pelos botões da toolbar
     * @param action Ação do botão
     */
    public executeAction(action: ToolbarButtonActionType) {
        switch (action) {
            case 'LOGIN':
                //this.dialog.open(UsuarioDialogComponent);
                break;
            case 'LOGOUT':
                // this.loginService.logout();
                break;
            case 'ARTIGO':
                this.router.navigateByUrl('artigo');
                break;
            case 'CATEGORIA':
                this.router.navigateByUrl('categoria');
                break;
            case 'INFO':
                window.open('https://github.com/JoaoLeonardo/pw26s-websystem');
                break;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}