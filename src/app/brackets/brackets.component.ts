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
  easternTeams: Map<number, TeamModule> = new Map<number, TeamModule>();
  easternRound2: Map<number, TeamModule> = new Map<number, TeamModule>();
  westernRound2: Map<number, TeamModule> = new Map<number, TeamModule>();
  bracketMappingRound2 = {
    1: 1,
    8: 1,
    4: 2,
    5: 2,
    3: 3,
    6: 3,
    2: 4,
    7: 4
  }

  playgroundMode: HTMLInputElement;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.onChangeEastern.subscribe(
      (teams: Map<number, TeamModule>) => {
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

  onSelectRound2Eastern(index: number) {
    if (this.playgroundMode) {
      let roundTwoPosition = this.bracketMappingRound2[index];
      this.easternRound2.set(roundTwoPosition, this.easternTeams.get(index));
    }
  }

  onSelectRound2Western(index: number) {
    if (this.playgroundMode) {
      let roundTwoPosition = this.bracketMappingRound2[index];
      this.westernRound2.set(roundTwoPosition, this.westernRound2.get(index));
    }
  }

}
