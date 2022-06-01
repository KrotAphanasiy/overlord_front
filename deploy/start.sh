#!/bin/sh

set -euo pipefail

echo "Starting"

cat /etc/nginx/conf.d/default.conf | sed "s|    set \$alpr_backend .*;|    set \$alpr_backend ${ALPR_BACKEND_URL};|" > /etc/nginx/conf.d/default.conf.tmp
cp /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf
rm /etc/nginx/conf.d/default.conf.tmp

echo "resolver ${ALPR_DNS_RESOLVER} ipv6=off;" > /etc/nginx/includes/resolver.conf

cat /var/www/html/config.json \
    | jq ".API_URL=\"${ALPR_BACKEND_URL}\"" \
    | jq ".IMAGES_SRC=\"${ALPR_IMAGES_SRC}\"" \
> /var/www/html/config.json.tmp
cp /var/www/html/config.json.tmp /var/www/html/config.json
rm /var/www/html/config.json.tmp

echo "Validating..."
nginx -t || exit 1
echo "Running..."
nginx -g 'daemon off;'
