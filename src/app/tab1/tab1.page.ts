import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { SlideshowBackdropComponent } from '../components/slideshow-backdrop/slideshow-backdrop.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    peliculasRecientes: Pelicula[] = [];
    peliculasPopulares: Pelicula[] = [];

    slideOpts = {
        slidesPerView: 3.2,
        freeMode: true,
        freeModeMomentum: true
    };

    puntuacionMin = 0;

    puntuacionMax = 10;

    numeroVotos = 10;

    periodo = 'lastWeek';

    numeroPeliculasRecientes: number;

    @ViewChild(SlideshowBackdropComponent, { static: true }) slideshowBackdropComponent: SlideshowBackdropComponent;

    constructor(private ms: MoviesService) { }

    ngOnInit() {

        /* this.ms.getEnCartelera().subscribe((resp) => {

            this.peliculasRecientes.push(...resp.results);

            // console.log(this.peliculasRecientes);
        }); */

        this.enCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo);

        this.addToArray();

    }

    enCartelera(voteAverageLower: number, voteAverageUpper: number, voteCount: number, period: string) {

        this.ms.getEnCartelera(voteAverageLower, voteAverageUpper, voteCount, period).subscribe((resp) => {

            // console.log(resp);

            this.peliculasRecientes = resp.results;

            this.numeroPeliculasRecientes = resp.total_results;

            // console.log(this.peliculasRecientes);
        });

    }

    loadMore() {

        this.addToArray();

    }

    addToArray() {

        this.ms.getPopulares().subscribe((resp) => {

            // this.peliculasPopulares.push(...resp); // No funciona bien con el pipe

            // Tenemos que pasar los datos a una variable temporal que concatena los arreglos

            const arregloTemporal = [...this.peliculasPopulares, ...resp.results];

            this.peliculasPopulares = arregloTemporal;

            // console.log('peliculasPopulares', this.peliculasPopulares);

        });

    }

    rangeChange(evento: any) {

        // console.log(evento);

        this.puntuacionMin = evento.detail.value.lower;

        this.puntuacionMax = evento.detail.value.upper;

        this.enCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo);

        this.slideshowBackdropComponent.gotoFirstSlide();
    }

    onClick(evento: any) {

        // console.log(evento);

        this.enCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo);

        this.slideshowBackdropComponent.gotoFirstSlide();

    }

    loadMoreRecientes() {

        this.ms.getEnCarteleraSiguientePagina(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo).subscribe((resp) => {

            // this.peliculasPopulares.push(...resp); // No funciona bien con el pipe

            // Tenemos que pasar los datos a una variable temporal que concatena los arreglos

            const arregloTemporal = [...this.peliculasRecientes, ...resp.results];

            this.peliculasRecientes = arregloTemporal;

            // console.log('peliculasPopulares', this.peliculasPopulares);

        });
    }

}
