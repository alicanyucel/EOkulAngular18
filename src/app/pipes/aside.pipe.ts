import { Pipe, PipeTransform } from '@angular/core';
import { NavigationModel } from '../nav';

@Pipe({
  name: 'aside',
  standalone: true
})
export class AsidePipe implements PipeTransform {

  transform(value: NavigationModel[], search: string): NavigationModel[] {
    if(search === "") return value;

    return value.filter(p=> p.name.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr")));
  }
}
