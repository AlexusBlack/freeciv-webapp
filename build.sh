#!/bin/bash

js_dir="public/javascript/src"
result_file="public/javascript/webclient.min.js"
source_map_file="public/javascript/webclient.min.js.map"

npx uglify-js \
  "${js_dir}"/libs/first/EventAggregator.js \
  "${js_dir}"/libs/first/handlebars.runtime-v4.5.3.js \
  "${js_dir}"/libs/first/d3.v7.min.js \
  "${js_dir}"/libs/first/d3-dag.iife.min.js \
  "${js_dir}"/derived/*.js \
  "${js_dir}"/*.js \
  "${js_dir}"/libs/first/jquery-ui.min.js \
  "${js_dir}"/libs/*.js \
  "${js_dir}"/2dcanvas/*.js \
  -o "${result_file}" \
  --source-map "filename='${source_map_file}',url='webclient.min.js.map',base='public/javascript/'" \


