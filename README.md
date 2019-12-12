[![npm version](https://img.shields.io/npm/v/ngx-gravatar)](https://www.npmjs.com/package/ngx-gravatar)
[![Build Status](https://travis-ci.org/t-ho/ngx-gravatar.svg?branch=master)](https://travis-ci.org/t-ho/ngx-gravatar)
[![codecov](https://codecov.io/gh/t-ho/ngx-gravatar/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-gravatar)
[![npm](https://img.shields.io/npm/dt/ngx-gravatar.svg)](https://www.npmjs.com/package/ngx-gravatar)
[![npm](https://img.shields.io/badge/dynamic/json.svg?label=downloads&url=https%3A%2F%2Fapi.npmjs.org%2Fdownloads%2Fpoint%2Flast-week%2Fngx-gravatar&query=%24.downloads&colorB=bightgreen&suffix=%2Fweek)](https://www.npmjs.com/package/ngx-gravatar)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-gravatar/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-gravatar)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-gravatar.svg)](https://bundlephobia.com/result?p=ngx-gravatar)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/l/ngx-gravatar.svg)](https://www.npmjs.com/package/ngx-gravatar)

# ngx-gravatar

The gravatar directive for angular 5, 6, 7 and 8+. It is AoT compatible.

This directive supports two avatar sources:
* **Custom image**
* **Gravatar**

By default, the **custom image** has higher priority. If it is invalid, the **Gravatar** will be used. The priority can be changed by setting `preferGravatar` input or override the default configuration (see below).

![Angular Gravatar Directive](https://github.com/t-ho/ngx-gravatar/blob/master/src/demo.png?raw=true)

Visit [here](https://en.gravatar.com/) for more information about Gravatar.

## Demo

Live demo [here](https://ngx-gravatar.stackblitz.io).

Play with **ngx-gravatar** [here](https://stackblitz.com/edit/ngx-gravatar) on stackblitz.

### If you like `ngx-gravatar`, please give it a :star: on [github](https://github.com/t-ho/ngx-gravatar)

## Installation

Install `ngx-gravatar` via NPM, using the command below.

### NPM

```shell
npm install --save ngx-gravatar
```

### Or Yarn

```shell
yarn add ngx-gravatar
```

#### * For Angular 6 and 7, please use ngx-gravatar version 7.x.x
```shell
npm install --save ngx-gravatar@7.2.2
```

#### * For Angular 4 and 5, please use ngx-gravatar version 3.x.x
```shell
npm install --save ngx-gravatar@3.0.5
```

## Getting started

Import the `GravatarModule` in your root application module `AppModule` or any other module you need to use gravatar directive:

```typescript

import { BrowserModule } from  '@angular/platform-browser';
import { NgModule } from  '@angular/core';

import { AppComponent } from './app.component';

import { GravatarModule } from  'ngx-gravatar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Import GravatarModule
    GravatarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
## Use in component
After importing the `GravatarModule`, you can use the `ngxGravatar` directive in `img` tags as below:

```html
<img ngxGravatar [email]="'example@mail.com'">
<img ngxGravatar [md5Hash]="'fbf2b9cfc0a472389f3620e471bdf0e9'">
<img ngxGravatar [email]="'example@mail.com'" size="30">
<img ngxGravatar [email]="'example@mail.com'" size="30" src="assets/avatar.jpg">
<img ngxGravatar [email]="'example@mail.com'" size="30" src="assets/avatar.jpg" [style]="styleObject">
```  
## Input Parameters

|   Attribute   |      Type      | Required  | Default |                                              Description                   											|
| ------------- | ----------------- | ---------- | ---------- | ----------------------------------------------------------------------------------------- |
| `email`          | *string*  | requried | (*empty string*)| Email associated with Gravatar, either this attribute or `md5Hash` must be set |
| `md5Hash`        | *string*  | requried | (*empty string*)| MD5 hash of email associated with Gravatar, either this attribute or `email` must be set |
| `src`            | *string*  | optional |              | Custom image to use                               																							|
| `preferGravatar` | *boolean* | optional | `false`      | If `true`, Gravatar will have higher priority. Otherwise, `src` image will be loaded first.    |
| `size`           | *number*  | optional | `40`         | Displayed size of the avatar                                                                             |
| `ratio`          | *number*  | optional | `2`          | The ratio of requested image size to displayed size                                            |
| `round`          | *boolean* | optional | `true`       | Circle avatar                                                                                  |
| `cornerRadius`   | *number*  | optional | `0`          | Round the corner of square avatar. Only applied when `round` is set to *false*                 |
| `borderColor`    | *string*  | optional |              | Specify the color of the border                                                                |
| `borderWidth`    | *number*  | optional |              | Specify the width of the border                                                                |
| `style`          | *object*  | optional |              | Style object that will be applied on the `<img>` tag. NOTE: It will override others attributes.|
| `backgroundColor`| *string*  | optional | `transparent`| Specify the background color                                                                   |
| `rating`         | *string*  | optional | `g`          | The rating string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `g`, `pg`, `r`, `x`. `rating` type is case-sensitive.                       |
| `fallback`       | *string*  | optional | `retro`      | The fallback string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `blank`, `indenticon`, `mp` (or `mm`), `monsterid`, `retro`, `robohash`, `wavatar`. `fallback` is case sensitive.  ||

## Override Default Configuration

Default configuration options can be set globally by using the .forRoot() method. Note that the input parameters that are passed into an ngx-gravatar element will override any custom global config options that have been set. Please see below for an example of how to override default configurations.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GravatarModule, GravatarConfig, FALLBACK, RATING } from 'ngx-gravatar';

const gravatarConfig: GravatarConfig = {
  fallback: FALLBACK.robohash,
  rating: RATING.x,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  hasBorder: true // Set this flag to true to have a border by default
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // Import GravatarModule with custom configuration globally
    GravatarModule.forRoot(gravatarConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Options

|   Option   |      Type      | Required  | Default |                                              Description                                            |
| ------------- | ----------------- | ---------- | --------- | ------------------------------------------------------------------------------------------ |
| `hasBorder`      | *boolean* | optional | `false`      | Specify whether to have border or not                                                          |
| `preferGravatar` | *boolean* | optional | `false`      | If `true`, Gravatar will have higher priority. Otherwise, `src` image will be loaded first.    |
| `size`           | *number*  | optional | `40`         | Displayed size of the avatar                                                                             |
| `ratio`          | *number*  | optional | `2`          | The ratio of requested image size to displayed size                                            |
| `round`          | *boolean* | optional | `true`       | Circle avatar                                                                                  |
| `cornerRadius`   | *number*  | optional | `0`          | Round the corner of square avatar. Only applied when `round` is set to *false*                 |
| `borderRadius`   | *string*  | optional | `50%`        | Only applied when `round` is set to *true*.                                                    |
| `borderColor`    | *string*  | optional | `#000000`    | Specify the color of the border                                                                |
| `borderWidth`    | *number*  | optional | `1`          | Specify the width of the border                                                                |
| `borderStyle`    | *string*  | optional | `solid`      | Specify the style of the border                                                                |
| `backgroundColor`| *string*  | optional | `transparent`| Specify the background color                                                                   |
| `rating`         | *string*  | optional | `g`          | The rating string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `g`, `pg`, `r`, `x`. Note: `rating` type is case sensitive.                       |
| `fallback`       | *string*  | optional | `retro`      | The fallback string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `blank`, `indenticon`, `mp` (or `mm`), `monsterid`, `retro`, `robohash`, `wavatar`. Note: `fallback` is case sensitive.  ||

## Testing

To lint

```shell
ng lint
```

To run all tests

```shell
ng test
```

## License

MIT &copy; [t-ho](mailto:toan.hmt@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
