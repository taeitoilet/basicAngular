import {Component, NgModule, OnInit} from '@angular/core';
import {DropdownComponent} from '../shared/dropdown/dropdown.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-new-header',
  standalone: true,
  imports: [DropdownComponent,TranslateModule],
  templateUrl: './new-header.component.html',
  styleUrl: './new-header.component.css'

})
export class NewHeaderComponent implements OnInit {
  currentLanguage: string = 'vn';
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService // Nếu dùng ngx-translate
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentLanguage = params['lang'] || 'vn';
      this.translate.use(this.currentLanguage);
    });
  }
  isDropdownOpen : boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
