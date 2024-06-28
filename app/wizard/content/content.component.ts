import {Component,  OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

export const MESSAGE_START = 'Step ';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  receivedMessage: string = 'Message';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.stepMessage.subscribe(step => {
      this.receivedMessage = MESSAGE_START + step;
    });
  }
}
