var logger = require('./config/logger');
var readline = require('readline');
var Pige = require('./modele/pige'), pige;
var PigeSecreteNoel = require('./modele/pigeSecreteNoel');

pige = new Pige();

var rl = readline.createInterface({
	input : process.stdin,
	output : process.stdout
});


function validerAdmin(id, pass) {
	// Pour le test, on assume que tous est valide..
	console.log("Bonjour " + id + ", vous pouvez: \n" +
		"inscrire [nom participant] \n" +
		"corrigerParticipant [ancien nom] [nouveau nom] \n" +
		"chercherParticipant [nom participant] \n" +
		"associerConjoints [premier participant] [second participant] \n" +
		"lancerPige \n" +
		"obtenirResultat [nom participant] \n" +
		"quitter");
	rl.prompt();
}

function quitter() {
	console.log("Fermeture de la pige.");
	process.exit(0);
}

function bienvenue() {
	console.log("Bienvenue dans l'interface de pige.");
	var id;
	var pass;
	rl.question('Veuillez entrer votre identifiant:', function(rep) {
		id = rep;
		rl.question('Veuillez entrer votre mot de passe:', function(rep) {
			pass = rep;
			validerAdmin(id, pass);
		});
	});
}


rl.on('line', function(commande) {
	commande = commande.trim().split(' ');

	var operation = commande[0];

	switch (operation) {
	case 'inscrire':
		logger.info('cmd utilisateur: inscrire');
		if(commande.length > 1) {
			try {
				pige.inscription(commande[1]);
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("Veuillez inscire le nom du participant après la commande.");
		}
		break;
	case 'corrigerParticipant':
		logger.info('cmd utilisateur: corrigerParticipant');
		if(commande.length > 2) {
			try {
				pige.corrigeNomParticipant(commande[1], commande[2]);
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("Veuillez inscire l'ancien et le nouveau nom du participant après la commande.");
		}
		break;
	case 'chercherParticipant':
		logger.info('cmd utilisateur: chercherParticipant');
		if(commande.length > 1) {
			try {
				console.log(pige.chercheParticipant(commande[1]));
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("Veuillez inscire le nom du participant après la commande.");
		}
		break;
	case 'associerConjoints':
		logger.info('cmd utilisateur: associerConjoints');
		if(commande.length > 2) {
			try {
				pige.associerConjoints(commande[1], commande[2]);
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("Veuillez inscire le nom des deux participants après la commande.");
		}
		break;
	case 'lancerPige':
		logger.info('cmd utilisateur: lancerPige');
		try {
			pige.lancePige(new PigeSecreteNoel());
		} catch (e) {
			console.log(e);
		}
		break;
	case 'obtenirResultat':
		logger.info('cmd utilisateur: obtenirResultat');
		if(commande.length > 1) {
			try {
				var resultat = pige.obtenirResultat(commande[1]);
				console.log(resultat === undefined ? 'aucun' : resultat);
			} catch (e) {
				console.log(e);
			}
		} else {
			console.log("Veuillez inscire le nom du participant après la commande.");
		}
		break;
	case 'quitter':
		logger.info('cmd utilisateur: quitter');
		quitter();
		break;
	default:
		console.log('Commande inconnue');
		break;
	}

	rl.prompt();
});

rl.on('close', function() {
	console.log('Session terminée.');
	process.exit(0);
});

bienvenue();