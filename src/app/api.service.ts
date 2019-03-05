import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeamModule } from './team.module';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    easternTeams: TeamModule[] = [];
    westernTeams: TeamModule[] = [];
    constructor(private https: HttpClient) { }

    async getEasternTeams() {
        await this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/current/standings_conference.json').subscribe(async (data: any) => {
            await data.league.standard.conference.east.forEach(async element => {
                let currTeam = await new TeamModule(element.teamId, element.win, element.loss);
                await this.easternTeams.push(currTeam);
            });
        });
        await this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v2/2018/teams.json').subscribe(async (data: any) => {
            await this.easternTeams.forEach(async element => {
                await data.league.standard.forEach(async element2 => {
                    if (element.teamId === element2.teamId) {
                        element.teamName = element2.fullName;
                    }
                });
            });
        });
        await console.log(this.easternTeams);
    }
    async getWesternTeams() {
        await this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/current/standings_conference.json').subscribe(async (data: any) => {
            await data.league.standard.conference.west.forEach(async element => {
                let currTeam = await new TeamModule(element.teamId, element.win, element.loss);
                await this.westernTeams.push(currTeam);
            });
        });
        await this.https.get('https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v2/2018/teams.json').subscribe(async (data: any) => {
            await this.westernTeams.forEach(async element => {
                await data.league.standard.forEach(async element2 => {
                    if (element.teamId === element2.teamId) {
                        element.teamName = element2.fullName;
                    }
                });
            });
        });
        await console.log(this.westernTeams);
    }
}
