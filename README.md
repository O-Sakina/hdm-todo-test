ilitialisation et mise en place du projet
associé le projet avec mon github
créer une base de donnée (hdmtestdev) dans Mysql Workbench

Modification du backend:  
* modifier le fichier: configuration de la variable database_url pour connecter prisma à la base de donnée local
*migration prisma: Exécution des migration pour créer la table Task dans ma base de donnée
utilisation de Potsman pour tester le post /get, et vérifier que les taches étaient correctement créés et récupérées.

Modification du FrontEnd:
* modifier le  composant TodoPage: modification de la fonction handleSave, handleDelete
faire des tests  
