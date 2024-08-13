FROM node:14

ARG version
ENV IMG_VERSION=$version

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .

RUN npm install --production
RUN npm run migrate-deploy

CMD ["npm", "run", "start"]
