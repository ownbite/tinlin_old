#!/bin/sh

npm install

make clean
make bootstrap
echo "COPY"
FOLDER=/home/ownbite/tinlin/assets 

cat ./bootstrap/css/bootstrap.min.css ./bootstrap/css/bootstrap-responsive.min.css ./css/mobiscroll-2.3.1.custom.min.css >  $FOLDER/css/main.css
cat ./bootstrap/js/bootstrap.min.js > $FOLDER/js/main.js

