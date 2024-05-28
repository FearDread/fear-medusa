FROM node:lts

WORKDIR /app/medusa

COPY package.json .
COPY tsconfig.json .

RUN apt-get update

RUN apt-get install -y python

RUN npm install -g npm@latest

RUN yarn global add -g @medusajs/medusa-cli@latest

COPY . .

RUN yarn install

EXPOSE 9000
ENTRYPOINT ["./develop.sh", "develop"]

# Define the command to run the app
# CMD [ "npm", "start" ]