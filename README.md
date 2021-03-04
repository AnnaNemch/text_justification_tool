# Outil d'alignement de texte

L'API est disponible sur https://text-justification-tool.azurewebsites.net.
Technologies de développement:
- NodeJS (Typescript, Express Framework)
- PostgreSQL (TypeORM)
- Azure (pour le déploiement)

## Fonctionnalités

- API /api/token (https://text-justification-tool.azurewebsites.net/api/token) - création d'utilisateurs pour l'authentification

##### Exemple:
###### Requête: 
```sh
curl --location --request POST 'https://text-justification-tool.azurewebsites.net/api/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "votre@email.com"
}'
```

###### Réponse (texte)
```json
{
    "token": "jwt.token.signature"
}
```


- API /api/justify (https://text-justification-tool.azurewebsites.net/api/justify) Alignement du texte

##### Exemple:
###### Requête: 

```sh
curl --location --request POST 'https://text-justification-tool.azurewebsites.net/api/justify' \
--header 'Content-Type: text/plain' \
--header 'token: votre JWT token est ici' \
--data-raw 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors»'
```
###### Réponse (texte)
```
Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,
mes yeux  se fermaient si vite  que  je  n’avais  pas  le temps de me dire:  «Je
m’endors»
```

## Installation

Créez un fichier .env pour configurer le serveur (les paramètres requis se trouvent dans le fichier .env.example).

Installez les dépendances et devDependencies.
```sh
npm i
```
Ensuite, vous devez effectuer des migrations à l'aide de la commande:
```sh
npm run typeorm migration:run
```
et démarrez le serveur:
```sh
npm run start
```
