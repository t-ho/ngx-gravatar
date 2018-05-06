import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { GravatarModule, GravatarDefaultConfig, FALLBACK_TYPES, RATING_TYPES } from 'ngx-gravatar';

const gravatarConfig: GravatarDefaultConfig = {
  // fallback: FALLBACK_TYPES.robohash,
  rating: RATING_TYPES.pg,
  // hasBorder: true,
  // borderColor: "rgba(255, 0, 0, 0.1)",
  // backgroundColor: "rgba(255, 0, 0, 0.1)",
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GravatarModule.forRoot(gravatarConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
