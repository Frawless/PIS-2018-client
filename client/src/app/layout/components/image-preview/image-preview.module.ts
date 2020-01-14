import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MtImagePreviewComponent} from './image-preview';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        MtImagePreviewComponent
    ],
    declarations: [
        MtImagePreviewComponent
    ]
})
export class MtImagePreviewComponentModule { }

