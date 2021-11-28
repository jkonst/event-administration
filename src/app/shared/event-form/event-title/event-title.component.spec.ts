import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTitleComponent } from './event-title.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChangeDetectorRef} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EventTitleComponent', () => {
  let component: EventTitleComponent;
  let fixture: ComponentFixture<EventTitleComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTitleComponent ],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      providers: [{provide: FormBuilder, useValue: formBuilder}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTitleComponent);
    component = fixture.componentInstance;
    component.parentForm = formBuilder.group({
      title: ['', Validators.required],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
      description: [''],
    });
    component.fieldName = 'title';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
