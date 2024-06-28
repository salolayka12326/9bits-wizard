import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrl: './bottom-bar.component.css'
})
export class BottomBarComponent implements OnInit, OnDestroy {

  currentStep: number;
  private stepSubscription!: Subscription;

  constructor(private dataService: DataService) {
    this.currentStep = this.dataService.getCurrentStep();
  }

  ngOnInit() {
    this.stepSubscription = this.dataService.stepMessage.subscribe(step => {
      this.currentStep = step;
    });
  }

  ngOnDestroy() {
    if (this.stepSubscription) {
      this.stepSubscription.unsubscribe();
    }
  }

  increment(): void {
    this.dataService.changeStep(this.currentStep + 1);
  }

  decrement(): void {
    this.dataService.changeStep(this.currentStep - 1);
  }
}
