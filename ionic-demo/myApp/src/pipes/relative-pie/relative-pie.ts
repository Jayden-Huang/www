import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

/**
 * Generated class for the RelativePiePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'relativePie',
})
export class RelativePiePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return moment(value).toNow();
  }
}
