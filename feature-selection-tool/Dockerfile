FROM node:14.7
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/
EXPOSE 4200
CMD ["npm", "start"]

