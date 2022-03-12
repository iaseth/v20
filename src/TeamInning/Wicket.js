
export default class Wicket {
	constructor (teamInning, jo) {
		this.teamInning = teamInning;
		this.batsman = teamInning.tournament.players[jo.id];
		this.over = jo.over;
		this.ball = jo.ball;
		this.runs = jo.r;
		this.wicket = jo.w;
	}

	setBatsmanInning (batsmanInning) {
		this.batsmanInning = batsmanInning;
	}
}
