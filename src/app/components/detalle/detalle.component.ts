import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { LocalDataService } from '../../services/local-data.service';

@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit, AfterViewChecked {

    @Input() id: number;

    // pelicula: PeliculaDetalle; // Da error, debemos inicializar a objeto vacío y poner todas las propiedades del interface a opcionales

    pelicula: PeliculaDetalle = {};

    limiteLetras = 200;

    actores: Cast[] = [];

    slideOpts = {
        slidesPerView: 3.3,
        freeMode: false
    };

    corazon = 'heart-outline';

    constructor(private ms: MoviesService, private mc: ModalController, private lds: LocalDataService) { }

    ngOnInit() {

        // console.log('ID', this.id);

        // Vamos a trabajar existeFavorito como una promesa normal

        this.lds.existeFavorito(this.id).then(existe => {

            return this.corazon = (existe) ? 'heart' : 'heart-outline';

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

        // setTimeout(() => {  }, 2000);

    }

    ngAfterViewChecked() {

    }

    closeModal() {

        this.mc.dismiss();

    }

    addFavorite() {

        const existe = this.lds.guardarFavorito(this.pelicula);

        // console.log(existe);

        this.corazon = (existe) ? 'heart' : 'heart-outline';

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
