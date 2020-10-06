import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, Genre } from '../interfaces/interfaces';
import { SlideshowBackdropComponent } from '../components/slideshow-backdrop/slideshow-backdrop.component';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SlideshowParesComponent } from '../components/slideshow-pares/slideshow-pares.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    peliculasRecientes: Pelicula[] = [];
    peliculasPopulares: Pelicula[] = [];

    slideOpts = {
        slidesPerView: 2.6,
        freeMode: true,
        freeModeMomentum: true,
        breakpoints: {
            // when window width is >= 767px
            767: {
                slidesPerView: 5.3,
                // spaceBetween: 30,
            }
        }
    };

    puntuacionMin = 0;

    puntuacionMax = 10;

    numeroVotos = 10;

    periodo = 'lastWeek';

    numeroPeliculasRecientes: number;

    numeroPeliculasPopulares: number;

    @ViewChild(SlideshowBackdropComponent, { static: true }) slideshowBackdropComponent: SlideshowBackdropComponent;

    @ViewChild(SlideshowParesComponent, { static: true }) slideshowParesComponent: SlideshowParesComponent;

    totalPagesRecientes = 0;

    totalPagesRecientesReached = false;

    totalPagesPopularesReached = false;

    currentYear = JSON.stringify(new Date().getFullYear());
    // currentYear = '2020';

    searchYear = this.currentYear;

    generos: Genre[] = [{ id: 0, name: 'Todos' }];

    genero = 0;

    puntuacionMinPopulares = 1500;

    constructor(private ms: MoviesService, private keyboard: Keyboard) { }

    ngOnInit() {

        /* this.ms.getEnCartelera().subscribe((resp) => {

            this.peliculasRecientes.push(...resp.results);

            // console.log(this.peliculasRecientes);
        }); */

        this.enCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo, true);

        this.populares(this.searchYear, true, 0);

        this.getGeneros();

    }

    // ========================================
    // Peliculas Nuevas
    // ========================================

    enCartelera(voteAverageLower: number, voteAverageUpper: number, voteCount: number, period: string, reset: boolean) {

        this.ms.getEnCartelera(voteAverageLower, voteAverageUpper, voteCount, period, false, reset).subscribe((resp) => {

            // console.log(resp);

            this.peliculasRecientes = resp.results;

            this.numeroPeliculasRecientes = resp.total_results;

            console.log('peliculasRecientes', resp);
            // console.log('peliculasPopulares', this.peliculasRecientes);

            this.checkTotalPagesRecientesReached(resp);

        });

    }

    loadMoreEnCartelera() {

        this.ms.getEnCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo, true, false).subscribe((resp) => {

            // this.peliculasPopulares.push(...resp); // No funciona bien con el pipe

            // Tenemos que pasar los datos a una variable temporal que concatena los arreglos

            const arregloTemporal = [...this.peliculasRecientes, ...resp.results];

            this.peliculasRecientes = arregloTemporal;

            console.log('peliculasRecientes', resp);
            // console.log('peliculasPopulares', this.peliculasRecientes);

            this.checkTotalPagesRecientesReached(resp);

        });
    }

    checkTotalPagesRecientesReached(resp: any) {

        if (resp.total_pages === resp.page) {

            this.totalPagesRecientesReached = true;

        } else {

            this.totalPagesRecientesReached = false;

        }

    }

    // ========================================
    // Películas Populares
    // ========================================

    populares(searchYear: string, reset: boolean, genero?: number) {

        this.ms.getPopulares(searchYear, false, this.puntuacionMinPopulares, reset, genero).subscribe((resp) => {

            // this.peliculasPopulares.push(...resp); // No funciona bien con el pipe

            // Tenemos que pasar los datos a una variable temporal que concatena los arreglos

            // const arregloTemporal = [...this.peliculasPopulares, ...resp.results];

            this.peliculasPopulares = resp.results;

            // console.log('peliculasPopulares', this.peliculasPopulares);

            console.log('peliculasPopulares', resp);

            this.numeroPeliculasPopulares = resp.total_results;

            this.checkTotalPagesPopularesReached(resp);

        });

    }

    loadMorePopulares() {

        this.ms.getPopulares(this.searchYear, true, this.puntuacionMinPopulares, false, this.genero).subscribe((resp) => {

            // this.peliculasPopulares.push(...resp); // No funciona bien con el pipe

            // Tenemos que pasar los datos a una variable temporal que concatena los arreglos

            const arregloTemporal = [...this.peliculasPopulares, ...resp.results];

            this.peliculasPopulares = arregloTemporal;

            // console.log('peliculasPopulares', this.peliculasPopulares);

            console.log('peliculasPopulares', resp);

            this.numeroPeliculasPopulares = resp.total_results;

            this.checkTotalPagesPopularesReached(resp);

        });
    }

    checkTotalPagesPopularesReached(resp: any) {

        if (resp.total_pages === resp.page) {

            this.totalPagesPopularesReached = true;

        } else {

            this.totalPagesPopularesReached = false;

        }

    }

    // ========================================
    // Parámetros
    // ========================================

    rangeChange(evento: any) {

        // console.log(evento);

        this.puntuacionMin = evento.detail.value.lower;

        this.puntuacionMax = evento.detail.value.upper;

        this.enCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo, true);

        this.slideshowBackdropComponent.gotoFirstSlide();
    }

    onClick(evento: any) {

        // console.log(evento);

        this.enCartelera(this.puntuacionMin, this.puntuacionMax, this.numeroVotos, this.periodo, true);

        this.slideshowBackdropComponent.gotoFirstSlide();

        this.keyboard.hide();

    }

    yearChange(evento: any) {

        console.log(evento.detail.value);

        this.searchYear = evento.detail.value.slice(0, 4);

        console.log(this.searchYear);

        this.peliculasPopulares = [];

        this.totalPagesPopularesReached = false;

        this.populares(this.searchYear, true, this.genero);

    }

    getGeneros() {

        this.ms.getGeneros().subscribe((resp) => {

            // console.log('generos', resp);

            this.generos.push(...resp.genres);

        });

    }

    generoChange(evento: any) {

        // console.log(evento.detail.value);

        this.genero = evento.detail.value;

        this.populares(this.searchYear, true, this.genero);

        this.slideshowParesComponent.gotoFirstSlide();

    }

    rangeNumeroVotosChange(evento: any) {

        // console.log(evento.detail.value);

        this.puntuacionMinPopulares = evento.detail.value;

        this.populares(this.searchYear, true, this.genero);

        this.slideshowParesComponent.gotoFirstSlide();

    }

}
