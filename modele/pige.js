var logger = require('../config/logger');

/**
 * Représentation d'une pige.
 */
// Constructeur
function Pige() {
	this.participants = [];
	this.montant = null; //TODO
}

Pige.prototype.getParticipants = function() {
	return this.participants;
}

/**
 * Inscrit un nouveau participant à la pige.
 * @param nom le nom du participant à inscrire
 * @return le participant créé
 */
Pige.prototype.inscription = function(nom) {
	
	validerNom(nom);
	
	if(this.participantInscrit(nom)) {
		throw new Error('Participant déjà inscrit');	
	}	

	var Participant = require('./participant');
	var participant = new Participant(nom);

	this.participants.push(participant);

	logger.info('Nouveau participant inscrit: ' + participant.toString());
	
	return participant;
};

/**
 * Corrige le nom d'un participant.
 * Par expérience, ce genre de fonctions sont nécessaire pour un administrateur...
 * @param nom l'ancien nom du participant (à corriger)
 * @param le nouveau nom du participant
 */
Pige.prototype.corrigeNomParticipant = function(ancienNom, nouveauNom) {
	
	validerNom(nouveauNom);
	
	var changement = false;
	
	for (var i = 0; i < this.participants.length; ++i) {
		if (ancienNom === this.participants[i].getNom()) {
			this.participants[i].setNom(nouveauNom);
			changement = true;
			logger.info('Le participant: ' + ancienNom + ' est maintenant renommé: ' + nouveauNom);
		}
	}

	if(!changement) {
		logger.warn('Le participant: ' + ancienNom + ' n\'est pas listé dans la pige.');
		throw new Error('Participant introuvable');
	}
		
};

//TODO fonction retirerParticipant

/**
 * Associe des participants comme conjoints
 * @param le nom du premier participant
 * @param le nom du second participant
 */
Pige.prototype.associerConjoints = function (premier, second) {
	
	var premierParticipant = this.chercheParticipant(premier)	
	if(!premierParticipant) {
		throw new Error("Participant introuvable: " + premier);
	}
	
	var secondParticipant = this.chercheParticipant(second)
	if(!secondParticipant) {
		throw new Error("Participant introuvable: " + second);
	}
	
	premierParticipant.setConjoint(secondParticipant);
	secondParticipant.setConjoint(premierParticipant);
	
	logger.info("Conjoints associés: " + premierParticipant.getNom() + ' et ' + secondParticipant.getNom());
}

/**
 * Indique si un participant est inscrit à la pige
 * @param nom le nom du participant à chercher
 */
Pige.prototype.participantInscrit = function(nom) {

	for (var i = 0; i < this.participants.length; ++i) {
		if (nom === this.participants[i].getNom()) {
			return true;
		}
	}

	return false;
};

/**
 * Trouve un participant dans la pige
 * @param nom le nom du participant à chercher
 * @return le participant s'il existe ou null s'il n'existe pas
 */
Pige.prototype.chercheParticipant = function(nom) {

	for (var i = 0; i < this.participants.length; ++i) {
		if (nom === this.participants[i].getNom()) {
			return this.participants[i];
		}
	}

	return null;
};


/**
 * Donne le nom du participant pigé d'un participant passé en paramètre
 * @param nom du participant qui veut l'information
 * @return nom du partipant pigé ou null si le nom est invalide
 */
Pige.prototype.obtenirResultat = function(nom) {

	for (var i = 0; i < this.participants.length; ++i) {
		if (nom === this.participants[i].getNom()) {
			if(this.participants[i].getParticipantPige()) {
				return this.participants[i].getParticipantPige().getNom();
			}
		}
	}

};

/**
 * Pige un nom semi-aléatoire pour chaque participant.
 * Applique un lot de règles sur les choix possibles.
 * Une fois exécuté, tous les participants de la pige auront un participantPige
 * @param moteurRegles un moteur de règles pour gérer le type de pige à effectuer.
 */
Pige.prototype.lancePige = function(moteurRegles) {
	this.participants = moteurRegles.assignerPige(this.participants);
};


//TODO
///**
// * Reinitialise la pige en entier
// */
//Pige.prototype.reset = function() {
//};

/**
 * Affiche tous les détails des participants de la pige en texte lisible.
 * Utile surtout au débuggage.
 * @return un texte avec tous les détails sur la pige
 */
Pige.prototype.toString = function() {

	var resultat;
	
	for (var i = 0; i < this.participants.length; ++i) {
		resultat += this.participants[i].toString() + "\n";
	}

	return resultat;
};

/**
 * Utilitaire pour valider l'id d'un participant (son nom)
 */
function validerNom(nom) {
	if (nom === null || nom === ""  || nom === undefined) {
		throw new Error('Nom invalide');
	}
}

module.exports = Pige;