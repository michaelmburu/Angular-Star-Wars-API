import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { CreateCharacterComponent } from './create-character.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CreateCharacterComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
        {path: '', component: CreateCharacterComponent}
    ])]
})
export class CreateCharacterModule{}