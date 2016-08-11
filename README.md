
# Pige

Syst�me simulant une pige de Noel au hasard parmi les participants.

## Usage

Pour utiliser l'invite de commandes:
(On assume que vous �tes l'administrateur de la plate-forme. )
* Installer nodejs: https://nodejs.org/en/download/
* Ouvrir une invite de commande � la racine du projet. Ex�cuter:
- npm install (la premi�re fois seulement)
- node API

� noter: il n'y a pas d'utilisateur/mot de passe v�rifi�s, vous pouvez inscrire n'importe quoi.

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

Pour les tests unitaires, ouvrir une invite de commande dans le r�pertoire test. Ex�cuter:
- npm test

## Developing

Fonctionnalit�s int�ressantes � ajouter:
- Localisation des textes, messages d'erreur, etc. (pour changer facilement de langue).
- Persistence des donn�es (pour l'instant elles ne sont conserv�es qu'aussi longtemps que l'application est ex�cut�e).
- Importation massive de donn�es initiales (via un fichier texte par exemple).
- Envoi des pairages par textos/courriel aux participants. Collectes de leur m�thode d'envoi favorite.
- Ajout de nouvelles r�gles telles que: emp�cher de piger la m�me personne que l'ann�e derni�re
- Ajouter un montant d'argent � la pige (exemple environ 50$) et le communiquer aux participants lorsqu'ils consultent leurs r�sultats.
- Renforcer le syst�me pour permettre un influx massif de participant (pour l'instant on assume des familles de tailles normales donc la limite est hors contexte)
- Interface Web pour affichage et requ�tes en mode service.
- Tests d'int�gration
- Builds automatis�s

### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.
