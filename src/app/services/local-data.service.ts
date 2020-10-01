import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {

    // Vamos a guardar los favoritos en un arreglo

    favoritos: PeliculaDetalle[] = [];

    constructor(private storage: Storage, public toastController: ToastController) {

        this.cargarFavoritos();

    }

    async cargarFavoritos() {

        const favoritosLocales = await this.storage.get('favoritos');

        // console.log('async await', favoritosLocales);

        if (favoritosLocales) {

            this.favoritos = favoritosLocales;

        }

        // Si no hay favoritosLocales, this.favoritos es un arreglo vacío tal y como se inicializa

        console.log('favoritos', this.favoritos);

        return this.favoritos;

    }

    async presentToast(mensaje: string) {

        const toast = await this.toastController.create({
            message: mensaje,
            duration: 2000
        });

        toast.present();

    }

    async existeFavorito(id: number) {

        await this.cargarFavoritos();

        const existe = this.favoritos.find(fav => fav.id === id); // retorna el objeto entero

        return (existe) ? true : false;
    }

    guardarFavorito(pelicula: PeliculaDetalle) {

        // Vamos a impedir que una misma pelicula se guarde como favorito

        const favoritoExiste = this.favoritos.find(fav => fav.id === pelicula.id);

        // Si existe, find retorna la pelicula de lo contrario retorna undefined

        if (!favoritoExiste) {

            this.favoritos.unshift(pelicula); // Añade al comienzo del arreglo

            this.storage.set('favoritos', this.favoritos); // no hace falta pasarla por nada, a pelo, como arreglo de objetos

            this.presentToast('Película añadida a Favoritos');

        } else {

            this.favoritos = this.favoritos.filter(fav => fav.id !== pelicula.id);

            this.storage.set('favoritos', this.favoritos); // no hace falta pasarla por nada, a pelo, como arreglo de objetos

            this.presentToast('Película borrada de Favoritos');

        }

        // this.cargarFavoritos();
        console.log('favoritos después de añadir/borrar', this.favoritos);

        return (!favoritoExiste) ? true : false;

    }

    /* borrarFavorito(pelicula: PeliculaDetalle) {

        const favoritoExiste = this.favoritos.find(fav => fav.id === pelicula.id);

        // Si existe, find retorna la pelicula de lo contrario retorna undefined

        if (favoritoExiste) {

            console.log('borro favorito');

            // Retorna un arreglo sin la pelicula que queremos borrar

            this.favoritos = this.favoritos.filter(fav => fav.id !== pelicula.id);

            this.storage.set('favoritos', this.favoritos); // no hace falta pasarla por nada, a pelo, como arreglo de objetos

            this.presentToast('Película borrada de Favoritos');

        }

    } */
}
