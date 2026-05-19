FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Expose port 8080 inside the container
EXPOSE 8080

CMD ["npm", "start"]