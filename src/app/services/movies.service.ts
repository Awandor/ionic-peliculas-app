import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { RespuestaMDB, PeliculaDetalle, PeliculaActores, SearchResult } from '../interfaces/interfaces';
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

    constructor(private http: HttpClient) { }

    private getQuery<T>(param: string) {

        const url = `${this.urlMoviedb}${param}&api_key=${this.apikey}&language=es&include_image_language=es`;

        // return this.http.get<T>(url).pipe(map((data: any) => data.results));
        return this.http.get<T>(url);

    }

    getEnCartelera(voteAverageLower: number, voteAverageUpper: number, voteCount: number, period: string) {

        const now = moment().format('YYYY-MM-DD');

        let momentEarlier: string;

        if (period === 'lastWeek') {

            momentEarlier = moment().subtract(7, 'days').format('YYYY-MM-DD');

        } else if (period === 'lastMonth') {

            momentEarlier = moment().subtract(1, 'month').format('YYYY-MM-DD');

        } else {

            momentEarlier = moment().subtract(1, 'year').format('YYYY-MM-DD');

        }

        return this.getQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${momentEarlier}&primary_release_date.lte=${now}&vote_average.gte=${voteAverageLower}&vote_average.lte=${voteAverageUpper}&vote_count.gte=${voteCount}&sort_by=vote_average.desc`);

    }

    getEnCarteleraSiguientePagina(voteAverageLower: number, voteAverageUpper: number, voteCount: number, period: string) {

        this.recientesPage++;

        const now = moment().format('YYYY-MM-DD');

        let momentEarlier: string;

        if (period === 'lastWeek') {

            momentEarlier = moment().subtract(7, 'days').format('YYYY-MM-DD');

        } else if (period === 'lastMonth') {

            momentEarlier = moment().subtract(1, 'month').format('YYYY-MM-DD');

        } else {

            momentEarlier = moment().subtract(1, 'year').format('YYYY-MM-DD');

        }

        return this.getQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${momentEarlier}&primary_release_date.lte=${now}&vote_average.gte=${voteAverageLower}&vote_average.lte=${voteAverageUpper}&vote_count.gte=${voteCount}&page=${this.recientesPage}&sort_by=vote_average.desc`);

    }

    getPopulares() {

        const now = moment().format('YYYY-MM-DD');

        const yearEarlier = moment().subtract(1, 'year').format('YYYY-MM-DD');

        this.popularesPage++;

        // tslint:disable-next-line: max-line-length
        return this.getQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${yearEarlier}&primary_release_date.lte=${now}&sort_by=vote_average.desc&vote_count.gte=1500&page=${this.popularesPage}`);

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
}
