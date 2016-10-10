FROM node:4.3.2

RUN apt-get update
RUN apt-get install -y -q --no-install-recommends \
    mysql-client \
    nano


RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@3.7.5

RUN mkdir -p /var/www/app/csv_app

ENV HOME=/var/www/app/

#RUN npm i -g pm2
COPY ./csv_app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /var/www/app/

ADD ./csv_app /var/www/app

#USER app
WORKDIR $HOME/
EXPOSE 3000
#CMD npm start
CMD tail -F -n0 /etc/hosts