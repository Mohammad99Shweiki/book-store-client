import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  isSidebarOpenedSource: Subject<boolean> = new Subject<boolean>();
  isSidebarOpened$: Observable<boolean> = this.isSidebarOpenedSource.asObservable();

  constructor() { }

  changeSidebarStatus(opened: boolean): void {
    this.isSidebarOpenedSource.next(opened);
  }

}
