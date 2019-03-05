import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TeamModule } from '../team.module';

@Component({
  selector: 'app-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {

  westernTeams: Map<number, TeamModule> = new Map<number, TeamModule>();
  easternTeams: Map<number, TeamModule> =  new Map<number, TeamModule>();
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.onChangeEastern.subscribe(
      (teams:Map<number, TeamModule>) => {
        this.easternTeams = teams;
      }
    );
    this.apiService.onChangeWestern.subscribe(
      (teams: Map<number, TeamModule>) => {
        this.westernTeams = teams;
      }
    );
    this.apiService.getTeamNames();
  }

}
