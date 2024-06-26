import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendButtonComponent } from './send-button.component';

describe('SendButtonComponent', () => {
  let component: SendButtonComponent;
  let fixture: ComponentFixture<SendButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
