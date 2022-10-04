#!/bin/sh

rm -rf build/*
rm -rf docs/*

#cp ../maiastudio/build/* ./js
#cp ../maiastudio/build/maiascript.js ./bin

cp src/MkPlural-en.maia bin/mkplural-en.maia

cat src/Shebang.js js/libmaia.js src/MkLexer.js > build/mklexer.js
cp build/mklexer.js bin/

chmod 755 bin/*

./bin/mkplural-en.maia -o src/lang/en/nouns/noun_plural.txt src/lang/en/nouns/noun_singular.txt
cat src/lang/en/nouns/noun_singular.txt src/lang/en/nouns/noun_plural.txt > src/lang/en/noun.txt 

./bin/mklexer.js -o build/Lexemes-en.json "src/lang/en/*.txt"
cp build/Lexemes-en.json src/

cat src/Shebang.js js/libmaia.js src/Lexemes-en.json src/Lexer-en.js > build/lexer-en.js

cp build/lexer-en.js js/
cp build/lexer-en.js bin/

chmod 755 bin/*

#jsdoc -d ./docs ./package.json ./src
