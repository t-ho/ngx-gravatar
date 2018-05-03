import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GravatarModule, FALLBACK_TYPES } from 'ngx-gravatar';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
		BrowserModule,
		GravatarModule.forRoot({fallback: FALLBACK_TYPES.robohash})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
