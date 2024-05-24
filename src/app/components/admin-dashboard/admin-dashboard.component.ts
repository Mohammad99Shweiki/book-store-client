import { SIDE_NAV_OPTIONS, SidenavValues } from '@/app.constants';
import { SideNavLink } from '@/models/sidenav-link';
import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  sidenavLinks: SideNavLink[] = SIDE_NAV_OPTIONS;
  selectedOption: SidenavValues = 'users';

  constructor() {}

  ngOnInit(): void {
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.selectedOption = event.options[0].value;
  }
}
