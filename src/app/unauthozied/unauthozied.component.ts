import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthozied',
  standalone: true,
  imports: [],
  templateUrl: './unauthozied.component.html',
  styleUrl: './unauthozied.component.css'
})
export class UnauthoziedComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
