/**
 * Représentation d'un participant.
 */

// Constructeur
function Participant(nom) {
	this.nom = nom;
	this.conjoint = null;
	this.participantPige = null; // pour resultat de la pige
}

Participant.prototype.getNom = function() {
	return this.nom;
};

Participant.prototype.setNom = function(nouveauNom) {
	this.nom = nouveauNom;
};

Participant.prototype.setConjoint = function(conjoint) {
	this.conjoint = conjoint;
};

Participant.prototype.getConjoint = function() {
	return this.conjoint;
};

Participant.prototype.getParticipantPige = function() {
	return this.participantPige;
};

Participant.prototype.setParticipantPige = function(participantPige) {
	this.participantPige = participantPige;
};

Participant.prototype.toString = function() {
	var affichage = "Nom: " + this.nom;
	if (this.conjoint) {
		affichage += ", conjoint: " + this.conjoint.getNom();
	}
	if (this.participantPige) {
		affichage += ", participant pigé: " + this.participantPige.getNom();
	}
	return affichage;
};


module.exports = Participant;