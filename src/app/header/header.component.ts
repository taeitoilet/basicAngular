import { Component,AfterViewInit, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit,OnInit{
  // searchKeys : string[] = []
  authService = inject(AuthService)
  route = inject(Router)
  searchKey :string =''
  searchKeyList : string[] = []
  ngOnInit(): void {
    const searchKeys = JSON.parse(sessionStorage.getItem("searchKeys") || '[]')
    this.searchKeyList = searchKeys
    console.log(this.searchKeyList.toString())
  }
  loadSessionStorage(){
    const searchKeys = JSON.parse(sessionStorage.getItem("searchKeys") || '[]')
    this.searchKeyList = searchKeys
  }
  isUnauthorized() : boolean {
    if(localStorage.getItem('authToken') == null){
      return true
    }
    return false
  }
  ngAfterViewInit(): void {
    const toggleSubmenu = document.getElementById('toggle-submenu');
    if (toggleSubmenu) {
      toggleSubmenu.addEventListener('click', function(event: MouseEvent) {
        event.preventDefault();

        const submenu = document.querySelector('.submenu') as HTMLElement;
        const arrowIcon = toggleSubmenu.querySelector('.arrow-down') as HTMLElement;

        if (submenu && arrowIcon) {
          submenu.classList.toggle('show');
          arrowIcon.classList.toggle('rotate');
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle') as HTMLElement;
      const nav = document.getElementById('mainNav');

      if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
          nav.classList.toggle('show');
        });
      }
    });
    document.addEventListener('DOMContentLoaded', () => {
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle') as HTMLElement;
      const nav = document.getElementById('mainNav1');

      if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
          nav.classList.toggle('show');
        });
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      const menuItems = document.querySelectorAll('.menu-item') as NodeListOf<HTMLElement>;

      menuItems.forEach(item => {
        const navLink = item.querySelector('.navlink') as HTMLElement;
        const subnav = item.querySelector('.subnav') as HTMLElement;

        if (navLink && subnav) {
          navLink.addEventListener('mouseenter', () => {
            subnav.style.display = 'flex';
          });

          item.addEventListener('mouseleave', () => {
            subnav.style.display = 'none';
          });

          subnav.addEventListener('mouseenter', () => {
            subnav.style.display = 'flex';
          });

          subnav.addEventListener('mouseleave', () => {
            subnav.style.display = 'none';
          });
        }
      });
    });
  }
  onSearch(){
    if(this.searchKey != ''){
      if (this.searchKey.trim()) {
        if(this.searchKeyList.includes(this.searchKey)){

        }else{
          this.searchKeyList.push(this.searchKey.trim())
        }
        this.route.navigate(['/search'], { queryParams: { content: this.searchKey } });
        const modalElement = document.getElementById('searchModal')
        const modalInstance = bootstrap.Modal.getInstance(modalElement)
        modalInstance.hide()
        sessionStorage.setItem('searchKeys',JSON.stringify(this.searchKeyList))
        this.searchKey = ''
      }
    }
    
  }
  removeSearchKey(item: string, event: Event): void {
    event.stopPropagation();
    const index = this.searchKeyList.indexOf(item);
    if (index !== -1) {
      this.searchKeyList.splice(index, 1);
      sessionStorage.setItem('searchKeys',JSON.stringify(this.searchKeyList))
    }
  }
  get recentSearchKeys() {
    return this.searchKeyList.slice(-5);
  }
}
