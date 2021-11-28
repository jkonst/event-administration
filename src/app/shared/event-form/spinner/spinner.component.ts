import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {SpinnerService} from './services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  value = 50;
  isLoading: Subject<boolean>;

  constructor(private service: SpinnerService) {
    this.isLoading = this.service.isLoading;
  }

}
