import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit, OnDestroy {
  @ViewChild('container') container!: ElementRef;

  currentStep: number;
  stepsNum: number;
  steps: number[];

  private stepSubscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {
    this.currentStep = this.dataService.getCurrentStep();
    this.stepsNum = this.dataService.getStepNum();
    this.steps = Array.from({length: this.dataService.getStepNum()}, (_, index) => index + 1);
  }

  ngOnInit() {
    this.stepSubscription.add(this.dataService.stepMessage.subscribe(step => {
      this.currentStep = step;
      this.scrollToElement(step - 1);
    }));
    this.stepSubscription.add(this.dataService.stepNumMessage.subscribe(num => {
      this.stepsNum = num;
    }));
  }

  ngOnDestroy() {
    if (this.stepSubscription) {
      this.stepSubscription.unsubscribe();
    }
  }

  scrollToElement(index: number) {
    if (this.container && this.container.nativeElement) {
      const element = this.container.nativeElement.querySelectorAll('.step-element')[index];
      element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
  }

  setStep(step: number) {
    this.dataService.changeStep(step);
  }

}
