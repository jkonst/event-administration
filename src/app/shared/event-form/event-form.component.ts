import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import {SuccessDialogComponent} from './success-dialog/success-dialog.component';
import {EventFormService} from './services/event-form.service';
import {FormValidatorService} from './services/form-validator.service';
import {Event, EventCategory, UNKNOWN_TEMP, voidEvent} from '../../events/model/event';
import {Status} from '../../events/model/status';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input()
  category: EventCategory | undefined;

  @Input()
  event: Event | undefined;

  private readonly destroy$ = new Subject();
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private validatorService: FormValidatorService,
              private dialog: MatDialog,
              private service: EventFormService) {
    this.form = this.initForm(voidEvent);
  }

  ngOnInit(): void {
    if (this.event) {
      this.form = this.initForm(this.event);
    }
    this.service.submissionStatus$.pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        if (status === Status.SUCCESS || status === Status.ERROR) {
          this.form.reset();
          this.openSuccessDialog();
        }
      });
  }

  submit(): void {
    const title = this.form.value.title;
    const startDateTime = new Date(this.form.value.duration.startDateTime);
    const endDateTime = new Date(this.form.value.duration.endDateTime);
    const location = !!this.form.value.location ? this.form.value.location : undefined;
    const description = this.form.value.description;

    if (this.category && this.event) {
      this.service.updateEvent(this.event, this.toEvent(this.form.value), this.category);
    } else {
      this.service.createEvent({
        id: uuidv4(),
        title,
        startDateTime,
        endDateTime,
        temperature: UNKNOWN_TEMP,
        location,
        description
      });
    }
  }

  private toEvent(value: any): Partial<Event> {
    return Object.keys(value).reduce((acc, curr) => {
      if (curr === 'duration') {
        return {
          ...acc,
          startDateTime: value[curr]?.startDateTime,
          endDateTime: value[curr]?.endDateTime
        };
      }
      return {...acc, [curr]: value[curr]};
    }, {} as Partial<Event>);
  }

  private initForm(event: Event): FormGroup {
    return this.fb.group({
      title: [event.title, Validators.required],
      duration: this.fb.group({
        startDateTime: [event.startDateTime, Validators.required],
        endDateTime: [event.endDateTime, Validators.required],
      }, {
        validators: this.validatorService
          .checkEndDateIsAfterStartDateValidator('startDateTime',
            'endDateTime')
      }),
      description: [event.description],
      location: [event.location, this.validatorService.checkLocationValidity]
    });
  }

  private openSuccessDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = this.event ? 'Event was successfully updated'
      : 'Event was successfully created';
    this.dialog.open(SuccessDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
