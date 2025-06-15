FROM node:16.16.0

WORKDIR /app

# Copy API package.json and install dependencies
COPY api/package.json ./
RUN npm install

# Copy API source code
COPY api/ ./

EXPOSE 4000

CMD ["npm", "start"]