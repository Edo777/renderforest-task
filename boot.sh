#! /bin/bash

# Check node versions
NODE_VERSION=`node --version`
NODE_AVAILABLE=("v14", "v15", "v16", "v17", "v18")
IFS='.' read -a NODE_V <<< "$NODE_VERSION"

if [[ ! "${NODE_AVAILABLE[@]}" =~ "${NODE_V}" ]]; then
   echo -e "\e[1;31m Please use node version >= 14 \e[0m"
    exit 1
fi

# Check redis installed or not
REDIS_CHECK=`redis-cli ping`

if [[ "$REDIS_CHECK" != "PONG" ]];
then
  echo -e "\e[1;31m Please install Redis \e[0m"
  exit 1
fi

cd ./server

# set .env and .sequelizerc files
cp .env.example .env
cp .sequelizerc.example .sequelizerc

# Install Dependencies
npm install
npm install sequelize-cli --global

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

npm start



