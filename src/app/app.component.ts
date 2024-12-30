import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BodyComponent } from "./body/body.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  

  ngOnInit(): void {
    
  }
  isLayout: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if(event.url === '/login' ||event.url === '/news' ||event.url === '/user' || event.url === '/unauthorized'){
          this.isLayout = true;
        }
        else{
          this.isLayout= false;
        }
      }
    });
  }
}
