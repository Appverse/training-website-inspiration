FROM nginx

# Copy app
COPY dist/web /usr/share/nginx/html

# Copy init-script & datadump
COPY datadump.json /etc/training
COPY run-script.sh /etc/training

# Copy nginx config with proxy to couchdb
COPY default.conf /etc/nginx/conf.d/default.conf

# install curl
RUN apt-get -qq update
RUN apt-get -qq -y install curl
