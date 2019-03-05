export class TeamModule {
    teamId: string;
    teamName: string;
    wins: number;
    loss: number;
    constructor(teamId, wins, loss) {
        this.teamId = teamId;
        this.wins = wins;
        this.loss = loss;
    }
}