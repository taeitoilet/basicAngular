import { Routes } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { authGuard } from './guards/auth.guard';
import { UnauthoziedComponent } from './unauthozied/unauthozied.component';
import { SearchTabComponent } from './search-tab/search-tab.component';


export const routes: Routes = [
    {
        path:'',
        component : BodyComponent
        
    },
    {
        path : 'news',
        component:NewsComponent,
        canActivate : [authGuard]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'user',
        component:UserComponent,
        canActivate : [authGuard]
    },
    {
        path: 'unauthorized',
        component: UnauthoziedComponent
    },
    {
        path: 'search',
        component: SearchTabComponent
    }
  
];
