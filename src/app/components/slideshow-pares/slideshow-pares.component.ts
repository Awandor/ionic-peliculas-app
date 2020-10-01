import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slideshow-pares',
    templateUrl: './slideshow-pares.component.html',
    styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

    @Input() peliculas: Pelicula[] = [];

    @Input() slideOptions: any = {};

    @Output() loadMoreEvent = new EventEmitter();

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { }

    loadMore() {

        this.loadMoreEvent.emit();

    }

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
