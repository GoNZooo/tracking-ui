import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "access",
})
export class ObjectAccessPipe implements PipeTransform {
  transform(value: object, accessParameter): any {
    return value[accessParameter];
  }
}
