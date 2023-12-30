import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-crm';
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  isDrawerOpened: boolean = true; // Setze den initialen Zustand des Drawers

  // Funktion zum Umschalten des Drawer-Zustands
  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
      this.isDrawerOpened = this.drawer.opened;
    }
  }
}
