import { Component } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
