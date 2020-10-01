import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
    name: 'poster'
})
export class PosterPipe implements PipeTransform {

    transform(img: string, size: string = 'w500'): string {

        if (!img) {

            return './assets/img/no-image-poster.jpg';

        }

        const imgUrl = `${URL}/${size}${img}`;

        return imgUrl;
    }

}
