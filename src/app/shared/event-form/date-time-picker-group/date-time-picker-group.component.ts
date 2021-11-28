import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker-group.component.html',
  styleUrls: ['./date-time-picker-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerGroupComponent {
  @Input()
  parentForm: FormGroup | undefined;
  @Input()
  label1 = '';
  @Input()
  label2 = '';
  @Input()
  fieldName1 = '';
  @Input()
  fieldName2 = '';
  @Input()
  groupName = '';
}
