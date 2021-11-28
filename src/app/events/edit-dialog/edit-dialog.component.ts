import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Event, EventCategory} from '../model/event';
import {Status} from '../model/status';
import {EventFormService} from '../../shared/event-form/services/event-form.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit, OnDestroy {
  event: Event;
  category: EventCategory;
  private readonly destroy$ = new Subject();

  constructor(
    private service: EventFormService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { event: Event, category: EventCategory }) {
    this.event = data.event;
    this.category = data.category;
  }

  ngOnInit(): void {
    this.service.submissionStatus$.pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        if (status === Status.SUCCESS || status === Status.ERROR) {
          this.close();
        }
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
