FROM node:22.6.0-alpine3.19 AS development
ENV NODE_ENV development
# Add a work directory
WORKDIR /ingrid
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install
# Copy app files
COPY . .
# Expose port
EXPOSE 5173
# Start the app
CMD [ "npm", "run", "preview" ]