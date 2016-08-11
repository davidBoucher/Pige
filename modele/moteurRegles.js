/**
 * Moteur permettant d'appliquer les règles d'une pige et d'assigner des résultats à tous les participants
 */
var logger = require('../config/logger');

/**
 * Constructeur
 * @param une liste d'objets Participants
 */
function MoteurRegles() {
	this.participants;
	this.nombreEssais = 1;
}

/**
 * Valide si la pige peut être effectuée avec les participants actuels
 * @returns true si la pige est valide ou une exception sinon
 */
MoteurRegles.prototype.validerPige = function() {
	return true;
};

/**
 * Valide les résultats de la pige
 * @returns true si la pige est valide, false sinon
 */
MoteurRegles.prototype.validerResultats = function() {
	for (var i = 0; i < this.participants.length; ++i) {
		if(this.participants[i].getParticipantPige() === null) {
			return false;
		}
	}
	return true;
};


/**
 * Applique les règles de filtres des candidats.
 * 
 * @param participant le participant actuel qui s'apprête à piger
 * @param candidatsRestants la liste de candidats à filtrer
 * @returns une liste de Participants valides pour la pige
 */
MoteurRegles.prototype.appliquerRegles = function(participant, candidatsRestants) {
	return candidatsRestants;
};

/**
 * Pige et assigne un participant pour membre des participants.
 * Vérifie si le lot de participants est approprié. 
 * @param participants la liste de Participants pour qui piger 
 * @returns la liste de Participants
 */
MoteurRegles.prototype.assignerPige = function(participants) {

	this.participants = participants;
	
	this.validerPige();

	logger.debug("Début du processus de pige");

	var i = 0;
	do {
		logger.debug("Nouvelle pige");
		this.piger();
		++i;
	} while (i <= this.nombreEssais && !this.validerResultats())

	if (i > this.nombreEssais) {
		throw ('Impossible de trouver une solution dans le nombre d\'essais alloués');
	}
		
	logger.info("Pige complétée");

	return this.participants;
};

MoteurRegles.prototype.piger = function() {
	// On commence avec tous les participants disponibles
	var candidatsRestants = this.participants.slice(0); // copie l'original  
	
	for (var i = 0; i < this.participants.length; ++i) {
		
		// On filtre la liste des candidats selon les règles du moteur
		var candidatsValides = this.appliquerRegles(this.participants[i], candidatsRestants);
		
		// Pige un candidat parmis les candidats valides
		var candidatChoisi = candidatsValides[Math.floor(Math.random() * candidatsValides.length)];
		
		// Assigne le candidat choisi
		this.participants[i].setParticipantPige(candidatChoisi);
		
		// Retire le candidat choisi de la liste
		candidatsRestants.splice(candidatsRestants.indexOf(candidatChoisi), 1);
		
		if(candidatChoisi) {
			logger.debug(this.participants[i].getNom() + " a pigé " + candidatChoisi.getNom());
		}
			
	}
};

module.exports = MoteurRegles;
