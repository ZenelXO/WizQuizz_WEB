import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishQuizzComponent } from './finish-quizz.component';

describe('FinishQuizzComponent', () => {
  let component: FinishQuizzComponent;
  let fixture: ComponentFixture<FinishQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishQuizzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
