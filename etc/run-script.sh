#!/bin/bash

echo running post install scripts ..;
cd /etc/training
curl -X DELETE http://db:5984/training
curl -X PUT http://db:5984/training
curl -d @datadump.json -H "Content-Type: application/json" -X POST http://db:5984/training/_bulk_docs
nginx -g 'daemon off;'
