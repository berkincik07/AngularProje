/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { KayitlarComponent } from './kayitlar.component';

describe('KayitlarComponent', () => {
  let component: KayitlarComponent;
  let fixture: ComponentFixture<KayitlarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KayitlarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KayitlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
