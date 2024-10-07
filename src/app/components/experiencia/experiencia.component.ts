// experiencia.component.ts
import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../models/experiencia.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  standalone: true,
  styleUrls: ['./experiencia.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class ExperienciaComponent implements OnInit {
  experiencias: Experiencia[] = []; // Variable para almacenar la lista de experiencias

  // Estructura inicial para una nueva experiencia con el tipo explícito de participants
  newExperience: Experiencia = {
    owner: '',
    participants: [] as string[], // Asegúrate de que está tipado explícitamente como un array de strings
    description: ''
  };

  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.getExperiencias(); // Llamar al método para obtener experiencias al inicializar el componente
  }

  // Obtener la lista de experiencias desde la API
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

  // Manejar el envío del formulario y agregar la nueva experiencia
  onSubmit(): void {
    // Verificar si participants es un string y convertirlo a array
    if (typeof this.newExperience.participants === 'string') {
      // Usa "as string" para forzar el tipo en este contexto
      this.newExperience.participants = (this.newExperience.participants as string)
        .split(',')
        .map(participant => participant.trim()); // Convertir a array y limpiar espacios
    }

    // Llamar al servicio para agregar la nueva experiencia
    this.experienciaService.addExperiencia(this.newExperience).subscribe(
      (response) => {
        console.log('Experiencia creada:', response);
        this.getExperiencias(); // Actualizar la lista de experiencias después de crear una nueva
        this.resetForm(); // Limpiar el formulario
      },
      (error) => {
        console.error('Error al crear la experiencia:', error);
      }
    );
  }

  // Método para resetear el formulario después de enviar
  resetForm(): void {
    this.newExperience = {
      owner: '',
      participants: [] as string[], // Asegúrate de inicializarlo como un array vacío de strings
      description: ''
    };
  }
}
