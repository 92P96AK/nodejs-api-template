FROM 687241911692.dkr.ecr.us-west-2.amazonaws.com/node:14

ARG version
ENV IMG_VERSION=$version

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY . .

RUN npm install --production
RUN npx prisma generate

CMD ["npm", "run", "start"]
