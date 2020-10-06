import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-detalle-actor-foto',
    templateUrl: './detalle-actor-foto.component.html',
    styleUrls: ['./detalle-actor-foto.component.scss'],
})
export class DetalleActorFotoComponent implements OnInit {

    viewEntered = false;

    @Input() foto: string;

    constructor(private mc: ModalController) { }

    ngOnInit() { }

    ionViewDidEnter() {

        this.viewEntered = true;

    }

    closeModal() {

        this.mc.dismiss();

    }

}
