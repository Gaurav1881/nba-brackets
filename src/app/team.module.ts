export class TeamModule {
    teamId: string;
    teamName: string;
    wins: number;
    loss: number;
    position: number;
    constructor(teamId, wins, loss, position) {
        this.teamId = teamId;
        this.wins = wins;
        this.loss = loss;
        this.position = position;
    }
}