/**
 * @license
 * Copyright 2020 Roberto Luiz Souza Monteiro,
 *                Renata Souza Barreto,
 *                Hernane Borges de Barros Pereira.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Lexer core class.
 * @class
 */
function Lexer() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Convert a string to an array, using the characters indicated as a separators.
     * @param {string}   str - The string to slit.
     * @param {array}    chars - The separator characters.
     * @return {array}   The array containing the parts of the string.
     */
    this.split = function(str, chars){
        var tempChar = chars[0];

        for(var i = 1; i < chars.length; i++){
            str = str.split(chars[i]).join(tempChar);
        }
        str = str.split(tempChar);

        return str;
    }

    thisLexer = this;

    /**
     * Interpret the options passed on the command line,
     * process the files and generate the requested reports.
     */
    this.run = function() {
        // Supports only the Node.js interpreter.
        if (typeof process !== 'undefined') {
            var command = 'node';
            var argv = process.argv.slice();
            var fs = require('fs');
            var readTextFile = fs.readFileSync;

            // Read file callback.
            function read(input) {
                if (/^{.*}$/.test(input)) {
                    return input.substring(1, input.length - 1);
                } else {
                    var content = readTextFile(input, 'utf-8');
                    return content.length > 0 && content.charCodeAt(0) == 0xFEFF ? content.substring(1) : content;
                }
            }
            
            // Command line arguments.
            system.argv = argv.slice();
            system.argc = argv.length;

            // Command line options.
            var inputFile = '';
            var outputFile = '';
            var sentenceSeparator = [':', ';', '.', '?', '!'];
            
            // Get command line arguments.
            if (argv.length > 2) {
                var i = 2;
                while (i < argv.length) {
                    if ((argv[i] == '-h') | (argv[i] == '--help')) {
                        system.log('Lexer Command Line Interface (CLI)');
                        system.log('Usage: lexer [options] [file.txt] [--] [arguments]');
                        system.log('Options:');
                        system.log('-h     --help               Displays this help message;');
                        system.log('-o     [output.json]        Output report file name;');
                        process.exit(0);
                    } else if (argv[i] == '-o') {
                        i++;
                        outputFile = argv[i];
                    } else {
                        inputFile = argv[i];
                        break;
                    }
                    i++;
                }
                system.argv = argv.slice(i);
                system.argc = system.argv.length;

                if (inputFile != '') {
                    var Glob = require('glob');
                    // Process each file based on glob pattern.
                    function processFiles(er, files) {
                        if (files.length == 0) {
                            system.log('Lexer Command Line Interface (CLI)');
                            system.log('Usage: lexer [options] [file.txt] [--] [arguments]');
                        } else { 
                            for (var i = 0; i < files.length; i++) {
                                file = files[i];
                                
                                var fileName = file.split('.').shift();
                                var fileExtension = file.split('.').pop();

                                var fileContents = read(String(file));

                                var fileSentences = thisLexer.split(fileContents, sentenceSeparator);

                                var json = [];

                                function isNotEmpty(element) {
                                    return element != '';
                                }
                                
                                for (var j = 0; j < fileSentences.length; j++) {
                                    var words = thisLexer.split(core.trim(fileSentences[j], "\r\n"), [' ', ',']).filter(isNotEmpty);
                                    var tokens = [];
                                    for (var k = 0; k < words.length; k++) {
                                        var token = {
                                            "wordClass": "unknown",
                                            "wordSubClass": "unknown",
                                            "word": words[k]
                                        }
                                        for (const wordClass in lexemes) {
                                            for (const wordSubClass in lexemes[wordClass]) {
                                                if (Array.isArray(lexemes[wordClass][wordSubClass])) {
                                                    var wordList = lexemes[wordClass][wordSubClass];
                                                    if ((wordClass == "irregularVerb") || (wordClass == "regularVerb")) {
                                                        for (var w = 0; w < wordList.length; w++) {
                                                            if (wordList[w].includes(core.toLowerCase(words[k]))) {
                                                                token = {
                                                                    "wordClass": wordClass,
                                                                    "wordSubClass": wordSubClass,
                                                                    "word": wordList[w][0]
                                                                }
                                                                break;
                                                            }
                                                        }
                                                    } else if ((wordClass == "prefix") || (wordClass == "suffix")) {
                                                        break;
                                                    } else {
                                                        if (wordList.includes(core.toLowerCase(words[k]))) {
                                                            token = {
                                                                "wordClass": wordClass,
                                                                "wordSubClass": wordSubClass,
                                                                "word": core.toLowerCase(words[k])
                                                            }
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        tokens.push(token);
                                    }

                                    json.push(tokens);
                                }

                                if (outputFile == '') {
                                    outputFile = fileName + '.json';
                                }

                                fs.writeFile(outputFile, JSON.stringify(json), function(err) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                                
                                outputFile = '';
                            }
                        }
                    }

                    options = {};

                    // Get all file names based on glob pattern.
                    var glob = new Glob(inputFile, options, processFiles);
                } else {
                    system.log('Lexer Command Line Interface (CLI)');
                    system.log('Usage: lexer [options] [file.txt] [--] [arguments]');
                }
            } else {
                system.log('Lexer Command Line Interface (CLI)');
                system.log('Usage: lexer [options] [file.txt] [--] [arguments]');
            }
        }
    }
}

lexer = new Lexer();

/*
 * Run Lexer code if this script has been invoked
 * from the command line.
 */
if (typeof process !== 'undefined') {
    // Emulate DOM.
    const jsdom = require('jsdom');
    const {
        JSDOM
    } = jsdom;
    var doc = new JSDOM();
    var DOMParser = doc.window.DOMParser;

    var alert = system.log;

    lexer.run();
}