#!/bin/bash

cd web || exit 1
npm run prod
cd - || exit 1
./gradlew build
docker build . -t etaroom
