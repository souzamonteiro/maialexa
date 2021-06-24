#!/bin/sh

rm -rf build/*
rm -rf docs/*

cat src/Shebang.js js/libmaia.js src/MkLexer.js > build/mklexer.js
cp build/mklexer.js bin/
chmod 755 bin/mklexer.js

./bin/mklexer.js -o build/Lexemes.json "src/lang/en/*"
cp build/Lexemes.json src/

#cat src/Shebang.js js/libmaia.js src/Lexemes.json src/Lexer.js > build/lexer.js

#cp build/lexer.js js/
#cp build/lexer.js bin/

#chmod 755 bin/*

#jsdoc -d ./docs ./package.json ./src
