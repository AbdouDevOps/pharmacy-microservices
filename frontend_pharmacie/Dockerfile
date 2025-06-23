# Étape 1 : Utiliser une image Node officielle
FROM node:18-alpine

# Étape 2 : Créer et définir le dossier de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste du code
COPY . .

# Étape 6 : Exposer le port par défaut de Vite
EXPOSE 5173

# Étape 7 : Lancer le serveur de développement Vite
CMD ["npm", "run", "dev", "--", "--host"]
