FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY dist/web /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
RUN curl -X PUT http://db:5984/training
RUN curl -d @datadump.json -H "Content-Type: application/json" -X POST http://db:5984/training/_bulk_docs
