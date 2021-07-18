#!/bin/bash

killall gradlew
sleep 1
./gradlew build run &
