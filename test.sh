#!/bin/sh
./bin/lexer-en.js -o examples/three_laws_of_robotics.json examples/three_laws_of_robotics.txt
../cnatool/bin/cnatool.js --build --weighted --directed --topology chain examples/three_laws_of_robotics.json
../cnatool/bin/cnatool.js --export examples/three_laws_of_robotics-net.json

./bin/lexer-en.js --omit "article,conjunction,preposition,pronoun" examples/c_elegans_wikipedia.txt
../cnatool/bin/cnatool.js --build --weighted --directed --topology chain examples/c_elegans_wikipedia.json
../cnatool/bin/cnatool.js --export examples/c_elegans_wikipedia-net.json
