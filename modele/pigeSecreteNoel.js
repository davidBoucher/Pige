/**
 * Extension de la classe moteurRegles pour appliquer les règles de
 * la pige secrète chez la famille Brault
 */
var logger = require('../config/logger');
var MoteurRegles = require('./moteurRegles');

/**
 * Constructeur
 * @param une liste d'objets Participants
 */
function PigeSecreteNoel() {
	
	MoteurRegles.call(this);
	this.nombreEssais = 100;
}

PigeSecreteNoel.prototype = Object.create(MoteurRegles.prototype);

PigeSecreteNoel.prototype.constructor = MoteurRegles;

/**
 * Valide si la pige peut être effectuée avec les participants actuels:
 * 0-1 participants: Trop peu de participants
 * 2-3 participants: Seulement s'il n'y a pas de couple
 * 4+ participants: valide
 * @returns true si la pige est valide ou une exception sinon
 */
PigeSecreteNoel.prototype.validerPige = function() {
	
	if(this.participants.length < 2) {
		logger.warn("On ne peut piger avec moins de 2 participants.");
		throw new Error("Pas assez de participants");
		
	} else if(this.participants.length < 4) {
		for (var i = 0; i < this.participants.length; ++i) {
			if(this.participants[i].getConjoint() !== null) {
				logger.warn("On ne peut piger à 2 ou 3 participants avec des conjoints.");
				throw new Error("Conjoints identifiés dans un groupe trop petit");
			}
		}
		
	}
	
	// Sinon la pige est valide
	return true;
};


/**
 * Applique les règles de filtres des candidats:
 * 1) On ne peut se piger soi-même
 * 2) On ne peut piger son conjoint
 * 
 * @param participant le participant actuel qui s'apprête à piger
 * @param candidatsRestants la liste de candidats à filtrer
 * @returns une liste de Participants valides pour la pige
 */
PigeSecreteNoel.prototype.appliquerRegles = function(participant, candidatsRestants) {
	
	var candidatsInvalides = []; 
	
	// Algorithme simple, sûrement pas le plus efficace mais donnes des résultats
	
	candidatsInvalides.push(participant); // Règle 1
	candidatsInvalides.push(participant.getConjoint()); // Règle 2

	var candidatsFiltres = candidatsRestants.filter(function(candidat) {
		return candidatsInvalides.indexOf(candidat) < 0; //note: indexOf pas supporté sur IE 7 et 8
	});
	
	return candidatsFiltres;
};

/**
 * Valide les résultats de la pige
 * @returns true si la pige est valide, false sinon
 */
PigeSecreteNoel.prototype.validerResultats = function() {
	var participantsPiges = [];
	for (var i = 0; i < this.participants.length; ++i) {
		var p = this.participants[i];
		if (p.getParticipantPige() === null 
				|| p === p.getParticipantPige() 
				|| p.getParticipantPige() === p.getConjoint() 
				|| participantsPiges.indexOf(p.getParticipantPige()) != -1)
			return false;
		else {
			participantsPiges.push(p.getParticipantPige());
		}
	}
	return true;
}


module.exports = PigeSecreteNoel;