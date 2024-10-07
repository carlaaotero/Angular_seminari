import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsuarisComponent } from './components/usuaris/usuaris.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirigeix a Home per defecte
    { path: 'home', component: HomeComponent },
    { path: 'usuaris', component: UsuarisComponent },
    { path: 'experiencia', component: ExperienciaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

