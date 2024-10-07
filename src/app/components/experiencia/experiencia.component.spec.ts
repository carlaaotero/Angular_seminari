import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para el uso de ngModel
import { ExperienciaService } from '../../services/experiencia.service';  // Servicio que manejará las peticiones
import { Experiencia } from '../../models/experiencia.model';  // Interfaz del modelo de experiencia

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
  standalone: true,
  imports: [FormsModule]  // Importar FormsModule aquí
})
export class ExperienciaComponent {
  newExperience: Experiencia = {
    owner: '',
    participants: [],  // Mantener como un array aquí
    description: ''
  };
experiencias: any;

  constructor(private experienciaService: ExperienciaService) {}

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    // Convertir la lista de participantes a partir de la cadena
    const participantString = this.newExperience.participants.join(', ');
    this.newExperience.participants = participantString.split(',').map(participant => participant.trim());

    this.experienciaService.addExperiencia(this.newExperience).subscribe((response) => {
      console.log('Experiencia creada', response);
      // Lógica adicional aquí
    });
  }
}



