#!/bin/sh

rm -rf build/*
rm -rf docs/*

cat src/Shebang.js js/libmaia.js src/MkLexer.js > build/mklexer.js
cp build/mklexer.js bin/
chmod 755 bin/mklexer.js

#bin/mklexer.js -o build/Lexemes.js "./src/lang/en/*"
#cp build/Lexemes.js src/

#cat src/Shebang.js js/libmaia.js src/Lexemes.js src/Lexer.js > build/lexer.js

#cp build/lexer.js js/
#cp build/lexer.js bin/

#chmod 755 bin/*

#jsdoc -d ./docs ./package.json ./src
