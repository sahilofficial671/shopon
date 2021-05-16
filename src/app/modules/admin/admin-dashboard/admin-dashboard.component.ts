import { Component, OnInit } from '@angular/core';
import { InstanceService } from 'src/app/core/services/instance.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  user:User;

  constructor(private instanceService: InstanceService) { }

  ngOnInit(): void {
    this.user = this.instanceService.getAuthUser();
  }

}
