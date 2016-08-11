var assert = require('assert');
var Participant = require('../modele/participant');

describe('Participant', function() {

	describe('#constructeur()', function() {

		it('devrait créer un participant avec le nom fournit',
				function() {
					var participant = new Participant("Bob");
					assert.equal('Bob', participant.getNom())
				});
		
		// les autres fonctions sont triviales
		
	});

});