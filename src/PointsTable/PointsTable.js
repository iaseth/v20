import OrangeCapTable from './OrangeCapTable';
import PurpleCapTable from './PurpleCapTable';



class PointsTableRow {
	constructor (table, team) {
		this.table = table;
		this.team = team;
		this.matches = [];
		this.forInnings = [];
		this.vsInnings = [];
		this.batsFirst = 0;
		this.bowlsFirst = 0;
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
			this.rows.forEach(row => {
				if (match.team_a === row.team || match.team_b === row.team) {
					row.matches += 1;

					// adding points
					if (match.winner === null) {
						row.points += 1;
						row.noResults += 1;
					} else if (match.winner === row.team) {
						row.points += 2;
						row.wins += 1;
					} else if (match.loser === row.team) {
						row.losses += 1;
					}

					// adding runs, overs and wickets
					let forInning = null, vsInning = null;
					if (match.firstInning.team === row.team) {
						row.batsFirst += 1;
						forInning = match.firstInning;
						vsInning = match.secondInning;
					} else {
						row.bowlsFirst += 1;
						forInning = match.secondInning;
						vsInning = match.firstInning;
					}

					if (forInning && forInning.actuallyHappened()) {
						row.forInnings.push(forInning);
						row.forRuns += forInning.runs;
						row.forBalls += forInning.allout ? 120 : forInning.balls;
						row.forWickets += forInning.wkts;
					}

					if (vsInning && vsInning.actuallyHappened()) {
						row.vsInnings.push(vsInning);
						row.vsRuns += vsInning.runs;
						row.vsBalls += vsInning.allout ? 120 : vsInning.balls;
						row.vsWickets += vsInning.wkts;
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

		this.rows.forEach((row, index) => row.position = (index+1));
	}
}
