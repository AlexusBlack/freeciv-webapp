#!/bin/bash

rm -r build
mkdir build
cp -r public/* build/

wget http://localhost:3000/ -O build/index.html
mkdir build/webclient
wget http://localhost:3000/webclient/ -O build/webclient/index.html

