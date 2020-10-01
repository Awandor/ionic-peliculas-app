import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slideshow-backdrop',
    templateUrl: './slideshow-backdrop.component.html',
    styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

    @Input() peliculas: Pelicula[] = [];

    slideOpts = {
        slidesPerView: 1.1,
        freeMode: true,
        freeModeMomentum: true
    };

    @Output() loadMoreRecientesEvent = new EventEmitter();

    @ViewChild('recientesRef', { static: true }) recientesSlides: IonSlides;

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
    }

    loadMoreRecientes() {

        this.loadMoreRecientesEvent.emit();

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

    public gotoFirstSlide() {

        console.log('EUREKA');

        this.recientesSlides.slideTo(0);

    }

}
