import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DetalleActorComponent } from './detalle-actor/detalle-actor.component';
import { DetalleActorFotoComponent } from './detalle-actor-foto/detalle-actor-foto.component';

@NgModule({
    declarations: [
        SlideshowBackdropComponent,
        SlideshowPosterComponent,
        SlideshowParesComponent,
        DetalleComponent,
        DetalleActorComponent,
        DetalleActorFotoComponent
    ],
    exports: [
        SlideshowBackdropComponent,
        SlideshowPosterComponent,
        SlideshowParesComponent,
        DetalleComponent,
        DetalleActorComponent,
        DetalleActorFotoComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        PipesModule
    ]
})
export class ComponentsModule { }
