import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	styleObject = {
    borderWidth: '2px',
    borderColor: 'green',
    borderStyle: 'dashed',
    width: '150px',
    borderRadius: '20%'
  }
}
