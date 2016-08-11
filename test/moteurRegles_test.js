var assert = require('assert');
var MoteurRegles = require('../modele/moteurRegles'), moteurRegles;
var Participant = require('../modele/participant'), participants;

beforeEach(function() {
	participants = [];
	participants.push(new Participant("Bob"));
	participants.push(new Participant("Jane"));
	participants.push(new Participant("Claire"));
	participants.push(new Participant("David"));
	participants.push(new Participant("Eric"));

	moteurRegles = new MoteurRegles();
});


describe('MoteurRegles', function() {

	describe('#constructeur()', function() {

		it('devrait créer un moteur de règles',
			function() {
				// test trivial pour s'assurer que la création fonctionne
				assert.notEqual(null, moteurRegles); 
			});
	
	});
	
	describe('#assignerPige()', function() {
		
		it('devrait assigner un résultat de pige à chaque candidat',
			function() {
			
				var resultats = moteurRegles.assignerPige(participants);
				var candidatsPiges = [];
				
				resultats.map(function(e) {
					assert.notEqual(null, e.getParticipantPige());
				});
			});
		
		it('ne devrait pas assigner un résultat plus d\'une fois',
				function() {
				
					var resultats = moteurRegles.assignerPige(participants);
					var candidatsPiges = [];
					
					resultats.map(function(e) {
						assert.equal(-1, candidatsPiges.indexOf(e.getParticipantPige()), e.getParticipantPige().getNom() + ' a été pigé plus d\'une fois');
						candidatsPiges.push(e.getParticipantPige());
					});
				});
	
	});

});

