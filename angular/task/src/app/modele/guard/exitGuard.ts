import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable()
export class ExitAboutGuard implements CanDeactivate<ComponentCanDeactivate> {
  bool = false;
  foo() {
    this.bool = true;
  }

  canDeactivate(
    component: ComponentCanDeactivate
  ): Observable<boolean> | boolean {
    if (this.bool) {
      return confirm('Вы уверены, что хотите перейти и утерять данные ?');
    } else {
      return true;
    }
  }
}
