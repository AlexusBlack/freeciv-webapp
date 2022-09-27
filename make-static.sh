#!/bin/bash

rm -r docs
mkdir docs
cp -r public/* docs/

wget http://localhost:3000/ -O docs/index.html
mkdir docs/webclient
wget http://localhost:3000/webclient/ -O docs/webclient/index.html

