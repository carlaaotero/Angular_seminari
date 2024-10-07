import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm  } from '@angular/forms';  // Importa FormsModule para componentes standalone
import { ExperienciaService } from '../../services/experiencia.service';  // Servicio que manejará las peticiones
import { Experiencia } from '../../models/experiencia.model';  // Interfaz del modelo de experiencia
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule] // Asegúrate de importar FormsModule aquí
})
/*export class ExperienciaComponent implements OnInit {
  newExperience: Experiencia = {
    owner: '',
    participants: [], 
    description: ''
  };
  
  constructor(private experienciaService: ExperienciaService) {}

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    const participantString = this.newExperience.participants.join(', ');
    this.newExperience.participants = participantString.split(',').map(participant => participant.trim());

    this.experienciaService.addExperiencia(this.newExperience).subscribe((response) => {
      console.log('Experiencia creada', response);
    });
  }
}*/

export class ExperienciaComponent implements OnInit {
  experiencias: Experiencia[] = []; // Variable para almacenar la lista de experiencias
  
  newExperience: Experiencia = {
    owner: '',
    participants: [], 
    description: ''
  };
  constructor(private experienciaService: ExperienciaService) {}

  ngOnInit(): void {
    this.loadExperiences();
    this.getExperiencias();     // Llamar al método para obtener experiencias al inicializar el componente 
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
  loadExperiences(): void {
    this.experienciaService.getExperiencias().subscribe(data => {
      this.experiencias = data;  // Asignar los datos obtenidos al array experiences
    });
  }
  
  
  onSubmit(): void {
    const participantString = this.newExperience.participants.join(', ');
    this.newExperience.participants = participantString.split(',').map(participant => participant.trim());

    this.experienciaService.addExperiencia(this.newExperience).subscribe((response) => {
      console.log('Experiencia creada', response);
    });
  }
}


