// experiencia.component.ts
import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../models/experiencia.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  standalone: true,
  styleUrls: ['./experiencia.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule] // Asegurarse de que HttpClientModule esté disponible
})
export class ExperienciaComponent implements OnInit {
  experiencias: Experiencia[] = []; // Variable para almacenar la lista de experiencias
  
  newExperience: Experiencia = {
    owner: '',
    participants: [], 
    description: ''
  };
  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.getExperiencias(); // Llamar al método para obtener experiencias al inicializar el componente
  }

  getExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe(
      (data: Experiencia[]) => {
        this.experiencias = data; // Asignar la lista de experiencias recibida
        console.log('Experiencias recibidas:', data); // Verificar en la consola
      },
      (error) => {
        console.error('Error al obtener las experiencias:', error);
      }
    );
  }
  onSubmit(): void {
    const participantString = this.newExperience.participants.join(', ');
    this.newExperience.participants = participantString.split(',').map(participant => participant.trim());

    this.experienciaService.addExperiencia(this.newExperience).subscribe((response) => {
      console.log('Experiencia creada', response);
    });
  }

}


