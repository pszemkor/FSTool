FROM node:14.7 as build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/
RUN npx ng build --prod
RUN ls /usr/src/app/dist/
FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/feature-selection-tool/ /usr/share/nginx/html
