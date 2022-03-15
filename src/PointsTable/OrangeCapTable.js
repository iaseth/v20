import BaseCapTable from './BaseCapTable';



export default class OrangeCapTable extends BaseCapTable {
	constructor (pointsTable) {
		super(pointsTable);

		this.performances = [];
		for (let match of this.pointsTable.matches) {
			this.performances = this.performances.concat(match.battingPerformances);
		}

		// removed dnb performances
		this.performances = this.performances.filter(b => !b.dnb);
		this.sortedPerformances = [...this.performances].sort((a, b) => (b.runs - a.runs));
		this.top10Scores = this.sortedPerformances.slice(0, 10);
	}

	getTopNScores = (n=10) => this.sortedPerformances.slice(0, n);
}

