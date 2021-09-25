import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModerationComponent } from './image-moderation.component';

describe('ImageModerationComponent', () => {
  let component: ImageModerationComponent;
  let fixture: ComponentFixture<ImageModerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageModerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
