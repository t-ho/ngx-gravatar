[![npm version](https://badge.fury.io/js/ngx-gravatar.svg)](https://badge.fury.io/js/ngx-gravatar)
[![Build Status](https://travis-ci.org/t-ho/ngx-gravatar.svg?branch=master)](https://travis-ci.org/t-ho/ngx-gravatar)
[![npm](https://img.shields.io/npm/dt/ngx-gravatar.svg)](https://www.npmjs.com/package/ngx-gravatar)
[![](https://data.jsdelivr.com/v1/package/npm/ngx-gravatar/badge?style=rounded)](https://www.jsdelivr.com/package/npm/ngx-gravatar)
[![npm](https://img.shields.io/npm/l/ngx-gravatar.svg)](https://www.npmjs.com/package/ngx-gravatar)

# ngx-gravatar

The gravatar directive for angular 4, 5(tested) and 6+(tested). It is AoT compatible.

This directive supports two avatar sources:
* **Custom image**
* **Gravatar**

By default, the **custom image** has higher priority. If it is invalid, the **Gravatar** will be used. The priority can be changed by setting `preferGravatar` input or override the default configuration (see below).

![Angular Gravatar Directive](https://github.com/t-ho/ngx-gravatar/blob/master/src/demo.png?raw=true)

Visit [here](https://en.gravatar.com/) for more information about Gravatar.

## Demo

Live demo [here](https://ngx-gravatar.stackblitz.io).

Play with **ngx-gravatar** and **Angular 5** [here](https://stackblitz.com/edit/ngx-gravatar-angular-5) on stackblitz.

Play with **ngx-gravatar** and **Angular 6** [here](https://stackblitz.com/edit/ngx-gravatar) on stackblitz.

## Installation

Install `ngx-gravatar` via NPM, using the command below.

### NPM

```shell
npm install --save ngx-gravatar
```
## Getting started

Import the `GravatarModule` in your root application module `AppModule`:

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
<img ngxGravatar [email]="'example@mail.com'" size="30">
<img ngxGravatar [email]="'example@mail.com'" size="30" src="assets/avatar.jpg">
<img ngxGravatar [email]="'example@mail.com'" size="30" src="assets/avatar.jpg" [style]="styleObject">
```  
## Input Parameters

|   Attribute   |      Type      | Required  | Default |                                              Description                   											|
| ------------- | ----------------- | ---------- | ---------- | ----------------------------------------------------------------------------------------- |
| `email`          | *string*  | requried | (*empty string*)| Email associated with Gravatar                      																				|
| `src`            | *string*  | optional |              | Custom image to use                               																							|
| `preferGravatar` | *boolean* | optional | `false`      | If `true`, Gravatar will have higher priority. Otherwise, `src` image will be loaded first.    |
| `size`           | *number*  | optional | `40`         | Size of the avatar                                                                             |
| `round`          | *boolean* | optional | `true`       | Circle avatar                                                                                  |
| `cornerRadius`   | *number*  | optional | `0`          | Round the corner of square avatar. Only applied when `round` is set to *false*                 |
| `borderColor`    | *string*  | optional |              | Specify the color of the border                                                                |
| `borderWidth`    | *number*  | optional |              | Specify the width of the border                                                                |
| `style`          | *object*  | optional |              | Style object that will be applied on the `<img>` tag. NOTE: It will override others attributes.|
| `backgroundColor`| *string*  | optional | `transparent`| Specify the background color                                                                   |
| `rating`         | *string*  | optional | `g`          | The rating string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `g`, `pg`, `r`, `x`. `rating` type is case-sensitive.                       |
| `fallback`       | *string*  | optional | `retro`      | The fallback string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `blank`, `indenticon`, `mm`, `monsterid`, `retro`, `robohash`, `wavatar`. `fallback` is case sensitive.  ||

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
| `size`           | *number*  | optional | `40`         | Size of the avatar                                                                             |
| `round`          | *boolean* | optional | `true`       | Circle avatar                                                                                  |
| `cornerRadius`   | *number*  | optional | `0`          | Round the corner of square avatar. Only applied when `round` is set to *false*                 |
| `borderRadius`   | *string*  | optional | `50%`        | Only applied when `round` is set to *true*.                                                    |
| `borderColor`    | *string*  | optional | `#000000`    | Specify the color of the border                                                                |
| `borderWidth`    | *number*  | optional | `1`          | Specify the width of the border                                                                |
| `borderStyle`    | *string*  | optional | `solid`      | Style object that will be applied on the `<img>` tag                                           |
| `backgroundColor`| *string*  | optional | `transparent`| Specify the background color                                                                   |
| `rating`         | *string*  | optional | `g`          | The rating string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `g`, `pg`, `r`, `x`. Note: `rating` type is case sensitive.                       |
| `fallback`       | *string*  | optional | `retro`      | The fallback string of [Gravatar](https://en.gravatar.com/site/implement/images). Possible values: `blank`, `indenticon`, `mm`, `monsterid`, `retro`, `robohash`, `wavatar`. Note: `fallback` is case sensitive.  ||

## Testing

To lint

```shell
ng lint
```

To run all tests

```shell
ng test
```

## Changelog

**v3.0.0**
* Upgrade to Angular 6
* BreakingChange: `GravatarDefaultConfig` => `GravatarConfig`
* BreakingChange: `FALLBACK_TYPES` => `FALLBACK`
* BreakingChange: `RATING_TYPES` => `RATING`
* BreakingChange: Rating types are now case sensitive

**v2.1.3**
* BugFix: Avatar is fetched twice when initializing

**v2.1.1**
* Support camelCase selector `ngxGravatar`

**v2.1.0**
* Be able to set `backgroundColor` locally and globally
* Be able to set Gravatar `rating` (`g`, `pg`, `r`, `x`)
* BugFix: `ngx-gravatar` tried to load the invalid Gravatar over and over again, spamming the console when invalid Gravata fallback type is passed to `forRoot()` method.
* Remove `@type/lodash` package from dependencies

**v2.0.1**
* Lint and following Angular style guide

**v2.0.0**
* Gravatar directive for Angular 4 and above


## License

MIT &copy; [t-ho](mailto:toan.hmt@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
