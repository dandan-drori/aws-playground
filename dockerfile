FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Expose port 80 inside the container
EXPOSE 80

CMD ["npm", "start"]