import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slideshow-poster',
    templateUrl: './slideshow-poster.component.html',
    styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

    @Input() peliculas: Pelicula[] = [];

    @Input() slideOptions: any = {};

    @Output() loadMoreEvent = new EventEmitter();

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    async mostrarDetalle(id: string) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id // id: id
            }
        });

        modal.present();

    }

}
