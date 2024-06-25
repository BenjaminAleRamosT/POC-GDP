import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selections = new BehaviorSubject<{ [key: string]: string }>({});
  selections$ = this.selections.asObservable();

  setSelection(key: string, value: string) {
    const currentSelections = this.selections.value;
    currentSelections[key] = value;
    this.selections.next(currentSelections);
  }

  getSelection(key: string) {
    return this.selections.value[key];
  }
}
