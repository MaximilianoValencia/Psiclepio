import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent {
  constructor(public authService: AuthService) {}

}

