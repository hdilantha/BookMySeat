/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTurnComponent } from './add-turn.component';

describe('AddTurnComponent', () => {
  let component: AddTurnComponent;
  let fixture: ComponentFixture<AddTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
