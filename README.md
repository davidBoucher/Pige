
# Pige

Système simulant une pige de Noel au hasard parmi les participants.

## Usage

Pour utiliser l'invite de commandes:
(On assume que vous êtes l'administrateur de la plate-forme. )
* Installer nodejs: https://nodejs.org/en/download/
* Ouvrir une invite de commande à la racine du projet. Exécuter:
- npm install (la première fois seulement)
- node API

À noter: il n'y a pas d'utilisateur/mot de passe vérifiés, vous pouvez inscrire n'importe quoi.

Exemple de session:

inscrire Bob
inscrire Jane
inscrire David
inscrire Claire
inscrire Eric
inscrire Bill
inscrire Joe
associerConjoints Bob Jane
associerConjoints David Claire
lancerPige
obtenirResultat Bob
obtenirResultat Jane
obtenirResultat David
obtenirResultat Claire
obtenirResultat Eric
obtenirResultat Bill
obtenirResultat Joe

Pour les tests unitaires, ouvrir une invite de commande dans le répertoire test. Exécuter:
- npm test

## Developing

Fonctionnalités intéressantes à ajouter:
- Localisation des textes, messages d'erreur, etc. (pour changer facilement de langue).
- Persistence des données (pour l'instant elles ne sont conservées qu'aussi longtemps que l'application est exécutée).
- Importation massive de données initiales (via un fichier texte par exemple).
- Envoi des pairages par textos/courriel aux participants. Collectes de leur méthode d'envoi favorite.
- Ajout de nouvelles règles telles que: empêcher de piger la même personne que l'année dernière
- Ajouter un montant d'argent à la pige (exemple environ 50$) et le communiquer aux participants lorsqu'ils consultent leurs résultats.
- Renforcer le système pour permettre un influx massif de participant (pour l'instant on assume des familles de tailles normales donc la limite est hors contexte)
- Interface Web pour affichage et requêtes en mode service.
- Tests d'intégration
- Builds automatisés

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
