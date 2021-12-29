FROM node:16.13

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

COPY views ./views

RUN ls -a

RUN npm install

EXPOSE 25000

CMD ["npm","run","start"]