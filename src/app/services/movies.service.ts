import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { RespuestaMDB, PeliculaDetalle, PeliculaActores, SearchResult, ActorDetalle, ActorPeliculas, Generos } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    private apikey = environment.apiKey;

    private urlMoviedb = environment.url;

    private popularesPage = 0;

    private busquedaPage = 1;

    private recientesPage = 1;

    public totalPagesReached = false;

    constructor(private http: HttpClient) { }

    private getQuery<T>(param: string) {

        const url = `${this.urlMoviedb}${param}&api_key=${this.apikey}&language=es&include_image_language=es`;

        // return this.http.get<T>(url).pipe(map((data: any) => data.results));
        return this.http.get<T>(url);

    }

    getMomentEarlier(period: string) {

        if (period === 'lastWeek') {

            return moment().subtract(7, 'days').format('YYYY-MM-DD');

        } else if (period === 'lastMonth') {

            return moment().subtract(1, 'month').format('YYYY-MM-DD');

        } else {

            return moment().subtract(1, 'year').format('YYYY-MM-DD');

        }

    }

    getEnCartelera(voteAverageLower: number, voteAverageUpper: number, voteCount: number, period: string, next: boolean, reset: boolean) {

        const now = moment().format('YYYY-MM-DD');

        const momentEarlier = this.getMomentEarlier(period);

        if (next) {

            this.recientesPage++;

        }

        if (reset) {

            this.recientesPage = 1;

        }

        return this.getQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${momentEarlier}&primary_release_date.lte=${now}&vote_average.gte=${voteAverageLower}&vote_average.lte=${voteAverageUpper}&vote_count.gte=${voteCount}&page=${this.recientesPage}&sort_by=vote_average.desc`);

    }

    getPopulares(year: string, next: boolean, votos: number, reset: boolean, genero?: number) {

        // const now = moment().format('YYYY-MM-DD');

        // const yearEarlier = moment().subtract(1, 'year').format('YYYY-MM-DD');

        const now = `${year}-12-31`;

        const yearEarlier = `${year}-01-01`;

        if (next) {

            this.popularesPage++;

        }

        if (reset) {

            this.popularesPage = 1;

        }

        let generoId = '';

        if (genero !== 0) {

            generoId = `&with_genres=${genero}`;
        }

        return this.getQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${yearEarlier}&primary_release_date.lte=${now}&vote_count.gte=${votos}&page=${this.popularesPage}${generoId}&sort_by=vote_average.desc`);

    }

    getDetallePelicula(id: number) {

        // Añadimos ?a=1 para que no falle &api_key

        return this.getQuery<PeliculaDetalle>(`/movie/${id}?a=1`);

    }

    getActoresPelicula(id: number) {

        // Añadimos ?a=1 para que no falle &api_key

        return this.getQuery<PeliculaActores>(`/movie/${id}/credits?a=1`);

    }

    getBusquedaPelicula(query: string) {

        // console.log('getBusquedaPelicula');

        return this.getQuery<SearchResult>(`/search/movie?query=${query}&page=1`);

    }

    getBusquedaPeliculaSiguientePagina(query: string) {

        // console.log('getBusquedaPeliculaSiguientePagina');

        this.busquedaPage++;

        return this.getQuery<SearchResult>(`/search/movie?query=${query}&page=${this.busquedaPage}`);

    }

    getDetalleActor(id: number) {

        // Añadimos ?a=1 para que no falle &api_key

        return this.getQuery<ActorDetalle>(`/person/${id}?a=1`);

    }

    getPeliculasActor(id: number) {

        // Añadimos ?a=1 para que no falle &api_key

        return this.getQuery<ActorPeliculas>(`/person/${id}/movie_credits?a=1`);

    }

    getGeneros() {

        // Añadimos ?a=1 para que no falle &api_key

        return this.getQuery<Generos>(`/genre/movie/list?a=1`);

    }

}
