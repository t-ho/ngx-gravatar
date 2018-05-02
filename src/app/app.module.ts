import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GravatarModule } from './lib/gravatar/gravatar.module';


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
