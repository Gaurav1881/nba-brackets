import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModule } from './team.module';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    easternTeams: Map<number, TeamModule> = new Map<number, TeamModule>();
    westernTeams: Map<number, TeamModule> = new Map<number, TeamModule>();
    easternTeamsAdded: number = 0;
    westernTeamsAdded: number = 0;
    onChangeEastern: Subject<Map<number, TeamModule>> = new Subject();
    onChangeWestern: Subject<Map<number, TeamModule>> = new Subject();
    teamData = "";
    constructor(private https: HttpClient) { }

    teamAddedEastern() {
        this.easternTeamsAdded = this.easternTeamsAdded + 1;
        if (this.easternTeamsAdded == 15) {
            for (let key of Array.from(this.easternTeams.keys())) {
                let team = this.easternTeams.get(key);
                this.easternTeams.set(team.position, team);
                this.easternTeams.delete(key);
            }
            this.onChangeEastern.next(this.easternTeams);
        }
    }
    teamAddedWestern() {
        this.westernTeamsAdded = this.westernTeamsAdded + 1;
        if (this.westernTeamsAdded == 15) {
            for (let key of Array.from(this.westernTeams.keys())) {
                let team = this.westernTeams.get(key);
                this.westernTeams.set(team.position, team);
                this.westernTeams.delete(key);
            }
            this.onChangeWestern.next(this.westernTeams);
        }
    }
    async getTeamNames() {
        this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v2/2018/teams.json')
            .subscribe(
                (teams: any) => {
                    this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/current/standings_conference.json')
                        .subscribe(
                            (data: any) => {
                                let index = 1;
                                data.league.standard.conference.east.forEach(team => {
                                    this.easternTeams.set(team.teamId, new TeamModule(team.teamId, team.win, team.loss, index));
                                    index++;
                                });
                                teams.league.standard.forEach(team => {
                                    if (this.easternTeams.has(team.teamId)) {
                                        this.easternTeams.get(team.teamId).teamName = team.fullName;
                                        this.teamAddedEastern();
                                    }
                                });
                            });
                    this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/current/standings_conference.json')
                        .subscribe(
                            (data: any) => {
                                let index = 1;
                                data.league.standard.conference.west.forEach(team => {
                                    this.westernTeams.set(team.teamId, new TeamModule(team.teamId, team.win, team.loss, index));
                                    index++;
                                });
                                teams.league.standard.forEach(team => {
                                    if (this.westernTeams.has(team.teamId)) {
                                        this.westernTeams.get(team.teamId).teamName = team.fullName;
                                        this.teamAddedWestern();
                                    }
                                });
                            });
                });
    }
}
