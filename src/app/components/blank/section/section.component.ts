import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  sectionTitle = input<string>("");
  
}
