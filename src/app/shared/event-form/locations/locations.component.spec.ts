import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {LocationsComponent} from './locations.component';
import {runOnPushChangeDetection} from '../../utils/helper';
import {dummyLocations} from '../../utils/test-event-data';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationsComponent],
      providers: [FormBuilder],
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should type Vi and return only 1 option from dummy locations', () => {
    component.locations = dummyLocations;
    component.parentForm = new FormBuilder().group({
      title: ['', Validators.required],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
      description: [''],
      location: [null]
    });
    component.label = 'Location';
    component.fieldName = 'location';
    component.ngOnInit();
    runOnPushChangeDetection(fixture).then(async () => {
      fixture.detectChanges();
      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement).toBeTruthy();
      inputElement.nativeElement.dispatchEvent(new Event('focusin'));
      inputElement.nativeElement.value = 'Vi';
      inputElement.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      const matOptions = document.querySelectorAll('mat-option');
      expect(matOptions.length).toBe(1);
    });
  });
});
