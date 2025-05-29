import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './services/appointment.service';
import { Appointment } from './models/appointment';
import { FormsModule } from '@angular/forms';
import { CommonModule }          from '@angular/common';        
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, HttpClientModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appointment-ui';
  appointments: Appointment[] = [];
  newAppointment: Appointment = {
    patientName: '',
    doctorName: '',
    appointmentTime: '',
    status: ''
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }


loadAppointments() {
  this.appointmentService.getAppointments().subscribe(data => {
    this.appointments = data;
  }, error => {
    console.error('Error loading appointments:', error);
  });
}


addAppointment() {
  this.appointmentService.createAppointment(this.newAppointment).subscribe(() => {
   
    this.newAppointment = { patientName: '', doctorName: '', appointmentTime: '', status: '' };
    this.newAppointment.appointmentTime = '2025-06-01T11:00:00';

    this.loadAppointments();
  }, error => {
    console.error('Error adding appointment:', error);
  });
}


  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.loadAppointments();
    });
  }
}
