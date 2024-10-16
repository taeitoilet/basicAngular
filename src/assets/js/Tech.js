function initializeToggleSubmenu() {
    document.getElementById('toggle-submenu').addEventListener('click', function(event) {
        event.preventDefault();
        const submenu = document.querySelector('.submenu');
        
        submenu.classList.toggle('show');
        var arrowIcon = this.querySelector('.arrow-down');
        arrowIcon.classList.toggle('rotate');
    });
}

function initializeMobileNavToggle() {
    document.addEventListener("DOMContentLoaded", function () {
        const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
        const nav = document.getElementById("mainNav");

        mobileNavToggle.addEventListener("click", function () {
            nav.classList.toggle("show");
        });
    });
}

function initializeMenuItemsHover() {
    document.addEventListener('DOMContentLoaded', function() {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const navLink = item.querySelector('.navlink');
            const subnav = item.querySelector('.subnav');

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
        });
    });
}

// Xuất các hàm để sử dụng trong Angular
initializeToggleSubmenu();
initializeMobileNavToggle();
initializeMenuItemsHover();