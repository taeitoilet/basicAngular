import { Component,AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{
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

}
