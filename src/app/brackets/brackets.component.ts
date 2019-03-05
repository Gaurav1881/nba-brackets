import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TeamModule } from '../team.module';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {

  westernTeams: TeamModule[] = [];
  easternTeams: TeamModule[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.onChangeEastern.subscribe(
      (teams: TeamModule[]) => {
        this.easternTeams = teams;
      }
    );
    this.apiService.onChangeWestern.subscribe(
      (teams: TeamModule[]) => {
        this.westernTeams = teams;
      }
    );
    this.apiService.getEasternTeams();
    this.apiService.getWesternTeams();
  }

}
