import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  colorScheme = {
    domain: ['#F44336', '#008040', '#0000ff', '#ff8000'],
  };

  data = [
    {
      'name': 'Germany',
      'value': 3693
    },
    {
      'name': 'USA',
      'value': 13693
    },
    {
      'name': 'Russia',
      'value': 7693
    },
  ]
}
