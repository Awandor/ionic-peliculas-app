import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MoviesService } from '../../services/movies.service';
import { ActorDetalle, ActorCast } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { DetalleActorFotoComponent } from '../detalle-actor-foto/detalle-actor-foto.component';

@Component({
    selector: 'app-detalle-actor',
    templateUrl: './detalle-actor.component.html',
    styleUrls: ['./detalle-actor.component.scss'],
})
export class DetalleActorComponent implements OnInit {

    @Input() id: number;

    @Input() tipo: string;

    actor: ActorDetalle;

    viewEntered = false;

    limiteLetras = 200;

    peliculas: ActorCast[] = [];

    constructor(private mc: ModalController, private ms: MoviesService) { }

    ngOnInit() {

        this.ms.getDetalleActor(this.id).subscribe(resp => {

            console.log('detalle', resp);

            this.actor = resp;

        });

        if (this.tipo === 'actor') {

            this.ms.getPeliculasActor(this.id).subscribe(resp => {

                console.log('peliculas del actor', resp);

                this.peliculas = resp.cast;

                this.peliculas.sort(this.compare);

            });

        } else {

            this.ms.getPeliculasActor(this.id).subscribe(resp => {

                console.log('peliculas del director', resp);

                this.peliculas = resp.crew.filter(valor => {

                    return valor.department === 'Directing' && valor.job === 'Director';

                });

                this.peliculas.sort(this.compare);

            });

        }

    }

    ionViewDidEnter() {

        this.viewEntered = true;

    }

    closeModal() {

        this.mc.dismiss();

    }

    compare(a: ActorCast, b: ActorCast) {

        if (a.vote_average > b.vote_average) {

            return -1;

        }
        if (a.vote_average < b.vote_average) {

            return 1;

        }

        return 0;
    }

    async mostrarDetalle(id: number) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.mc.create({
            component: DetalleComponent,
            componentProps: {
                id // id: id
            }
        });

        modal.present();

        console.log(id);

        // Borramos las modales anteriores

        this.mc.dismiss(null, null, 'modalPelicula');

        this.mc.dismiss(null, null, 'modalActor');

    }

    async mostrarFoto(foto: string) {

        // create retorna una promesa así que usamos await y la función debe de ser async

        const modal = await this.mc.create({
            component: DetalleActorFotoComponent,
            componentProps: {
                foto // foto: foto
            }
        });

        modal.present();

    }

}
