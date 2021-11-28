import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {By} from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      imports: [
        MatToolbarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect the footer structure', () => {
    const authorElement = fixture.debugElement.query(By.css('footer.footer mat-toolbar div span.author'));
    expect(authorElement).toBeTruthy();
    const copyrightElement = fixture.debugElement.query(By.css('footer.footer mat-toolbar div span.copyright'));
    expect(copyrightElement).toBeTruthy();
  });

  it('should get the right author', () => {
    const authorElement = fixture.debugElement.query(By.css('footer.footer mat-toolbar div span.author a')).nativeElement;
    expect(authorElement.textContent).toContain('jkonst');
  });

  it('should get the right year', () => {
    const copyrightElement = fixture.debugElement.query(By.css('footer.footer mat-toolbar div span.copyright')).nativeElement;
    const currentYear = new Date().getFullYear();
    expect(copyrightElement.textContent).toContain('© ' + currentYear);
  });

});
