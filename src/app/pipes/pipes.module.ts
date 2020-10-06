import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { TruncatetextPipe } from './truncatetext.pipe';
import { PosterPipe } from './poster.pipe';
import { SaltosLineaPipe } from './saltos-linea.pipe';

@NgModule({
    declarations: [
        ImagenPipe,
        ParesPipe,
        TruncatetextPipe,
        PosterPipe,
        SaltosLineaPipe
    ],
    exports: [
        ImagenPipe,
        ParesPipe,
        TruncatetextPipe,
        PosterPipe,
        SaltosLineaPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }
