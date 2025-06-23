# Utilise une image Java avec Maven pour construire l'application
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Copie le code source et construit le projet
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Étape d'exécution avec JDK uniquement
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copie le JAR compilé
COPY --from=build /app/target/EurekaServer-0.0.1-SNAPSHOT.jar app.jar

# Expose le port utilisé par Eureka
EXPOSE 8761

# Démarre l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
