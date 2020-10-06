import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'saltosLinea'
})
export class SaltosLineaPipe implements PipeTransform {

    transform(value: string): string {

        let textoFinal = '<p>';

        // console.log(value.replace('.', '.</p><p>'));

        textoFinal += value.replace('.', '.</p><p>') + '</p>';

        return textoFinal;
    }

}
