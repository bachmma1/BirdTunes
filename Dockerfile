# Basis-Image: Node.js 22 auf Alpine Linux
FROM node:22-alpine

# Benötigte Systempakete für native Builds (optional, aber empfohlen)
RUN apk add --no-cache git python3 make g++ libc6-compat

# Setze Arbeitsverzeichnis
WORKDIR /app

# Argument für Modus: development oder production
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Repo klonen – dein GitHub-Fork
RUN git clone https://github.com/bachmma1/BirdTunes.git .

# Installiere Abhängigkeiten
RUN npm install

# Baue die App nur in production mode
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Port für die App
EXPOSE 3000

# Start der App
CMD ["npm", "start"]
