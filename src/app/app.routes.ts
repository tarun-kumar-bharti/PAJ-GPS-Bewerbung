import { Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent     }  from './home/home.component';
import { DashboardComponent     }  from './dashboard/dashboard.component';

export const routes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'dashboard', component: DashboardComponent},	
	
];
