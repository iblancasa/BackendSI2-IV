FROM ubuntu
MAINTAINER iblancasa <iblancasa@gmail.com> Version: 1.0


RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN service mongod start
RUN apt-get install -y nodejs
RUN apt-get install npm git git-core -y
ADD index.js /app
ADD public /app
ADD package.json /app
EXPOSE 3000
RUN cd /app; npm install
CMD ["nodejs", "index.js"]
