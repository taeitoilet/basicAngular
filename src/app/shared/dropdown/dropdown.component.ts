import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() title: string = 'Dropdown';
  @Input() items: { label: string; link: string }[] = [];

  isDropdownOpen = false;
  selectedItemIndex: number = 0
  constructor(private elementRef: ElementRef) {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onclick(item : string, index : number) {
    this.title = item
    this.selectedItemIndex = index
    this.isDropdownOpen = false
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
