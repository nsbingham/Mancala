(function(window){
	SeedBin = function(seedCount, owner, endBin){
		this.initialize(seedCount, owner, endBin);
	}

	var p = SeedBin.prototype;

	/**
	* Number of Seeds in bin
	* @property currentPlayerIndex
	* @type Number
	* @default 0
	**/
	p.seedCount = 0;

	/**
	* A reference to the player object that owns the Seedbin
	* @property currentPlayerIndex
	* @type Player
	* @default null
	**/

	p.owner = null;

	p.endBin = false; // Is this a collection bin

	/**
	* Add a seed to the bin. Increase seedCount.
	* @method addSeed
	* @return {Number} returns the new seedCount.
	**/
	p.addSeed = function() {
		p.seedCount += 1;
		return p.seedCount;
	}

	/**
	* Removes a seed to the bin. Increase seedCount.
	* @method addSeed
	* @return {Number} returns the new seedCount.
	**/
	p.removeSeed = function() {
		if(p.seedCount > 0){
			p.seedCount -= 1;
		} else {
			// do nothing
		}
		return p.seedCount;
	}

	/** 
	* Initialization method.
	* @method initialize
	* @protected
	*/
	p.initialize = function(seedCount, owner, endBin) {
		this.seedCount = seedCount;
		this.owner = owner;
		this.endBin = endBin;
	}

	window.SeedBin = SeedBin;

})(window);

(function(window){

	Player = function(playerName){
		this.initialize(playerName);
	}

	var p = Player.prototype;

	p.playerName = '';

	/** 
	* Initialization method.
	* @method initialize
	* @protected
	*/
	p.initialize = function(playerName) {
		log('initialize Player');
		this.playerName = playerName;
	}

	window.Player = Player;

})(window);

(function(window){
	var Rules = {
		totalBins : 14,
		seedsPerBin : 3,
		startingPlayerIndex : 0,
		numberOfPlayers : 2
	};

	window.Rules = Rules;

})(window);

(function(window){
	/**
	* A Mancala is an abstract class that represents the game board
	* @class Mancala
	* @constructor
	* @param 
	**/
	Mancala = function() {
	  this.initialize();
	}

	var p = Mancala.prototype;

	/**
	* Array to hold players
	* @property players
	* @type Array
	* @default []
	**/
	p.players = new Array();

	p.bins = new Array();

	/**
	* Position in array of current player
	* @property currentPlayerIndex
	* @type Number
	* @default 0
	**/
	p.currentPlayerIndex = 0;

	/**
	* Returns the value of the currentPlayerIndex in the players array
	* @method getCurrentPlayer
	* @return {String} a string representation of the instance.
	**/
	p.getCurrentPlayer = function() {
		return p.players[p.currentPlayerIndex];
	}

	/**
	* Switches the current player
	* @method getCurrentPlayer
	* @return {String} a string representation of the instance.
	**/
	p.switchPlayers = function() {
		if(p.currentPlayerIndex === 0) {
			p.currentPlayerIndex = 1;
		}
		else {
			p.currentPlayerIndex = 0;
		}
	}

	p.initializeBins = function(totalBins, seedsPerBin){
		var playerCount = this.players.length, i = totalBins, binsPerPlayer = totalBins / playerCount, currentPlayerIndex = 0;

		while (i--) {
			var endBin = false, seeds = seedsPerBin;

			if((i % binsPerPlayer) === 0) {
				endBin = true; // This is an end bin
				seeds = 0;
			}

			this.bins.push(new SeedBin(seeds, this.players[currentPlayerIndex], endBin));

			if((i % binsPerPlayer) === 0) {
				currentPlayerIndex++;
			}

		}

		log('Created ' + this.bins.length + ' bins');

	}

	p.initializePlayers = function(numberOfPlayers){
		var i = numberOfPlayers;

		while (i--) {
			var playerNameTmp = "Player " + (numberOfPlayers - i), playerName = prompt(playerNameTmp + ": Please enter your name.", playerNameTmp);

			this.players.push(new Player(playerName));
		}

		log('Created ' + this.players.length + ' players');
	}

	p.sowSeeds = function(startIndex, seedCount){
		// Starting with the supplied index increase each bin by 1 until you run out of seeds
		var i = seedCount, binIndex = startIndex;

		// Empty starting bin
		this.bins[startIndex].seedCount = 0;

		// Am I in the last bin?

		while(i++){
			this.bins[binIndex].seedCount + 1;
			binIndex++;

			if(binIndex > (this.bins.length - 1)) {
				binIndex = 0;
			}

		}

	}

	/** 
	* Initialization method.
	* @method initialize
	* @protected
	*/
	p.initialize = function() {
		log('initialize Mancala');
		this.initializePlayers(Rules.numberOfPlayers);
		this.initializeBins(Rules.totalBins, Rules.seedsPerBin);

		for (var i=0; i < this.bins.length; i++) {
			log(this.bins[i]);
		};

	}

	window.Mancala = Mancala;

})(window);

$(function(){
	var m = new Mancala();

	$('#switchPlayer').click(function(event){
		event.preventDefault();
		m.switchPlayers();
		log('currentPlayer is: ' + m.getCurrentPlayer());
	});
});