FROM node:10.5.0
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN npm install -g -s --no-progress yarn && yarn
CMD [ "yarn", "start" ]
EXPOSE 3000