import BaseCapTable from './BaseCapTable';



export default class PurpleCapTable extends BaseCapTable {
	constructor (pointsTable) {
		super(pointsTable);

		this.performances = [];
		for (let match of this.pointsTable.matches) {
			this.performances = this.performances.concat(match.bowlingPerformances);
		}

		this.sortedPerformances = [...this.performances].sort((a, b) => {
			if (b.wickets === a.wickets) {
				return a.runs - b.runs;
			}
			return b.wickets - a.wickets;
		});
		this.top10Figures = this.sortedPerformances.slice(0, 10);
	}

	getTopNFigures = (n=10) => this.sortedPerformances.slice(0, n);
}

