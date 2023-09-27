import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Admin page component. */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
}
