var assert = require('assert');
var Pige = require('../modele/pige'), pige;

beforeEach(function(){
	pige = new Pige(); 
});

describe('Pige', function() {

	describe('#inscription()', function() {
			
		it('devrait ajouter un participant au groupe de pige',
				function() {
					assert.equal('Bob', pige.inscription('Bob').getNom());
					assert.equal(1, pige.participants.length);
				});
		
		it('ne devrait pas ajouter un partipant avec un nom illégal (vide)',
				function() {
					assert.throws(pige.inscription, Error, 'Nom invalide');
					assert.throws(function() {pige.inscription('');}, Error, 'Nom invalide');
					assert.throws(function() {pige.inscription(null);}, Error, 'Nom invalide');
					assert.throws(function() {pige.inscription(undefined);}, Error, 'Nom invalide');				
				});
		
		it('ne devrait pas ajouter un participant avec un nom déjà enregistré',
				function() {
					pige.inscription('Bob');
					assert.throws(function() {pige.inscription('Bob')}, Error, 'Participant déjà inscrit');		
				});
		
	});
	
	describe('#corrigeNomParticipant()', function() {
		
		it('devrait corriger le nom d\'un participant existant',
				function() {
					pige.inscription('Bob');
					pige.corrigeNomParticipant('Bob', 'John');
					assert.equal('John', pige.participants[0].getNom());
				});
		
		it('ne devrait pas corriger un participant avec un nouveau nom illégal (vide)',
				function() {
					pige.inscription('Bob');
					assert.throws(pige.corrigeNomParticipant, Error, 'Nom invalide');
					assert.throws(function() {pige.corrigeNomParticipant('Bob', '');}, Error, 'Nom invalide');
					assert.throws(function() {pige.corrigeNomParticipant('Bob', null);}, Error, 'Nom invalide');
					assert.throws(function() {pige.corrigeNomParticipant('Bob', undefined);}, Error, 'Nom invalide');
				});
		
		it('devrait avertir lorsque le nom du participant à corriger n\'existe pas',
				function() {
					assert.throws(function() {pige.corrigeNomParticipant('Bob', '')}, Error, 'Participant introuvable');
				});
		
	});
	
	describe('#associerConjoints()', function() {
		
		it('devrait associer les deux conjoints',
				function() {
					var Bob = pige.inscription('Bob');
					var Jane = pige.inscription('Jane');
					pige.associerConjoints('Bob', 'Jane');
					assert.equal(Bob, Jane.getConjoint());
					assert.equal(Jane, Bob.getConjoint());
				});
		
		it('devrait retourner une erreure si un des participants n\'est pas inscrit',
				function() {
					pige.inscription('Bob');
					assert.throws(function() {pige.associerConjoints('Bob', 'Jane');}, Error, /Participant introuvable/);
					assert.throws(function() {pige.associerConjoints('Jane', 'Bob');}, Error, /Participant introuvable/);
					assert.throws(function() {pige.associerConjoints('Joe', 'Jane');}, Error, /Participant introuvable/);
					assert.throws(function() {pige.associerConjoints(null, null);}, Error, /Participant introuvable/);
					assert.throws(function() {pige.associerConjoints('', '');}, Error, /Participant introuvable/);
					assert.throws(function() {pige.associerConjoints(undefined, undefined);}, Error, /Participant introuvable/);
				});
		
	});
	
	describe('#participantInscrit()', function() {
		
		it('devrait retourner false quand un participant cherché n\'est pas inscrit',
				function() {
					assert.equal(false, pige.participantInscrit('Joe'));
				});
		
		it('devrait retourner true quand un participant cherché est inscrit',
				function() {
					pige.inscription('Bob');
					assert.equal(true, pige.participantInscrit('Bob'));
				});
		
	});

	describe('#chercheParticipant()', function() {
		
		it('devrait retourner le participant s\'il est inscrit',
				function() {
					var Bob = pige.inscription('Bob');
					assert.equal(Bob, pige.chercheParticipant('Bob'));
				});
		
		it('devrait retourner null si le participant cherché n\'est pas inscrit',
				function() {
					assert.equal(null, pige.chercheParticipant('Joe'));
				});
		
	});
	
	describe('#obtenirResultat()', function() {
		
		it('devrait retourner le nom du participant pigé',
				function() {
					var Bob = pige.inscription('Bob');
					var Jane = pige.inscription('Jane');
					Bob.setParticipantPige(Jane);
					assert.equal(Jane, pige.obtenirResultat('Bob'));
				});
		
		it('devrait retourner null si le participant cherché n\'est pas inscrit',
				function() {
					assert.equal(null, pige.obtenirResultat('Joe'));
				});
		
	});
	
	
	
//	describe('#reset()', function() {
//		
//		it('devrait relancer toute la pige',
//				function() {
//					pige.inscription('Bob');
//					pige.inscription('Joe');
//					pige.inscription('Jane');
//					pige.reset();
//					assert.equal(false, pige.participantInscrit('Bob'));
//					assert.equal(false, pige.participantInscrit('Joe'));
//					assert.equal(false, pige.participantInscrit('Jane'));
//				});
//		
//	});
	
});
