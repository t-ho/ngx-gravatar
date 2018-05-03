[![npm version](https://badge.fury.io/js/ngx-gravatar.svg)](https://badge.fury.io/js/ngx-gravatar)

# ngx-gravatar

The gravatar directive for angular 4+. It is AoT compatible.

![Angular Gravatar Directive](src/demo.png)

## Demo

Live demo [here](https://ngx-gravatar-demo.stackblitz.io).

Play with ngx-gravatar [here](https://stackblitz.com/edit/ngx-gravatar-demo) on stackblitz.

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
After importing the GravatarModule, you can use the ngx-gravatar directive in any components as below:

```html
<img ngx-gravatar [email]="'example@mail.com'">
<img ngx-gravatar [email]="'example@mail.com'" size="30">
<img ngx-gravatar [email]="'example@mail.com'" size="30" src="assets/avatar.jpg">
<img ngx-gravatar [email]="'example@mail.com'" size="30" src="assets/avatar.jpg" [style]="styleObject">
```  
## Input Parameters

|   Attribute   |      Type      | Required  | Default |                                              Description                   											|
| ------------- | ----------------- | ---------- | ------- | -------------------------------------------------------------------------------------------- |
| `email`          | *string*  | requried |         | Email associated with Gravatar                         																							|
| `src`            | *string*  | optional |         | Custom image to use                                    																							|
| `preferGravatar` | *boolean* | optional | false   | If `true`, Gravatar will have higher priority. Otherwise, custom image will be loaded first.        |
| `size`           | *number*  | optional | 40      | Size of the avatar                                     																							|
| `round`          | *boolean* | optional | true    | Circle avatar                                          																							|
| `cornerRadius`   | *number*  | optional | 0       | Round the corner of square avatar. Only applied when `round` is set to *false*                      |
| `borderColor`    | *string*  | optional |         | Specify the color of the border                        																							|
| `borderWidth`    | *string*  | optional |         | Specify the width of the border                  																							      |
| `style`          | *object*  | optional |         | Style object that will be applied on the `<img>` tag   																							|
| `fallback`       | *string*  | optional | retro   | The fallback string of Gravatar. Possible values: `blank`, `indenticon`, `mm`, `monsterid`, `retro`, `robohash`, `wavatar`.   ||

## Override Default Configuration
Default configuration options can be set globally by using the .forRoot() method. Note that the input parameters that are passed into an ngx-gravatar element will override any custom global config options that have been set. Please see below for an example of how to override default configurations.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GravatarModule, GravatarDefaultConfig, FALLBACK_TYPES } from 'ngx-gravatar';

const gravatarConfig: GravatarDefaultConfig = {
  fallback: FALLBACK_TYPES.monsterid,
	hasBorder: true,
  borderColor: '#00ACC1',
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
| ------------- | ----------------- | ---------- | ------- | -------------------------------------------------------------------------------------------- |
| `hasBorder`      | *boolean* | optional | false   | Specify whether to have border or not                                                               |
| `preferGravatar` | *boolean* | optional | false   | If `true`, Gravatar will have higher priority. Otherwise, custom image will be loaded first.        |
| `size`           | *number*  | optional | 40      | Size of the avatar                                                                                  |
| `round`          | *boolean* | optional | true    | Circle avatar                                                                                       |
| `cornerRadius`   | *number*  | optional | 0       | Round the corner of square avatar. Only applied when `round` is set to *false*                      |
| `borderRadius`   | *string*  | optional | 50%     | Only applied when `round` is set to *true*.                                                         |
| `borderColor`    | *string*  | optional | #000000 | Specify the color of the border                                                                     |
| `borderWidth`    | *string*  | optional | 1       | Specify the width of the border                                                                     |
| `borderStyle`    | *object*  | optional | solid   | Style object that will be applied on the `<img>` tag                                                |
| `fallback`       | *string*  | optional | retro   | The fallback string of Gravatar. Possible values: `blank`, `indenticon`, `mm`, `monsterid`, `retro`, `robohash`, `wavatar`. ||

## License

MIT © [t-ho](mailto:toan.hmt@gmail.com)