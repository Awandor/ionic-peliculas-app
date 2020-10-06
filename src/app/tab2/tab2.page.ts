import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    textoBuscar = '';

    resultadoBusqueda = [];

    buscando = false;

    numeroPeliculasEncontradas: number;

    constructor(private ms: MoviesService, private modalCtrl: ModalController, private keyboard: Keyboard) { }

    onSearchChange(event: any) {

        // console.log('event', event);

        this.textoBuscar = event.detail.value;

        if (this.textoBuscar !== '') {

            this.buscando = true;

            this.ms.getBusquedaPelicula(this.textoBuscar).subscribe(resp => {

                // console.log(resp);

                this.resultadoBusqueda = resp.results;

                this.numeroPeliculasEncontradas = resp.total_results;

                this.buscando = false;

                this.keyboard.hide();

            });

        }

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

    cargarSiguientePagina(evento: any) {

        // console.log('cargarSiguientePagina evento', evento);

        // console.log('textoBuscar', this.textoBuscar);

        this.ms.getBusquedaPeliculaSiguientePagina(this.textoBuscar).subscribe(resp => {

            // console.log(resp);

            // this.resultadoBusqueda = resp.results;

            if (resp.results.length === 0) {

                // Desactivar infinite scroll

                evento.target.disabled = true;
                evento.target.complete();
                return;

            }

            this.resultadoBusqueda.push(...resp.results);

            this.buscando = false;

            if (evento) {
                evento.target.complete();
            }

        });

    }

}
