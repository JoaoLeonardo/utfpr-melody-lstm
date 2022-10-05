import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// material
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// shared
import { PlayerModule } from 'src/app/shared/components/player/player.module';

// aplicação
import { HomepageComponent } from './homepage.page';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: HomepageComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),

        // material
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        
        // shared
        PlayerModule,
    ],
    declarations: [
        HomepageComponent,
    ],
})
export class HomepageModule { }
