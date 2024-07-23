import { Component, signal } from '@angular/core';
import { NavigationModel, Navigations } from '../../../nav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsidePipe } from '../../../pipes/aside.pipe';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, AsidePipe],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  navigations = signal<NavigationModel[]>(Navigations);
  search = signal<string>("");
}
