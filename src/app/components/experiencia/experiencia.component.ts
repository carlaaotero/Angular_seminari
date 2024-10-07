// experiencia.component.ts
import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../models/experiencia.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
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
  experiencias: Experiencia[] = []; // Lista de experiencias
  users: User[] = []; // Lista de usuarios para los desplegables
  selectedParticipants: string[] = []; // Participantes seleccionados como ObjectId

  // Estructura inicial para una nueva experiencia
  newExperience: Experiencia = {
    owner: '',
    participants: [],
    description: ''
  };

  constructor(private experienciaService: ExperienciaService, private userService: UserService) {}

  ngOnInit(): void {
    this.getExperiencias(); // Obtener la lista de experiencias
    this.getUsers(); // Obtener la lista de usuarios
  }

  // Obtener la lista de experiencias desde la API
  
  getExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe(
      (data: Experiencia[]) => {
        // Filtrar experiencias que tengan _id definido
        this.experiencias = data.filter(exp => exp._id !== undefined);
        console.log('Experiencias recibidas:', data);
      },
      (error) => {
        console.error('Error al obtener las experiencias:', error);
      }
    );
  }


  // Obtener la lista de usuarios desde la API
  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log('Usuarios recibidos:', data);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  // Obtener el nombre de un usuario dado su ObjectId
  getUserNameById(userId: string): string {
    const user = this.users.find((u) => u._id === userId);
    return user ? user.name : 'Desconocido';
  }

  // Manejar el envío del formulario
  onSubmit(): void {
    // Convertir selectedParticipants a ObjectId[] antes de enviar al backend
    this.newExperience.participants = this.selectedParticipants;

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

  // Método para eliminar una experiencia por su ID
  deleteExperience(experienceId: string): void {
    this.experienciaService.deleteExperiencia(experienceId).subscribe(
      () => {
        console.log(`Experiencia con ID ${experienceId} eliminada`);
        this.getExperiencias(); // Actualizar la lista de experiencias después de la eliminación
      },
      (error) => {
        console.error('Error al eliminar la experiencia:', error);
      }
    );
  }

  // Resetear el formulario después de crear una experiencia
  resetForm(): void {
    this.newExperience = {
      owner: '',
      participants: [],
      description: ''
    };
    this.selectedParticipants = []; // Limpiar los participantes seleccionados
  }
}
