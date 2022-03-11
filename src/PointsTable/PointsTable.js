import OrangeCapTable from './OrangeCapTable';
import PurpleCapTable from './PurpleCapTable';



class PointsTableRow {
	constructor (table, team) {
		this.table = table;
		this.team = team;
		this.matches = [];
		this.points = 0;
		this.wins = 0;
		this.losses = 0;
		this.noResults = 0;

		this.forRuns = 0;
		this.forBalls = 0;
		this.forWickets = 0;
		this.forRunrate = 0;

		this.vsRuns = 0;
		this.vsBalls = 0;
		this.vsWickets = 0;
		this.vsRunrate = 0;

		this.netNunrate = 0;
	}

	getForRunRate = () => this.forRunrate.toFixed(2);
	getVsRunRate = () => this.vsRunrate.toFixed(2);
	getNetRunRate = () => this.netRunrate.toFixed(2);

	getWinPercent = () => (this.wins * 100 / this.matches.length);
	getWinPercentF = (n=1) => this.getWinPercent().toFixed(n);
}

export default class PointsTable {
	constructor (tournament, matches) {
		// tournament, season, teams and grounds can have a points table
		this.tournament = tournament;
		this.matches = matches;

		const teamsObject = {}
		for (let match of this.matches) {
			teamsObject[match.team_a.id] = true;
			teamsObject[match.team_b.id] = true;
		}

		this.rows = [];
		Object.keys(teamsObject).forEach(teamId => this.rows.push(new PointsTableRow(this, this.tournament.teams[teamId])));

		this.matches.forEach(match => {
			this.rows.forEach(team => {
				if (match.team_a === team.team || match.team_b === team.team) {
					team.matches += 1;

					// adding points
					if (match.winner === null) {
						team.points += 1;
						team.noResults += 1;
					} else if (match.winner === team.team) {
						team.points += 2;
						team.wins += 1;
					} else if (match.loser === team.team) {
						team.losses += 1;
					}

					// adding runs, overs and wickets
					let forInning = null, vsInning = null;
					if (match.firstInning.team === team.team) {
						forInning = match.firstInning;
						vsInning = match.secondInning;
					} else {
						forInning = match.secondInning;
						vsInning = match.firstInning;
					}

					if (forInning && forInning.actuallyHappened()) {
						team.forRuns += forInning.runs;
						team.forBalls += forInning.allout ? 120 : forInning.balls;
						team.forWickets += forInning.wkts;
					}

					if (vsInning && vsInning.actuallyHappened()) {
						team.vsRuns += vsInning.runs;
						team.vsBalls += vsInning.allout ? 120 : vsInning.balls;
						team.vsWickets += vsInning.wkts;
					}
				}
			});
		});

		this.rows.forEach(row => {
			row.forRunrate = row.forRuns * 6 / row.forBalls;
			row.vsRunrate = row.vsRuns * 6 / row.vsBalls;
			row.netRunrate = row.forRunrate - row.vsRunrate;
		});

		this.rows.sort((a, b) => {
			if (a.points === b.points) return (b.netRunrate - a.netRunrate);
			return (b.points - a.points);
		});

		this.rows.forEach((team, index) => team.position = (index+1));
	}
}
