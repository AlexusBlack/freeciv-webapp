#!/bin/bash

js_dir="public/javascript/src"
result_file="public/javascript/webclient.min.js"

npx uglify-js \
  "${js_dir}"/libs/first/EventAggregator.js \
  "${js_dir}"/libs/first/handlebars.runtime-v4.5.3.js \
  "${js_dir}"/*.js \
  "${js_dir}"/libs/first/jquery-ui.min.js \
  "${js_dir}"/libs/*.js \
  "${js_dir}"/2dcanvas/*.js \
  -o "${result_file}"


