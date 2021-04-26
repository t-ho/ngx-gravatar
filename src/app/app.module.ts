import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { GravatarModule, GravatarConfig, FALLBACK, RATING } from 'ngx-gravatar';

const gravatarConfig: GravatarConfig = {
  // fallback: FALLBACK.robohash,
  rating: RATING.pg,
  // hasBorder: true,
  // borderColor: "rgba(255, 0, 0, 0.1)",
  // backgroundColor: "rgba(255, 0, 0, 0.1)",
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, GravatarModule.forRoot(gravatarConfig)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
