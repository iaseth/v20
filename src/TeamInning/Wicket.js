
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
		// let type = batsmanInning.jo.out.type;
		// type is one of ['b', 'ct', 'ro', 'lbw', 'ret', 'st', 'ob', 'reto', 'hw']
		this.batsmanInning = batsmanInning;
	}
}
