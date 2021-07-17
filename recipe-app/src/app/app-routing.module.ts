import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//OLD -> import {CrisisListComponent} from './crisis/crisis-list/crisis-list.component';
//OLD -> import {HeroListComponent} from './heroes/hero-list/hero-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

// Custom preload strategy


const routes: Routes = [
  //{path: 'crisis-center', component: CrisisListComponent},
  //{path: 'hero', component: HeroListComponent},
  // Default rout for the app
  { path: '',   redirectTo: '/recipe', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // For preloading
    {
      enableTracing: true, // <-- debugging purposes only
      // The PrealoadAllModules is the one that can be load url with canLoad
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
