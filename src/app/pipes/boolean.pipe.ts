import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'boolean',
    standalone: true,
})
export class BooleanPipe implements PipeTransform {

    transform(value: any): any {
        if (value === null || value === undefined) {
            return '-';
        } else {
            if (value && value != 0) {
                return 'Sim';
            } else {
                return 'Não';
            }
        }
    }
}
