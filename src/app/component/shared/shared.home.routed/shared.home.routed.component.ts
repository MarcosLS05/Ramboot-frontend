// admin.login.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-home-routed',
  templateUrl: './shared.home.routed.component.html',
  styleUrls: ['./shared.home.routed.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule
  ]
})
export class SharedHomeRoutedComponent{
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const loginData = {
        email: form.value.email,
        password: form.value.password
      };

      this.http.post<string>('http://localhost:8085/auth/login', loginData)
        .subscribe(
          token => {
            console.log('Token recibido:', token);
            alert('Inicio de sesión exitoso');
            // Redirige al usuario a la página principal, por ejemplo
            // this.router.navigate(['/home']);
          },
          error => {
            console.error('Error al realizar la solicitud', error);
            this.errorMessage = 'Correo o contraseña incorrectos';
          }
        );
    }
  }
}