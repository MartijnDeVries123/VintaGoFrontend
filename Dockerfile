# Use official Node.js LTS image
FROM node:18-alpine
WORKDIR /app
COPY . .
EXPOSE 3000