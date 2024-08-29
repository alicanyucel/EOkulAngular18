import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AsideComponent, FooterComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export default class LayoutsComponent {

}
