[![npm version](https://img.shields.io/npm/v/ngx-gravatar)](https://www.npmjs.com/package/ngx-gravatar)
[![GitHub stars](https://img.shields.io/github/stars/t-ho/ngx-gravatar?color=00bcd4)](https://github.com/t-ho/ngx-gravatar/stargazers)
![CI Testing](https://github.com/t-ho/ngx-gravatar/workflows/CI%20Testing/badge.svg)
[![codecov](https://codecov.io/gh/t-ho/ngx-gravatar/branch/master/graph/badge.svg)](https://codecov.io/gh/t-ho/ngx-gravatar)
[![npm](https://img.shields.io/npm/dw/ngx-gravatar.svg)](https://www.npmjs.com/package/ngx-gravatar)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-gravatar.svg)](https://bundlephobia.com/result?p=ngx-gravatar)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/npm/l/ngx-gravatar.svg)](https://github.com/t-ho/ngx-gravatar/blob/master/LICENSE)

# ngx-gravatar

The gravatar directive for Angular applications.

This directive supports two avatar sources:

- **Custom image**
- **Gravatar**

By default, the **custom image** has higher priority. If it is invalid, the **Gravatar** will be used. The priority can be changed by setting `preferGravatar` input or override the default configuration (see below).

[![Angular Gravatar Directive](https://github.com/t-ho/ngx-gravatar/raw/assets/src/assets/demo.png)](https://tdev.app/ngx-gravatar/demo)

Visit [here](https://en.gravatar.com/) for more information about Gravatar.

## Demo

Live demo [here](https://tdev.app/ngx-gravatar/demo).

### If you like `ngx-gravatar`, please give it a :star: on [github](https://github.com/t-ho/ngx-gravatar)

## Installation

Install `ngx-gravatar` via NPM, using the command below.

```shell
npm install --save ngx-gravatar
# or
yarn add ngx-gravatar
```

| Angular       | Installation command               |
| ------------- | ---------------------------------- |
| Angular 17    | `npm i --save ngx-gravatar@17.0.0` |
| Angular 13    | `npm i --save ngx-gravatar@13.0.0` |
| Angular 11    | `npm i --save ngx-gravatar@11.0.0` |
| Angular 10    | `npm i --save ngx-gravatar@10.0.0` |
| Angular 9     | `npm i --save ngx-gravatar@9.1.0`  |
| Angular 8     | `npm i --save ngx-gravatar@8.1.0`  |
| Angular 6 & 7 | `npm i --save ngx-gravatar@7.2.2`  |
| Angular 4 & 5 | `npm i --save ngx-gravatar@3.0.5`  |

## See full documentation [here](https://tdev.app/ngx-gravatar)
