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
function MkLexer() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

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
            
            // Get command line arguments.
            if (argv.length > 2) {
                var i = 2;
                while (i < argv.length) {
                    if ((argv[i] == '-h') || (argv[i] == '--help')) {
                        system.log('MkLexer Command Line Interface (CLI)');
                        system.log('Usage: mklexer [options] [file.txt] [--] [arguments]');
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
                            system.log('MkLexer Command Line Interface (CLI)');
                            system.log('Usage: mklexer [options] [file.txt] [--] [arguments]');
                        } else {
                            var lexemes = {};

                            for (var i = 0; i < files.length; i++) {
                                file = files[i];

                                var fileName = file.split('.').shift();
                                var fileExtension = file.split('.').pop();
                                var fileContents = read(String(file));
                                var mainObjectName = string.camelize(fileName.split('/').pop().split('_').join(' '));
                                var thisObjectName = mainObjectName;
                                lexemes[mainObjectName] = {};
                                var mainObject = lexemes[mainObjectName];
                                mainObject[thisObjectName] = [];
                                var thisObject = mainObject[thisObjectName];
                                var fileLines = fileContents.split('\n');
                                for (var j = 0; j < fileLines.length; j++) {
                                    var line = core.trim(fileLines[j].trim(), '\r');
                                    if (line[0] == '#') {
                                        continue;
                                    } else if ((line[0] == '[') && (line[line.length - 1] == ']')) {
                                        thisObjectName = string.camelize(core.trimRight(core.trimLeft(line, '['), ']'));
                                        mainObject[thisObjectName] = [];
                                        thisObject = mainObject[thisObjectName];
                                    } else {
                                        var record = line.split(',');
                                        if (record.length > 1) {
                                            thisObject.push(record);
                                        } else {
                                            thisObject.push(line);
                                        }
                                    }
                                }
                            }

                            if (outputFile == '') {
                                outputFile = 'lexemes.json';
                            }

                            fs.writeFile(outputFile, "var lexemes = " + JSON.stringify(lexemes), function(err) {
                                if (err) {
                                    throw err;
                                }
                            });
                        }
                    }

                    options = {};

                    // Get all file names based on glob pattern.
                    var glob = new Glob(inputFile, options, processFiles);
                } else {
                    system.log('MkLexer Command Line Interface (CLI)');
                    system.log('Usage: mklexer [options] [file.txt] [--] [arguments]');
                }
            } else {
                system.log('MkLexer Command Line Interface (CLI)');
                system.log('Usage: mklexer [options] [file.txt] [--] [arguments]');
            }
        }
    }
}

mklexer = new MkLexer();

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

    mklexer.run();
}