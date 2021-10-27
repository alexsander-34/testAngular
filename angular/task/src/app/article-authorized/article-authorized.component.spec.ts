import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAuthorizedComponent } from './article-authorized.component';

describe('ArticleAuthorizedComponent', () => {
  let component: ArticleAuthorizedComponent;
  let fixture: ComponentFixture<ArticleAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAuthorizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
