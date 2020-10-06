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
        freeModeMomentum: true,
        breakpoints: {
            // when window width is >= 767px
            767: {
                slidesPerView: 2.3,
                // spaceBetween: 30,
            },
            1500: {
                slidesPerView: 4.3,
            }
        }
    };

    @Output() loadMoreEvent = new EventEmitter();

    @ViewChild('recientesRef', { static: true }) recientesSlides: IonSlides;

    @Input() totalPagesReached = false;

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
    }

    loadMoreRecientes() {

        this.loadMoreEvent.emit();

    }

    async mostrarDetalle(id: string) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id // id: id
            },
            id: 'modalPelicula'
        });

        modal.present();

    }

    public gotoFirstSlide() {

        // console.log('EUREKA');

        this.recientesSlides.slideTo(0);

    }

}
