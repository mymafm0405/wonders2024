import { Component, Input } from '@angular/core';
import { FooterIcons } from '../../shared/footet-icons.model';

@Component({
  selector: 'app-social-item',
  templateUrl: './social-item.component.html',
  styleUrl: './social-item.component.css'
})
export class SocialItemComponent {
  @Input() icon: FooterIcons;
}
