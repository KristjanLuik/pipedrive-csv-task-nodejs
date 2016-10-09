FROM node:4.3.2

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@3.7.5

RUN mkdir -p /var/www/app/

ENV HOME=/var/www/app/

#RUN npm i -g pm2
ADD ./csv_app /var/www/app/

USER app
WORKDIR $HOME/
EXPOSE 3000
CMD tail -F -n0 /etc/hosts