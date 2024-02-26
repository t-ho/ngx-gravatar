import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  email = '';

  badges = [
    {
      href: 'https://www.npmjs.com/package/ngx-gravatar',
      src: 'https://img.shields.io/npm/v/ngx-gravatar',
      alt: 'NPM Version',
    },
    {
      href: 'https://github.com/t-ho/ngx-gravatar/stargazers',
      src: 'https://img.shields.io/github/stars/t-ho/ngx-gravatar?color=00bcd4',
      alt: 'GitHub stars',
    },
    {
      href: 'https://github.com/t-ho/ngx-gravatar/actions/workflows/test.yml',
      src: 'https://github.com/t-ho/ngx-gravatar/workflows/CI%20Testing/badge.svg',
      alt: 'CI Testing',
    },
    {
      href: 'https://codecov.io/gh/t-ho/ngx-gravatar',
      src: 'https://codecov.io/gh/t-ho/ngx-gravatar/branch/master/graph/badge.svg',
      alt: 'Code Coverage',
    },
    {
      href: 'https://www.npmjs.com/package/ngx-gravatar',
      src: 'https://img.shields.io/npm/dw/ngx-gravatar.svg',
      alt: 'Downloads Per Week',
    },
    {
      href: 'https://bundlephobia.com/result?p=ngx-gravatar',
      src: 'https://img.shields.io/bundlephobia/minzip/ngx-gravatar',
      alt: 'NPM Bundle Size',
    },
    {
      href: 'https://github.com/t-ho/ngx-gravatar/blob/master/LICENSE',
      src: 'https://img.shields.io/npm/l/ngx-gravatar.svg',
      alt: 'MIT License',
    },
  ];

  fallbacks = [
    'blank',
    'identicon',
    'mp',
    'monsterid',
    'retro',
    'robohash',
    'wavatar',
  ];

  styleObject = {
    borderWidth: '2px',
    borderColor: 'green',
    borderStyle: 'dashed',
    width: '150px',
    borderRadius: '20%',
  };
}
