FROM node:25-alpine
#setting the working directory to app is like cd app
WORKDIR /app 
COPY package*.json ./
RUN npm install
#copy . . : copies all remaining files from project to container 
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev","--","--host"]

