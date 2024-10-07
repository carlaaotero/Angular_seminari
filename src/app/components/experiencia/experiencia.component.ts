import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../models/experiencia.model';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  standalone: true,
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  experiencias: Experiencia[] = [];

  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.getExperiencias();
  }

  getExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe(
      (data: Experiencia[]) => {
        this.experiencias = data;
      },
      (error) => {
        console.error('Error al obtenir les experiències:', error);
      }
    );
  }
}

