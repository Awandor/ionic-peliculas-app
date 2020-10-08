import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
    selector: 'app-slideshow-pares',
    templateUrl: './slideshow-pares.component.html',
    styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit, AfterViewChecked {

    @Input() peliculas: Pelicula[] = [];

    @Input() slideOptions: any = {};

    @Output() loadMoreEvent = new EventEmitter();

    @Input() totalPagesReached = false;

    viewEntered = false;

    @ViewChild('popularesRef', { static: true }) popularesSlides: IonSlides;

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
        // console.log('he entrado', this.viewEntered);
    }

    ngAfterViewChecked() {

        this.viewEntered = true;

        // console.log('he entrado', this.viewEntered);

    }

    loadMore() {

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

        this.popularesSlides.slideTo(0);

    }

}
