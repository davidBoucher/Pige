/**
 * Prépare un logger pour l'application.
 */
var winston = require('winston');
var fs = require('fs');

// Devraient être lus depuis la configuration de l'environnement
var repertoireLogs = './logs';
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = 'dev'; //bad mais sauve du temps
}

// Essaie de créer le répertoire s'il n'existe pas
if (!fs.existsSync(repertoireLogs)) {
	fs.mkdirSync(repertoireLogs);
}

// Configuration pour environnement Test
winston.loggers.add('test', {
	console : {
		level : 'error',
		colorize : 'true',
		label : 'Pige API'
	},
	file : {
		filename : repertoireLogs + '/test.log',
		level : 'error',
	}
});

// Configuration pour environnement dev
winston.loggers.add('dev', {
	console : {
		level : 'silly',
		colorize : 'true',
		label : 'Pige API'
	},
	file : {
		filename : repertoireLogs + '/dev.log',
		level : 'warn',
	}
});
// autres environnements: Integration, QA, PROD, etc. seraient configurés ici

// Intance singleton à utiliser partout.
var logger = winston.loggers.get(process.env.NODE_ENV);

module.exports = logger;