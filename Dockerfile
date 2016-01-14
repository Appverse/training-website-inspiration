FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY dist/web /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
