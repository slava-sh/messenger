FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY . /app

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
