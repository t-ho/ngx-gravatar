import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GravatarModule } from 'ngx-gravatar';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
		BrowserModule,
		GravatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
