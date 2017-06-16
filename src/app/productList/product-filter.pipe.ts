import {PipeTransform, Pipe} from '@angular/core';
import {IModule} from '../models/pikaModule';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(value: IModule[], filterBy: string, fields: string[]): IModule[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter(
            (module: IModule) => 
                module.Sn.toLocaleLowerCase().indexOf(filterBy) !== -1 || 
                module.ItemNo.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.MacImei0.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.MacImei1.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.MacImei2.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.MacImei3.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.MacImei4.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.License.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
                module.Uuid0.toLocaleLowerCase().indexOf(filterBy) !== -1
            ): value;
    }

}