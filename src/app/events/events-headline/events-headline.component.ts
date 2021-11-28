import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnDestroy, SimpleChanges, ViewChild
} from '@angular/core';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Event, EventCategory} from '../model/event';
import {EventsStore} from '../services/events.store';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-events-headline',
  templateUrl: './events-headline.component.html',
  styleUrls: ['./events-headline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsHeadlineComponent implements OnChanges, OnDestroy {
  @Input()
  events: Event[] | undefined;
  @Input()
  category: EventCategory | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Event> | undefined;
  events$: Observable<Event[]> | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private eventsStore: EventsStore,
              private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {events} = changes;
    if (events?.currentValue !== events?.previousValue) {
      if (this.dataSource) {
        this.dataSource.disconnect();
      }
      this.initDataSource(events.currentValue);
    }
  }

  delete(id: string): void {
    this.eventsStore.delete(id, this.category);
  }

  edit(event: Event): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {event, category: this.category};
    this.dialog.open(EditDialogComponent, dialogConfig);
  }

  private initDataSource(events: Event[]): void {
    this.dataSource = new MatTableDataSource<Event>(events);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.events$ = this.dataSource.connect();
  }

  private disconnectDataSource(): void {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  ngOnDestroy(): void {
    this.disconnectDataSource();
  }

}
