var assert = require('assert');
var PigeSecreteNoel = require('../modele/pigeSecreteNoel');
var Participant = require('../modele/participant'), participants;

function verificationResultats(e) {
	// Les participants ne devraient pas se piger eux-même ou leur conjoint
	if (e.getParticipantPige()) {
		assert.notEqual(e, e.getParticipantPige(), e.getNom() + ' s\'est pigé lui-même');
		assert.notEqual(e.getConjoint(), e.getParticipantPige(), e.getNom() + ' a pigé son conjoint');
	}
}

/**
 * Petit utilitaire: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function resetTest(participants) {
	for (var i =0; i < participants.length; ++i) {
		participants[i].setParticipantPige(null);
	}
	return participants;
}

describe('PigeSecreteNoel', function() {

	describe('#constructeur()', function() {

		// test un peu trivial
		it('devrait créer une pige de noel',
			function() {
				participants = [];
				participants.push(new Participant("Bob"));
				participants.push(new Participant("Jane"));
	
				var pigeSecreteNoel = new PigeSecreteNoel();
				assert.notEqual(null, pigeSecreteNoel); 
			});
	
	});
	
	describe('#validerPige()', function() {
		
		it('ne devrait pas valider une liste de 0 participants',
				function() {
					participants = [];
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.throws(function() {pigeSecreteNoel.validerPige();}, Error, 'Pas assez de participants');
				});
		
		it('ne devrait pas valider une liste de 1 seul participant',
				function() {
					participants = [];
					participants.push(new Participant("Bob"));
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.throws(function() {pigeSecreteNoel.validerPige();}, Error, 'Pas assez de participants');
				});
		
		it('ne devrait pas valider une liste de 2 ou 3 participants avec des conjoints',
				function() {
					participants = [];
					var Bob = new Participant("Bob");
					var Jane = new Participant("Jane");
					Bob.setConjoint(Jane);
					Jane.setConjoint(Bob);
					participants.push(Bob);
					participants.push(Jane);
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.throws(function() {pigeSecreteNoel.validerPige();}, Error, 'Conjoints identifiés dans un groupe trop petit');
				});
		
		it('devrait valider une liste de 2 ou 3 participants sans conjoints',
				function() {
					participants = [];
					participants.push(new Participant("Bob"));
					participants.push(new Participant("Jane"));
					participants.push(new Participant("Claire"));
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.equal(true, pigeSecreteNoel.validerPige());
				});
		
		it('devrait valider une liste de 4 participants et plus',
				function() {
					participants = [];
					var Bob = new Participant("Bob");
					var Jane = new Participant("Jane");
					Bob.setConjoint(Jane);
					Jane.setConjoint(Bob);
					participants.push(Bob);
					participants.push(Jane);
					participants.push(new Participant("Claire"));
					participants.push(new Participant("David"));
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.equal(true, pigeSecreteNoel.validerPige()); // exactement 4
					
					participants = [];
					participants.push(new Participant("Bob"));
					participants.push(new Participant("Jane"));
					participants.push(new Participant("Claire"));
					participants.push(new Participant("David"));
					participants.push(new Participant("Eric"));
					participants.push(new Participant("Bill"));
					participants.push(new Participant("Joe"));
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.equal(true, pigeSecreteNoel.validerPige()); // plus de 4
				});
		
	});
	
	
	describe('#validerResultats()', function() {
		
		it('devrait retourner true si la pige est valide',
			function() {
				participants = [];
				var Bob = new Participant("Bob");
				var Jane = new Participant("Jane");
				Bob.setParticipantPige(Jane);
				Jane.setParticipantPige(Bob);
				participants.push(Bob);
				participants.push(Jane);
				
				var pigeSecreteNoel = new PigeSecreteNoel();
				pigeSecreteNoel.participants = participants;
				assert.equal(true, pigeSecreteNoel.validerResultats());
		});
		
		it('devrait retourner false si un participant n\'a pas de résultats',
				function() {
					participants = [];
					var Bob = new Participant("Bob");
					var Jane = new Participant("Jane");
					Bob.setParticipantPige(Jane);
					participants.push(Bob);
					participants.push(Jane);
					
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.equal(false, pigeSecreteNoel.validerResultats());
			});
		
		it('devrait retourner false si un participant s\'est pigé',
			function() {
				participants = [];
				var Bob = new Participant("Bob");
				var Jane = new Participant("Jane");
				Bob.setParticipantPige(Bob);
				Jane.setParticipantPige(Bob);
				participants.push(Bob);
				participants.push(Jane);
				
				var pigeSecreteNoel = new PigeSecreteNoel();
				pigeSecreteNoel.participants = participants;
				assert.equal(false, pigeSecreteNoel.validerResultats());
		});
		
		it('devrait retourner false si un participant a pigé son conjoint',
			function() {
				participants = [];
				var Bob = new Participant("Bob");
				var Jane = new Participant("Jane");
				Bob.setConjoint(Jane);
				Jane.setConjoint(Bob);
				Bob.setParticipantPige(Jane);
				Jane.setParticipantPige(Bob);
				participants.push(Bob);
				participants.push(Jane);
				
				var pigeSecreteNoel = new PigeSecreteNoel();
				pigeSecreteNoel.participants = participants;
				assert.equal(false, pigeSecreteNoel.validerResultats());
		});
		
		it('devrait retourner false si un participant a été pigé plusieurs fois',
				function() {
					participants = [];
					var Bob = new Participant("Bob");
					var Jane = new Participant("Jane");
					var Claire = new Participant("Claire");
					Bob.setParticipantPige(Jane);
					Jane.setParticipantPige(Bob);
					Claire.setParticipantPige(Jane);
					participants.push(Bob);
					participants.push(Jane);
					participants.push(Claire);
					
					var pigeSecreteNoel = new PigeSecreteNoel();
					pigeSecreteNoel.participants = participants;
					assert.equal(false, pigeSecreteNoel.validerResultats());
			});
	
	});
	
	describe('#assignerPige()', function() {
		
		it('devrait assigner un résultat de pige valide à chaque candidat',
			function() {
			
				participants = [];
				var Bob = new Participant("Bob");
				var Jane = new Participant("Jane");
				Bob.setConjoint(Jane);
				Jane.setConjoint(Bob);
				
				var Claire = new Participant("Claire");
				var David = new Participant("David");
				Claire.setConjoint(David);
				David.setConjoint(Claire);
				
				participants.push(Bob);
				participants.push(Jane);
				participants.push(Claire);
				participants.push(David);
				participants.push(new Participant("Eric"));
				participants.push(new Participant("Bill"));
				participants.push(new Participant("Joe"));
				
				// On teste un large nombre de fois pour s'assurer d'attraper les cas spéciaux
				for (var i = 0; i < 20; ++i) {
					
					participants = resetTest(participants);
					
					// melange la source
					participants = shuffleArray(participants);
					
					var pigeSecreteNoel = new PigeSecreteNoel();
					var resultats = pigeSecreteNoel.assignerPige(participants);
					
					resultats.map(verificationResultats);
				}
				
			});
		
		//TODO test avec un énorme lot de données. Il faudrait une méthode d'importation de masse et c'est un peu hors contexte
	});

});