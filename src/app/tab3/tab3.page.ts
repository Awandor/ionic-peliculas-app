import { Component, OnInit } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { LocalDataService } from '../services/local-data.service';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, ViewWillEnter {

    favoritos: PeliculaDetalle[] = [];

    slideOpts = {
        slidesPerView: 3.2,
        freeMode: true
    };

    constructor(public lds: LocalDataService, private modalCtrl: ModalController) { }

    /* async ngOnInit() {

        this.favoritos = await this.lds.cargarFavoritos();

        console.log('favoritos', this.favoritos);
    } */

    // Las dos formas funcionan para gestionar las promesas

    ngOnInit() {

        // Sólo se dispara la primera vez, necesitamos cargar los favoritos cada vez que entremos en la página con ionViewWillEnter

        /* this.lds.cargarFavoritos().then(resp => {

            this.favoritos = resp;

            console.log('favoritos', this.favoritos);

        }); */

    }

    ionViewWillEnter() {

        this.cargarFavoritos();

    }

    cargarFavoritos() {

        this.lds.cargarFavoritos().then(resp => {

            this.favoritos = resp;

            console.log('favoritos', this.favoritos);

        });

    }

    async mostrarDetalle(id: string) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id // id: id
            }
        });

        modal.onDidDismiss().then((resp) => {

            this.cargarFavoritos();

        });

        modal.present();

    }

}
