import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast, Crew } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';
import { DetalleActorComponent } from '../detalle-actor/detalle-actor.component';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

    @Input() id: number;

    // pelicula: PeliculaDetalle; // Da error, debemos inicializar a objeto vacío y poner todas las propiedades del interface a opcionales

    pelicula: PeliculaDetalle = {};

    limiteLetras = 200;

    actores: Cast[] = [];

    directores: Crew[] = [];

    favoritos: PeliculaDetalle[] = [];

    slideOpts = {
        slidesPerView: 3.3,
        freeMode: true,
        breakpoints: {
            // when window width is >= 767px
            767: {
                slidesPerView: 5.3,
                // spaceBetween: 30,
            }
        }
    };

    slideGenerosOpts = {
        slidesPerView: 3.5,
        freeMode: true,
        breakpoints: {
            // when window width is >= 767px
            767: {
                slidesPerView: 5.3,
                // spaceBetween: 30,
            }
        }
    };

    // PROBLEMA: slideOpts es ignorado la primera vez que se abre la modal,
    // la solución es mostrar el slider cuando se ha renderizado la modal > ionViewDidEnter
    viewEntered = false;

    corazon = 'heart-outline';

    constructor(private ms: MoviesService, private mc: ModalController, private lds: LocalDataService) { }

    ngOnInit() {

        // console.log('ID', this.id);

        // Vamos a trabajar existeFavorito como una promesa normal

        this.lds.existeFavorito(this.id).then(existe => {

            this.corazon = (existe) ? 'heart' : 'heart-outline';

        });

        this.ms.getDetallePelicula(this.id).subscribe(resp => {

            console.log('detalle', resp);

            this.pelicula = resp;

            // console.log(this.pelicula.imdb_id);

            // this.getImdb(document, 'script', 'imdb-rating-api');

        });

        this.ms.getActoresPelicula(this.id).subscribe(resp => {

            // console.log('actores', resp);

            this.actores = resp.cast;

            // console.log('actores', this.actores);

        });

        this.ms.getActoresPelicula(this.id).subscribe(resp => {

            this.directores = resp.crew.filter(valor => {

                return valor.department === 'Directing' && valor.job === 'Director';

            });

            console.log('director', this.directores);

        });

    }

    ionViewDidEnter() {

        this.viewEntered = true;

    }

    closeModal() {

        this.mc.dismiss();

    }

    addFavorite() {

        const existe = this.lds.guardarFavorito(this.pelicula);

        // console.log(existe);

        this.corazon = (existe) ? 'heart' : 'heart-outline';

    }

    async onDirectorClick(id: string) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.mc.create({
            component: DetalleActorComponent,
            componentProps: {
                id, // id: id
                tipo: 'director'
            },
            id: 'modalActor'
        });

        modal.present();

    }

    async onActorClick(id: string) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.mc.create({
            component: DetalleActorComponent,
            componentProps: {
                id, // id: id
                tipo: 'actor'
            },
            id: 'modalActor'
        });

        modal.present();

    }

    /* getImdb(d: any, s: any, id: any) {

        let js;
        const stags = d.getElementsByTagName(s)[0];

        console.log('stags', stags);

        if (d.getElementById(id)) {

            return;

        }

        js = d.createElement(s);
        js.id = id;
        js.src = 'https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js';
        stags.parentNode.insertBefore(js, stags);
    } */

}
