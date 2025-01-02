import {Component, inject} from '@angular/core';
import { Event, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isLayout: boolean = false;

  constructor(  private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if(event.url === '/login' ||event.url === '/news' ||event.url === '/user' || event.url === '/unauthorized' || event.url === '/header') {
          this.isLayout = true;
        }
        else{
          this.isLayout= false;
        }
      }
    });
  }

}
