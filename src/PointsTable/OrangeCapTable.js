import BaseCapTable from './BaseCapTable';



export default class OrangeCapTable extends BaseCapTable {
	constructor (pointsTable) {
		super(pointsTable);

		this.battingPerformances = [];
		for (let match of this.pointsTable.matches) {
			this.battingPerformances = this.battingPerformances.concat(match.battingPerformances);
		}

		// removed dnb battingPerformances
		this.battingPerformances = this.battingPerformances.filter(b => !b.dnb);
		this.sortedBattingPerformances = [...this.battingPerformances].sort((a, b) => (b.runs - a.runs));
		this.top10BattingPerformances = this.sortedBattingPerformances.slice(0, 10);
	}
}

