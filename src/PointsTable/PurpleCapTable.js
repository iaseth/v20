import BaseCapTable from './BaseCapTable';



export default class PurpleCapTable extends BaseCapTable {
	constructor (pointsTable) {
		super(pointsTable);

		this.bowlingPerformances = [];
		for (let match of this.pointsTable.matches) {
			this.bowlingPerformances = this.bowlingPerformances.concat(match.bowlingPerformances);
		}

		this.sortedBowlingPerformances = [...this.bowlingPerformances].sort((a, b) => {
			if (b.wickets === a.wickets) {
				return a.runs - b.runs;
			}
			return b.wickets - a.wickets;
		});
		this.top10BowlingPerformances = this.sortedBowlingPerformances.slice(0, 10);
	}
}

