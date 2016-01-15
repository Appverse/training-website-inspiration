FROM nginx

# Copy app
COPY dist/web /usr/share/nginx/html

# Copy nginx config with proxy to couchdb
COPY default.conf /etc/nginx/conf.d/default.conf

# install curl
RUN apt-get -qq update
RUN apt-get -qq -y install curl

# create training DB and load dump
RUN curl -X PUT http://db:5984/training
RUN curl -d @datadump.json -H "Content-Type: application/json" -X POST http://db:5984/training/_bulk_docs
