import { ElementRef, Renderer2, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxGravatarDirective } from './ngx-gravatar.directive';
import { NgxGravatarService } from './ngx-gravatar.service';
import { DEFAULT_CONFIG } from './ngx-gravatar.constants';
import { FALLBACK, RATING } from './ngx-gravatar.enums';

@Component({
  template: `
    <img
      ngxGravatar
      [email]="email"
      [md5Hash]="md5Hash"
      [src]="src"
      [preferGravatar]="preferGravatar"
      [size]="size"
      [ratio]="ratio"
      [round]="round"
      [cornerRadius]="cornerRadius"
      [borderColor]="borderColor"
      [borderWidth]="borderWidth"
      [style]="style"
      [backgroundColor]="backgroundColor"
      [rating]="rating"
      [fallback]="fallback"
    />
  `,
})
class TestNgxGravatarComponent {
  email: string;
  md5Hash: string;
  src: string;
  preferGravatar: boolean;
  size: number;
  ratio: number;
  round: boolean;
  cornerRadius: number;
  borderColor: string;
  borderWidth: number;
  style: any;
  backgroundColor: string;
  rating: string;
  fallback: string;
}

describe('NgxGravatarDirective', () => {
  let component: TestNgxGravatarComponent;
  let fixture: ComponentFixture<TestNgxGravatarComponent>;
  let imgDe: DebugElement;
  let imgEl: HTMLElement;

  beforeEach(() => {
    const elementRef: jasmine.SpyObj<any> = jasmine.createSpyObj('elementRef', [
      'nativeElement',
    ]);

    const renderer: jasmine.SpyObj<any> = jasmine.createSpyObj('renderer', [
      'setStyle',
      'setProperty',
      'listen',
    ]);

    TestBed.configureTestingModule({
      declarations: [TestNgxGravatarComponent, NgxGravatarDirective],
      providers: [
        NgxGravatarService,
        { provide: ElementRef, useValue: elementRef },
        { provide: Renderer2, useValue: renderer },
      ],
    });
    spyOn(console, 'error');
    fixture = TestBed.createComponent(TestNgxGravatarComponent);
    component = fixture.componentInstance;
    imgDe = fixture.debugElement.query(By.css('img'));
    imgEl = imgDe.nativeElement;
  });

  it('With no input, gravatar should be default', () => {
    fixture.detectChanges();
    expect(imgEl.style.width).toBe('40px');
    expect(imgEl.style.height).toBe('40px');
    expect(imgEl.style.borderRadius).toBe('50%');
    expect(imgEl.style.borderStyle).toBe('none');
    expect(
      imgEl.style.borderColor === '#000000' ||
        imgEl.style.borderColor === 'rgb(0, 0, 0)' ||
        imgEl.style.borderColor === '#000'
    ).toBeTruthy();
    expect(imgEl.style.borderWidth).toBe('1px');
    expect(imgEl.style.backgroundColor).toBe('transparent');
    expect(imgEl.getAttribute('src')).toBe(
      'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&r=g&d=retro'
    );
  });

  it('Setting email="t.ho@tdev.app", src should be gravatar url', () => {
    component.email = 't.ho@tdev.app';
    fixture.detectChanges();
    expect(imgEl.getAttribute('src')).toBe(
      'https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=80&r=g&d=retro'
    );
  });

  it('Setting md5Hash="4f291481ca95cb4e78248df3f522aed3", src should be gravatar url', () => {
    component.md5Hash = '4f291481ca95cb4e78248df3f522aed3';
    fixture.detectChanges();
    expect(imgEl.getAttribute('src')).toBe(
      'https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=80&r=g&d=retro'
    );
  });

  it(
    'Setting src="https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg", ' +
      'src should be "https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg"',
    () => {
      component.src =
        'https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg';
      fixture.detectChanges();
      expect(imgEl.getAttribute('src')).toBe(
        'https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg'
      );
    }
  );

  it('Setting email and src, the src should be the custom image', () => {
    component.email = 't.ho@tdev.app';
    component.src =
      'https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg';
    fixture.detectChanges();
    expect(imgEl.getAttribute('src')).toBe(
      'https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg'
    );
  });

  it('Setting email, src and preferGravatar to true, the src should be gravatar image', () => {
    component.email = 't.ho@tdev.app';
    component.src =
      'https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/avatar.jpg';
    component.preferGravatar = true;
    fixture.detectChanges();
    expect(imgEl.getAttribute('src')).toBe(
      'https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=80&r=g&d=retro'
    );
  });

  it('Setting size="50", gravatar width and height should be "50px"', () => {
    component.size = 50;
    fixture.detectChanges();
    expect(imgEl.style.width).toBe('50px');
    expect(imgEl.style.height).toBe('50px');
  });

  it(
    'Setting email="t.ho@tdev.app" and ratio="1.5", ' +
      'the src should be "https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=60&r=g&d=retro"',
    () => {
      component.email = 't.ho@tdev.app';
      component.ratio = 1.5;
      fixture.detectChanges();
      expect(imgEl.getAttribute('src')).toBe(
        'https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=60&r=g&d=retro'
      );
    }
  );

  it(
    'Setting email="t.ho@tdev.app", size="50" and ratio="3", ' +
      'the src should be "https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=150&r=g&d=retro"',
    () => {
      component.email = 't.ho@tdev.app';
      component.size = 50;
      component.ratio = 3;
      fixture.detectChanges();
      expect(imgEl.getAttribute('src')).toBe(
        'https://www.gravatar.com/avatar/4f291481ca95cb4e78248df3f522aed3?s=150&r=g&d=retro'
      );
    }
  );

  it('Setting [round]="false", gravatar borderRadius should be "0"', () => {
    component.round = false;
    fixture.detectChanges();
    expect(imgEl.style.borderRadius).toBe('0px');
  });

  it('Setting cornerRadius="20", gravatar borderRadius should be "0"', () => {
    component.cornerRadius = 20;
    fixture.detectChanges();
    expect(imgEl.style.borderRadius).toBe('50%');
  });

  it('Setting cornerRadius="20" and [round]="false", gravatar borderRadius should be "20px"', () => {
    component.cornerRadius = 20;
    component.round = false;
    fixture.detectChanges();
    expect(imgEl.style.borderRadius).toBe('20px');
  });

  it('Setting borderColor="red", gravatar should have red border', () => {
    component.borderColor = 'red';
    fixture.detectChanges();
    expect(imgEl.style.borderStyle).toBe('solid');
    expect(imgEl.style.borderColor).toBe('red');
    expect(imgEl.style.borderWidth).toBe('1px');
  });

  it('Setting borderWidth="2", gravatar should have 2px black border', () => {
    component.borderWidth = 2;
    fixture.detectChanges();
    expect(imgEl.style.borderStyle).toBe('solid');
    expect(
      imgEl.style.borderColor === '#000000' ||
        imgEl.style.borderColor === 'rgb(0, 0, 0)' ||
        imgEl.style.borderColor === '#000'
    ).toBeTruthy();
    expect(imgEl.style.borderWidth).toBe('2px');
  });

  it('Setting borderWidth="2", gravatar should have 2px black border', () => {
    component.borderWidth = 2;
    fixture.detectChanges();
    expect(imgEl.style.borderStyle).toBe('solid');
    expect(
      imgEl.style.borderColor === '#000000' ||
        imgEl.style.borderColor === 'rgb(0, 0, 0)' ||
        imgEl.style.borderColor === '#000'
    ).toBeTruthy();
    expect(imgEl.style.borderWidth).toBe('2px');
  });

  it('Setting backgroundColor="brown", gravatar should have brown background', () => {
    component.backgroundColor = 'brown';
    fixture.detectChanges();
    expect(imgEl.style.backgroundColor).toBe('brown');
  });

  it('Setting style, gravatar should have the specified styles', () => {
    component.style = {
      backgroundColor: 'brown',
      borderColor: 'red',
    };
    fixture.detectChanges();
    expect(imgEl.style.backgroundColor).toBe('brown');
    expect(imgEl.style.borderColor).toBe('red');
  });

  it('style property should override other properties if provided', () => {
    component.style = {
      backgroundColor: 'brown',
      borderColor: 'red',
      width: '50px',
      height: '50px',
    };
    component.backgroundColor = 'white';
    component.borderColor = 'teal';
    component.size = 190;
    fixture.detectChanges();
    expect(imgEl.style.backgroundColor).toBe('brown');
    expect(imgEl.style.borderColor).toBe('red');
    expect(imgEl.style.width).toBe('50px');
    expect(imgEl.style.height).toBe('50px');
  });

  it('style property should override other properties if provided - 2', () => {
    component.style = {
      backgroundColor: 'brown',
      borderColor: 'red',
      width: 50,
      height: '50px',
    };
    component.backgroundColor = 'white';
    fixture.detectChanges();
    component.borderColor = 'teal';
    component.size = 190;
    component.src = 'not-existed.jpg';
    fixture.detectChanges();
    expect(imgEl.style.backgroundColor).toBe('brown');
    expect(imgEl.style.borderColor).toBe('red');
    expect(imgEl.style.width).toBe('');
    expect(imgEl.style.height).toBe('50px');
  });
});
