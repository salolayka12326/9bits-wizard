import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private stepSource = new BehaviorSubject<number>(1);
  stepMessage = this.stepSource.asObservable();

  private stepNumSource = new BehaviorSubject<number>(15);
  stepNumMessage = this.stepNumSource.asObservable();

  constructor() {}

  getCurrentStep(): number {
    return this.stepSource.getValue();
  }

  getStepNum(): number {
    return this.stepNumSource.getValue();
  }

  changeStep(step: number) {
    if (step > 0 && step <= this.stepNumSource.getValue())
    {
      this.stepSource.next(step);
    }
  }
}
