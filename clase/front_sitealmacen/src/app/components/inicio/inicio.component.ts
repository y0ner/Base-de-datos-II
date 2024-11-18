import { Component } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu'; 

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [InputTextModule,
    ButtonModule,
    PanelMenuModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
