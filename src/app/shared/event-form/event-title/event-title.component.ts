import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-event-title',
  templateUrl: './event-title.component.html',
  styleUrls: ['./event-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventTitleComponent  {
  @Input()
  parentForm: FormGroup | undefined;
  @Input()
  label = '';
  @Input()
  fieldName = '';
}
