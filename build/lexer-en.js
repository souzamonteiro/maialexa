#!/usr/bin/env node
// This file was generated on Tue Oct 19, 2021 20:52 (UTC-03) by REx v5.54 which is Copyright (c) 1979-2021 by Gunther Rademacher <grd@gmx.net>
// REx command line: MaiaScript.ebnf -backtrack -tree -javascript

function MaiaScript(string, parsingEventHandler)
{
  init(string, parsingEventHandler);

  var thisParser = this;

  this.ParseException = function(b, e, s, o, x)
  {
    var begin = b;
    var end = e;
    var state = s;
    var offending = o;
    var expected = x;

    this.getBegin = function() {return begin;};
    this.getEnd = function() {return end;};
    this.getState = function() {return state;};
    this.getExpected = function() {return expected;};
    this.getOffending = function() {return offending;};
    this.isAmbiguousInput = function() {return false;};

    this.getMessage = function()
    {
      return offending < 0
           ? "lexical analysis failed"
           : "syntax error";
    };
  };

  function init(source, parsingEventHandler)
  {
    eventHandler = parsingEventHandler;
    input = source;
    size = source.length;
    reset(0, 0, 0);
  }

  this.getInput = function()
  {
    return input;
  };

  this.getTokenOffset = function()
  {
    return b0;
  };

  this.getTokenEnd = function()
  {
    return e0;
  };

  function reset(l, b, e)
  {
            b0 = b; e0 = b;
    l1 = l; b1 = b; e1 = e;
    l2 = 0; b2 = 0; e2 = 0;
    l3 = 0; b3 = 0; e3 = 0;
    end = e;
    ex = -1;
    memo = {};
    eventHandler.reset(input);
  }

  this.reset = function(l, b, e)
  {
    reset(l, b, e);
  };

  this.getOffendingToken = function(e)
  {
    var o = e.getOffending();
    return o >= 0 ? MaiaScript.TOKEN[o] : null;
  };

  this.getExpectedTokenSet = function(e)
  {
    var expected;
    if (e.getExpected() < 0)
    {
      expected = MaiaScript.getTokenSet(- e.getState());
    }
    else
    {
      expected = [MaiaScript.TOKEN[e.getExpected()]];
    }
    return expected;
  };

  this.getErrorMessage = function(e)
  {
    var message = e.getMessage();
    var found = this.getOffendingToken(e);
    var tokenSet = this.getExpectedTokenSet(e);
    var size = e.getEnd() - e.getBegin();
    message += (found == null ? "" : ", found " + found)
            + "\nwhile expecting "
            + (tokenSet.length == 1 ? tokenSet[0] : ("[" + tokenSet.join(", ") + "]"))
            + "\n"
            + (size == 0 || found != null ? "" : "after successfully scanning " + size + " characters beginning ");
    var prefix = input.substring(0, e.getBegin());
    var lines = prefix.split("\n");
    var line = lines.length;
    var column = lines[line - 1].length + 1;
    return message
         + "at line " + line + ", column " + column + ":\n..."
         + input.substring(e.getBegin(), Math.min(input.length, e.getBegin() + 64))
         + "...";
  };

  this.parse_maiascript = function()
  {
    eventHandler.startNonterminal("maiascript", e0);
    lookahead1W(21);                // END | eof | identifier | null | true | false | string | complex | real |
                                    // comment | whitespace^token | '!' | '(' | '[' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
    switch (l1)
    {
    case 2:                         // eof
      consume(2);                   // eof
      break;
    default:
      for (;;)
      {
        lookahead1W(17);            // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        if (l1 == 1)                // END
        {
          break;
        }
        whitespace();
        parse_expression();
      }
    }
    eventHandler.endNonterminal("maiascript", e0);
  };

  function parse_operation()
  {
    eventHandler.startNonterminal("operation", e0);
    parse_variableAssignment();
    eventHandler.endNonterminal("operation", e0);
  }

  function try_operation()
  {
    try_variableAssignment();
  }

  function parse_variableAssignment()
  {
    eventHandler.startNonterminal("variableAssignment", e0);
    parse_logicalORExpression();
    for (;;)
    {
      if (l1 != 26                  // ':='
       && l1 != 31                  // '='
       && l1 != 36)                 // '?='
      {
        break;
      }
      switch (l1)
      {
      case 31:                      // '='
        consume(31);                // '='
        break;
      case 26:                      // ':='
        consume(26);                // ':='
        break;
      default:
        consume(36);                // '?='
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_logicalORExpression();
    }
    eventHandler.endNonterminal("variableAssignment", e0);
  }

  function try_variableAssignment()
  {
    try_logicalORExpression();
    for (;;)
    {
      if (l1 != 26                  // ':='
       && l1 != 31                  // '='
       && l1 != 36)                 // '?='
      {
        break;
      }
      switch (l1)
      {
      case 31:                      // '='
        consumeT(31);               // '='
        break;
      case 26:                      // ':='
        consumeT(26);               // ':='
        break;
      default:
        consumeT(36);               // '?='
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_logicalORExpression();
    }
  }

  function parse_logicalORExpression()
  {
    eventHandler.startNonterminal("logicalORExpression", e0);
    parse_logicalXORExpression();
    for (;;)
    {
      if (l1 != 64)                 // '||'
      {
        break;
      }
      consume(64);                  // '||'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_logicalXORExpression();
    }
    eventHandler.endNonterminal("logicalORExpression", e0);
  }

  function try_logicalORExpression()
  {
    try_logicalXORExpression();
    for (;;)
    {
      if (l1 != 64)                 // '||'
      {
        break;
      }
      consumeT(64);                 // '||'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_logicalXORExpression();
    }
  }

  function parse_logicalXORExpression()
  {
    eventHandler.startNonterminal("logicalXORExpression", e0);
    parse_logicalANDExpression();
    for (;;)
    {
      if (l1 != 66)                 // '||||'
      {
        break;
      }
      consume(66);                  // '||||'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_logicalANDExpression();
    }
    eventHandler.endNonterminal("logicalXORExpression", e0);
  }

  function try_logicalXORExpression()
  {
    try_logicalANDExpression();
    for (;;)
    {
      if (l1 != 66)                 // '||||'
      {
        break;
      }
      consumeT(66);                 // '||||'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_logicalANDExpression();
    }
  }

  function parse_logicalANDExpression()
  {
    eventHandler.startNonterminal("logicalANDExpression", e0);
    parse_bitwiseORExpression();
    for (;;)
    {
      if (l1 != 16)                 // '&&'
      {
        break;
      }
      consume(16);                  // '&&'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_bitwiseORExpression();
    }
    eventHandler.endNonterminal("logicalANDExpression", e0);
  }

  function try_logicalANDExpression()
  {
    try_bitwiseORExpression();
    for (;;)
    {
      if (l1 != 16)                 // '&&'
      {
        break;
      }
      consumeT(16);                 // '&&'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_bitwiseORExpression();
    }
  }

  function parse_bitwiseORExpression()
  {
    eventHandler.startNonterminal("bitwiseORExpression", e0);
    parse_bitwiseXORExpression();
    for (;;)
    {
      if (l1 != 63)                 // '|'
      {
        break;
      }
      consume(63);                  // '|'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_bitwiseXORExpression();
    }
    eventHandler.endNonterminal("bitwiseORExpression", e0);
  }

  function try_bitwiseORExpression()
  {
    try_bitwiseXORExpression();
    for (;;)
    {
      if (l1 != 63)                 // '|'
      {
        break;
      }
      consumeT(63);                 // '|'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_bitwiseXORExpression();
    }
  }

  function parse_bitwiseXORExpression()
  {
    eventHandler.startNonterminal("bitwiseXORExpression", e0);
    parse_bitwiseANDExpression();
    for (;;)
    {
      if (l1 != 65)                 // '|||'
      {
        break;
      }
      consume(65);                  // '|||'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_bitwiseANDExpression();
    }
    eventHandler.endNonterminal("bitwiseXORExpression", e0);
  }

  function try_bitwiseXORExpression()
  {
    try_bitwiseANDExpression();
    for (;;)
    {
      if (l1 != 65)                 // '|||'
      {
        break;
      }
      consumeT(65);                 // '|||'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_bitwiseANDExpression();
    }
  }

  function parse_bitwiseANDExpression()
  {
    eventHandler.startNonterminal("bitwiseANDExpression", e0);
    parse_equalityExpression();
    for (;;)
    {
      if (l1 != 15)                 // '&'
      {
        break;
      }
      consume(15);                  // '&'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_equalityExpression();
    }
    eventHandler.endNonterminal("bitwiseANDExpression", e0);
  }

  function try_bitwiseANDExpression()
  {
    try_equalityExpression();
    for (;;)
    {
      if (l1 != 15)                 // '&'
      {
        break;
      }
      consumeT(15);                 // '&'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_equalityExpression();
    }
  }

  function parse_equalityExpression()
  {
    eventHandler.startNonterminal("equalityExpression", e0);
    parse_relationalExpression();
    for (;;)
    {
      if (l1 != 13                  // '!='
       && l1 != 32)                 // '=='
      {
        break;
      }
      switch (l1)
      {
      case 32:                      // '=='
        consume(32);                // '=='
        break;
      default:
        consume(13);                // '!='
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_relationalExpression();
    }
    eventHandler.endNonterminal("equalityExpression", e0);
  }

  function try_equalityExpression()
  {
    try_relationalExpression();
    for (;;)
    {
      if (l1 != 13                  // '!='
       && l1 != 32)                 // '=='
      {
        break;
      }
      switch (l1)
      {
      case 32:                      // '=='
        consumeT(32);               // '=='
        break;
      default:
        consumeT(13);               // '!='
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_relationalExpression();
    }
  }

  function parse_relationalExpression()
  {
    eventHandler.startNonterminal("relationalExpression", e0);
    parse_shiftExpression();
    for (;;)
    {
      if (l1 != 28                  // '<'
       && l1 != 30                  // '<='
       && l1 != 33                  // '>'
       && l1 != 34)                 // '>='
      {
        break;
      }
      switch (l1)
      {
      case 28:                      // '<'
        consume(28);                // '<'
        break;
      case 33:                      // '>'
        consume(33);                // '>'
        break;
      case 30:                      // '<='
        consume(30);                // '<='
        break;
      default:
        consume(34);                // '>='
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_shiftExpression();
    }
    eventHandler.endNonterminal("relationalExpression", e0);
  }

  function try_relationalExpression()
  {
    try_shiftExpression();
    for (;;)
    {
      if (l1 != 28                  // '<'
       && l1 != 30                  // '<='
       && l1 != 33                  // '>'
       && l1 != 34)                 // '>='
      {
        break;
      }
      switch (l1)
      {
      case 28:                      // '<'
        consumeT(28);               // '<'
        break;
      case 33:                      // '>'
        consumeT(33);               // '>'
        break;
      case 30:                      // '<='
        consumeT(30);               // '<='
        break;
      default:
        consumeT(34);               // '>='
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_shiftExpression();
    }
  }

  function parse_shiftExpression()
  {
    eventHandler.startNonterminal("shiftExpression", e0);
    parse_additiveExpression();
    for (;;)
    {
      if (l1 != 29                  // '<<'
       && l1 != 35)                 // '>>'
      {
        break;
      }
      switch (l1)
      {
      case 29:                      // '<<'
        consume(29);                // '<<'
        break;
      default:
        consume(35);                // '>>'
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_additiveExpression();
    }
    eventHandler.endNonterminal("shiftExpression", e0);
  }

  function try_shiftExpression()
  {
    try_additiveExpression();
    for (;;)
    {
      if (l1 != 29                  // '<<'
       && l1 != 35)                 // '>>'
      {
        break;
      }
      switch (l1)
      {
      case 29:                      // '<<'
        consumeT(29);               // '<<'
        break;
      default:
        consumeT(35);               // '>>'
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_additiveExpression();
    }
  }

  function parse_additiveExpression()
  {
    eventHandler.startNonterminal("additiveExpression", e0);
    parse_multiplicativeExpression();
    for (;;)
    {
      if (l1 != 20                  // '+'
       && l1 != 22)                 // '-'
      {
        break;
      }
      switch (l1)
      {
      case 20:                      // '+'
        consume(20);                // '+'
        break;
      default:
        consume(22);                // '-'
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_multiplicativeExpression();
    }
    eventHandler.endNonterminal("additiveExpression", e0);
  }

  function try_additiveExpression()
  {
    try_multiplicativeExpression();
    for (;;)
    {
      if (l1 != 20                  // '+'
       && l1 != 22)                 // '-'
      {
        break;
      }
      switch (l1)
      {
      case 20:                      // '+'
        consumeT(20);               // '+'
        break;
      default:
        consumeT(22);               // '-'
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_multiplicativeExpression();
    }
  }

  function parse_multiplicativeExpression()
  {
    eventHandler.startNonterminal("multiplicativeExpression", e0);
    parse_powerExpression();
    for (;;)
    {
      if (l1 != 14                  // '%'
       && l1 != 19                  // '*'
       && l1 != 24)                 // '/'
      {
        break;
      }
      switch (l1)
      {
      case 19:                      // '*'
        consume(19);                // '*'
        break;
      case 24:                      // '/'
        consume(24);                // '/'
        break;
      default:
        consume(14);                // '%'
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_powerExpression();
    }
    eventHandler.endNonterminal("multiplicativeExpression", e0);
  }

  function try_multiplicativeExpression()
  {
    try_powerExpression();
    for (;;)
    {
      if (l1 != 14                  // '%'
       && l1 != 19                  // '*'
       && l1 != 24)                 // '/'
      {
        break;
      }
      switch (l1)
      {
      case 19:                      // '*'
        consumeT(19);               // '*'
        break;
      case 24:                      // '/'
        consumeT(24);               // '/'
        break;
      default:
        consumeT(14);               // '%'
      }
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_powerExpression();
    }
  }

  function parse_powerExpression()
  {
    eventHandler.startNonterminal("powerExpression", e0);
    parse_unaryExpression();
    for (;;)
    {
      lookahead1W(27);              // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' |
                                    // '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' | 'do' |
                                    // 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
      if (l1 != 39)                 // '^'
      {
        break;
      }
      consume(39);                  // '^'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      whitespace();
      parse_unaryExpression();
    }
    eventHandler.endNonterminal("powerExpression", e0);
  }

  function try_powerExpression()
  {
    try_unaryExpression();
    for (;;)
    {
      lookahead1W(27);              // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' |
                                    // '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' | 'do' |
                                    // 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
      if (l1 != 39)                 // '^'
      {
        break;
      }
      consumeT(39);                 // '^'
      lookahead1W(12);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '!' | '(' | '[' | '{' | '~'
      try_unaryExpression();
    }
  }

  function parse_unaryExpression()
  {
    eventHandler.startNonterminal("unaryExpression", e0);
    switch (l1)
    {
    case 68:                        // '~'
      consume(68);                  // '~'
      lookahead1W(11);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '(' | '[' | '{'
      whitespace();
      parse_primary();
      break;
    case 12:                        // '!'
      consume(12);                  // '!'
      lookahead1W(11);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '(' | '[' | '{'
      whitespace();
      parse_primary();
      break;
    default:
      parse_primary();
    }
    eventHandler.endNonterminal("unaryExpression", e0);
  }

  function try_unaryExpression()
  {
    switch (l1)
    {
    case 68:                        // '~'
      consumeT(68);                 // '~'
      lookahead1W(11);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '(' | '[' | '{'
      try_primary();
      break;
    case 12:                        // '!'
      consumeT(12);                 // '!'
      lookahead1W(11);              // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '(' | '[' | '{'
      try_primary();
      break;
    default:
      try_primary();
    }
  }

  function parse_primary()
  {
    eventHandler.startNonterminal("primary", e0);
    switch (l1)
    {
    case 3:                         // identifier
      parse_member();
      break;
    case 17:                        // '('
      parse_parenthesizedExpression();
      break;
    default:
      parse_value();
    }
    eventHandler.endNonterminal("primary", e0);
  }

  function try_primary()
  {
    switch (l1)
    {
    case 3:                         // identifier
      try_member();
      break;
    case 17:                        // '('
      try_parenthesizedExpression();
      break;
    default:
      try_value();
    }
  }

  function parse_statement()
  {
    eventHandler.startNonterminal("statement", e0);
    switch (l1)
    {
    case 55:                        // 'namespace'
    case 56:                        // 'object'
      parse_namespace();
      break;
    case 52:                        // 'include'
      parse_include();
      break;
    case 54:                        // 'local'
      parse_local();
      break;
    case 51:                        // 'if'
      parse_if();
      break;
    case 45:                        // 'do'
      parse_do();
      break;
    case 61:                        // 'while'
      parse_while();
      break;
    case 48:                        // 'for'
      parse_for();
      break;
    case 49:                        // 'foreach'
      parse_foreach();
      break;
    case 60:                        // 'try'
      parse_try();
      break;
    case 58:                        // 'test'
      parse_test();
      break;
    case 41:                        // 'break'
      parse_break();
      break;
    case 44:                        // 'continue'
      parse_continue();
      break;
    case 57:                        // 'return'
      parse_return();
      break;
    case 59:                        // 'throw'
      parse_throw();
      break;
    default:
      parse_function();
    }
    eventHandler.endNonterminal("statement", e0);
  }

  function try_statement()
  {
    switch (l1)
    {
    case 55:                        // 'namespace'
    case 56:                        // 'object'
      try_namespace();
      break;
    case 52:                        // 'include'
      try_include();
      break;
    case 54:                        // 'local'
      try_local();
      break;
    case 51:                        // 'if'
      try_if();
      break;
    case 45:                        // 'do'
      try_do();
      break;
    case 61:                        // 'while'
      try_while();
      break;
    case 48:                        // 'for'
      try_for();
      break;
    case 49:                        // 'foreach'
      try_foreach();
      break;
    case 60:                        // 'try'
      try_try();
      break;
    case 58:                        // 'test'
      try_test();
      break;
    case 41:                        // 'break'
      try_break();
      break;
    case 44:                        // 'continue'
      try_continue();
      break;
    case 57:                        // 'return'
      try_return();
      break;
    case 59:                        // 'throw'
      try_throw();
      break;
    default:
      try_function();
    }
  }

  function parse_namespace()
  {
    eventHandler.startNonterminal("namespace", e0);
    switch (l1)
    {
    case 55:                        // 'namespace'
      consume(55);                  // 'namespace'
      lookahead1W(0);               // identifier | whitespace^token
      consume(3);                   // identifier
      lookahead1W(6);               // whitespace^token | '{'
      consume(62);                  // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        whitespace();
        parse_expression();
      }
      consume(67);                  // '}'
      break;
    default:
      consume(56);                  // 'object'
      lookahead1W(0);               // identifier | whitespace^token
      consume(3);                   // identifier
      lookahead1W(6);               // whitespace^token | '{'
      consume(62);                  // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        whitespace();
        parse_expression();
      }
      consume(67);                  // '}'
    }
    eventHandler.endNonterminal("namespace", e0);
  }

  function try_namespace()
  {
    switch (l1)
    {
    case 55:                        // 'namespace'
      consumeT(55);                 // 'namespace'
      lookahead1W(0);               // identifier | whitespace^token
      consumeT(3);                  // identifier
      lookahead1W(6);               // whitespace^token | '{'
      consumeT(62);                 // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        try_expression();
      }
      consumeT(67);                 // '}'
      break;
    default:
      consumeT(56);                 // 'object'
      lookahead1W(0);               // identifier | whitespace^token
      consumeT(3);                  // identifier
      lookahead1W(6);               // whitespace^token | '{'
      consumeT(62);                 // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        try_expression();
      }
      consumeT(67);                 // '}'
    }
  }

  function parse_function()
  {
    eventHandler.startNonterminal("function", e0);
    switch (l1)
    {
    case 40:                        // 'async'
      consume(40);                  // 'async'
      lookahead1W(0);               // identifier | whitespace^token
      consume(3);                   // identifier
      lookahead1W(1);               // whitespace^token | '('
      consume(17);                  // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        whitespace();
        parse_arguments();
      }
      consume(18);                  // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consume(62);                  // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        whitespace();
        parse_expression();
      }
      consume(67);                  // '}'
      break;
    case 43:                        // 'constructor'
      consume(43);                  // 'constructor'
      lookahead1W(0);               // identifier | whitespace^token
      consume(3);                   // identifier
      lookahead1W(1);               // whitespace^token | '('
      consume(17);                  // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        whitespace();
        parse_arguments();
      }
      consume(18);                  // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consume(62);                  // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        whitespace();
        parse_expression();
      }
      consume(67);                  // '}'
      break;
    case 53:                        // 'kernel'
      consume(53);                  // 'kernel'
      lookahead1W(0);               // identifier | whitespace^token
      consume(3);                   // identifier
      lookahead1W(1);               // whitespace^token | '('
      consume(17);                  // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        whitespace();
        parse_arguments();
      }
      consume(18);                  // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consume(62);                  // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        whitespace();
        parse_expression();
      }
      consume(67);                  // '}'
      break;
    default:
      consume(50);                  // 'function'
      lookahead1W(0);               // identifier | whitespace^token
      consume(3);                   // identifier
      lookahead1W(1);               // whitespace^token | '('
      consume(17);                  // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        whitespace();
        parse_arguments();
      }
      consume(18);                  // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consume(62);                  // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        whitespace();
        parse_expression();
      }
      consume(67);                  // '}'
    }
    eventHandler.endNonterminal("function", e0);
  }

  function try_function()
  {
    switch (l1)
    {
    case 40:                        // 'async'
      consumeT(40);                 // 'async'
      lookahead1W(0);               // identifier | whitespace^token
      consumeT(3);                  // identifier
      lookahead1W(1);               // whitespace^token | '('
      consumeT(17);                 // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        try_arguments();
      }
      consumeT(18);                 // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consumeT(62);                 // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        try_expression();
      }
      consumeT(67);                 // '}'
      break;
    case 43:                        // 'constructor'
      consumeT(43);                 // 'constructor'
      lookahead1W(0);               // identifier | whitespace^token
      consumeT(3);                  // identifier
      lookahead1W(1);               // whitespace^token | '('
      consumeT(17);                 // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        try_arguments();
      }
      consumeT(18);                 // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consumeT(62);                 // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        try_expression();
      }
      consumeT(67);                 // '}'
      break;
    case 53:                        // 'kernel'
      consumeT(53);                 // 'kernel'
      lookahead1W(0);               // identifier | whitespace^token
      consumeT(3);                  // identifier
      lookahead1W(1);               // whitespace^token | '('
      consumeT(17);                 // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        try_arguments();
      }
      consumeT(18);                 // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consumeT(62);                 // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        try_expression();
      }
      consumeT(67);                 // '}'
      break;
    default:
      consumeT(50);                 // 'function'
      lookahead1W(0);               // identifier | whitespace^token
      consumeT(3);                  // identifier
      lookahead1W(1);               // whitespace^token | '('
      consumeT(17);                 // '('
      lookahead1W(18);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      if (l1 != 18)                 // ')'
      {
        try_arguments();
      }
      consumeT(18);                 // ')'
      lookahead1W(6);               // whitespace^token | '{'
      consumeT(62);                 // '{'
      for (;;)
      {
        lookahead1W(20);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
        if (l1 == 67)               // '}'
        {
          break;
        }
        try_expression();
      }
      consumeT(67);                 // '}'
    }
  }

  function parse_include()
  {
    eventHandler.startNonterminal("include", e0);
    consume(52);                    // 'include'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    eventHandler.endNonterminal("include", e0);
  }

  function try_include()
  {
    consumeT(52);                   // 'include'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
  }

  function parse_local()
  {
    eventHandler.startNonterminal("local", e0);
    consume(54);                    // 'local'
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    eventHandler.endNonterminal("local", e0);
  }

  function try_local()
  {
    consumeT(54);                   // 'local'
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
  }

  function parse_if()
  {
    eventHandler.startNonterminal("if", e0);
    consume(51);                    // 'if'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    for (;;)
    {
      lookahead1W(26);              // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'else' | 'elseif' | 'for' | 'foreach' |
                                    // 'function' | 'if' | 'include' | 'kernel' | 'local' | 'namespace' | 'object' |
                                    // 'return' | 'test' | 'throw' | 'try' | 'while' | '{' | '}' | '~'
      if (l1 != 47)                 // 'elseif'
      {
        break;
      }
      whitespace();
      parse_elseif();
    }
    if (l1 == 46)                   // 'else'
    {
      whitespace();
      parse_else();
    }
    eventHandler.endNonterminal("if", e0);
  }

  function try_if()
  {
    consumeT(51);                   // 'if'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
    for (;;)
    {
      lookahead1W(26);              // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'else' | 'elseif' | 'for' | 'foreach' |
                                    // 'function' | 'if' | 'include' | 'kernel' | 'local' | 'namespace' | 'object' |
                                    // 'return' | 'test' | 'throw' | 'try' | 'while' | '{' | '}' | '~'
      if (l1 != 47)                 // 'elseif'
      {
        break;
      }
      try_elseif();
    }
    if (l1 == 46)                   // 'else'
    {
      try_else();
    }
  }

  function parse_elseif()
  {
    eventHandler.startNonterminal("elseif", e0);
    consume(47);                    // 'elseif'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("elseif", e0);
  }

  function try_elseif()
  {
    consumeT(47);                   // 'elseif'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
  }

  function parse_else()
  {
    eventHandler.startNonterminal("else", e0);
    consume(46);                    // 'else'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("else", e0);
  }

  function try_else()
  {
    consumeT(46);                   // 'else'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
  }

  function parse_do()
  {
    eventHandler.startNonterminal("do", e0);
    consume(45);                    // 'do'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    lookahead1W(5);                 // whitespace^token | 'while'
    consume(61);                    // 'while'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    eventHandler.endNonterminal("do", e0);
  }

  function try_do()
  {
    consumeT(45);                   // 'do'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
    lookahead1W(5);                 // whitespace^token | 'while'
    consumeT(61);                   // 'while'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
  }

  function parse_while()
  {
    eventHandler.startNonterminal("while", e0);
    consume(61);                    // 'while'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("while", e0);
  }

  function try_while()
  {
    consumeT(61);                   // 'while'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
  }

  function parse_for()
  {
    eventHandler.startNonterminal("for", e0);
    consume(48);                    // 'for'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consume(27);                    // ';'
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consume(27);                    // ';'
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("for", e0);
  }

  function try_for()
  {
    consumeT(48);                   // 'for'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      try_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consumeT(27);                   // ';'
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      try_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consumeT(27);                   // ';'
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      try_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
  }

  function parse_foreach()
  {
    eventHandler.startNonterminal("foreach", e0);
    consume(49);                    // 'foreach'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consume(27);                    // ';'
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consume(27);                    // ';'
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("foreach", e0);
  }

  function try_foreach()
  {
    consumeT(49);                   // 'foreach'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      try_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consumeT(27);                   // ';'
    lookahead1W(19);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 27)                   // ';'
    {
      try_expression();
    }
    lookahead1W(4);                 // whitespace^token | ';'
    consumeT(27);                   // ';'
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      try_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
  }

  function parse_try()
  {
    eventHandler.startNonterminal("try", e0);
    consume(60);                    // 'try'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    lookahead1W(25);                // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'catch' | 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' |
                                    // 'if' | 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' |
                                    // 'test' | 'throw' | 'try' | 'while' | '{' | '}' | '~'
    if (l1 == 42)                   // 'catch'
    {
      whitespace();
      parse_catch();
    }
    eventHandler.endNonterminal("try", e0);
  }

  function try_try()
  {
    consumeT(60);                   // 'try'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
    lookahead1W(25);                // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'catch' | 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' |
                                    // 'if' | 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' |
                                    // 'test' | 'throw' | 'try' | 'while' | '{' | '}' | '~'
    if (l1 == 42)                   // 'catch'
    {
      try_catch();
    }
  }

  function parse_test()
  {
    eventHandler.startNonterminal("test", e0);
    consume(58);                    // 'test'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(22);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ';' | '[' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
    if (l1 != 18                    // ')'
     && l1 != 27)                   // ';'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(8);                 // whitespace^token | ')' | ';'
    if (l1 == 27)                   // ';'
    {
      consume(27);                  // ';'
      lookahead1W(22);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ';' | '[' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
      if (l1 != 18                  // ')'
       && l1 != 27)                 // ';'
      {
        whitespace();
        parse_expression();
      }
      lookahead1W(8);               // whitespace^token | ')' | ';'
      if (l1 == 27)                 // ';'
      {
        consume(27);                // ';'
        lookahead1W(18);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        if (l1 != 18)               // ')'
        {
          whitespace();
          parse_expression();
        }
      }
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    lookahead1W(25);                // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'catch' | 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' |
                                    // 'if' | 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' |
                                    // 'test' | 'throw' | 'try' | 'while' | '{' | '}' | '~'
    if (l1 == 42)                   // 'catch'
    {
      whitespace();
      parse_catch();
    }
    eventHandler.endNonterminal("test", e0);
  }

  function try_test()
  {
    consumeT(58);                   // 'test'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(22);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ';' | '[' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
    if (l1 != 18                    // ')'
     && l1 != 27)                   // ';'
    {
      try_expression();
    }
    lookahead1W(8);                 // whitespace^token | ')' | ';'
    if (l1 == 27)                   // ';'
    {
      consumeT(27);                 // ';'
      lookahead1W(22);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ';' | '[' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
      if (l1 != 18                  // ')'
       && l1 != 27)                 // ';'
      {
        try_expression();
      }
      lookahead1W(8);               // whitespace^token | ')' | ';'
      if (l1 == 27)                 // ';'
      {
        consumeT(27);               // ';'
        lookahead1W(18);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        if (l1 != 18)               // ')'
        {
          try_expression();
        }
      }
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
    lookahead1W(25);                // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'catch' | 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' |
                                    // 'if' | 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' |
                                    // 'test' | 'throw' | 'try' | 'while' | '{' | '}' | '~'
    if (l1 == 42)                   // 'catch'
    {
      try_catch();
    }
  }

  function parse_catch()
  {
    eventHandler.startNonterminal("catch", e0);
    consume(42);                    // 'catch'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consume(62);                    // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      whitespace();
      parse_expression();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("catch", e0);
  }

  function try_catch()
  {
    consumeT(42);                   // 'catch'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
    lookahead1W(6);                 // whitespace^token | '{'
    consumeT(62);                   // '{'
    for (;;)
    {
      lookahead1W(20);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '}' | '~'
      if (l1 == 67)                 // '}'
      {
        break;
      }
      try_expression();
    }
    consumeT(67);                   // '}'
  }

  function parse_break()
  {
    eventHandler.startNonterminal("break", e0);
    consume(41);                    // 'break'
    eventHandler.endNonterminal("break", e0);
  }

  function try_break()
  {
    consumeT(41);                   // 'break'
  }

  function parse_continue()
  {
    eventHandler.startNonterminal("continue", e0);
    consume(44);                    // 'continue'
    eventHandler.endNonterminal("continue", e0);
  }

  function try_continue()
  {
    consumeT(44);                   // 'continue'
  }

  function parse_return()
  {
    eventHandler.startNonterminal("return", e0);
    consume(57);                    // 'return'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    eventHandler.endNonterminal("return", e0);
  }

  function try_return()
  {
    consumeT(57);                   // 'return'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      try_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
  }

  function parse_throw()
  {
    eventHandler.startNonterminal("throw", e0);
    consume(59);                    // 'throw'
    lookahead1W(1);                 // whitespace^token | '('
    consume(17);                    // '('
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      whitespace();
      parse_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    eventHandler.endNonterminal("throw", e0);
  }

  function try_throw()
  {
    consumeT(59);                   // 'throw'
    lookahead1W(1);                 // whitespace^token | '('
    consumeT(17);                   // '('
    lookahead1W(18);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    if (l1 != 18)                   // ')'
    {
      try_expression();
    }
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
  }

  function parse_expression()
  {
    eventHandler.startNonterminal("expression", e0);
    switch (l1)
    {
    case 3:                         // identifier
    case 4:                         // null
    case 5:                         // true
    case 6:                         // false
    case 7:                         // string
    case 8:                         // complex
    case 9:                         // real
    case 12:                        // '!'
    case 17:                        // '('
    case 37:                        // '['
    case 62:                        // '{'
    case 68:                        // '~'
      parse_operation();
      break;
    case 10:                        // comment
      consume(10);                  // comment
      break;
    default:
      parse_statement();
    }
    eventHandler.endNonterminal("expression", e0);
  }

  function try_expression()
  {
    switch (l1)
    {
    case 3:                         // identifier
    case 4:                         // null
    case 5:                         // true
    case 6:                         // false
    case 7:                         // string
    case 8:                         // complex
    case 9:                         // real
    case 12:                        // '!'
    case 17:                        // '('
    case 37:                        // '['
    case 62:                        // '{'
    case 68:                        // '~'
      try_operation();
      break;
    case 10:                        // comment
      consumeT(10);                 // comment
      break;
    default:
      try_statement();
    }
  }

  function parse_arguments()
  {
    eventHandler.startNonterminal("arguments", e0);
    parse_expression();
    for (;;)
    {
      lookahead1W(24);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
      if (l1 != 21)                 // ','
      {
        break;
      }
      consume(21);                  // ','
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      whitespace();
      parse_expression();
    }
    eventHandler.endNonterminal("arguments", e0);
  }

  function try_arguments()
  {
    try_expression();
    for (;;)
    {
      lookahead1W(24);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | ',' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
      if (l1 != 21)                 // ','
      {
        break;
      }
      consumeT(21);                 // ','
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      try_expression();
    }
  }

  function parse_member()
  {
    eventHandler.startNonterminal("member", e0);
    switch (l1)
    {
    case 3:                         // identifier
      lookahead2W(28);              // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '.' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' |
                                    // '>>' | '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' |
                                    // 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
      switch (lk)
      {
      case 2179:                    // identifier '('
        lookahead3W(18);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        break;
      case 2947:                    // identifier '.'
        lookahead3W(0);             // identifier | whitespace^token
        break;
      }
      break;
    default:
      lk = l1;
    }
    if (lk == 51331                 // identifier '(' identifier
     || lk == 52099                 // identifier '.' identifier
     || lk == 67715                 // identifier '(' null
     || lk == 84099                 // identifier '(' true
     || lk == 100483                // identifier '(' false
     || lk == 116867                // identifier '(' string
     || lk == 133251                // identifier '(' complex
     || lk == 149635                // identifier '(' real
     || lk == 166019                // identifier '(' comment
     || lk == 198787                // identifier '(' '!'
     || lk == 280707                // identifier '(' '('
     || lk == 608387                // identifier '(' '['
     || lk == 657539                // identifier '(' 'async'
     || lk == 673923                // identifier '(' 'break'
     || lk == 706691                // identifier '(' 'constructor'
     || lk == 723075                // identifier '(' 'continue'
     || lk == 739459                // identifier '(' 'do'
     || lk == 788611                // identifier '(' 'for'
     || lk == 804995                // identifier '(' 'foreach'
     || lk == 821379                // identifier '(' 'function'
     || lk == 837763                // identifier '(' 'if'
     || lk == 854147                // identifier '(' 'include'
     || lk == 870531                // identifier '(' 'kernel'
     || lk == 886915                // identifier '(' 'local'
     || lk == 903299                // identifier '(' 'namespace'
     || lk == 919683                // identifier '(' 'object'
     || lk == 936067                // identifier '(' 'return'
     || lk == 952451                // identifier '(' 'test'
     || lk == 968835                // identifier '(' 'throw'
     || lk == 985219                // identifier '(' 'try'
     || lk == 1001603               // identifier '(' 'while'
     || lk == 1017987               // identifier '(' '{'
     || lk == 1116291)              // identifier '(' '~'
    {
      lk = memoized(0, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2; var l3A = l3;
        var b3A = b3; var e3A = e3;
        try
        {
          consumeT(3);              // identifier
          for (;;)
          {
            lookahead1W(7);         // whitespace^token | '(' | '.'
            if (l1 != 23)           // '.'
            {
              break;
            }
            consumeT(23);           // '.'
            lookahead1W(0);         // identifier | whitespace^token
            consumeT(3);            // identifier
          }
          consumeT(17);             // '('
          for (;;)
          {
            lookahead1W(18);        // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
            if (l1 == 18)           // ')'
            {
              break;
            }
            try_arguments();
          }
          consumeT(18);             // ')'
          lk = -1;
        }
        catch (p1A)
        {
          lk = -2;
        }
        b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
        b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
        b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
        b3 = b3A; e3 = e3A; end = e3A; }}}
        memoize(0, e0, lk);
      }
    }
    switch (lk)
    {
    case -1:
    case 297091:                    // identifier '(' ')'
      consume(3);                   // identifier
      for (;;)
      {
        lookahead1W(7);             // whitespace^token | '(' | '.'
        if (l1 != 23)               // '.'
        {
          break;
        }
        consume(23);                // '.'
        lookahead1W(0);             // identifier | whitespace^token
        consume(3);                 // identifier
      }
      consume(17);                  // '('
      for (;;)
      {
        lookahead1W(18);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        if (l1 == 18)               // ')'
        {
          break;
        }
        whitespace();
        parse_arguments();
      }
      consume(18);                  // ')'
      break;
    default:
      consume(3);                   // identifier
      for (;;)
      {
        lookahead1W(28);            // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '.' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' |
                                    // '>>' | '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' |
                                    // 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
        if (l1 != 23)               // '.'
        {
          break;
        }
        consume(23);                // '.'
        lookahead1W(0);             // identifier | whitespace^token
        consume(3);                 // identifier
      }
      for (;;)
      {
        lookahead1W(27);            // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' |
                                    // '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' | 'do' |
                                    // 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
        switch (l1)
        {
        case 37:                    // '['
          lookahead2W(23);          // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
          switch (lk)
          {
          case 421:                 // '[' identifier
            lookahead3W(15);        // whitespace^token | '!=' | '%' | '&' | '&&' | '(' | '*' | '+' | ',' | '-' | '.' |
                                    // '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' | '?=' |
                                    // '[' | ']' | '^' | '|' | '||' | '|||' | '||||'
            break;
          case 4773:                // '[' '['
            lookahead3W(23);        // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
            break;
          case 1573:                // '[' '!'
          case 8741:                // '[' '~'
            lookahead3W(11);        // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '(' | '[' | '{'
            break;
          case 5797:                // '[' 'do'
          case 7717:                // '[' 'try'
            lookahead3W(6);         // whitespace^token | '{'
            break;
          case 1317:                // '[' comment
          case 5285:                // '[' 'break'
          case 5669:                // '[' 'continue'
            lookahead3W(10);        // whitespace^token | ',' | ';' | ']'
            break;
          case 2213:                // '[' '('
          case 6949:                // '[' 'local'
          case 7973:                // '[' '{'
            lookahead3W(16);        // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
            break;
          case 549:                 // '[' null
          case 677:                 // '[' true
          case 805:                 // '[' false
          case 933:                 // '[' string
          case 1061:                // '[' complex
          case 1189:                // '[' real
            lookahead3W(14);        // whitespace^token | '!=' | '%' | '&' | '&&' | '*' | '+' | ',' | '-' | '/' | ':=' |
                                    // ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' | '?=' | ']' | '^' |
                                    // '|' | '||' | '|||' | '||||'
            break;
          case 5157:                // '[' 'async'
          case 5541:                // '[' 'constructor'
          case 6437:                // '[' 'function'
          case 6821:                // '[' 'kernel'
          case 7077:                // '[' 'namespace'
          case 7205:                // '[' 'object'
            lookahead3W(0);         // identifier | whitespace^token
            break;
          case 6181:                // '[' 'for'
          case 6309:                // '[' 'foreach'
          case 6565:                // '[' 'if'
          case 6693:                // '[' 'include'
          case 7333:                // '[' 'return'
          case 7461:                // '[' 'test'
          case 7589:                // '[' 'throw'
          case 7845:                // '[' 'while'
            lookahead3W(1);         // whitespace^token | '('
            break;
          }
          break;
        default:
          lk = l1;
        }
        if (lk != 1                 // END
         && lk != 3                 // identifier
         && lk != 4                 // null
         && lk != 5                 // true
         && lk != 6                 // false
         && lk != 7                 // string
         && lk != 8                 // complex
         && lk != 9                 // real
         && lk != 10                // comment
         && lk != 12                // '!'
         && lk != 13                // '!='
         && lk != 14                // '%'
         && lk != 15                // '&'
         && lk != 16                // '&&'
         && lk != 17                // '('
         && lk != 18                // ')'
         && lk != 19                // '*'
         && lk != 20                // '+'
         && lk != 21                // ','
         && lk != 22                // '-'
         && lk != 24                // '/'
         && lk != 26                // ':='
         && lk != 27                // ';'
         && lk != 28                // '<'
         && lk != 29                // '<<'
         && lk != 30                // '<='
         && lk != 31                // '='
         && lk != 32                // '=='
         && lk != 33                // '>'
         && lk != 34                // '>='
         && lk != 35                // '>>'
         && lk != 36                // '?='
         && lk != 38                // ']'
         && lk != 39                // '^'
         && lk != 40                // 'async'
         && lk != 41                // 'break'
         && lk != 43                // 'constructor'
         && lk != 44                // 'continue'
         && lk != 45                // 'do'
         && lk != 48                // 'for'
         && lk != 49                // 'foreach'
         && lk != 50                // 'function'
         && lk != 51                // 'if'
         && lk != 52                // 'include'
         && lk != 53                // 'kernel'
         && lk != 54                // 'local'
         && lk != 55                // 'namespace'
         && lk != 56                // 'object'
         && lk != 57                // 'return'
         && lk != 58                // 'test'
         && lk != 59                // 'throw'
         && lk != 60                // 'try'
         && lk != 61                // 'while'
         && lk != 62                // '{'
         && lk != 63                // '|'
         && lk != 64                // '||'
         && lk != 65                // '|||'
         && lk != 66                // '||||'
         && lk != 67                // '}'
         && lk != 68                // '~'
         && lk != 3493              // '[' ';'
         && lk != 4901              // '[' ']'
         && lk != 442789            // '[' identifier ';'
         && lk != 442917            // '[' null ';'
         && lk != 443045            // '[' true ';'
         && lk != 443173            // '[' false ';'
         && lk != 443301            // '[' string ';'
         && lk != 443429            // '[' complex ';'
         && lk != 443557            // '[' real ';'
         && lk != 443685            // '[' comment ';'
         && lk != 447653            // '[' 'break' ';'
         && lk != 448037)           // '[' 'continue' ';'
        {
          lk = memoized(1, e0);
          if (lk == 0)
          {
            var b0B = b0; var e0B = e0; var l1B = l1;
            var b1B = b1; var e1B = e1; var l2B = l2;
            var b2B = b2; var e2B = e2; var l3B = l3;
            var b3B = b3; var e3B = e3;
            try
            {
              consumeT(37);         // '['
              lookahead1W(16);      // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
              try_arguments();
              consumeT(38);         // ']'
              lk = -1;
            }
            catch (p1B)
            {
              lk = -2;
            }
            b0 = b0B; e0 = e0B; l1 = l1B; if (l1 == 0) {end = e0B;} else {
            b1 = b1B; e1 = e1B; l2 = l2B; if (l2 == 0) {end = e1B;} else {
            b2 = b2B; e2 = e2B; l3 = l3B; if (l3 == 0) {end = e2B;} else {
            b3 = b3B; e3 = e3B; end = e3B; }}}
            memoize(1, e0, lk);
          }
        }
        if (lk != -1)
        {
          break;
        }
        consume(37);                // '['
        lookahead1W(16);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        whitespace();
        parse_arguments();
        consume(38);                // ']'
      }
    }
    eventHandler.endNonterminal("member", e0);
  }

  function try_member()
  {
    switch (l1)
    {
    case 3:                         // identifier
      lookahead2W(28);              // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '.' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' |
                                    // '>>' | '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' |
                                    // 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
      switch (lk)
      {
      case 2179:                    // identifier '('
        lookahead3W(18);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        break;
      case 2947:                    // identifier '.'
        lookahead3W(0);             // identifier | whitespace^token
        break;
      }
      break;
    default:
      lk = l1;
    }
    if (lk == 51331                 // identifier '(' identifier
     || lk == 52099                 // identifier '.' identifier
     || lk == 67715                 // identifier '(' null
     || lk == 84099                 // identifier '(' true
     || lk == 100483                // identifier '(' false
     || lk == 116867                // identifier '(' string
     || lk == 133251                // identifier '(' complex
     || lk == 149635                // identifier '(' real
     || lk == 166019                // identifier '(' comment
     || lk == 198787                // identifier '(' '!'
     || lk == 280707                // identifier '(' '('
     || lk == 608387                // identifier '(' '['
     || lk == 657539                // identifier '(' 'async'
     || lk == 673923                // identifier '(' 'break'
     || lk == 706691                // identifier '(' 'constructor'
     || lk == 723075                // identifier '(' 'continue'
     || lk == 739459                // identifier '(' 'do'
     || lk == 788611                // identifier '(' 'for'
     || lk == 804995                // identifier '(' 'foreach'
     || lk == 821379                // identifier '(' 'function'
     || lk == 837763                // identifier '(' 'if'
     || lk == 854147                // identifier '(' 'include'
     || lk == 870531                // identifier '(' 'kernel'
     || lk == 886915                // identifier '(' 'local'
     || lk == 903299                // identifier '(' 'namespace'
     || lk == 919683                // identifier '(' 'object'
     || lk == 936067                // identifier '(' 'return'
     || lk == 952451                // identifier '(' 'test'
     || lk == 968835                // identifier '(' 'throw'
     || lk == 985219                // identifier '(' 'try'
     || lk == 1001603               // identifier '(' 'while'
     || lk == 1017987               // identifier '(' '{'
     || lk == 1116291)              // identifier '(' '~'
    {
      lk = memoized(0, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2; var l3A = l3;
        var b3A = b3; var e3A = e3;
        try
        {
          consumeT(3);              // identifier
          for (;;)
          {
            lookahead1W(7);         // whitespace^token | '(' | '.'
            if (l1 != 23)           // '.'
            {
              break;
            }
            consumeT(23);           // '.'
            lookahead1W(0);         // identifier | whitespace^token
            consumeT(3);            // identifier
          }
          consumeT(17);             // '('
          for (;;)
          {
            lookahead1W(18);        // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
            if (l1 == 18)           // ')'
            {
              break;
            }
            try_arguments();
          }
          consumeT(18);             // ')'
          memoize(0, e0A, -1);
          lk = -3;
        }
        catch (p1A)
        {
          lk = -2;
          b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
          b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
          b2 = b2A; e2 = e2A; l3 = l3A; if (l3 == 0) {end = e2A;} else {
          b3 = b3A; e3 = e3A; end = e3A; }}}
          memoize(0, e0A, -2);
        }
      }
    }
    switch (lk)
    {
    case -1:
    case 297091:                    // identifier '(' ')'
      consumeT(3);                  // identifier
      for (;;)
      {
        lookahead1W(7);             // whitespace^token | '(' | '.'
        if (l1 != 23)               // '.'
        {
          break;
        }
        consumeT(23);               // '.'
        lookahead1W(0);             // identifier | whitespace^token
        consumeT(3);                // identifier
      }
      consumeT(17);                 // '('
      for (;;)
      {
        lookahead1W(18);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ')' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        if (l1 == 18)               // ')'
        {
          break;
        }
        try_arguments();
      }
      consumeT(18);                 // ')'
      break;
    case -3:
      break;
    default:
      consumeT(3);                  // identifier
      for (;;)
      {
        lookahead1W(28);            // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '.' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' |
                                    // '>>' | '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' |
                                    // 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
        if (l1 != 23)               // '.'
        {
          break;
        }
        consumeT(23);               // '.'
        lookahead1W(0);             // identifier | whitespace^token
        consumeT(3);                // identifier
      }
      for (;;)
      {
        lookahead1W(27);            // END | identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '!=' | '%' | '&' | '&&' | '(' | ')' | '*' | '+' | ',' |
                                    // '-' | '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' |
                                    // '?=' | '[' | ']' | '^' | 'async' | 'break' | 'constructor' | 'continue' | 'do' |
                                    // 'for' | 'foreach' | 'function' | 'if' | 'include' | 'kernel' | 'local' |
                                    // 'namespace' | 'object' | 'return' | 'test' | 'throw' | 'try' | 'while' | '{' |
                                    // '|' | '||' | '|||' | '||||' | '}' | '~'
        switch (l1)
        {
        case 37:                    // '['
          lookahead2W(23);          // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
          switch (lk)
          {
          case 421:                 // '[' identifier
            lookahead3W(15);        // whitespace^token | '!=' | '%' | '&' | '&&' | '(' | '*' | '+' | ',' | '-' | '.' |
                                    // '/' | ':=' | ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' | '?=' |
                                    // '[' | ']' | '^' | '|' | '||' | '|||' | '||||'
            break;
          case 4773:                // '[' '['
            lookahead3W(23);        // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
            break;
          case 1573:                // '[' '!'
          case 8741:                // '[' '~'
            lookahead3W(11);        // identifier | null | true | false | string | complex | real | whitespace^token |
                                    // '(' | '[' | '{'
            break;
          case 5797:                // '[' 'do'
          case 7717:                // '[' 'try'
            lookahead3W(6);         // whitespace^token | '{'
            break;
          case 1317:                // '[' comment
          case 5285:                // '[' 'break'
          case 5669:                // '[' 'continue'
            lookahead3W(10);        // whitespace^token | ',' | ';' | ']'
            break;
          case 2213:                // '[' '('
          case 6949:                // '[' 'local'
          case 7973:                // '[' '{'
            lookahead3W(16);        // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
            break;
          case 549:                 // '[' null
          case 677:                 // '[' true
          case 805:                 // '[' false
          case 933:                 // '[' string
          case 1061:                // '[' complex
          case 1189:                // '[' real
            lookahead3W(14);        // whitespace^token | '!=' | '%' | '&' | '&&' | '*' | '+' | ',' | '-' | '/' | ':=' |
                                    // ';' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' | '?=' | ']' | '^' |
                                    // '|' | '||' | '|||' | '||||'
            break;
          case 5157:                // '[' 'async'
          case 5541:                // '[' 'constructor'
          case 6437:                // '[' 'function'
          case 6821:                // '[' 'kernel'
          case 7077:                // '[' 'namespace'
          case 7205:                // '[' 'object'
            lookahead3W(0);         // identifier | whitespace^token
            break;
          case 6181:                // '[' 'for'
          case 6309:                // '[' 'foreach'
          case 6565:                // '[' 'if'
          case 6693:                // '[' 'include'
          case 7333:                // '[' 'return'
          case 7461:                // '[' 'test'
          case 7589:                // '[' 'throw'
          case 7845:                // '[' 'while'
            lookahead3W(1);         // whitespace^token | '('
            break;
          }
          break;
        default:
          lk = l1;
        }
        if (lk != 1                 // END
         && lk != 3                 // identifier
         && lk != 4                 // null
         && lk != 5                 // true
         && lk != 6                 // false
         && lk != 7                 // string
         && lk != 8                 // complex
         && lk != 9                 // real
         && lk != 10                // comment
         && lk != 12                // '!'
         && lk != 13                // '!='
         && lk != 14                // '%'
         && lk != 15                // '&'
         && lk != 16                // '&&'
         && lk != 17                // '('
         && lk != 18                // ')'
         && lk != 19                // '*'
         && lk != 20                // '+'
         && lk != 21                // ','
         && lk != 22                // '-'
         && lk != 24                // '/'
         && lk != 26                // ':='
         && lk != 27                // ';'
         && lk != 28                // '<'
         && lk != 29                // '<<'
         && lk != 30                // '<='
         && lk != 31                // '='
         && lk != 32                // '=='
         && lk != 33                // '>'
         && lk != 34                // '>='
         && lk != 35                // '>>'
         && lk != 36                // '?='
         && lk != 38                // ']'
         && lk != 39                // '^'
         && lk != 40                // 'async'
         && lk != 41                // 'break'
         && lk != 43                // 'constructor'
         && lk != 44                // 'continue'
         && lk != 45                // 'do'
         && lk != 48                // 'for'
         && lk != 49                // 'foreach'
         && lk != 50                // 'function'
         && lk != 51                // 'if'
         && lk != 52                // 'include'
         && lk != 53                // 'kernel'
         && lk != 54                // 'local'
         && lk != 55                // 'namespace'
         && lk != 56                // 'object'
         && lk != 57                // 'return'
         && lk != 58                // 'test'
         && lk != 59                // 'throw'
         && lk != 60                // 'try'
         && lk != 61                // 'while'
         && lk != 62                // '{'
         && lk != 63                // '|'
         && lk != 64                // '||'
         && lk != 65                // '|||'
         && lk != 66                // '||||'
         && lk != 67                // '}'
         && lk != 68                // '~'
         && lk != 3493              // '[' ';'
         && lk != 4901              // '[' ']'
         && lk != 442789            // '[' identifier ';'
         && lk != 442917            // '[' null ';'
         && lk != 443045            // '[' true ';'
         && lk != 443173            // '[' false ';'
         && lk != 443301            // '[' string ';'
         && lk != 443429            // '[' complex ';'
         && lk != 443557            // '[' real ';'
         && lk != 443685            // '[' comment ';'
         && lk != 447653            // '[' 'break' ';'
         && lk != 448037)           // '[' 'continue' ';'
        {
          lk = memoized(1, e0);
          if (lk == 0)
          {
            var b0B = b0; var e0B = e0; var l1B = l1;
            var b1B = b1; var e1B = e1; var l2B = l2;
            var b2B = b2; var e2B = e2; var l3B = l3;
            var b3B = b3; var e3B = e3;
            try
            {
              consumeT(37);         // '['
              lookahead1W(16);      // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
              try_arguments();
              consumeT(38);         // ']'
              memoize(1, e0B, -1);
              continue;
            }
            catch (p1B)
            {
              b0 = b0B; e0 = e0B; l1 = l1B; if (l1 == 0) {end = e0B;} else {
              b1 = b1B; e1 = e1B; l2 = l2B; if (l2 == 0) {end = e1B;} else {
              b2 = b2B; e2 = e2B; l3 = l3B; if (l3 == 0) {end = e2B;} else {
              b3 = b3B; e3 = e3B; end = e3B; }}}
              memoize(1, e0B, -2);
              break;
            }
          }
        }
        if (lk != -1)
        {
          break;
        }
        consumeT(37);               // '['
        lookahead1W(16);            // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
        try_arguments();
        consumeT(38);               // ']'
      }
    }
  }

  function parse_array()
  {
    eventHandler.startNonterminal("array", e0);
    consume(62);                    // '{'
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_element();
    for (;;)
    {
      lookahead1W(9);               // whitespace^token | ',' | '}'
      if (l1 != 21)                 // ','
      {
        break;
      }
      consume(21);                  // ','
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      whitespace();
      parse_element();
    }
    consume(67);                    // '}'
    eventHandler.endNonterminal("array", e0);
  }

  function try_array()
  {
    consumeT(62);                   // '{'
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_element();
    for (;;)
    {
      lookahead1W(9);               // whitespace^token | ',' | '}'
      if (l1 != 21)                 // ','
      {
        break;
      }
      consumeT(21);                 // ','
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      try_element();
    }
    consumeT(67);                   // '}'
  }

  function parse_matrix()
  {
    eventHandler.startNonterminal("matrix", e0);
    consume(37);                    // '['
    lookahead1W(23);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
    if (l1 != 27                    // ';'
     && l1 != 38)                   // ']'
    {
      whitespace();
      parse_row();
    }
    for (;;)
    {
      if (l1 != 27)                 // ';'
      {
        break;
      }
      consume(27);                  // ';'
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      whitespace();
      parse_row();
    }
    consume(38);                    // ']'
    eventHandler.endNonterminal("matrix", e0);
  }

  function try_matrix()
  {
    consumeT(37);                   // '['
    lookahead1W(23);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | ';' | '[' | ']' | 'async' | 'break' |
                                    // 'constructor' | 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' |
                                    // 'include' | 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' |
                                    // 'throw' | 'try' | 'while' | '{' | '~'
    if (l1 != 27                    // ';'
     && l1 != 38)                   // ']'
    {
      try_row();
    }
    for (;;)
    {
      if (l1 != 27)                 // ';'
      {
        break;
      }
      consumeT(27);                 // ';'
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      try_row();
    }
    consumeT(38);                   // ']'
  }

  function parse_element()
  {
    eventHandler.startNonterminal("element", e0);
    switch (l1)
    {
    case 7:                         // string
      lookahead2W(13);              // whitespace^token | '!=' | '%' | '&' | '&&' | '*' | '+' | ',' | '-' | '/' | ':' |
                                    // ':=' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' | '?=' | '^' | '|' |
                                    // '||' | '|||' | '||||' | '}'
      break;
    default:
      lk = l1;
    }
    if (lk == 3207)                 // string ':'
    {
      whitespace();
      parse_key();
      lookahead1W(3);               // whitespace^token | ':'
      consume(25);                  // ':'
    }
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    eventHandler.endNonterminal("element", e0);
  }

  function try_element()
  {
    switch (l1)
    {
    case 7:                         // string
      lookahead2W(13);              // whitespace^token | '!=' | '%' | '&' | '&&' | '*' | '+' | ',' | '-' | '/' | ':' |
                                    // ':=' | '<' | '<<' | '<=' | '=' | '==' | '>' | '>=' | '>>' | '?=' | '^' | '|' |
                                    // '||' | '|||' | '||||' | '}'
      break;
    default:
      lk = l1;
    }
    if (lk == 3207)                 // string ':'
    {
      try_key();
      lookahead1W(3);               // whitespace^token | ':'
      consumeT(25);                 // ':'
    }
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
  }

  function parse_key()
  {
    eventHandler.startNonterminal("key", e0);
    consume(7);                     // string
    eventHandler.endNonterminal("key", e0);
  }

  function try_key()
  {
    consumeT(7);                    // string
  }

  function parse_row()
  {
    eventHandler.startNonterminal("row", e0);
    parse_column();
    for (;;)
    {
      lookahead1W(10);              // whitespace^token | ',' | ';' | ']'
      if (l1 != 21)                 // ','
      {
        break;
      }
      consume(21);                  // ','
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      whitespace();
      parse_column();
    }
    eventHandler.endNonterminal("row", e0);
  }

  function try_row()
  {
    try_column();
    for (;;)
    {
      lookahead1W(10);              // whitespace^token | ',' | ';' | ']'
      if (l1 != 21)                 // ','
      {
        break;
      }
      consumeT(21);                 // ','
      lookahead1W(16);              // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
      try_column();
    }
  }

  function parse_column()
  {
    eventHandler.startNonterminal("column", e0);
    parse_expression();
    eventHandler.endNonterminal("column", e0);
  }

  function try_column()
  {
    try_expression();
  }

  function parse_parenthesizedExpression()
  {
    eventHandler.startNonterminal("parenthesizedExpression", e0);
    consume(17);                    // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    whitespace();
    parse_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consume(18);                    // ')'
    eventHandler.endNonterminal("parenthesizedExpression", e0);
  }

  function try_parenthesizedExpression()
  {
    consumeT(17);                   // '('
    lookahead1W(16);                // identifier | null | true | false | string | complex | real | comment |
                                    // whitespace^token | '!' | '(' | '[' | 'async' | 'break' | 'constructor' |
                                    // 'continue' | 'do' | 'for' | 'foreach' | 'function' | 'if' | 'include' |
                                    // 'kernel' | 'local' | 'namespace' | 'object' | 'return' | 'test' | 'throw' |
                                    // 'try' | 'while' | '{' | '~'
    try_expression();
    lookahead1W(2);                 // whitespace^token | ')'
    consumeT(18);                   // ')'
  }

  function parse_value()
  {
    eventHandler.startNonterminal("value", e0);
    switch (l1)
    {
    case 9:                         // real
      consume(9);                   // real
      break;
    case 8:                         // complex
      consume(8);                   // complex
      break;
    case 7:                         // string
      consume(7);                   // string
      break;
    case 62:                        // '{'
      parse_array();
      break;
    case 37:                        // '['
      parse_matrix();
      break;
    case 4:                         // null
      consume(4);                   // null
      break;
    case 5:                         // true
      consume(5);                   // true
      break;
    default:
      consume(6);                   // false
    }
    eventHandler.endNonterminal("value", e0);
  }

  function try_value()
  {
    switch (l1)
    {
    case 9:                         // real
      consumeT(9);                  // real
      break;
    case 8:                         // complex
      consumeT(8);                  // complex
      break;
    case 7:                         // string
      consumeT(7);                  // string
      break;
    case 62:                        // '{'
      try_array();
      break;
    case 37:                        // '['
      try_matrix();
      break;
    case 4:                         // null
      consumeT(4);                  // null
      break;
    case 5:                         // true
      consumeT(5);                  // true
      break;
    default:
      consumeT(6);                  // false
    }
  }

  function consume(t)
  {
    if (l1 == t)
    {
      whitespace();
      eventHandler.terminal(MaiaScript.TOKEN[l1], b1, e1);
      b0 = b1; e0 = e1; l1 = l2; if (l1 != 0) {
      b1 = b2; e1 = e2; l2 = l3; if (l2 != 0) {
      b2 = b3; e2 = e3; l3 = 0; }}
    }
    else
    {
      error(b1, e1, 0, l1, t);
    }
  }

  function consumeT(t)
  {
    if (l1 == t)
    {
      b0 = b1; e0 = e1; l1 = l2; if (l1 != 0) {
      b1 = b2; e1 = e2; l2 = l3; if (l2 != 0) {
      b2 = b3; e2 = e3; l3 = 0; }}
    }
    else
    {
      error(b1, e1, 0, l1, t);
    }
  }

  function whitespace()
  {
    if (e0 != b1)
    {
      eventHandler.whitespace(e0, b1);
      e0 = b1;
    }
  }

  function matchW(tokenSetId)
  {
    var code;
    for (;;)
    {
      code = match(tokenSetId);
      if (code != 11)               // whitespace^token
      {
        break;
      }
    }
    return code;
  }

  function lookahead1W(tokenSetId)
  {
    if (l1 == 0)
    {
      l1 = matchW(tokenSetId);
      b1 = begin;
      e1 = end;
    }
  }

  function lookahead2W(tokenSetId)
  {
    if (l2 == 0)
    {
      l2 = matchW(tokenSetId);
      b2 = begin;
      e2 = end;
    }
    lk = (l2 << 7) | l1;
  }

  function lookahead3W(tokenSetId)
  {
    if (l3 == 0)
    {
      l3 = matchW(tokenSetId);
      b3 = begin;
      e3 = end;
    }
    lk |= l3 << 14;
  }

  function error(b, e, s, l, t)
  {
    if (e >= ex)
    {
      bx = b;
      ex = e;
      sx = s;
      lx = l;
      tx = t;
    }
    throw new thisParser.ParseException(bx, ex, sx, lx, tx);
  }

  var lk, b0, e0;
  var l1, b1, e1;
  var l2, b2, e2;
  var l3, b3, e3;
  var bx, ex, sx, lx, tx;
  var eventHandler;
  var memo;

  function memoize(i, e, v)
  {
    memo[(e << 1) + i] = v;
  }

  function memoized(i, e)
  {
    var v = memo[(e << 1) + i];
    return typeof v != "undefined" ? v : 0;
  }

  var input;
  var size;

  var begin;
  var end;

  function match(tokenSetId)
  {
    begin = end;
    var current = end;
    var result = MaiaScript.INITIAL[tokenSetId];
    var state = 0;

    for (var code = result & 255; code != 0; )
    {
      var charclass;
      var c0 = current < size ? input.charCodeAt(current) : 0;
      ++current;
      if (c0 < 0x80)
      {
        charclass = MaiaScript.MAP0[c0];
      }
      else if (c0 < 0xd800)
      {
        var c1 = c0 >> 5;
        charclass = MaiaScript.MAP1[(c0 & 31) + MaiaScript.MAP1[(c1 & 31) + MaiaScript.MAP1[c1 >> 5]]];
      }
      else
      {
        if (c0 < 0xdc00)
        {
          var c1 = current < size ? input.charCodeAt(current) : 0;
          if (c1 >= 0xdc00 && c1 < 0xe000)
          {
            ++current;
            c0 = ((c0 & 0x3ff) << 10) + (c1 & 0x3ff) + 0x10000;
          }
        }

        var lo = 0, hi = 1;
        for (var m = 1; ; m = (hi + lo) >> 1)
        {
          if (MaiaScript.MAP2[m] > c0) hi = m - 1;
          else if (MaiaScript.MAP2[2 + m] < c0) lo = m + 1;
          else {charclass = MaiaScript.MAP2[4 + m]; break;}
          if (lo > hi) {charclass = 0; break;}
        }
      }

      state = code;
      var i0 = (charclass << 8) + code - 1;
      code = MaiaScript.TRANSITION[(i0 & 7) + MaiaScript.TRANSITION[i0 >> 3]];

      if (code > 255)
      {
        result = code;
        code &= 255;
        end = current;
      }
    }

    result >>= 8;
    if (result == 0)
    {
      end = current - 1;
      var c1 = end < size ? input.charCodeAt(end) : 0;
      if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      return error(begin, end, state, -1, -1);
    }

    if (end > size) end = size;
    return (result & 127) - 1;
  }

}

MaiaScript.XmlSerializer = function(log, indent)
{
  var input = null;
  var delayedTag = null;
  var hasChildElement = false;
  var depth = 0;

  this.reset = function(string)
  {
    log("<?xml version=\"1.0\" encoding=\"UTF-8\"?" + ">");
    input = string;
    delayedTag = null;
    hasChildElement = false;
    depth = 0;
  };

  this.startNonterminal = function(tag, begin)
  {
    if (delayedTag != null)
    {
      log("<");
      log(delayedTag);
      log(">");
    }
    delayedTag = tag;
    if (indent)
    {
      log("\n");
      for (var i = 0; i < depth; ++i)
      {
        log("  ");
      }
    }
    hasChildElement = false;
    ++depth;
  };

  this.endNonterminal = function(tag, end)
  {
    --depth;
    if (delayedTag != null)
    {
      delayedTag = null;
      log("<");
      log(tag);
      log("/>");
    }
    else
    {
      if (indent)
      {
        if (hasChildElement)
        {
          log("\n");
          for (var i = 0; i < depth; ++i)
          {
            log("  ");
          }
        }
      }
      log("</");
      log(tag);
      log(">");
    }
    hasChildElement = true;
  };

  this.terminal = function(tag, begin, end)
  {
    if (tag.charAt(0) == '\'') tag = "TOKEN";
    this.startNonterminal(tag, begin);
    characters(begin, end);
    this.endNonterminal(tag, end);
  };

  this.whitespace = function(begin, end)
  {
    characters(begin, end);
  };

  function characters(begin, end)
  {
    if (begin < end)
    {
      if (delayedTag != null)
      {
        log("<");
        log(delayedTag);
        log(">");
        delayedTag = null;
      }
      log(input.substring(begin, end)
               .replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;"));
    }
  }
};

MaiaScript.getTokenSet = function(tokenSetId)
{
  var set = [];
  var s = tokenSetId < 0 ? - tokenSetId : MaiaScript.INITIAL[tokenSetId] & 255;
  for (var i = 0; i < 69; i += 32)
  {
    var j = i;
    var i0 = (i >> 5) * 246 + s - 1;
    var i1 = i0 >> 2;
    var f = MaiaScript.EXPECTED[(i0 & 3) + MaiaScript.EXPECTED[(i1 & 3) + MaiaScript.EXPECTED[i1 >> 2]]];
    for ( ; f != 0; f >>>= 1, ++j)
    {
      if ((f & 1) != 0)
      {
        set.push(MaiaScript.TOKEN[j]);
      }
    }
  }
  return set;
};

MaiaScript.TopDownTreeBuilder = function()
{
  var input = null;
  var stack = null;

  this.reset = function(i)
  {
    input = i;
    stack = [];
  };

  this.startNonterminal = function(name, begin)
  {
    var nonterminal = new MaiaScript.Nonterminal(name, begin, begin, []);
    if (stack.length > 0) addChild(nonterminal);
    stack.push(nonterminal);
  };

  this.endNonterminal = function(name, end)
  {
    stack[stack.length - 1].end = end;
    if (stack.length > 1) stack.pop();
  };

  this.terminal = function(name, begin, end)
  {
    addChild(new MaiaScript.Terminal(name, begin, end));
  };

  this.whitespace = function(begin, end)
  {
  };

  function addChild(s)
  {
    var current = stack[stack.length - 1];
    current.children.push(s);
  }

  this.serialize = function(e)
  {
    e.reset(input);
    stack[0].send(e);
  };
};

MaiaScript.Terminal = function(name, begin, end)
{
  this.begin = begin;
  this.end = end;

  this.send = function(e)
  {
    e.terminal(name, begin, end);
  };
};

MaiaScript.Nonterminal = function(name, begin, end, children)
{
  this.begin = begin;
  this.end = end;

  this.send = function(e)
  {
    e.startNonterminal(name, begin);
    var pos = begin;
    children.forEach
    (
      function(c)
      {
        if (pos < c.begin) e.whitespace(pos, c.begin);
        c.send(e);
        pos = c.end;
      }
    );
    if (pos < end) e.whitespace(pos, end);
    e.endNonterminal(name, end);
  };
};

MaiaScript.MAP0 =
[
  /*   0 */ 56, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 5,
  /*  36 */ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 20, 21, 22, 23, 24,
  /*  64 */ 9, 6, 6, 6, 6, 25, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 26, 27, 28, 29, 6, 9, 30,
  /*  98 */ 31, 32, 33, 34, 35, 6, 36, 37, 38, 39, 40, 41, 42, 43, 44, 6, 45, 46, 47, 48, 6, 49, 6, 50, 6, 51, 52, 53,
  /* 126 */ 54, 9
];

MaiaScript.MAP1 =
[
  /*   0 */ 54, 87, 87, 87, 87, 87, 87, 87, 85, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87,
  /*  27 */ 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87,
  /*  54 */ 119, 151, 214, 183, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256,
  /*  75 */ 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 246, 256, 256, 256, 256, 256, 256, 256, 256, 256,
  /*  96 */ 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256, 256,
  /* 117 */ 256, 256, 56, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 151 */ 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 20, 21,
  /* 180 */ 22, 23, 24, 9, 30, 31, 32, 33, 34, 35, 6, 36, 37, 38, 39, 40, 41, 42, 43, 44, 6, 45, 46, 47, 48, 6, 49, 6,
  /* 208 */ 50, 6, 51, 52, 53, 54, 9, 6, 6, 6, 6, 25, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 26,
  /* 242 */ 27, 28, 29, 6, 9, 9, 9, 9, 9, 9, 9, 9, 55, 55, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  /* 276 */ 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
];

MaiaScript.MAP2 =
[
  /* 0 */ 57344, 65536, 65533, 1114111, 9, 9
];

MaiaScript.INITIAL =
[
  /*  0 */ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 529, 18, 19, 20, 533, 22, 23, 24, 537, 538, 539,
  /* 28 */ 540
];

MaiaScript.TRANSITION =
[
  /*    0 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*   18 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1824, 1824, 1824, 1827,
  /*   36 */ 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*   54 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1824, 1824, 1824, 1827, 2097, 2249, 2097, 2097,
  /*   72 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*   90 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2077, 1835, 1841, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097,
  /*  108 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  126 */ 2097, 2097, 2097, 3271, 1853, 1857, 2097, 2424, 2097, 2002, 2097, 2097, 2097, 2097, 2518, 2097, 2097, 2097,
  /*  144 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  162 */ 1869, 1873, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  180 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2096, 2191, 3524, 3519, 3524, 3411,
  /*  198 */ 2093, 2032, 3524, 3524, 3524, 3524, 2098, 3521, 3524, 3524, 3524, 3525, 2675, 3523, 3524, 3524, 3525, 2675,
  /*  216 */ 3524, 3524, 3524, 3524, 3524, 3524, 3526, 2097, 2097, 2695, 2097, 1885, 2097, 2249, 2097, 2002, 2097, 2097,
  /*  234 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  252 */ 2097, 2097, 2097, 2097, 2097, 3368, 2097, 1897, 2097, 2249, 3616, 2002, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  270 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  288 */ 2097, 2097, 2097, 2097, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  306 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1909, 1913, 1921, 1925,
  /*  324 */ 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  342 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1937, 1939, 1948, 1955, 2097, 2249, 2097, 2002,
  /*  360 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  378 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 3627, 2097, 1967, 2097, 2249, 2173, 2002, 2097, 2097, 2097, 2097,
  /*  396 */ 2170, 2097, 2097, 2097, 2097, 2097, 3266, 2097, 2097, 2097, 2097, 1979, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  414 */ 2097, 2097, 2097, 3281, 1992, 1998, 2097, 2249, 2014, 2002, 2097, 2097, 2097, 2097, 2520, 2097, 2097, 2097,
  /*  432 */ 2097, 2097, 2010, 2097, 2097, 2097, 2097, 3276, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2023,
  /*  450 */ 2174, 2028, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  468 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1984, 2040, 2046, 2097, 2269,
  /*  486 */ 2014, 2002, 2097, 2097, 2097, 2097, 2520, 2097, 2097, 2097, 2097, 2097, 2010, 2097, 2097, 2097, 2097, 3276,
  /*  504 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2015, 2015, 2097, 3294, 2097, 2249, 2058, 2002, 2097, 2097,
  /*  522 */ 2097, 2097, 3184, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2165, 2097, 2097, 2097, 2097,
  /*  540 */ 2097, 2097, 2097, 2097, 2097, 1845, 2067, 2073, 2097, 2249, 2097, 3188, 2097, 2097, 2097, 2097, 2518, 2097,
  /*  558 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  576 */ 2097, 3179, 2085, 2089, 3524, 3508, 2106, 2032, 3524, 3524, 3524, 3524, 3240, 3521, 3524, 3524, 3524, 3525,
  /*  594 */ 2118, 3523, 3524, 3524, 3525, 2135, 3524, 3524, 3524, 3524, 3524, 3524, 3526, 2097, 3454, 1861, 2097, 2814,
  /*  612 */ 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  630 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 3458, 2154, 2148, 2160, 2097, 2249, 2097, 2002,
  /*  648 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  666 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1877, 2097, 2182, 2097, 2249, 2059, 2002, 2097, 2097, 2097, 2097,
  /*  684 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  702 */ 2097, 2097, 2097, 1889, 2097, 2199, 2097, 2249, 2110, 2218, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  720 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1901,
  /*  738 */ 2097, 2237, 2097, 2249, 2097, 2257, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  756 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2879, 2097, 2867, 2097, 2249,
  /*  774 */ 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  792 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2096, 2191, 3524, 3519, 3524, 3411, 2277, 2032, 3524, 3524,
  /*  810 */ 3524, 3524, 2187, 3521, 3524, 3524, 3524, 3525, 3437, 3523, 3524, 3524, 3525, 2297, 3524, 3524, 3524, 3524,
  /*  828 */ 3524, 3524, 3526, 2097, 2097, 3605, 2330, 2334, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  846 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  864 */ 2097, 2097, 2097, 2097, 2097, 2829, 2097, 2002, 2097, 2097, 2097, 2097, 2518, 2097, 2097, 2097, 2097, 2097,
  /*  882 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2342, 2210, 2348,
  /*  900 */ 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  918 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1929, 2097, 2368, 2097, 2249, 2097, 2002,
  /*  936 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /*  954 */ 2097, 2097, 2097, 2097, 2097, 2097, 2208, 2204, 2388, 2392, 2404, 3411, 2412, 2032, 2432, 3113, 3524, 3524,
  /*  972 */ 2098, 3521, 3524, 3029, 2963, 3525, 2675, 2451, 2462, 2494, 3525, 2675, 2471, 3524, 3524, 3524, 2482, 2493,
  /*  990 */ 3526, 2097, 2227, 2223, 2502, 2506, 3524, 2514, 2093, 2032, 2463, 3524, 3524, 3524, 2673, 3521, 3524, 3524,
  /* 1008 */ 3524, 3525, 2675, 3523, 3524, 3524, 3525, 2675, 3524, 3524, 3524, 3524, 3524, 3524, 3526, 2097, 2246, 2242,
  /* 1026 */ 2528, 2536, 3524, 3411, 2093, 2032, 3524, 3524, 2890, 3524, 2098, 3521, 2579, 3345, 2710, 3525, 2675, 3441,
  /* 1044 */ 2591, 2125, 3156, 2380, 3524, 2590, 3077, 3524, 3524, 2599, 3526, 2097, 2266, 2262, 2614, 2618, 3524, 3411,
  /* 1062 */ 2093, 2032, 3524, 3524, 3524, 3524, 2098, 3521, 3524, 3524, 3524, 3525, 2675, 3523, 3524, 3524, 3525, 2675,
  /* 1080 */ 3524, 3524, 2626, 2635, 3524, 3524, 3526, 2097, 2876, 2872, 2645, 2652, 2582, 2669, 2683, 2032, 3400, 2703,
  /* 1098 */ 3524, 3524, 2187, 2779, 3524, 3524, 2722, 2730, 2737, 2396, 2745, 2756, 2765, 2773, 3206, 2796, 3524, 3524,
  /* 1116 */ 2953, 2556, 2808, 2097, 2826, 2921, 2837, 2841, 2942, 3411, 2093, 2032, 2849, 3524, 3524, 3524, 2673, 3521,
  /* 1134 */ 3524, 3524, 3524, 3525, 2675, 3523, 3524, 3524, 3525, 2675, 3524, 3524, 2126, 2474, 3524, 3524, 3526, 2097,
  /* 1152 */ 2096, 2191, 3524, 3519, 3524, 2861, 2916, 2032, 3524, 2887, 3524, 3524, 2098, 3521, 3524, 3524, 3524, 3525,
  /* 1170 */ 2675, 3523, 3524, 2123, 3525, 2675, 3524, 2551, 3524, 3524, 3335, 3524, 3526, 2097, 2286, 2282, 2898, 2902,
  /* 1188 */ 3524, 3411, 2093, 2032, 3524, 3524, 3524, 2127, 2910, 3521, 3524, 2938, 3524, 3525, 2675, 3523, 3524, 3566,
  /* 1206 */ 3525, 2675, 2951, 2788, 2961, 2971, 3524, 3524, 3526, 2097, 2096, 2191, 3524, 3519, 3524, 3411, 2093, 2032,
  /* 1224 */ 3524, 3524, 3524, 2980, 2098, 3521, 2302, 3524, 3524, 3525, 2675, 3523, 3524, 3524, 3525, 2675, 3524, 3524,
  /* 1242 */ 3524, 3524, 3524, 3524, 3526, 2097, 2357, 2353, 2991, 2995, 3524, 3411, 2093, 2032, 3524, 3524, 3524, 3524,
  /* 1260 */ 2098, 3521, 3524, 3524, 3524, 3525, 2675, 3523, 3524, 2124, 3525, 2289, 3524, 3524, 3524, 3524, 3524, 3524,
  /* 1278 */ 3526, 2097, 2377, 2373, 3003, 3007, 3015, 3411, 2093, 2032, 3524, 3423, 3026, 3037, 1940, 3047, 3524, 3524,
  /* 1296 */ 2312, 3057, 2360, 3049, 2454, 3524, 3525, 2675, 2485, 3524, 3524, 3065, 3524, 3524, 3526, 2097, 2096, 2191,
  /* 1314 */ 3524, 3519, 3524, 3411, 2093, 2032, 3524, 3524, 3524, 3076, 2098, 3521, 3202, 3524, 3524, 3525, 2675, 3523,
  /* 1332 */ 3524, 3524, 3525, 2675, 3524, 3524, 3524, 3524, 3524, 3524, 3526, 2097, 3085, 3169, 3096, 3100, 3543, 3411,
  /* 1350 */ 2093, 2032, 2784, 3524, 3108, 3524, 2673, 3226, 3524, 2307, 3068, 3525, 2675, 3125, 3524, 3524, 3525, 2675,
  /* 1368 */ 3524, 2972, 2714, 3357, 3524, 3477, 3526, 2097, 2421, 2417, 3133, 3137, 3145, 3411, 3164, 2032, 3196, 2657,
  /* 1386 */ 3524, 3524, 2098, 3521, 3524, 3524, 3524, 2317, 2675, 3523, 3488, 3524, 3525, 2675, 3524, 3524, 3524, 3524,
  /* 1404 */ 3214, 3524, 3234, 2097, 2096, 2191, 3524, 3519, 3524, 3411, 2093, 2032, 3524, 3524, 3524, 3524, 2098, 3521,
  /* 1422 */ 3524, 3524, 3524, 3525, 2675, 3523, 3524, 3524, 3525, 2675, 3524, 3524, 3331, 3473, 3524, 3524, 3526, 2097,
  /* 1440 */ 2692, 2688, 3248, 3252, 3524, 3260, 3289, 2050, 3524, 3306, 2140, 2983, 2673, 2322, 3316, 3524, 3524, 3525,
  /* 1458 */ 2675, 3523, 3524, 3524, 2853, 2675, 3524, 3324, 2661, 3524, 3524, 3524, 2800, 2097, 2096, 2191, 3524, 3117,
  /* 1476 */ 3524, 3411, 2093, 3298, 3524, 3524, 3343, 2443, 2098, 3521, 3308, 2606, 2627, 3525, 3088, 3353, 3524, 3524,
  /* 1494 */ 3221, 2675, 2757, 3524, 3524, 3524, 3524, 3524, 3526, 2097, 3365, 3174, 3376, 3380, 3524, 3411, 2093, 2032,
  /* 1512 */ 3524, 2494, 3524, 3539, 2673, 3521, 3018, 3388, 3524, 2943, 2675, 3396, 2566, 2541, 3408, 2675, 3419, 3524,
  /* 1530 */ 3524, 2561, 3524, 3575, 3431, 2097, 2096, 2191, 3524, 3519, 2571, 3411, 3449, 2032, 3466, 3524, 3524, 3039,
  /* 1548 */ 2098, 3485, 3524, 3496, 3524, 3505, 2675, 3523, 3152, 3524, 3516, 2675, 2546, 3524, 3524, 3497, 3534, 3524,
  /* 1566 */ 3526, 2097, 2930, 2926, 3551, 3555, 3524, 3411, 2093, 2032, 3524, 3524, 3524, 3524, 2098, 3521, 3524, 3524,
  /* 1584 */ 3524, 3525, 2675, 3523, 3524, 3524, 2637, 2675, 3524, 3563, 3524, 3524, 3524, 3524, 3526, 2097, 2096, 2191,
  /* 1602 */ 3524, 3519, 3524, 3411, 2093, 2032, 3524, 2748, 3524, 2940, 2098, 2439, 3524, 3574, 3524, 3525, 2675, 3523,
  /* 1620 */ 3524, 3524, 3525, 2675, 3524, 3524, 3524, 3524, 3524, 3524, 3526, 2097, 2229, 3600, 3583, 3587, 2097, 2249,
  /* 1638 */ 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1656 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1959, 2097, 3595, 2097, 2249, 2097, 3650, 2097, 2097,
  /* 1674 */ 2097, 2097, 2097, 3613, 2097, 2097, 2097, 2097, 2097, 3624, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1692 */ 2097, 2097, 2097, 2097, 2097, 3635, 3637, 3645, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1710 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1728 */ 2097, 2818, 3658, 3662, 2097, 2249, 2097, 2002, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1746 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1764 */ 2097, 2249, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1782 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 1971, 2097, 2097, 2097, 2097, 2097,
  /* 1800 */ 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097, 2097,
  /* 1818 */ 2097, 2097, 2097, 2097, 2097, 2097, 3101, 3101, 3101, 3101, 3101, 3101, 3101, 3101, 0, 0, 0, 3328, 3328,
  /* 1837 */ 3328, 3328, 3328, 3328, 3328, 3328, 3381, 3381, 0, 0, 0, 0, 0, 6400, 6400, 6400, 46, 46, 46, 46, 46, 46,
  /* 1859 */ 46, 46, 0, 0, 0, 0, 0, 6711, 55, 55, 2877, 2877, 2877, 2877, 2877, 2877, 2877, 2877, 0, 0, 0, 0, 0, 7480,
  /* 1883 */ 7480, 7480, 0, 0, 3840, 3840, 0, 0, 0, 0, 0, 8249, 8249, 8249, 0, 0, 4150, 4150, 0, 0, 0, 0, 0, 8762, 8762,
  /* 1908 */ 8762, 0, 4608, 0, 0, 0, 0, 0, 4608, 4608, 0, 0, 4608, 4608, 4608, 4608, 4608, 4608, 4608, 4608, 4608, 0, 0,
  /* 1931 */ 0, 0, 0, 10240, 10240, 10240, 0, 0, 4864, 0, 0, 0, 0, 0, 0, 0, 1174, 0, 4864, 0, 0, 0, 4864, 0, 4864, 4864,
  /* 1957 */ 4864, 4864, 0, 0, 0, 0, 0, 16444, 16444, 16444, 0, 0, 5120, 5120, 0, 0, 0, 0, 768, 0, 0, 0, 101, 0, 101,
  /* 1982 */ 101, 101, 0, 0, 0, 48, 48, 5888, 5888, 5888, 47, 47, 47, 47, 47, 47, 47, 47, 5423, 5423, 0, 0, 0, 0, 2877,
  /* 2007 */ 0, 0, 0, 0, 186, 47, 0, 47, 0, 0, 0, 0, 0, 0, 0, 6144, 0, 5632, 5632, 0, 0, 5632, 5632, 5632, 5632, 0, 0,
  /* 2034 */ 0, 0, 2877, 0, 1054, 1054, 48, 48, 48, 48, 48, 48, 48, 48, 5936, 5936, 0, 0, 0, 0, 2877, 0, 1054, 1133,
  /* 2058 */ 102, 0, 0, 0, 0, 0, 0, 0, 7680, 62, 62, 62, 62, 62, 62, 62, 62, 6462, 6462, 0, 0, 0, 0, 3328, 53, 53, 53,
  /* 2085 */ 2609, 2609, 2609, 2609, 2609, 2609, 2609, 2609, 0, 1054, 1054, 1054, 0, 0, 0, 0, 0, 0, 0, 0, 1054, 2609,
  /* 2107 */ 1054, 1054, 1054, 0, 0, 0, 0, 3584, 0, 6912, 7936, 185, 187, 2748, 2709, 2749, 1054, 1054, 1054, 30, 1054,
  /* 2128 */ 1054, 1054, 1054, 1054, 1054, 1054, 1167, 185, 187, 187, 2748, 2749, 1054, 1054, 1054, 131, 1054, 1054,
  /* 2146 */ 1158, 1054, 0, 0, 7168, 0, 0, 7168, 7168, 0, 7168, 0, 0, 0, 7168, 7168, 7168, 7168, 0, 0, 0, 0, 145, 145,
  /* 2170 */ 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 5632, 0, 0, 7480, 7480, 0, 0, 0, 0, 146, 0, 0, 0, 1054, 1054, 0, 0, 0,
  /* 2199 */ 0, 0, 8249, 8249, 0, 0, 0, 0, 1055, 1055, 0, 0, 0, 0, 0, 0, 0, 9984, 9984, 8448, 8960, 9472, 0, 2877, 0, 0,
  /* 2225 */ 0, 1056, 1056, 0, 0, 0, 0, 0, 0, 0, 16128, 0, 0, 0, 8762, 8762, 0, 0, 0, 0, 1057, 1057, 0, 0, 0, 0, 0, 0,
  /* 2253 */ 0, 46, 0, 0, 0, 9216, 0, 0, 2877, 0, 0, 0, 1058, 1058, 0, 0, 0, 0, 0, 0, 0, 46, 99, 99, 103, 1054, 1054,
  /* 2280 */ 1054, 0, 0, 0, 0, 1061, 1061, 0, 0, 0, 0, 0, 0, 0, 1054, 1054, 10782, 146, 0, 0, 103, 146, 1054, 1054,
  /* 2304 */ 1054, 1054, 1187, 1054, 1054, 1054, 1054, 1194, 1054, 1054, 1054, 1054, 1202, 1054, 1054, 1054, 1054, 1207,
  /* 2322 */ 1054, 1054, 0, 1054, 1054, 1054, 12701, 1054, 9728, 9728, 9728, 9728, 9728, 9728, 9728, 9728, 0, 0, 0, 0,
  /* 2342 */ 0, 0, 9984, 0, 0, 0, 9984, 9984, 9984, 9984, 0, 0, 0, 0, 1062, 1062, 0, 0, 0, 0, 0, 0, 0, 1054, 1310, 1054,
  /* 2368 */ 0, 0, 10240, 10240, 0, 0, 0, 0, 1063, 1063, 0, 0, 0, 0, 0, 0, 0, 1054, 10526, 1054, 1087, 1087, 1087, 1087,
  /* 2392 */ 1087, 1087, 1087, 1087, 0, 1054, 1054, 1054, 1219, 1054, 1054, 1054, 1104, 1054, 1054, 1107, 1054, 1054,
  /* 2410 */ 1054, 1113, 0, 1128, 1113, 1054, 0, 0, 0, 0, 1065, 1065, 0, 0, 0, 0, 0, 0, 0, 2048, 0, 0, 1104, 1054, 1128,
  /* 2435 */ 1054, 1054, 1054, 1140, 1054, 30, 0, 1178, 1054, 1054, 1054, 1054, 1164, 1054, 1054, 1054, 0, 1054, 1216,
  /* 2454 */ 1054, 1054, 1054, 1054, 1054, 1054, 1228, 1054, 1223, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 1141, 1054,
  /* 2472 */ 1054, 1240, 1054, 1054, 1054, 1054, 1054, 1054, 12318, 1054, 1054, 1054, 1259, 1054, 1054, 1054, 1054,
  /* 2489 */ 1054, 1054, 14110, 1054, 1263, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 1151, 1088, 1088, 1088, 1088,
  /* 2506 */ 1088, 1088, 1088, 1088, 0, 1054, 1054, 1054, 1115, 1054, 1054, 1054, 0, 46, 0, 0, 0, 0, 0, 0, 148, 0, 1089,
  /* 2529 */ 1089, 1089, 1089, 1089, 1089, 1089, 1089, 1100, 1089, 1089, 1089, 0, 1054, 1054, 1054, 1054, 1231, 1054,
  /* 2547 */ 1054, 1054, 1054, 1242, 1054, 1054, 1054, 1054, 11038, 1054, 1054, 1054, 1054, 11550, 1054, 1054, 1054,
  /* 2564 */ 1054, 14622, 1054, 1054, 1054, 1054, 15134, 1054, 1054, 1054, 1109, 1054, 1054, 1054, 1114, 1183, 1054,
  /* 2581 */ 1185, 1054, 1054, 1054, 1054, 1054, 1111, 1054, 1054, 1245, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 1229,
  /* 2599 */ 1054, 1264, 1166, 1265, 1054, 1054, 1266, 1054, 1054, 1054, 1193, 1054, 1054, 1054, 1197, 1090, 1090, 1090,
  /* 2617 */ 1090, 1090, 1090, 1090, 1090, 0, 1054, 1054, 1054, 1054, 1054, 1166, 1054, 1054, 1054, 1054, 1054, 1054,
  /* 2635 */ 1054, 1256, 1054, 1054, 1054, 1054, 1054, 1054, 30, 0, 1059, 1059, 1059, 1059, 1059, 1059, 1059, 1059,
  /* 2653 */ 1101, 1059, 1059, 0, 1054, 1054, 1054, 1134, 1054, 1054, 1054, 1054, 1054, 1252, 1054, 1054, 1054, 1116,
  /* 2671 */ 1117, 1054, 0, 46, 0, 0, 0, 0, 0, 1054, 1054, 1054, 103, 1054, 1054, 1117, 0, 0, 0, 0, 1066, 1066, 0, 0, 0,
  /* 2696 */ 0, 0, 0, 0, 3840, 3840, 3840, 1142, 1143, 1054, 1054, 1054, 1054, 1150, 1054, 1054, 1054, 1201, 1054, 1054,
  /* 2716 */ 1054, 1054, 30, 1054, 1253, 1054, 175, 1054, 1200, 1054, 1054, 1054, 1054, 1204, 1054, 1205, 1054, 1054,
  /* 2734 */ 1054, 30, 1054, 0, 0, 103, 0, 0, 1054, 1054, 1566, 1054, 1224, 1225, 1054, 1054, 1054, 1054, 1054, 1149,
  /* 2754 */ 1054, 1054, 12238, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 1244, 1054, 1054, 1161, 1054, 1054, 1054,
  /* 2771 */ 1054, 15872, 146, 0, 0, 103, 146, 1822, 1054, 1054, 0, 1054, 1179, 1054, 1054, 1054, 1137, 1054, 1054,
  /* 2790 */ 1054, 1054, 1054, 1247, 1054, 1054, 1054, 1054, 1054, 15902, 1054, 1054, 1054, 1054, 30, 11294, 0, 0, 1054,
  /* 2809 */ 14366, 1054, 1054, 1054, 1054, 0, 0, 55, 55, 0, 0, 0, 0, 17664, 0, 0, 0, 1060, 0, 0, 0, 0, 0, 0, 0, 98, 0,
  /* 2836 */ 0, 1091, 1091, 1091, 1091, 1091, 1091, 1091, 1091, 0, 1054, 1054, 1054, 1054, 1054, 1054, 13342, 1054,
  /* 2854 */ 1054, 1054, 1054, 1054, 1237, 1054, 0, 1054, 1054, 1118, 1120, 97, 46, 0, 0, 59, 59, 0, 0, 0, 0, 1059,
  /* 2876 */ 1059, 0, 0, 0, 0, 0, 0, 0, 59, 59, 59, 1054, 1144, 1146, 1054, 1054, 1054, 1054, 1054, 1157, 1054, 1159,
  /* 2898 */ 1092, 1092, 1092, 1092, 1092, 1092, 1092, 1092, 0, 1054, 1054, 1054, 144, 0, 0, 0, 2304, 0, 0, 1054, 1054,
  /* 2919 */ 1118, 0, 0, 0, 0, 1074, 1074, 0, 0, 0, 1068, 1068, 0, 0, 0, 0, 45, 0, 0, 1054, 1191, 1054, 1054, 1054,
  /* 2943 */ 1054, 1054, 1054, 30, 1054, 1054, 1054, 0, 1054, 1239, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 13598,
  /* 2961 */ 1054, 1250, 1054, 1054, 1054, 1054, 1054, 1054, 1161, 1054, 1255, 1054, 1054, 1054, 1054, 1054, 1054, 1054,
  /* 2979 */ 1249, 1054, 1054, 1162, 1054, 1054, 1054, 1054, 1054, 1165, 1054, 1054, 1093, 1093, 1093, 1093, 1093, 1093,
  /* 2997 */ 1093, 1093, 0, 1054, 1054, 1054, 1094, 1094, 1094, 1094, 1094, 1094, 1094, 1094, 0, 1054, 1054, 1054, 1054,
  /* 3016 */ 1054, 1106, 1054, 1054, 1054, 1054, 1054, 1188, 1054, 1054, 1054, 1054, 1154, 1054, 1054, 1054, 1054, 1054,
  /* 3034 */ 1195, 1054, 1054, 1054, 1161, 1054, 1054, 1054, 1054, 1054, 1054, 1166, 1054, 1175, 1054, 0, 1054, 1054,
  /* 3052 */ 1054, 1054, 1054, 1221, 1054, 30, 1054, 1054, 1054, 1054, 1054, 1166, 184, 1054, 1054, 13854, 1054, 1054,
  /* 3070 */ 1054, 1054, 1054, 1203, 1054, 1054, 1160, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 1254, 1064, 0, 0, 0, 0,
  /* 3090 */ 0, 0, 0, 1214, 1054, 1054, 1095, 1095, 1095, 1095, 1095, 1095, 1095, 1095, 0, 1054, 1054, 1054, 1152, 1054,
  /* 3110 */ 1054, 1054, 1156, 1054, 1054, 1054, 1147, 1054, 1054, 1054, 1054, 0, 1054, 1102, 1054, 0, 1215, 1054, 1054,
  /* 3129 */ 1054, 1054, 1054, 1222, 1096, 1096, 1096, 1096, 1096, 1096, 1096, 1096, 0, 1054, 1054, 1054, 1105, 30,
  /* 3147 */ 1054, 1108, 1054, 1054, 1112, 1054, 1054, 1054, 1226, 1054, 1054, 1054, 1054, 1164, 1054, 1054, 0, 0, 1108,
  /* 3166 */ 1054, 1054, 0, 0, 0, 0, 1075, 1075, 0, 0, 0, 1076, 1076, 0, 0, 0, 2609, 2609, 0, 0, 0, 145, 0, 0, 0, 0,
  /* 3192 */ 2877, 2877, 0, 0, 1134, 11806, 1135, 1054, 1054, 1139, 1054, 1054, 1054, 1186, 1054, 1054, 1054, 1054,
  /* 3210 */ 1054, 1243, 1054, 1054, 1054, 1237, 1054, 1054, 1054, 1054, 1262, 1054, 1054, 1054, 1236, 1054, 1054, 1054,
  /* 3228 */ 0, 1054, 1054, 1180, 1054, 1182, 1054, 1054, 1269, 1270, 1054, 1054, 0, 0, 100, 100, 0, 2707, 2709, 1054,
  /* 3248 */ 1097, 1097, 1097, 1097, 1097, 1097, 1097, 1097, 0, 1054, 1054, 1103, 1054, 1054, 1119, 1054, 0, 46, 0, 0,
  /* 3268 */ 101, 0, 101, 0, 0, 0, 46, 46, 0, 0, 0, 47, 47, 0, 0, 0, 47, 47, 5376, 5376, 5376, 0, 1054, 1054, 1130, 0,
  /* 3294 */ 0, 0, 0, 6144, 0, 0, 0, 0, 2877, 0, 1132, 1054, 1054, 1145, 1054, 1054, 1054, 1054, 1054, 1054, 1189, 1054,
  /* 3316 */ 1054, 1184, 1054, 1054, 1054, 1054, 1054, 1190, 1054, 1246, 1054, 1054, 1054, 1054, 1248, 1054, 1054, 1054,
  /* 3334 */ 1251, 1054, 1054, 1054, 1054, 1054, 12830, 1054, 1054, 1054, 1153, 1054, 1054, 1054, 1054, 1054, 1054,
  /* 3351 */ 1196, 1054, 0, 1054, 1054, 1217, 1054, 1054, 1054, 1054, 1054, 14878, 1054, 1054, 1067, 0, 0, 0, 0, 0, 0,
  /* 3372 */ 0, 4150, 4150, 4150, 1098, 1098, 1098, 1098, 1098, 1098, 1098, 1098, 0, 1054, 1054, 1054, 1054, 1054, 1192,
  /* 3391 */ 1054, 1054, 1054, 1054, 1198, 0, 1054, 1054, 1218, 1054, 1054, 1054, 1054, 1138, 1054, 1054, 1054, 1234,
  /* 3409 */ 1054, 1054, 1054, 1054, 1054, 1054, 0, 46, 0, 0, 1238, 1054, 1054, 1241, 1054, 1054, 1054, 1054, 1148,
  /* 3428 */ 1054, 1054, 1054, 1268, 1054, 1054, 1054, 1054, 1054, 0, 0, 103, 0, 0, 1054, 1054, 1054, 1054, 1220, 1054,
  /* 3448 */ 1054, 0, 1109, 1129, 1054, 0, 0, 0, 0, 6656, 0, 0, 0, 0, 7168, 0, 0, 0, 1054, 1054, 1136, 1054, 1054, 1054,
  /* 3472 */ 1129, 1054, 1054, 1054, 1257, 1054, 1054, 1054, 1054, 1054, 13086, 1054, 1054, 1054, 1176, 0, 1054, 1054,
  /* 3490 */ 1054, 1054, 1054, 1227, 1054, 1054, 1176, 1054, 1054, 1054, 1054, 1054, 1054, 1054, 1258, 1054, 1054, 1206,
  /* 3508 */ 1054, 1054, 1054, 1054, 0, 46, 100, 2609, 1054, 1235, 1054, 1054, 1054, 1054, 1054, 0, 1054, 1054, 1054,
  /* 3527 */ 1054, 1054, 1054, 1054, 1054, 0, 0, 1166, 1054, 1054, 1260, 1261, 1054, 1054, 1054, 1163, 1054, 1054, 1054,
  /* 3546 */ 1054, 1110, 1054, 1054, 1054, 1099, 1099, 1099, 1099, 1099, 1099, 1099, 1099, 0, 1054, 1054, 1054, 1054,
  /* 3564 */ 1054, 15390, 1054, 1054, 1054, 1054, 1054, 1232, 1233, 1054, 15646, 1054, 1054, 1054, 1054, 1054, 1054,
  /* 3581 */ 1054, 1267, 16128, 16128, 16128, 16128, 16128, 16128, 16128, 16128, 0, 0, 0, 0, 0, 0, 16444, 16444, 0, 0,
  /* 3601 */ 0, 0, 16128, 16128, 0, 0, 0, 9728, 9728, 0, 0, 9728, 0, 0, 17049, 0, 0, 0, 0, 0, 4352, 0, 0, 17152, 0, 0,
  /* 3627 */ 0, 0, 0, 0, 0, 5120, 5120, 5120, 0, 17408, 0, 0, 0, 17408, 0, 0, 0, 0, 17408, 17408, 17408, 17408, 0, 0, 0,
  /* 3652 */ 0, 16747, 2877, 0, 0, 0, 17664, 17664, 17664, 17664, 17664, 17664, 17664, 17664, 0, 0, 0, 0
];

MaiaScript.EXPECTED =
[
  /*   0 */ 47, 51, 84, 55, 59, 66, 71, 81, 67, 78, 66, 62, 66, 66, 66, 74, 88, 92, 145, 98, 102, 144, 109, 113, 152,
  /*  25 */ 126, 94, 122, 130, 134, 138, 105, 149, 93, 116, 93, 93, 119, 93, 93, 141, 93, 93, 93, 93, 93, 105, 156, 160,
  /*  49 */ 164, 168, 172, 176, 180, 184, 202, 212, 231, 216, 270, 218, 196, 198, 185, 224, 193, 198, 198, 198, 198,
  /*  70 */ 185, 222, 226, 204, 198, 186, 349, 230, 225, 202, 268, 198, 198, 197, 198, 198, 198, 190, 236, 240, 242,
  /*  91 */ 246, 250, 231, 231, 231, 231, 351, 256, 275, 261, 284, 265, 231, 231, 231, 206, 335, 340, 274, 279, 283,
  /* 112 */ 318, 298, 231, 231, 231, 232, 231, 231, 252, 231, 231, 302, 331, 283, 288, 281, 316, 297, 306, 231, 310,
  /* 133 */ 330, 314, 309, 328, 291, 322, 293, 326, 231, 348, 231, 231, 350, 231, 231, 208, 339, 344, 231, 231, 351,
  /* 154 */ 231, 257, 2056, 133120, 264192, 33556480, 134219776, 2048, 2048, 8521728, 134481920, 2099200, 136316928,
  /* 167 */ 134136, 138232, -143005696, -42342400, -33822720, 139256, 401400, 134356984, 139256, 139260, 134619128,
  /* 178 */ 134356984, 2498552, 136716280, 136716280, -41943048, -33554440, 2048, 8, 8, 8, 0, 0, 0, 128, 256, 768, 72,
  /* 195 */ 8, 8, 40, 8, 8, 8, 8, 768, 72, 24, 40, 0, 8, 0, 0, 1, 12, 8192, 65536, 67108864, 1610612736, 1024, 1024, 8,
  /* 219 */ 8, 24, 8, 0, 128, 256, 256, 256, 768, 768, 72, 1073741824, 0, 0, 0, 0, 7, 64, 1073741856, 1073741856,
  /* 239 */ -2147483489, -2147483425, -2147483393, 2147433248, 2147433248, 2147433248, 2147433248, 2147433312,
  /* 247 */ 2147433312, 2147434336, 2147482464, -50177, -50177, 0, 0, 6, 0, 16, 0, 0, 0, 256, 458752, 1572864, 2097152,
  /* 264 */ 4194304, 536870912, 7168, 49152, 0, 8, 8, 8, 72, 8, 0, 256, 512, 6144, 8192, 196608, 262144, 1048576,
  /* 282 */ 2097152, 4194304, 8388608, 16777216, 33554432, 469762048, 512, 6144, 131072, 262144, 1048576, 8388608, 0,
  /* 295 */ 2048, 8388608, 536870912, 1024, 49152, 0, 0, 256, 512, 2048, 4096, 134217728, 536870912, 1024, 32768, 0, 0,
  /* 312 */ 0, 2048, 2097152, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 0, 2048, 4096,
  /* 325 */ 262144, 0, 2048, 0, 2048, 4096, 131072, 262144, 1048576, 2097152, 16, 15, 7, 7, 16, 16, 16, 16, 24, 24, 24,
  /* 346 */ 31, 31, 4, 0, 0, 0, 536870912, 0, 0
];

MaiaScript.TOKEN =
[
  "(0)",
  "END",
  "eof",
  "identifier",
  "'null'",
  "'true'",
  "'false'",
  "string",
  "complex",
  "real",
  "comment",
  "whitespace",
  "'!'",
  "'!='",
  "'%'",
  "'&'",
  "'&&'",
  "'('",
  "')'",
  "'*'",
  "'+'",
  "','",
  "'-'",
  "'.'",
  "'/'",
  "':'",
  "':='",
  "';'",
  "'<'",
  "'<<'",
  "'<='",
  "'='",
  "'=='",
  "'>'",
  "'>='",
  "'>>'",
  "'?='",
  "'['",
  "']'",
  "'^'",
  "'async'",
  "'break'",
  "'catch'",
  "'constructor'",
  "'continue'",
  "'do'",
  "'else'",
  "'elseif'",
  "'for'",
  "'foreach'",
  "'function'",
  "'if'",
  "'include'",
  "'kernel'",
  "'local'",
  "'namespace'",
  "'object'",
  "'return'",
  "'test'",
  "'throw'",
  "'try'",
  "'while'",
  "'{'",
  "'|'",
  "'||'",
  "'|||'",
  "'||||'",
  "'}'",
  "'~'"
];

// End
// This file was generated on Mon Jul 6, 2020 18:16 (UTC-03) by REx v5.52 which is Copyright (c) 1979-2020 by Gunther Rademacher <grd@gmx.net>
// REx command line: ComplexNumber.ebnf -javascript -tree

function ComplexNumber(string, parsingEventHandler)
{
  init(string, parsingEventHandler);

  var thisParser = this;

  this.ParseException = function(b, e, s, o, x)
  {
    var begin = b;
    var end = e;
    var state = s;
    var offending = o;
    var expected = x;

    this.getBegin = function() {return begin;};
    this.getEnd = function() {return end;};
    this.getState = function() {return state;};
    this.getExpected = function() {return expected;};
    this.getOffending = function() {return offending;};
    this.isAmbiguousInput = function() {return false;};

    this.getMessage = function()
    {
      return offending < 0
           ? "lexical analysis failed"
           : "syntax error";
    };
  };

  function init(source, parsingEventHandler)
  {
    eventHandler = parsingEventHandler;
    input = source;
    size = source.length;
    reset(0, 0, 0);
  }

  this.getInput = function()
  {
    return input;
  };

  this.getTokenOffset = function()
  {
    return b0;
  };

  this.getTokenEnd = function()
  {
    return e0;
  };

  function reset(l, b, e)
  {
            b0 = b; e0 = b;
    l1 = l; b1 = b; e1 = e;
    end = e;
    eventHandler.reset(input);
  }

  this.reset = function(l, b, e)
  {
    reset(l, b, e);
  };

  this.getOffendingToken = function(e)
  {
    var o = e.getOffending();
    return o >= 0 ? ComplexNumber.TOKEN[o] : null;
  };

  this.getExpectedTokenSet = function(e)
  {
    var expected;
    if (e.getExpected() < 0)
    {
      expected = ComplexNumber.getTokenSet(- e.getState());
    }
    else
    {
      expected = [ComplexNumber.TOKEN[e.getExpected()]];
    }
    return expected;
  };

  this.getErrorMessage = function(e)
  {
    var message = e.getMessage();
    var found = this.getOffendingToken(e);
    var tokenSet = this.getExpectedTokenSet(e);
    var size = e.getEnd() - e.getBegin();
    message += (found == null ? "" : ", found " + found)
            + "\nwhile expecting "
            + (tokenSet.length == 1 ? tokenSet[0] : ("[" + tokenSet.join(", ") + "]"))
            + "\n"
            + (size == 0 || found != null ? "" : "after successfully scanning " + size + " characters beginning ");
    var prefix = input.substring(0, e.getBegin());
    var lines = prefix.split("\n");
    var line = lines.length;
    var column = lines[line - 1].length + 1;
    return message
         + "at line " + line + ", column " + column + ":\n..."
         + input.substring(e.getBegin(), Math.min(input.length, e.getBegin() + 64))
         + "...";
  };

  this.parse_number = function()
  {
    eventHandler.startNonterminal("number", e0);
    lookahead1W(2);                 // END | eof | real | imaginary | whitespace^token
    switch (l1)
    {
    case 2:                         // eof
      consume(2);                   // eof
      break;
    default:
      for (;;)
      {
        lookahead1W(1);             // END | real | imaginary | whitespace^token
        if (l1 == 1)                // END
        {
          break;
        }
        whitespace();
        parse_complex();
      }
    }
    eventHandler.endNonterminal("number", e0);
  };

  function parse_complex()
  {
    eventHandler.startNonterminal("complex", e0);
    if (l1 == 3)                    // real
    {
      consume(3);                   // real
    }
    lookahead1W(0);                 // imaginary | whitespace^token
    consume(4);                     // imaginary
    eventHandler.endNonterminal("complex", e0);
  }

  function consume(t)
  {
    if (l1 == t)
    {
      whitespace();
      eventHandler.terminal(ComplexNumber.TOKEN[l1], b1, e1);
      b0 = b1; e0 = e1; l1 = 0;
    }
    else
    {
      error(b1, e1, 0, l1, t);
    }
  }

  function whitespace()
  {
    if (e0 != b1)
    {
      eventHandler.whitespace(e0, b1);
      e0 = b1;
    }
  }

  function matchW(tokenSetId)
  {
    var code;
    for (;;)
    {
      code = match(tokenSetId);
      if (code != 5)                // whitespace^token
      {
        break;
      }
    }
    return code;
  }

  function lookahead1W(tokenSetId)
  {
    if (l1 == 0)
    {
      l1 = matchW(tokenSetId);
      b1 = begin;
      e1 = end;
    }
  }

  function error(b, e, s, l, t)
  {
    throw new thisParser.ParseException(b, e, s, l, t);
  }

  var     b0, e0;
  var l1, b1, e1;
  var eventHandler;

  var input;
  var size;

  var begin;
  var end;

  function match(tokenSetId)
  {
    begin = end;
    var current = end;
    var result = ComplexNumber.INITIAL[tokenSetId];
    var state = 0;

    for (var code = result & 31; code != 0; )
    {
      var charclass;
      var c0 = current < size ? input.charCodeAt(current) : 0;
      ++current;
      if (c0 < 0x80)
      {
        charclass = ComplexNumber.MAP0[c0];
      }
      else if (c0 < 0xd800)
      {
        var c1 = c0 >> 5;
        charclass = ComplexNumber.MAP1[(c0 & 31) + ComplexNumber.MAP1[(c1 & 31) + ComplexNumber.MAP1[c1 >> 5]]];
      }
      else
      {
        charclass = 0;
      }

      state = code;
      var i0 = (charclass << 5) + code - 1;
      code = ComplexNumber.TRANSITION[(i0 & 7) + ComplexNumber.TRANSITION[i0 >> 3]];

      if (code > 31)
      {
        result = code;
        code &= 31;
        end = current;
      }
    }

    result >>= 5;
    if (result == 0)
    {
      end = current - 1;
      var c1 = end < size ? input.charCodeAt(end) : 0;
      if (c1 >= 0xdc00 && c1 < 0xe000) --end;
      return error(begin, end, state, -1, -1);
    }

    if (end > size) end = size;
    return (result & 7) - 1;
  }

}

ComplexNumber.XmlSerializer = function(log, indent)
{
  var input = null;
  var delayedTag = null;
  var hasChildElement = false;
  var depth = 0;

  this.reset = function(string)
  {
    log("<?xml version=\"1.0\" encoding=\"UTF-8\"?" + ">");
    input = string;
    delayedTag = null;
    hasChildElement = false;
    depth = 0;
  };

  this.startNonterminal = function(tag, begin)
  {
    if (delayedTag != null)
    {
      log("<");
      log(delayedTag);
      log(">");
    }
    delayedTag = tag;
    if (indent)
    {
      log("\n");
      for (var i = 0; i < depth; ++i)
      {
        log("  ");
      }
    }
    hasChildElement = false;
    ++depth;
  };

  this.endNonterminal = function(tag, end)
  {
    --depth;
    if (delayedTag != null)
    {
      delayedTag = null;
      log("<");
      log(tag);
      log("/>");
    }
    else
    {
      if (indent)
      {
        if (hasChildElement)
        {
          log("\n");
          for (var i = 0; i < depth; ++i)
          {
            log("  ");
          }
        }
      }
      log("</");
      log(tag);
      log(">");
    }
    hasChildElement = true;
  };

  this.terminal = function(tag, begin, end)
  {
    if (tag.charAt(0) == '\'') tag = "TOKEN";
    this.startNonterminal(tag, begin);
    characters(begin, end);
    this.endNonterminal(tag, end);
  };

  this.whitespace = function(begin, end)
  {
    characters(begin, end);
  };

  function characters(begin, end)
  {
    if (begin < end)
    {
      if (delayedTag != null)
      {
        log("<");
        log(delayedTag);
        log(">");
        delayedTag = null;
      }
      log(input.substring(begin, end)
               .replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;"));
    }
  }
};

ComplexNumber.getTokenSet = function(tokenSetId)
{
  var set = [];
  var s = tokenSetId < 0 ? - tokenSetId : ComplexNumber.INITIAL[tokenSetId] & 31;
  for (var i = 0; i < 6; i += 32)
  {
    var j = i;
    var i0 = (i >> 5) * 24 + s - 1;
    var f = ComplexNumber.EXPECTED[(i0 & 1) + ComplexNumber.EXPECTED[i0 >> 1]];
    for ( ; f != 0; f >>>= 1, ++j)
    {
      if ((f & 1) != 0)
      {
        set.push(ComplexNumber.TOKEN[j]);
      }
    }
  }
  return set;
};

ComplexNumber.TopDownTreeBuilder = function()
{
  var input = null;
  var stack = null;

  this.reset = function(i)
  {
    input = i;
    stack = [];
  };

  this.startNonterminal = function(name, begin)
  {
    var nonterminal = new ComplexNumber.Nonterminal(name, begin, begin, []);
    if (stack.length > 0) addChild(nonterminal);
    stack.push(nonterminal);
  };

  this.endNonterminal = function(name, end)
  {
    stack[stack.length - 1].end = end;
    if (stack.length > 1) stack.pop();
  };

  this.terminal = function(name, begin, end)
  {
    addChild(new ComplexNumber.Terminal(name, begin, end));
  };

  this.whitespace = function(begin, end)
  {
  };

  function addChild(s)
  {
    var current = stack[stack.length - 1];
    current.children.push(s);
  }

  this.serialize = function(e)
  {
    e.reset(input);
    stack[0].send(e);
  };
};

ComplexNumber.Terminal = function(name, begin, end)
{
  this.begin = begin;
  this.end = end;

  this.send = function(e)
  {
    e.terminal(name, begin, end);
  };
};

ComplexNumber.Nonterminal = function(name, begin, end, children)
{
  this.begin = begin;
  this.end = end;

  this.send = function(e)
  {
    e.startNonterminal(name, begin);
    var pos = begin;
    children.forEach
    (
      function(c)
      {
        if (pos < c.begin) e.whitespace(pos, c.begin);
        c.send(e);
        pos = c.end;
      }
    );
    if (pos < end) e.whitespace(pos, end);
    e.endNonterminal(name, end);
  };
};

ComplexNumber.MAP0 =
[
  /*   0 */ 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  /*  36 */ 0, 0, 0, 0, 0, 0, 2, 3, 0, 4, 5, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /*  72 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0,
  /* 108 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

ComplexNumber.MAP1 =
[
  /*   0 */ 54, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58,
  /*  27 */ 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58, 58,
  /*  54 */ 90, 159, 127, 117, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127,
  /*  76 */ 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 10, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
  /* 102 */ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  /* 138 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 4, 5,
  /* 174 */ 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 0, 0, 0, 0, 0, 0
];

ComplexNumber.INITIAL =
[
  /* 0 */ 1, 66, 67
];

ComplexNumber.TRANSITION =
[
  /*   0 */ 161, 161, 161, 161, 44, 161, 161, 161, 59, 82, 88, 161, 56, 67, 163, 161, 75, 67, 163, 161, 174, 96, 161,
  /*  23 */ 161, 114, 127, 135, 161, 119, 143, 151, 161, 48, 103, 106, 161, 161, 159, 161, 161, 171, 161, 161, 161, 196,
  /*  45 */ 196, 196, 196, 0, 0, 0, 0, 0, 13, 0, 16, 5, 5, 5, 0, 0, 0, 0, 0, 10, 0, 10, 0, 0, 0, 18, 18, 0, 21, 21, 5,
  /*  76 */ 7, 7, 0, 9, 0, 9, 0, 0, 0, 10, 0, 0, 10, 0, 10, 10, 0, 10, 10, 10, 0, 0, 0, 11, 0, 0, 14, 0, 0, 0, 13, 0, 0,
  /* 109 */ 16, 0, 0, 13, 16, 6, 136, 136, 0, 6, 6, 136, 136, 0, 6, 12, 136, 143, 6, 0, 17, 6, 19, 148, 136, 150, 17,
  /* 136 */ 19, 19, 148, 150, 150, 17, 148, 6, 0, 17, 12, 19, 148, 143, 150, 23, 19, 19, 152, 150, 150, 23, 152, 0, 160,
  /* 161 */ 0, 0, 0, 0, 0, 0, 0, 0, 18, 21, 0, 0, 96, 0, 0, 0, 0, 0, 11, 0, 14
];

ComplexNumber.EXPECTED =
[
  /*  0 */ 12, 14, 16, 18, 16, 16, 17, 18, 16, 17, 18, 17, 48, 56, 60, 32, 16, 16, 24, 24
];

ComplexNumber.TOKEN =
[
  "(0)",
  "END",
  "eof",
  "real",
  "imaginary",
  "whitespace"
];

// End
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
 * MaiaScript compiler class.
 * @class
 */
function MaiaCompiler() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        binaryExpression = ['operation',
                            'variableAssignment',
                            'logicalORExpression',
                            'logicalXORExpression',
                            'logicalANDExpression',
                            'bitwiseORExpression',
                            'bitwiseXORExpression',
                            'bitwiseANDExpression',
                            'equalityExpression',
                            'relationalExpression',
                            'shiftExpression',
                            'additiveExpression',
                            'powerExpression',
                            'multiplicativeExpression'];
        codeBlockStatement = ['maiascript',
                              'namespace',
                              'function',
                              'if',
                              'do',
                              'while',
                              'for',
                              'foreach',
                              'try',
                              'catch',
                              'test'];
        conditionalExpression = ['if',
                              'do',
                              'while',
                              'for',
                              'foreach',
                              'catch',
                              'test'];
        operators = {'||':   'core.logicalOR',
                     '||||': 'core.logicalXOR',
                     '&&':   'core.logicalAND',
                     '|':    'core.bitwiseOR',
                     '|||':  'core.bitwiseXOR',
                     '&':    'core.bitwiseAND',
                     '==':   'core.equal',
                     '!=':   'core.different',
                     '<':    'core.LT',
                     '<=':   'core.LE',
                     '>=':   'core.GE',
                     '>':    'core.GT',
                     '<<':   'core.leftShift',
                     '>>':   'core.rightShift',
                     '+':    'core.add',
                     '-':    'core.sub',
                     '^':    'core.power',
                     '*':    'core.mul',
                     '/':    'core.div',
                     '%':    'core.mod',
                     '~':    'core.bitwiseNot',
                     '!':    'core.logicalNot'
                    };
    }

    /**
     * Convert XML to JSON.
     * @param {xml}    xml - The XML data.
     * @return {json}  XML data converted to a JSON object.
     */
    this.xmlToJson = function(xml)
    {
        try {
            var obj = {};
            if (xml.children.length > 0) {
                for (var i = 0; i < xml.children.length; i++) {
                    var item = xml.children.item(i);
                    nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) == 'undefined') {
                        obj[nodeName] = this.xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].push) == 'undefined') {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(this.xmlToJson(item));
                    }
                }
            } else {
                obj = xml.textContent;
            }
            return obj;
        } catch (e) {
            system.log(e.message);
        }
    }
    
    /**
     * Compiles the MaiaScript XML tree for Maia Internal Code (MIL).
     * @param {xml}    xml - The XML data.
     * @param {string} itemName - Name of the item being analyzed.
     * @return {json}  XML data converted to a MIL object.
     */
    this.xmlToMil = function(xml, itemName = '')
    {
        try {
            var obj = {};

            if (itemName == '') {
                if (xml.children.length > 0) {
                    for (var i = 0; i < xml.children.length; i++) {
                        var item = xml.children.item(i);
                        nodeName = item.nodeName;
                        if (typeof(obj[nodeName]) == 'undefined') {
                            obj[nodeName] = this.xmlToMil(item, nodeName);
                        } else {
                            if (typeof(obj[nodeName].push) == 'undefined') {
                                var old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(this.xmlToMil(item, nodeName));
                        }
                    }
                } else {
                    obj = xml.textContent;
                }
            } else {
                if (binaryExpression.includes(itemName)) {
                    if (xml.children.length > 1) {
                        for (var i = 0; i < xml.children.length; i++) {
                            var item = xml.children.item(i);
                            nodeName = item.nodeName;
                            if (nodeName != 'TOKEN') {
                                opName = 'op';
                            } else {
                                opName = nodeName;
                            }
                            if (typeof(obj[opName]) == 'undefined') {
                                obj[opName] = this.xmlToMil(item, nodeName);
                            } else {
                                if (typeof(obj[opName].push) == 'undefined') {
                                    var old = obj[opName];
                                    obj[opName] = [];
                                    obj[opName].push(old);
                                }
                                obj[opName].push(this.xmlToMil(item, nodeName));
                            }
                        }
                    } else if (xml.children.length == 1) {
                        var item = xml.children.item(0);
                        nodeName = item.nodeName;
                        obj = this.xmlToMil(item, nodeName);
                    } else {
                        obj = xml.textContent;
                    }
                } else {
                    if (xml.children.length > 0) {
                        for (var i = 0; i < xml.children.length; i++) {
                            var item = xml.children.item(i);
                            nodeName = item.nodeName;
                            if (typeof(obj[nodeName]) == 'undefined') {
                                obj[nodeName] = this.xmlToMil(item, nodeName);
                            } else {
                                if (typeof(obj[nodeName].push) == 'undefined') {
                                    var old = obj[nodeName];
                                    obj[nodeName] = [];
                                    obj[nodeName].push(old);
                                }
                                obj[nodeName].push(this.xmlToMil(item, nodeName));
                            }
                        }
                    } else {
                        obj = xml.textContent;
                    }
                }
            }
            return obj;
        } catch (e) {
            system.log(e.message);
        }
    }

    /**
     * Compiles a complex number to JSON.
     * @param {string}   text - The expression representing the complex number.
     * @return {string}  Number converted to JSON.
     */
    this.parseComplexNumber = function(text) {
        var complexNumber = {
            'xml': '',
            'text': ''
        }
        maiaScriptComplexNumber = {
            'real': 0,
            'imaginary': 0
        }

        function getXml (data) {
            complexNumber.xml += data;
        }
        var s = new ComplexNumber.XmlSerializer(getXml, true);
        var complexNumberParser = new ComplexNumber(text, s);
        try {
            complexNumberParser.parse_number();
        } catch (pe) {
            if (!(pe instanceof complexNumberParser.ParseException)) {
                throw pe;
            } else {
                var parserError = complexNumberParser.getErrorMessage(pe);
                alert(parserError);
                throw parserError;
            }
        }
        var parser = new DOMParser();
        var xml = parser.parseFromString(complexNumber.xml,"text/xml");
        
        var json = this.xmlToJson(xml);
        if ('number' in json) {
            var number = json['number'];
            if ('complex' in number) {
                var complex = number['complex'];
                if ('imaginary' in complex) {
                    var imaginary = complex['imaginary'];
                    json.number.complex.imaginary = json.number.complex.imaginary.substring(0, json.number.complex.imaginary.length - 2);
                }
            }
            if (typeof json.number.complex.real == 'undefined') {
                json.number.complex.real = 0;
            }
            maiaScriptComplexNumber = {
                'real': core.toNumber(json.number.complex.real),
                'imaginary': core.toNumber(json.number.complex.imaginary)
            }
        }
        complexNumber.text = JSON.stringify(maiaScriptComplexNumber);
        return complexNumber.text;
    }

    /**
     * Compiles the code in Maia Internal Language (MIL) for JavaScript.
     * @param {json}     mil - Code in Maia Internal Language (MIL).
     * @param {string}   parentNodeInfo - Parent node data.
     * @param {boolean}  isKernelFunction - Parent node is a kernel function.
     * @return {string}  MIL code converted to JavaScript.
     */
    this.parse = function(mil, parentNodeInfo, isKernelFunction) {
        var node = {};
        var js = '';
        
        if (typeof isKernelFunction == 'undefined') {
            var isKernelFunction = false;
        }

        if ('maiascript' in mil) {
            node = mil['maiascript'];
            var nodeInfo = {
                'parentNode': 'maiascript',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'maiascript';

            if (typeof node != 'undefined') {
                js = this.parse(node, nodeInfo, isKernelFunction);
                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
            }
        } else if ('expression' in mil) {
            node = mil['expression'];
            var nodeInfo = {
                'parentNode': 'expression',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'expression';

            if (typeof node != 'undefined') {
                if (Array.isArray(node)) {
                    for (var i = 0; i < node.length; i++) {
                        text = this.parse(node[i], nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                        if (codeBlockStatement.includes(parentNodeInfo.parentNode) && (nodeInfo.childNode != 'comment') && (nodeInfo.childNode != 'condition')) {
                            if (parentNodeInfo.parentNode == 'namespace') {
                                if ((parentNodeInfo.terminalNode == 'assignment') || (parentNodeInfo.terminalNode == 'function')) {
                                    js += 'this.' + text + ';';
                                } else {
                                    js += text + ';';
                                }
                            } else {
                                if (conditionalExpression.includes(parentNodeInfo.parentNode)) {
                                    js += text;
                                } else {
                                    js += text + ';';
                                }
                            }
                        } else {
                            js += text;
                        }
                    }
                } else {
                    text = this.parse(node, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    if (codeBlockStatement.includes(parentNodeInfo.parentNode) && (nodeInfo.childNode != 'comment') && (nodeInfo.childNode != 'condition')) {
                        if (parentNodeInfo.parentNode == 'namespace') {
                            if ((parentNodeInfo.terminalNode == 'assignment') || (parentNodeInfo.terminalNode == 'function')) {
                                js += 'this.' + text + ';';
                            } else {
                                js += text + ';';
                            }
                        } else {
                            if (conditionalExpression.includes(parentNodeInfo.parentNode)) {
                                js += text;
                            } else {
                                js += text + ';';
                            }
                        }
                    } else {
                        js += text;
                    }
                }
            }
        } else if ('statement' in mil) {
            node = mil['statement'];
            var nodeInfo = {
                'parentNode': 'statement',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'statement';

            if (typeof node != 'undefined') {
                js = this.parse(node, nodeInfo, isKernelFunction);
                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
            }
        } else if ('namespace' in mil) {
            node = mil['namespace'];
            var nodeInfo = {
                'parentNode': 'namespace',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'namespace';

            if (typeof node != 'undefined') {
                if ('identifier' in node) {
                    var nodeIdentifier = {
                        'identifier': node['identifier']
                    };
                    var name = this.parse(nodeIdentifier, nodeInfo, isKernelFunction);

                    if ('expression' in node) {
                        var nodeExpression = {
                            'expression': node['expression']
                        };
                        var body = this.parse(nodeExpression, nodeInfo, isKernelFunction);
                    }
                    js = 'function ' + name + '_' + '() {' + body + '};' + name + ' = new ' + name + '_()' ;
                }
            }
        } else if ('function' in mil) {
            node = mil['function'];
            var nodeInfo = {
                'parentNode': 'function',
                'childNode': '',
                'terminalNode' : 'function'
            };
            parentNodeInfo.childNode = 'function';

            if (typeof node != 'undefined') {
                if ('identifier' in node) {
                    var nodeIdentifier = {
                        'identifier': node['identifier']
                    };
                    var name = this.parse(nodeIdentifier, nodeInfo, isKernelFunction);

                    if ('TOKEN' in node) {
                        var statement = node['TOKEN'][0];
                        if (statement == 'async') {
                            js += name + ' = async function ';
                        } else if (statement == 'constructor') {
                            nodeInfo.parentNode = 'namespace';
                            js += name + ' = function ';
                        } else {
                            js += name + ' = function ';
                        }
                    } else {
                        var statement = 'function';
                        js += name + ' = function ';
                    }
                    
                    if ('arguments' in node) {
                        var nodeArguments = {
                            'arguments': node['arguments']
                        };
                        var args = this.parse(nodeArguments, nodeInfo, isKernelFunction);
                        js += '(' + args + ')';
                    } else {
                        js += '()';
                    }
                    if ('expression' in node) {
                        var nodeExpression = {
                            'expression': node['expression']
                        };
                        if (statement == 'kernel') {
                            var body = this.parse(nodeExpression, nodeInfo, true);
                        } else {
                            var body = this.parse(nodeExpression, nodeInfo, isKernelFunction);
                        }
                        js += ' {' + body + '}';
                    } else {
                        js += ' {}';
                    }
                }
            }
            parentNodeInfo.terminalNode = 'function';
        } else if ('include' in mil) {
            node = mil['include'];
            var nodeInfo = {
                'parentNode': 'include',
                'childNode': '',
                'terminalNode' : 'include'
            };
            parentNodeInfo.childNode = 'include';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var returnValue = this.parse(node, nodeInfo, isKernelFunction);
                    js += 'var func_ = core.type(' + returnValue + ') == "function" ? ' + returnValue + ' : ' + returnValue + '.constructor;';
                    js += 'var script_ = func_.toString().substring(func_.toString().indexOf("{") + 1, func_.toString().lastIndexOf("}"));';
                    js += 'eval(script_)';
                }
            }
        } else if ('local' in mil) {
            node = mil['local'];
            var nodeInfo = {
                'parentNode': parentNodeInfo.parentNode,
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'local';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var expressionValue = this.parse(node, nodeInfo, isKernelFunction);
                    js += 'let ' + expressionValue;
                }
            }
        } else if ('if' in mil) {
            node = mil['if'];
            var nodeInfo = {
                'parentNode': 'if',
                'childNode': '',
                'terminalNode' : 'if'
            };
            parentNodeInfo.childNode = 'if';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var body = '';
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        var nodeCondition = {
                            'expression': nodeExpression[0]
                        };
                        var condition = this.parse(nodeCondition, nodeInfo, isKernelFunction);

                        for (var i = 1; i < nodeExpression.length; i++) {
                            var commandLine = nodeExpression[i];
                            var bodyExpression = {
                                'expression': commandLine
                            };
                            body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }
                        js += 'if (' + condition + ') {' + body + '}';
                    }
                }
                if ('elseif' in node) {
                    var body = '';
                    var nodeElseIf = node['elseif'];
                    if (Array.isArray(nodeElseIf)) {
                        for (var i = 0; i < nodeElseIf.length; i++) {
                            if ('expression' in nodeElseIf[i]) {
                                var nodeElseIfExpression = nodeElseIf[i]['expression'];
                                if (Array.isArray(nodeElseIfExpression)) {
                                    var body = '';
                                    var nodeExpression = nodeElseIfExpression[0];
                                    var nodeCondition = {
                                        'expression': nodeExpression
                                    };
                                    var condition = this.parse(nodeCondition, nodeInfo, isKernelFunction);
                                    
                                    for (var j = 1; j < nodeElseIfExpression.length; j++) {
                                        var commandLine = nodeElseIfExpression[j];
                                        var bodyExpression = {
                                            'expression': commandLine
                                        };
                                        body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                                    }
                                }
                                js += ' else if (' + condition + ') {' + body + '}';
                            }
                        }
                    } else {
                        if ('expression' in nodeElseIf) {
                            var nodeElseIfExpression = nodeElseIf['expression'];
                            if (Array.isArray(nodeElseIfExpression)) {
                                var body = '';
                                var nodeExpression = nodeElseIfExpression[0];
                                var nodeCondition = {
                                    'expression': nodeExpression
                                };
                                var condition = this.parse(nodeCondition, nodeInfo, isKernelFunction);
                                
                                for (var j = 1; j < nodeElseIfExpression.length; j++) {
                                    var commandLine = nodeElseIfExpression[j];
                                    var bodyExpression = {
                                        'expression': commandLine
                                    };
                                    body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                                }
                            }
                            js += ' else if (' + condition + ') {' + body + '}';
                        }
                    }
                }
                if ('else' in node) {
                    var body = '';
                    var nodeElse = node['else'];
                    if ('expression' in nodeElse) {
                        var nodeExpression = nodeElse['expression'];
                        if (Array.isArray(nodeExpression)) {
                            for (var i = 0; i < nodeExpression.length; i++) {
                                var commandLine = nodeExpression[i];
                                var bodyExpression = {
                                    'expression': commandLine
                                };
                                body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                            }
                        } else {
                            var bodyExpression = {
                                'expression': nodeExpression
                            };
                            body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }
                        js += ' else {' + body + '}';
                    }
                }
            }
            parentNodeInfo.terminalNode = 'if';
        } else if ('do' in mil) {
            node = mil['do'];
            var nodeInfo = {
                'parentNode': 'do',
                'childNode': '',
                'terminalNode' : 'do'
            };
            parentNodeInfo.childNode = 'do';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var body = '';
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        for (var i = 0; i < nodeExpression.length - 1; i++) {
                            var commandLine = nodeExpression[i];
                            var bodyExpression = {
                                'expression': commandLine
                            };
                            body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }

                        var nodeCondition = {
                            'expression': nodeExpression[nodeExpression.length - 1]
                        };
                        var condition = this.parse(nodeCondition, nodeInfo, isKernelFunction);
                    }
                    js += 'do {' + body + '} while (' + condition + ')';
                }
            }
            parentNodeInfo.terminalNode = 'do';
        } else if ('while' in mil) {
            node = mil['while'];
            var nodeInfo = {
                'parentNode': 'while',
                'childNode': '',
                'terminalNode' : 'while'
            };
            parentNodeInfo.childNode = 'while';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var body = '';
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        var nodeCondition = {
                            'expression': nodeExpression[0]
                        };
                        var condition = this.parse(nodeCondition, nodeInfo, isKernelFunction);

                        for (var i = 1; i < nodeExpression.length; i++) {
                            var commandLine = nodeExpression[i];
                            var bodyExpression = {
                                'expression': commandLine
                            };
                            body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }
                    }
                    js += 'while (' + condition + ') {' + body + '}';
                }
            }
            parentNodeInfo.terminalNode = 'while';
        } else if ('for' in mil) {
            node = mil['for'];
            var nodeInfo = {
                'parentNode': 'for',
                'childNode': '',
                'terminalNode' : 'for'
            };
            parentNodeInfo.childNode = 'for';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var body = '';
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        var nodeExpression = node['expression'];
                        var nodeBefore = {
                            'expression': nodeExpression[0]
                        };
                        var before = this.parse(nodeBefore, nodeInfo, isKernelFunction);

                        var nodeCondition = {
                            'expression': nodeExpression[1]
                        };
                        var condition = this.parse(nodeCondition, nodeInfo, isKernelFunction);

                        var nodeAfter = {
                            'expression': nodeExpression[2]
                        };
                        var after = this.parse(nodeAfter, nodeInfo, isKernelFunction);

                        for (var i = 3; i < nodeExpression.length; i++) {
                            var commandLine = nodeExpression[i];
                            var bodyExpression = {
                                'expression': commandLine
                            };
                            body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }
                    }
                    js += 'for (' + before + ';' + condition + ';' + after + ') {' + body + '}';
                }
            }
            parentNodeInfo.terminalNode = 'for';
        } else if ('foreach' in mil) {
            node = mil['foreach'];
            var nodeInfo = {
                'parentNode': 'foreach',
                'childNode': '',
                'terminalNode' : 'foreach'
            };
            parentNodeInfo.childNode = 'foreach';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var body = '';
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        var nodeArray = {
                            'expression': nodeExpression[0]
                        };
                        var arrayName = this.parse(nodeArray, nodeInfo, isKernelFunction);

                        var nodeKeyVar = {
                            'expression': nodeExpression[1]
                        };
                        var keyVarName = this.parse(nodeKeyVar, nodeInfo, isKernelFunction);

                        var nodeValueVar = {
                            'expression': nodeExpression[2]
                        };
                        var valueVarName = this.parse(nodeValueVar, nodeInfo, isKernelFunction);

                        for (var i = 3; i < nodeExpression.length; i++) {
                            var commandLine = nodeExpression[i];
                            var bodyExpression = {
                                'expression': commandLine
                            };
                            body += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }
                    }
                    js += 'for (' + keyVarName + ' in ' + arrayName + ') {var ' + valueVarName + ' = ' + arrayName + '[' + keyVarName + '];' + body + '}';
                }
            }
            parentNodeInfo.terminalNode = 'foreach';
        } else if ('try' in mil) {
            node = mil['try'];
            var nodeInfo = {
                'parentNode': 'try',
                'childNode': '',
                'terminalNode' : 'try'
            };
            parentNodeInfo.childNode = 'try';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var nodeExpression = node['expression'];
                    var nodeBody = {
                        'expression': nodeExpression
                    };
                    var body = this.parse(nodeBody, nodeInfo, isKernelFunction);
                    js += 'try {' + body + '}';
                }
                if ('catch' in node) {
                    nodeInfo.parentNode = 'catch';
                    var nodeCatch = node['catch'];
                    if ('expression' in nodeCatch) {
                        var nodeExpression = nodeCatch['expression'];
                        if (Array.isArray(nodeExpression)) {
                            var _catch = '';
                            var nodeVar = {
                                'expression': nodeExpression[0]
                            };
                            var catchVar = this.parse(nodeVar, nodeInfo, isKernelFunction);
                            
                            for (var i = 1; i < nodeExpression.length; i++) {
                                var commandLine = nodeExpression[i];
                                var bodyExpression = {
                                    'expression': commandLine
                                };
                                _catch += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                            }
                        }
                        js += ' catch (' + catchVar + ') {' + _catch + '}';
                    }
                }
            }
            parentNodeInfo.terminalNode = 'try';
        } else if ('test' in mil) {
            node = mil['test'];
            var nodeInfo = {
                'parentNode': 'test',
                'childNode': '',
                'terminalNode' : 'test'
            };
            parentNodeInfo.childNode = 'test';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        var _script = '';
                        var nodeTimes = {
                            'expression': nodeExpression[0]
                        };
                        var _times = this.parse(nodeTimes, nodeInfo, isKernelFunction);

                        var nodeValue = {
                            'expression': nodeExpression[1]
                        };
                        var _value = this.parse(nodeValue, nodeInfo, isKernelFunction);

                        var nodeTolerance = {
                            'expression': nodeExpression[2]
                        };
                        var _tolerance = this.parse(nodeTolerance, nodeInfo, isKernelFunction);
                        
                        for (var i = 3; i < nodeExpression.length; i++) {
                            var commandLine = nodeExpression[i];
                            var bodyExpression = {
                                'expression': commandLine
                            };
                            _script += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                        }
                    }
                }
                if ('catch' in node) {
                    nodeInfo.parentNode = 'catch';
                    var nodeCatch = node['catch'];
                    if ('expression' in nodeCatch) {
                        var nodeExpression = nodeCatch['expression'];
                        if (Array.isArray(nodeExpression)) {
                            var _catch = '';
                            var nodeVar = {
                                'expression': nodeExpression[0]
                            };
                            var catchVar = this.parse(nodeVar, nodeInfo, isKernelFunction);

                            for (var i = 1; i < nodeExpression.length; i++) {
                                var commandLine = nodeExpression[i];
                                var bodyExpression = {
                                    'expression': commandLine
                                };
                                _catch += this.parse(bodyExpression, nodeInfo, isKernelFunction) + ';';
                            }
                        }
                        js += 'core.testScript(' + '\'' + _script + '\',' + _times + ',' + _value + ',' + _tolerance + ',\'' + 'var ' + catchVar + ' = core.testResult.obtained;' + _catch + '\');';
                    }
                }
            }
            parentNodeInfo.terminalNode = 'test';
        } else if ('break' in mil) {
            node = mil['break'];
            var nodeInfo = {
                'parentNode': 'break',
                'childNode': '',
                'terminalNode' : 'break'
            };
            parentNodeInfo.childNode = 'break';

            if (typeof node != 'undefined') {
                js += 'break';
            }
        } else if ('continue' in mil) {
            node = mil['continue'];
            var nodeInfo = {
                'parentNode': 'continue',
                'childNode': '',
                'terminalNode' : 'continue'
            };
            parentNodeInfo.childNode = 'continue';

            if (typeof node != 'undefined') {
                js += 'continue';
            }
        } else if ('return' in mil) {
            node = mil['return'];
            var nodeInfo = {
                'parentNode': 'return',
                'childNode': '',
                'terminalNode' : 'return'
            };
            parentNodeInfo.childNode = 'return';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var returnValue = this.parse(node, nodeInfo, isKernelFunction);
                    js += 'return (' + returnValue + ')';
                } else {
                    js += 'return';
                }
            }
        } else if ('throw' in mil) {
            node = mil['throw'];
            var nodeInfo = {
                'parentNode': 'throw',
                'childNode': '',
                'terminalNode' : 'throw'
            };
            parentNodeInfo.childNode = 'throw';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var returnValue = this.parse(node, nodeInfo, isKernelFunction);
                    js += 'throw (' + returnValue + ')';
                } else {
                    js += 'throw ()';
                }
            }
        } else if ('operation' in mil) {
            node = mil['operation'];
            var nodeInfo = {
                'parentNode': 'operation',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'operation';
            
            if (typeof node != 'undefined') {
                if ('op' in node) {
                    js += this.parse(node, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                } else {
                    if ('TOKEN' in node) {
                        var primary = node['primary'];
                        var right = this.parse(primary, nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                        var operator = node['TOKEN'];
                        if (isKernelFunction) {
                            js += operator + right;
                        } else {
                            js += operators[operator] + '(' + right + ')';
                        }
                    } else {
                        js += this.parse(node, nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    }
                }
            }
        } else if ('op' in mil) {
            node = mil['op'];
            var nodeInfo = {
                'parentNode': 'op',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'op';
            if (typeof node != 'undefined') {
                if (Array.isArray(node)) {
                    var nodeInfo = {
                        'parentNode': 'op',
                        'childNode': '',
                        'terminalNode' : ''
                    };
                    var left = this.parse(node[0], nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    var nodeInfo = {
                        'parentNode': 'op',
                        'childNode': '',
                        'terminalNode' : ''
                    };
                    if ('TOKEN' in node[1]) {
                        var operator = node[1]['TOKEN'];
                        if ((operator == '!') || (operator == '~')) {
                            if (isKernelFunction) {
                                var right = operator + this.parse(node[1], nodeInfo, isKernelFunction);
                            } else {    
                                var right = operators[operator] + '(' + this.parse(node[1], nodeInfo, isKernelFunction) + ')';
                            }
                        } else {
                            var right = this.parse(node[1], nodeInfo, isKernelFunction);
                        }
                    } else {
                        var right = this.parse(node[1], nodeInfo, isKernelFunction);
                    }
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    if ('TOKEN' in mil) {
                        var operator = mil['TOKEN'];
                        var j = 0;
                        if (Array.isArray(operator)) {
                            if (operator[j] == '=') {
                                parentNodeInfo.terminalNode = 'assignment';
                                js += left + '=' + right;
                            } else if (operator[j] == ':=') {
                                parentNodeInfo.terminalNode = 'assignment';
                                js += left + '= new ' + right;
                            } else if (operator[j] == '?=') {
                                parentNodeInfo.terminalNode = 'assignment';
                                js += left + '= await ' + right;
                            } else {
                                if (isKernelFunction) {
                                    js += left + operator[j] + right;
                                } else {    
                                    js += operators[operator[j]] + '(' + left + ',' + right + ')';
                                }
                            }
                            j++;
                            for (var i = 2; i < node.length; i++) {
                                var right = this.parse(node[i], nodeInfo, isKernelFunction);
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                                if (operator[j] == '=') {
                                    parentNodeInfo.terminalNode = 'assignment';
                                    js += '=' + right;
                                } else if (operator[j] == ':=') {
                                    parentNodeInfo.terminalNode = 'assignment';
                                    js += '= new ' + right;
                                } else if (operator[j] == '?=') {
                                    parentNodeInfo.terminalNode = 'assignment';
                                    js += '= await ' + right;
                                } else {
                                    if (isKernelFunction) {
                                        js = js + operator[j] + right;
                                    } else {    
                                        js = operators[operator[j]] + '(' + js + ',' + right + ')';
                                    }
                                }
                                j++;
                            }
                        } else {
                            if (operator == '=') {
                                parentNodeInfo.terminalNode = 'assignment';
                                js += left + '=' + right;
                            } else if (operator == ':=') {
                                parentNodeInfo.terminalNode = 'assignment';
                                js += left + '= new ' + right;
                            } else if (operator == '?=') {
                                parentNodeInfo.terminalNode = 'assignment';
                                js += left + '= await ' + right;
                            } else {
                                if (isKernelFunction) {
                                    js += left + operator + right;
                                } else {    
                                    js += operators[operator] + '(' + left + ',' + right + ')';
                                }
                            }
                        }
                    }
                } else {
                    var nodeInfo = {
                        'parentNode': 'op',
                        'childNode': '',
                        'terminalNode' : ''
                    };
                    js += this.parse(node, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                }
            }
        } else if ('primary' in mil) {
            node = mil['primary'];
            var nodeInfo = {
                'parentNode': parentNodeInfo.childNode,
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'primary';

            if (typeof node != 'undefined') {
                if ('value' in node) {
                    var value = node['value'];
                    if ('TOKEN' in value) {
                        js = value['TOKEN'];
                    } else {
                        js = this.parse(node, nodeInfo, isKernelFunction);
                    }
                } else {
                    js = this.parse(node, nodeInfo, isKernelFunction);
                }
                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
            }
        } else if ('member' in mil) {
            node = mil['member'];
            var nodeInfo = {
                'parentNode': 'member',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'member';

            if (typeof node != 'undefined') {
                if ('identifier' in node) {
                    js += this.parse(node, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                }
                if ('arguments' in node) {
                    var nodeArguments = {
                        'matrixIndexes': node['arguments']
                    };
                    var args = this.parse(nodeArguments, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    var tokenType = node['TOKEN'];
                    if (typeof tokenType != 'undefined') {
                        if (tokenType.indexOf('(') != -1) {
                            js += '(' + args.replace(/;/g,',') + ')';
                        } else if (tokenType.indexOf('[') != -1) {
                            var arrayOfArgs = args.split(';');
                            if (Array.isArray(arrayOfArgs)) {
                                for (var i = 0; i < arrayOfArgs.length; i++) {
                                    js += '[' + arrayOfArgs[i] + ']';
                                }
                            } else {
                                js += '[' + arrayOfArgs + ']';
                            }
                        }
                    }
                } else {
                    var tokenType = node['TOKEN'];
                    if (typeof tokenType != 'undefined') {
                        if (tokenType.indexOf('(') != -1) {
                            js += '()';
                        } else if (tokenType.indexOf('[') != -1) {
                            js += '[]';
                        }
                    }
                }
            }
        } else if ('identifier' in mil) {
            node = mil['identifier'];
            var nodeInfo = {
                'parentNode': 'identifier',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'identifier';
            parentNodeInfo.terminalNode = 'identifier';

            if (typeof node != 'undefined') {
                if (Array.isArray(node)) {
                    for (var i = 0; i < node.length; i++) {
                        if (i < (node.length - 1)) {
                            js += node[i] + '.';
                        } else {
                            js += node[i];
                        }
                    }
                } else {
                    js = node;
                }
            }
        } else if ('arguments' in mil) {
            node = mil['arguments'];
            var nodeInfo = {
                'parentNode': 'arguments',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'arguments';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        for (var i = 0; i < nodeExpression.length; i++) {
                            if (i < (nodeExpression.length - 1)) {
                                js += this.parse(nodeExpression[i], nodeInfo, isKernelFunction) + ',';
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            } else {
                                js += this.parse(nodeExpression[i], nodeInfo, isKernelFunction);
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            }
                        }
                    } else {
                        js += this.parse(nodeExpression, nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    }
                }
            } else {
                js = node;
            }
        } else if ('matrixIndexes' in mil) {
            node = mil['matrixIndexes'];
            var nodeInfo = {
                'parentNode': 'arguments',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'arguments';

            if (typeof node != 'undefined') {
                if ('expression' in node) {
                    var nodeExpression = node['expression'];
                    if (Array.isArray(nodeExpression)) {
                        for (var i = 0; i < nodeExpression.length; i++) {
                            if (i < (nodeExpression.length - 1)) {
                                js += this.parse(nodeExpression[i], nodeInfo, isKernelFunction) + ';';
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            } else {
                                js += this.parse(nodeExpression[i], nodeInfo, isKernelFunction);
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            }
                        }
                    } else {
                        js += this.parse(nodeExpression, nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    }
                }
            } else {
                js = node;
            }
        } else if ('value' in mil) {
            node = mil['value'];
            var nodeInfo = {
                'parentNode': 'value',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'value';

            if (typeof node != 'undefined') {
                js = this.parse(node, nodeInfo, isKernelFunction);
                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
            }
        } else if ('real' in mil) {
            node = mil['real'];
            var nodeInfo = {
                'parentNode': 'real',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'real';
            parentNodeInfo.terminalNode = 'real';

            if (typeof node == 'string') {
                js = node;
            }
        } else if ('complex' in mil) {
            node = mil['complex'];
            var nodeInfo = {
                'parentNode': 'complex',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'complex';
            parentNodeInfo.terminalNode = 'complex';

            if (typeof node == 'string') {
                js = this.parseComplexNumber(node);
            }
        } else if ('string' in mil) {
            node = mil['string'];
            var nodeInfo = {
                'parentNode': 'string',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'string';
            parentNodeInfo.terminalNode = 'string';

            if (typeof node == 'string') {
                js += node;
            }
        } else if ('array' in mil) {
            node = mil['array'];
            var nodeInfo = {
                'parentNode': 'array',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'array';

            if (typeof node != 'undefined') {
                if ('element' in node) {
                    var nodeElements = node['element'];
                    js += '{';
                    if (Array.isArray(nodeElements)) {
                        for (var i = 0; i < nodeElements.length; i++) {
                            var nodeElement = {
                                'element': nodeElements[i]
                            };
                            if (i < (nodeElements.length - 1)) {
                                js += this.parse(nodeElement, nodeInfo, isKernelFunction) + ',';
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            } else {
                                js += this.parse(nodeElement, nodeInfo, isKernelFunction);
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            }
                        }
                    } else {
                        var nodeElement = {
                            'element': nodeElements
                        };
                        js += this.parse(nodeElement, nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    }
                }
                js += '}';
                parentNodeInfo.terminalNode = 'array';
            }
        } else if ('element' in mil) {
            node = mil['element'];
            var nodeInfo = {
                'parentNode': 'element',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'element';

            if (typeof node != 'undefined') {
                if ('key' in node) {
                    var key = node['key'];
                    js += key['string'] + ': ';
                }
                if ('expression' in node) {
                    var nodeExpression = {
                        'expression': node['expression']
                    };
                    var expression = this.parse(nodeExpression, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    js += expression;
                }
            }
        } else if ('matrix' in mil) {
            node = mil['matrix'];
            var nodeInfo = {
                'parentNode': 'matrix',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'matrix';

            if (typeof node != 'undefined') {
                if ('row' in node) {
                    var nodeRows = node['row'];
                    if (Array.isArray(nodeRows)) {
                        js += '[';
                        for (var i = 0; i < nodeRows.length; i++) {
                            var nodeRow = {
                                'row': nodeRows[i]
                            }
                            if (i < (nodeRows.length - 1)) {
                                js += this.parse(nodeRow, nodeInfo, isKernelFunction) + ',';
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            } else {
                                js += this.parse(nodeRow, nodeInfo, isKernelFunction);
                                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                            }
                        }
                        js += ']';
                    } else {
                        var nodeRow = {
                            'row': nodeRows
                        }
                        js += this.parse(nodeRow, nodeInfo, isKernelFunction);
                        parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                    }
                } else {
                    js += '[]';
                }
            }
        } else if ('row' in mil) {
            node = mil['row'];
            var nodeInfo = {
                'parentNode': 'row',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'row';

            if (typeof node != 'undefined') {
                js += '[';
                if (Array.isArray(node)) {
                    for (var i = 0; i < node.length; i++) {
                        if (i < (node.length - 1)) {
                            js += this.parse(node[i], nodeInfo, isKernelFunction) + ',';
                            parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                        } else {
                            js += this.parse(node[i], nodeInfo, isKernelFunction);
                            parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                        }
                    }
                } else {
                    js += this.parse(node, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                }
                js += ']';
            }
        } else if ('column' in mil) {
            node = mil['column'];
            var nodeInfo = {
                'parentNode': 'column',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'column';

            if (typeof node != 'undefined') {
                if (Array.isArray(node)) {
                    for (var i = 0; i < node.length; i++) {
                        if (i < (node.length - 1)) {
                            js += this.parse(node[i], nodeInfo, isKernelFunction) + ',';
                            parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                        } else {
                            js += this.parse(node[i], nodeInfo, isKernelFunction);
                            parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                        }
                    }
                } else {
                    js += this.parse(node, nodeInfo, isKernelFunction);
                    parentNodeInfo.terminalNode = nodeInfo.terminalNode;
                }
            }
        } else if ('parenthesizedExpression' in mil) {
            node = mil['parenthesizedExpression'];
            var nodeInfo = {
                'parentNode': 'parenthesizedExpression',
                'childNode': '',
                'terminalNode' : ''
            };
            parentNodeInfo.childNode = 'parenthesizedExpression';

            if (typeof node != 'undefined') {
                js = '(' + this.parse(node, nodeInfo, isKernelFunction) + ')';
                parentNodeInfo.terminalNode = nodeInfo.terminalNode;
            };
        } else if ('comment' in mil) {
            node = mil['comment'];
            parentNodeInfo.childNode = 'comment';
            parentNodeInfo.terminalNode = 'comment';
            js = '';
        } else if ('TOKEN' in mil) {
            js = '';
        }

        return js;
    }

    /**
     * Compiles the MaiaScript XML tree for JavaScript.
     * @param {xml}      xml - The XML data.
     * @return {string}  XML data converted to JavaScript.
     */
    this.compile = function(xml) {
        var nodeInfo = {
            'parentNode': '',
            'childNode': 'maiascript',
            'terminalNode' : ''
        };

        var mil = {};
        var js = "";

        mil = this.xmlToMil(xml);
        js = this.parse(mil, nodeInfo);
        
        return js;
    }
}
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
 * MaiaScript core library.
 * @class
 */
function Core() {
    /*
     * This property needs to be updated
     * with each new version of MaiaStudio.
     */
    this.version = "3.5.7";

    this.testResult = {
        "expected": {},
        "obtained": {}
    };

    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
        compiledCode = {
            "xml": "",
            "mil": "",
            "js": ""
        }
    }

    /*
     * The following functions allow you to manipulate MaiaScript objects.
     */

    /**
     * Copies a matrix.
     * @param {array}  obj - Matrix to be copied.
     * @return {array}  A copy of the matrix.
     */
    this.copyMatrix = function(obj) {
        var newMatrix = [];
        for (var i = 0; i < obj.length; i++) {
            newMatrix[i] = obj[i].slice();
        }
        return newMatrix;
    }

    /**
     * Returns the character at the indicated position.
     * @param {string}   str - The string to look for.
     * @param {number}   pos - The character position.
     * @return {string}  The character at the indicated position.
     */
    this.charAt = function(str, pos) {
        return str.charAt(pos);
    }

    /**
     * Returns the character code at the indicated position.
     * @param {string}   str - The string to look for.
     * @param {number}   pos - The character position.
     * @return {string}  The character code at the indicated position.
     */
    this.charCodeAt = function(str, pos) {
        return str.charCodeAt(pos);
    }

    /**
     * Returns a clone of an object.
     * @param {object}   obj - The object to be cloned.
     * @return {string}  The clone of the object.
     */
    this.clone = function(obj) {
        return Object.assign({}, obj);
    }

    /**
     * Join two matrices.
     * @param {array}   mtx1 - The first matrix.
     * @param {array}   mtx2 - The second matrix.
     * @return {array}  Matrix containing the two indicated matrices.
     */
    this.concat = function(mtx1, mtx2) {
        return mtx.concat(mtx1, mtx2);
    }

    /**
     * Calculates the conjugate of a complex number.
     * @param {number}   num - The complex number.
     * @return {number}  the conjugate of a complex number.
     */
    this.conj = function(num) {
        var res;
        if (core.type(num) == 'complex') {
            res = core.complex(core.toNumber(num.real), -core.toNumber(num.imaginary));
        } else {
            throw new Error('The object passed to the conj() function is not a complex number, in the expression conj(' + core.toString(num) + ').');
        }
        return res;
    }

    /**
     * Returns a complex number, given the real and imaginary part of the number.
     * @param {object}   real - TThe real part of the complex number.
     * @param {number}   img - The imaginary part of the complex number.
     * @return {number}  A complex complex number.
     */
    this.complex = function(real, img) {
        var num;
        if ((typeof real == 'number') && (typeof img == 'number')) {
            num = {
                "real": real,
                "imaginary": img
            }
        } else {
            throw new Error('It is necessary to provide the real and imaginary parts of the number, in the expression complex(' + real + ',' + img + ').');
        }
        return num;
    }

    /**
     * Returns a Date object.
     * @return {object}  A Date object.
     */
    this.date = function() {
        return new Date();
    }

    /**
     * Calculates the determinant matrix.
     * @param {object}  obj - The matrix to calculate the determinant.
     * @return {array}  A (rows x columns) matrix.
     */
    this.det = function(obj) {
        var mtx = [];
        if (core.type(obj) == 'matrix') {
            var dim = core.dim(obj);
            var m = dim[0];
            var n = dim[1];
            // Convert to the diagonal equivalent matrix.
            var cpy = this.copyMatrix(obj);
            mtx = core.ident(m);
            for (var j = 0; j < m; j++) {
                if (cpy[j][j] != 0) {
                    for (var i = 0; i < m; i++) {
                        if (i != j) {
                            var scale = -cpy[i][j] / cpy[j][j];
                            for (k = j; k < n; k++) {
                                cpy[i][k] = cpy[i][k] + scale * cpy[j][k];
                            }
                            for (k = 0; k < n; k++) {
                                mtx[i][k] = mtx[i][k] + scale * mtx[j][k];
                            }
                        }
                    }
                }
            }
            for (i = 0; i < m; i++) {
                for (j = 0; j < n; j++) {
                    mtx[i][j] = mtx[i][j] / cpy[i][i];
                }
            }
            // Calculates the determinant of the matrix.
            var det = 1;
            for (i = 0; i < m; i++) {
                det = det * cpy[i][i];
            }
        } else {
            throw new Error('The argument for function det() must be a matrix, in the expression det(' + core.toString(obj) + ').');
        }
        return det;
    }

    /**
     * Calculates the diagonal equivalent matrix.
     * @param {object}  obj - The matrix to calculate the diagonal equivalent matrix.
     * @return {array}  A (rows x columns) matrix.
     */
    this.diag = function(obj) {
        if (core.type(obj) == 'matrix') {
            var dim = core.dim(obj);
            var m = dim[0];
            var n = dim[1];
            // Convert to the diagonal equivalent matrix.
            var cpy = this.copyMatrix(obj);
            for (var j = 0; j < m; j++) {
                if (cpy[j][j] != 0) {
                    for (var i = 0; i < m; i++) {
                        if (i != j) {
                            var scale = -cpy[i][j] / cpy[j][j];
                            for (k = j; k < n; k++) {
                                cpy[i][k] = cpy[i][k] + scale * cpy[j][k];
                            }
                        }
                    }
                }
            }
            // Calculates the determinant of the matrix.
            var det = 1;
            for (i = 0; i < m; i++) {
                det = det * cpy[i][i];
            }
            if (det == 0) {
                throw new Error('The matrix is singular, in the expression diag(' + core.toString(obj) + ').');
            }
        } else {
            throw new Error('The argument for function diag() must be a matrix, in the expression diag(' + core.toString(obj) + ').');
        }
        return cpy;
    }

    /**
     * Returns the dimensions of an array.
     * @param {array}   obj - Object to be measured.
     * @return {array}  Array containing the dimensions of a matrix.
     */
    this.dim = function(obj) {
        var arrayDimensions = [];
        if (Array.isArray(obj)) {
            arrayDimensions.push(obj.length);
            if (Array.isArray(obj[0])) {
                var elementDimension = this.dim(obj[0]);
                if (typeof elementDimension != 'undefined') {
                    arrayDimensions = arrayDimensions.concat(elementDimension);
                }
            }
        }
        return arrayDimensions;
    }

    /**
     * Evaluates a MaiaScript script.
     * @param {string}   stript - The script to be evaluated.
     * @param {object}   namespace - The namespace where evaluate the script.
     * @return {number}  Result of the evaluated script.
     */
    this.eval = function(script, namespace) {
        var result;

        compiledCode.xml = "";

        function getXml(data) {
            compiledCode.xml += data;
        }
        var s = new MaiaScript.XmlSerializer(getXml, true);
        var maiaScriptParser = new MaiaScript(script, s);
        try {
            maiaScriptParser.parse_maiascript();
        } catch (pe) {
            if (!(pe instanceof maiaScriptParser.ParseException)) {
                throw pe;
            } else {
                var parserError = maiaScriptParser.getErrorMessage(pe);
                alert(parserError);
                throw parserError;
            }
        }
        var parser = new DOMParser();
        var xml = parser.parseFromString(compiledCode.xml, "text/xml");

        var compiler = new MaiaCompiler();
        compiledCode.js = compiler.compile(xml);
        try {
            if (typeof namespace != 'undefined') {
                result = eval(namespace, compiledCode.js);
            } else {
                result = eval(compiledCode.js);
            }
            result = eval(compiledCode.js);
        } catch (e) {
            var evalError = e.message;
            system.log(evalError);
        }
        return result;
    }
    
    /**
     * Creates the identity matrix..
     * @param {number}  rows - Number of rows in the matrix.
     * @return {array}  A (rows x rows) identity matrix.
     */
    this.ident = function(rows) {
        var mtx = core.matrix(0, rows, rows);
        for (var i = 0; i < rows; i++) {
            mtx[i][i] = 1;
        }
        return mtx;
    }

    /**
     * Returns the imaginary part of a complex number.
     * @param {object}   obj - The complex number.
     * @return {number}  The imaginary part of a complex number.
     */
    this.imaginary = function(obj) {
        var num;
        if (typeof obj == 'object') {
            if ('imaginary' in obj) {
                num = obj.imaginary;
            } else {
                throw new Error('The object is not a complex number, in the expression imaginary(' + core.toString(obj) + ').');
            }
        } else {
            throw new Error('The object is not a complex number, in the expression imaginary(' + core.toString(obj) + ').');
        }
        return num;
    }

    /**
     * Returns true if one string is contained in another or in an array.
     * @param {object}    obj - The string containing the other one.
     * @param {string}    text - Search string.
     * @return {boolean}  True if one string is contained in another or in an array.
     */
    this.includes = function(obj, text) {
        return obj.includes(text);
    }

    /**
     * Returns the position of one string in another.
     * @param {string}   str - The string containing the other one.
     * @param {string}   text - Search string.
     * @return {number}  The position of one string in the other.
     */
    this.indexOf = function(str, text) {
        return str.indexOf(text);
    }
    
    /**
     * Calculates the inverse matrix.
     * @param {object}  obj - The matrix to calculate the inverse.
     * @return {array}  A (rows x columns) matrix.
     */
    this.inv = function(obj) {
        var mtx = [];
        if (core.type(obj) == 'matrix') {
            var dim = core.dim(obj);
            var m = dim[0];
            var n = dim[1];
            // Convert to the diagonal equivalent matrix.
            var cpy = this.copyMatrix(obj);
            mtx = core.ident(m);
            for (var j = 0; j < m; j++) {
                if (cpy[j][j] != 0) {
                    for (var i = 0; i < m; i++) {
                        if (i != j) {
                            var scale = -cpy[i][j] / cpy[j][j];
                            for (k = j; k < n; k++) {
                                cpy[i][k] = cpy[i][k] + scale * cpy[j][k];
                            }
                            for (k = 0; k < n; k++) {
                                mtx[i][k] = mtx[i][k] + scale * mtx[j][k];
                            }
                        }
                    }
                }
            }
            for (i = 0; i < m; i++) {
                for (j = 0; j < n; j++) {
                    mtx[i][j] = mtx[i][j] / cpy[i][i];
                }
            }
            // Calculates the determinant of the matrix.
            var det = 1;
            for (i = 0; i < m; i++) {
                det = det * cpy[i][i];
            }
            if (det == 0) {
                throw new Error('The matrix is singular, in the expression inv(' + core.toString(obj) + ').');
            }
        } else {
            throw new Error('The argument for function inv() must be a matrix, in the expression inv(' + core.toString(obj) + ').');
        }
        return mtx;
    }

    /**
     * Join the elements of an array using the indicated separator.
     * @param {array}    mtx - The array to join elements.
     * @param {string}   char - The separator character.
     * @return {string}  The string containing the parts of the array.
     */
    this.join = function(mtx, char) {
        return mtx.split(char);
    }

    /**
     * Returns the last position of one string in another.
     * @param {string}   str - The string containing the other one.
     * @param {string}   text - Search string.
     * @return {number}  The position of last occurrence of string in the other.
     */
    this.lastIndexOf = function(str, text) {
        return str.lastIndexOf(text);
    }

    /**
     * Returns the size of an object.
     * @param {string}   obj - Object to be measured.
     * @return {number}  Object size.
     */
    this.length = function(obj) {
        return obj.length;
    }

    /**
     * Creates a two-dimensional array (matrix).
     * @param {object}  obj - Object to fill the matrix cells.
     * @param {number}  rows - Number of rows in the matrix.
     * @param {number}  columns - Number of columns in the matrix.
     * @return {array}  A (rows x columns) matrix.
     */
    this.matrix = function(obj, rows, columns) {
        var mtx = [];
        if (rows > 1) {
            for (var i = 0; i < rows; i++) {
                var row = [];
                for (var j = 0; j < columns; j++) {
                    row.push(obj);
                }
                mtx.push(row);
            }
        } else {
            var row = [];
            for (var j = 0; j < columns; j++) {
                row.push(obj);
            }
            mtx = row;
        }
        return mtx;
    }

    /**
     * Creates a new instance of an object.
     * @param {object}   obj - The object that will be used as a template.
     * @param {object}   properties - The object properties.
     * @return {number}  A new instance of an object.
     */
    this.new = function(obj) {
        if (typeof properties == 'undefined') {
            var newObject = Object.create(obj);
        } else {
            var newObject = Object.create(obj, properties);
        }
        return newObject;
    }

    /**
     * Creates a unitary matrix.
     * @param {number}  rows - Number of rows in the matrix.
     * @param {number}  columns - Number of columns in the matrix.
     * @return {array}  A (rows x columns) matrix.
     */
    this.one = function(rows, columns) {
        return core.matrix(1, rows, columns);
    }

    /**
     * Opens or creates a database.
     * @param {string}   name - Database name.
     * @param {string}   version - Scheme version.
     * @param {string}   displayName -  The display name of the database.
     * @param {string}   estimatedSize - Estimated maximum size.
     * @return {object}  Reference to the open or created database.
     */
    this.openSQLDatabase = function(name, version, displayName, estimatedSize) {
        var db;

        try {
            db = openDatabase(name, version, displayName, estimatedSize);
        } catch (e) {
            system.log(e.message);
            throw new Error(e.message);
        }

        return db;
    }

    /**
     * Removes an object from the end of an array.
     * @param {array}   mtx - The array to join elements.
     * @param {object}  obj - The separator character.
     * @return {array}  The array with the object removed.
     */
    this.pop = function(mtx, obj) {
        return mtx.pop(obj);
    }

    /**
     * Insert an object at the end of an array.
     * @param {array}   mtx - The array to join elements.
     * @param {object}  obj - The separator character.
     * @return {array}  The array with the added object.
     */
    this.push = function(mtx, obj) {
        return mtx.push(obj);
    }

    /**
     * Returns the real part of a complex number.
     * @param {object}   obj - The complex number.
     * @return {number}  The real part of a complex number.
     */
    this.real = function(obj) {
        var num;
        if (typeof obj == 'object') {
            if ('imaginary' in obj) {
                num = obj.real;
            } else {
                throw new Error('The object is not a complex number, in the expression real(' + core.toString(obj) + ').');
            }
        } else {
            throw new Error('The object is not a complex number, in the expression real(' + core.toString(obj) + ').');
        }
        return num;
    }

    /**
     * Create a RegExp object to compare an expression with a specified pattern (regular expression).
     * @param {string}   pattern - The regular expression.
     * @param {string}   flags - Indicates the marks that can be added.
     * @return {object}  A RegExp object.
     */
    this.regExp = function(pattern, flags) {
        var regexp = new RegExp(pattern, flags);
        return regexp;
    }

    /**
     * Returns a new string with a specified number of copies of the string.
     * @param {object}   str - The object to convert to do string.
     * @param {number}   count - Number of copies.
     * @return {string}  A new string with a specified number of copies of the string.
     */
    this.repeat = function(str, count) {
        return str.repeat(count);
    }

    /**
     * Replaces one character string with another in a string.
     * @param {string}   str - The string containing the other one.
     * @param {string}   string1 - The string to search for.
     * @param {string}   string2 - The replacement string.
     * @return {string}  A new string.
     */
    this.replace = function(str, string1, string2) {
        return str.replace(string1, string2);
    }

    /**
     * Searches a string for a specified value.
     * @param {string}   str - The string containing the other one.
     * @param {string}   text - Search string.
     * @return {number}  The position of the match.
     */
    this.search = function(str, text) {
        return str.search(text);
    }

    /**
     * Insert an object at the beginning of an array.
     * @param {array}   mtx - The array to join elements.
     * @param {object}  obj - The separator character.
     * @return {array}  The array with the added object.
     */
    this.shift = function(mtx, obj) {
        return mtx.shift(obj);
    }

    /**
     * Return a part of a string or array.
     * @param {string}   obj - The string or array containing the other one.
     * @param {number}   start - The start position.
     * @param {number}   end - The final position.
     * @return {string}  The selected part of the string or array.
     */
    this.slice = function(obj, start, end) {
        if (typeof end != 'undefined') {
            return obj.slice(start, end);
        } else {
            return obj.slice(start);
        }
    }

    /**
     * Removes or replaces an object from the specified position in an array.
     * @param {array}   mtx - The array to remove elements.
     * @param {number}  pos - Position from which objects will be removed.
     * @param {number}  count - Number of objects to remove.
     * @param {object}  obj - Object to be inserted in the specified location.
     * @return {array}  The array with the objects removed.
     */
    this.splice = function(mtx, pos, count, obj) {
        if (typeof obj != 'undefined') {
            return mtx.splice(pos, count, obj);
        } else {
            return mtx.splice(pos, count);
        }
    }

    /**
     * Convert a string to an array, using the character indicated as a separator.
     * @param {string}   str - The string to slit.
     * @param {string}   char - The separator character.
     * @return {array}   The array containing the parts of the string.
     */
    this.split = function(str, char) {
        return str.split(char);
    }

    /**
     * Convert a CSV record to an array, using the character indicated as the column separator.
     * @param {string}   str - The string to slit.
     * @param {string}   separator - The separator characters.
     * @param {boolean}  allowRepeatChar - The separator character can be repeated (for formatting).
     * @param {boolean}  doEval - Run core.eval before adding the column to the record.
     * @return {array}   The array containing the parts of the CSV or NULL if the CSV record is not well formed.
     */
    this.splitCSV = function(str, separator, allowRepeatChar, doEval) {
        var record = [];
        var column = '';
        var previous = '';
        var insideAString = false;
        var openParentheses = false;
        var closedParentheses = false;
        var openBrackets = false;
        var closedBrackets = false;
        var openBraces = false;
        var closedBraces = false;
        var i = 0;
        var j = 0;
        if (typeof separator == 'undefined') {
            separator = ',';
        }
        if (typeof allowRepeatChar == 'undefined') {
            var allowRepeatChar = false;
        }
        if (typeof doEval == 'undefined') {
            var doEval = false;
        }
        while (j < str.length) {
            c = str[j];
            if (insideAString) {
                if ((c == '"') && (previous != '\\')) {
                    insideAString = !insideAString;
                    if (doEval) {
                        column += '"';
                    }
                } else {
                    column += c;
                }
            } else {
                if ((c == '"') && (previous != '\\')) {
                    insideAString = !insideAString;
                    if (doEval) {
                        column += '"';
                    }
                } else {
                    if (c == '(') {
                        openParentheses++;
                    } else if (c == ')') {
                        closedParentheses++;
                    }
                    if (c == '[') {
                        openBrackets++;
                    } else if (c == ']') {
                        closedBrackets++;
                    }
                    if (c == '{') {
                        openBraces++;
                    } else if (c == '}') {
                        closedBraces++;
                    }

                    if (openParentheses > 0) {
                        if (openParentheses != closedParentheses) {
                            column += c;
                        } else {
                            openParentheses = 0;
                            closedParentheses = 0;
                        }
                    }
                    if (openBrackets > 0) {
                        if (openBrackets != closedBrackets) {
                            column += c;
                        } else {
                            openBrackets = 0;
                            closedBrackets = 0;
                        }
                    }
                    if (openBraces > 0) {
                        if (openBraces != closedBraces) {
                            column += c;
                        } else {
                            openBraces = 0;
                            closedBraces = 0;
                        }
                    }

                    if ((openParentheses == 0) && (openBrackets == 0) && (openBraces == 0)) {
                        if (separator.includes(c)) {
                            if (allowRepeatChar) {
                                while (separator.includes(str[j])) {
                                    if (j < str.length) {
                                        j++;
                                    }
                                    if (j == str.length) {
                                        break;
                                    }
                                }
                                j--;
                            }
                            if (doEval) {
                                record[i] = core.eval(column);
                            } else {
                                record[i] = column;
                            }
                            column = '';
                            i++;
                        } else {
                            column += c;
                        }
                    }
                }
            }
            previous = c;
            j++;
        }
        if (doEval) {
            record[i] = core.eval(column);
        } else {
            record[i] = column;
        }
        return record;
    }

    /**
     * Return a part of a string.
     * @param {string}   str - The string containing the other one.
     * @param {number}   start - The start position.
     * @param {number}   size - The the size of the slice.
     * @return {string}  The selected part of the string.
     */
    this.substr = function(str, start, size) {
        return str.substr(start, size);
    }

    /**
     * Tests a script, checking if the result of its execution corresponds to the expected result, considering the specified tolerance.
     * @param {string}    _script - The script to be evaluated.
     * @param {number}    _times - Number of times the test must be repeated.
     * @param {number}    _value - Expected value.
     * @param {number}    _tolerance - Tolerance.
     * @param {string}    _catchScript - Script to be evaluated if the test fails.
     * @return {boolean}  True if the test was successful or false, otherwise.
     */
    this.testScript = function(_script, _times, _value, _tolerance, _catchScript) {
        if (typeof _times == 'undefined') {
            _times = 1;
        }
        if (typeof _tolerance == 'undefined') {
            _tolerance = 0;
        }
        var _successfulTest = true;
        var _i = 0;
        while (_i < _times) {
            this.testResult.obtained = eval(_script);
            if (typeof _value != 'undefined') {
                if (_tolerance > 0) {
                    if ((typeof this.testResult.obtained == 'number') && (typeof _value == 'number')) {
                        if (!((this.testResult.obtained >= (_value - _tolerance)) && (this.testResult.obtained <= (_value + _tolerance)))) {
                            this.testResult.expected = _value;
                            _successfulTest = false;
                            if (typeof _catchScript != 'undefined') {
                                eval(_catchScript);
                            }
                            break;
                        }
                    } else {
                        throw new Error('The test statement only supports tolerance with numeric values.');
                    }
                } else {
                    if (!core.equal(this.testResult.obtained, _value)) {
                        this.testResult.expected = _value;
                        _successfulTest = false;
                        if (typeof _catchScript != 'undefined') {
                            eval(_catchScript);
                        }
                        break;
                    }
                }
            }
            _i++;
        }
        return _successfulTest;
    }

    /**
     * Converts a string to lower case.
     * @param {string}   text - The string to convert.
     * @return {string}  A new string.
     */
    this.toLowerCase = function(text) {
        return text.toLowerCase();
    }

    /**
     * Converts a string representing a number to a binary number.
     * @param {string}   text - The string representing a number.
     * @return {number}  The string coverted to number.
     */
    this.toNumber = function(text) {
        var num;
        if (core.type(text) == 'string') {
            if (text.includes('i')) {
                var compiler = new MaiaCompiler();
                num = JSON.parse(compiler.parseComplexNumber(text));
            } else {
                num = Number(text);
            }
        } else if (core.type(text) == 'number') {
            num = text;
        }
        return num;
    }

    /**
     * Converts an objecto to string.
     * @param {object}   obj - The object to convert to do string.
     * @param {number}   base - Numerical base for conversion.
     * @return {string}  The object coverted for string.
     */
    this.toString = function(obj, base) {
        var str = '';
        if (typeof obj == 'object') {
            if ('imaginary' in obj) {
                var signal = Math.sign(obj.imaginary) > 0 ? '+' : '-';
                str = (obj.real).toString() + signal + Math.abs(obj.imaginary).toString() + '*i';
            } else {
                str = JSON.stringify(obj);
            }
        } else {
            if (typeof base != 'undefined') {
                str = obj.toString(base);
            } else {
                str = obj.toString();
            }
        }
        return str;
    }

    /**
     * Converts a string to uppercase.
     * @param {string}   text - The string to convert.
     * @return {string}  A new string.
     */
    this.toUpperCase = function(text) {
        return text.toUpperCase();
    }

    /**
     * Removes characters from the beginning and end of a string.
     * @param {string}   str - The string to be trimmed
     * @param {string}   chars - The characters to remove.
     * @return {string}  A new string.
     */
    this.trim = function(str, chars) {
        if (typeof chars == 'undefined') {
            return str.trim();
        }
        if (chars == ']') {
            var chars = '\\]';
        }
        if (chars == '\\') {
            var chars = '\\\\';
        }
        return str.replace(new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g'), '');
    }

    /**
     * Removes characters from the beginning and end of a string.
     * @param {string}   str - The string to be trimmed
     * @param {string}   chars - The characters to remove.
     * @return {string}  A new string.
     */
    this.trimLeft = function(str, chars) {
        if (typeof chars == 'undefined') {
            return str.trim();
        }
        if (chars == ']') {
            var chars = '\\]';
        }
        if (chars == '\\') {
            var chars = '\\\\';
        }
        return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
    }

    /**
     * Removes characters from the beginning and end of a string.
     * @param {string}   str - The string to be trimmed
     * @param {string}   chars - The characters to remove.
     * @return {string}  A new string.
     */
    this.trimRight = function(str, chars) {
        if (typeof chars == 'undefined') {
            return str.trim();
        }
        if (chars == ']') {
            var chars = '\\]';
        }
        if (chars == '\\') {
            var chars = '\\\\';
        }
        return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
    }

    /**
     * Returns the class of a MaiaScript object.
     * @param {object}   obj - A MaiaScript object .
     * @return {string}  The class of a MaiaScript object.
     */
    this.type = function(obj) {
        var classType;
        if (typeof obj == 'boolean') {
            classType = 'boolean';
        } else if (typeof obj == 'function') {
            classType = 'function';
        } else if (typeof obj == 'number') {
            classType = 'number';
        } else if (typeof obj == 'string') {
            classType = 'string';
        } else if (typeof obj == 'object') {
            if (Array.isArray(obj)) {
                classType = 'matrix';
            } else {
                if ('imaginary' in obj) {
                    classType = 'complex';
                } else {
                    classType = 'object';
                }
            }
        } else if (typeof obj == 'undefined') {
            classType = 'undefined';
        }
        return classType;
    }

    /**
     * Removes an object from the beginning of an array.
     * @param {array}   mtx - The array to join elements.
     * @param {object}  obj - The separator character.
     * @return {array}  The array with the object removed.
     */
    this.unshift = function(mtx, obj) {
        return mtx.unshift(obj);
    }

    /**
     * Creates a zero matrix.
     * @param {number}  rows - Number of rows in the matrix.
     * @param {number}  columns - Number of columns in the matrix.
     * @return {array}  A (rows x columns) matrix.
     */
    this.zero = function(rows, columns) {
        return core.matrix(0, rows, columns);
    }

    /*
     * The following functions are used internally by the MaiaScript compiler.
     */

    /**
     * Performs the logical OR operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.logicalOR = function(left, right) {
        return left || right;
    }

    /**
     * Performs the logical XOR operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.logicalXOR = function(left, right) {
        return left ? !right : right;
    }

    /**
     * Performs the logical AND operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.logicalAND = function(left, right) {
        return left && right;
    }

    /**
     * Performs the binary OR operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.bitwiseOR = function(left, right) {
        return left | right;
    }

    /**
     * Performs the binary XOR operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.bitwiseXOR = function(left, right) {
        return left ^ right;
    }

    /**
     * Performs the binary AND operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.bitwiseAND = function(left, right) {
        return left & right;
    }

    /**
     * Returns TRUE if two objects are equal.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.equal = function(left, right) {
        var res;

        Array.prototype.equals = function(array) {
            if (!array) {
                return false;
            }
            if (this.length != array.length) {
                return false;
            }
            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i] instanceof Array && array[i] instanceof Array) {
                    if (!this[i].equals(array[i])) {
                        return false;
                    }
                } else if (this[i] != array[i]) {
                    return false;
                }
            }
            return true;
        }
        Object.defineProperty(Array.prototype, "equals", {
            enumerable: false
        });

        isEquivalent = function(a, b) {
            var aProperties = Object.getOwnPropertyNames(a);
            var aProperties = Object.getOwnPropertyNames(b);
            if (aProperties.length != aProperties.length) {
                return false;
            }
            for (var i = 0; i < aProperties.length; i++) {
                var propertiesName = aProperties[i];
                if (a[propertiesName] !== b[propertiesName]) {
                    return false;
                }
            }
            return true;
        }

        if (Array.isArray(left) && Array.isArray(right)) {
            res = left.equals(right);
        } else {
            if ((typeof left == 'object') && (typeof right == 'object')) {
                res = isEquivalent(left, right);
            } else {
                res = left == right;
            }
        }
        return res;
    }

    /**
     * Returns TRUE if two objects are different.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.different = function(left, right) {
        return left != right;
    }

    /**
     * Returns TRUE if the object on the left is smaller than the object on the right.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.LT = function(left, right) {
        return left < right;
    }

    /**
     * Returns TRUE if the object on the left is less than or equal to the object on the right.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.LE = function(left, right) {
        return left <= right;
    }

    /**
     * Returns TRUE if the object on the left is greater than or equal to the object on the right.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.GE = function(left, right) {
        return left >= right;
    }

    /**
     * Returns TRUE if the object on the left is greater than the object on the right.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.GT = function(left, right) {
        return left > right;
    }

    /**
     * Performs a left shift operation.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.leftShift = function(left, right) {
        return left << right;
    }

    /**
     * Performs a left shift operation.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.rightShift = function(left, right) {
        return left >> right;
    }

    /**
     * Add two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.add = function(left, right) {
        var res;
        if (core.type(left) == 'complex') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left.real) + core.toNumber(right.real);
                var img = core.toNumber(left.imaginary) + core.toNumber(right.imaginary);
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                var real = core.toNumber(left.real) + core.toNumber(right);
                var img = core.toNumber(left.imaginary);
                res = core.complex(real, img);
            } else {
                throw new Error('Invalid operand for operator "+", in the expression ' + core.toString(left) + ' + ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'number') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left) + core.toNumber(right.real);
                var img = core.toNumber(right.imaginary);
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                res = left + right;
            } else {
                throw new Error('Invalid operand for operator "+", in the expression ' + core.toString(left) + ' + ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'matrix') {
            if (core.type(right) == 'matrix') {
                res = [];
                var dimLeft = core.dim(left);
                var dimRight = core.dim(right);
                if ((dimLeft.length > 1) && (dimRight.length > 1)) {
                    if ((dimLeft[0] == dimRight[0]) && (dimLeft[1] == dimRight[1])) {
                        var rows = dimLeft[0];
                        var columns = dimLeft[1];
                        for (var i = 0; i < rows; i++) {
                            var row = [];
                            for (var j = 0; j < columns; j++) {
                                row.push(left[i][j] + right[i][j]);
                            }
                            res.push(row);
                        }
                    } else {
                        throw new Error('Operand invalid for operator "+", in the expression ' + core.toString(left) + ' + ' + core.toString(right) + '. The matrices must have the same dimensions.');
                    }
                } else {
                    if (dimLeft[0] == dimRight[0]) {
                        var columns = dimLeft[0];
                        var row = [];
                        for (var i = 0; i < columns; i++) {
                            row.push(left[i] + right[i]);
                        }
                        res = row;
                    } else {
                        throw new Error('Operand invalid for operator "+", in the expression ' + core.toString(left) + ' + ' + core.toString(right) + '. The matrices must have the same dimensions.');
                    }
                }
            } else {
                throw new Error('Invalid operand for operator "+", in the expression ' + core.toString(left) + ' + ' + core.toString(right) + '.');
            }
        } else {
            res = left + right;
        }
        return res;
    }

    /**
     * Subtracts two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.sub = function(left, right) {
        var res;
        if (core.type(left) == 'complex') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left.real) - core.toNumber(right.real);
                var img = core.toNumber(left.imaginary) - core.toNumber(right.imaginary);
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                var real = core.toNumber(left.real) - core.toNumber(right);
                var img = core.toNumber(left.imaginary);
                res = core.complex(real, img);
            } else {
                throw new Error('Invalid operand for operator "-", in the expression ' + core.toString(left) + ' - ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'number') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left) - core.toNumber(right.real);
                var img = core.toNumber(right.imaginary);
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                res = left - right;
            } else {
                throw new Error('Invalid operand for operator "-", in the expression ' + core.toString(left) + ' - ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'matrix') {
            if (core.type(right) == 'matrix') {
                res = [];
                var dimLeft = core.dim(left);
                var dimRight = core.dim(right);
                if ((dimLeft.length > 1) && (dimRight.length > 1)) {
                    if ((dimLeft[0] == dimRight[0]) && (dimLeft[1] == dimRight[1])) {
                        var rows = dimLeft[0];
                        var columns = dimLeft[1];
                        for (var i = 0; i < rows; i++) {
                            var row = [];
                            for (var j = 0; j < columns; j++) {
                                row.push(left[i][j] - right[i][j]);
                            }
                            res.push(row);
                        }
                    } else {
                        throw new Error('Operand invalid for operator "-", in the expression ' + core.toString(left) + ' - ' + core.toString(right) + '. The matrices must have the same dimensions.');
                    }
                } else {
                    if (dimLeft[0] == dimRight[0]) {
                        var columns = dimLeft[0];
                        var row = [];
                        for (var i = 0; i < columns; i++) {
                            row.push(left[i] - right[i]);
                        }
                        res = row;
                    } else {
                        throw new Error('Operand invalid for operator "-", in the expression ' + core.toString(left) + ' - ' + core.toString(right) + '. The matrices must have the same dimensions.');
                    }
                }
            } else {
                throw new Error('Invalid operand for operator "-", in the expression ' + core.toString(left) + ' - ' + core.toString(right) + '.');
            }
        } else {
            res = left - right;
        }
        return res;
    }

    /**
     * Performs a power operation between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.power = function(left, right) {
        // r=abs(a+b*i)=sqrt(a*a+b*b)
        // t=arg(a+b*i)=atan(b/a)
        // pow(a+b*i,n)=pow(r,n)*cos(n*t)+i*pow(r,n)*sin(n*t)
        var res;
        if (core.type(left) == 'complex') {
            if (core.type(right) == 'number') {
                var r = Math.sqrt(core.toNumber(left.real) * core.toNumber(left.real) + core.toNumber(left.imaginary) * core.toNumber(left.imaginary));
                var a = Math.asin(core.toNumber(left.imaginary) / r);
                var real = Math.pow(r, right) * Math.cos(a * right);
                var img = Math.pow(r, right) * Math.sin(a * right);
                res = core.complex(real, img);
            } else {
                throw new Error('Invalid operand for operator "^", in the expression ' + core.toString(left) + ' ^ ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'matrix') {
            if (core.type(right) == 'number') {
                var dimLeft = core.dim(left);
                if (right == -1) {
                    res = core.inv(left);
                } else if (right == 0) {
                    res = core.one(dimLeft[0], dimLeft[1]);
                } else if (right == 1) {
                    res = left;
                } else if (right > 1) {
                    res = 1;
                    for (var i = 0; i < right; i++) {
                        res = core.mul(res, left);
                    }
                }
            } else {
                throw new Error('Invalid operand for operator "^", in the expression ' + core.toString(left) + ' ^ ' + core.toString(right) + '.');
            }
        } else {
            res = Math.pow(left, right);
        }
        return res;
    }

    /**
     * Multiplies two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.mul = function(left, right) {
        var res;
        if (core.type(left) == 'complex') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left.real) * core.toNumber(right.real) - core.toNumber(left.imaginary) * core.toNumber(right.imaginary);
                var img = core.toNumber(left.real) * core.toNumber(right.imaginary) + core.toNumber(left.imaginary) * core.toNumber(right.real);
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                var real = core.toNumber(left.real) * core.toNumber(right);
                var img = core.toNumber(left.imaginary);
                res = core.complex(real, img);
            } else {
                throw new Error('Invalid operand for operator "*", in the expression ' + core.toString(left) + ' * ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'number') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left) * core.toNumber(right.real);
                var img = core.toNumber(right.imaginary);
                res = core.complex(real, img);
            } else if (core.type(right) == 'matrix') {
                var dimRight = core.dim(right);
                res = core.matrix(0, dimRight[0], dimRight[1]);
                for (var i = 0; i < dimRight[0]; i++) {
                    for (var j = 0; j < dimRight[1]; j++) {
                        res[i][j] = left * right[i][j];
                    }
                }
            } else if (core.type(right) == 'number') {
                res = left * right;
            } else {
                throw new Error('Invalid operand for operator "*", in the expression ' + core.toString(left) + ' * ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'matrix') {
            if (core.type(right) == 'matrix') {
                var dimLeft = core.dim(left);
                var dimRight = core.dim(right);
                res = core.matrix(0, dimLeft[0], dimRight[1]);
                if (dimLeft[1] == dimRight[0]) {
                    for (var i = 0; i < dimLeft[0]; i++) {
                        for (var j = 0; j < dimRight[1]; j++) {
                            for (var k = 0; k < dimRight[1]; k++) {
                                res[i][j] = res[i][j] + left[i][k] * right[k][j];
                            }
                        }
                    }
                } else {
                    throw new Error('Operand invalid for operator "*", in the expression ' + core.toString(left) + ' * ' + core.toString(right) + '. The matrices must have compatible dimensions.');
                }
            } else if (core.type(right) == 'number') {
                dimLeft = core.dim(left);
                res = core.matrix(0, dimLeft[0], dimLeft[1]);
                for (var i = 0; i < dimLeft[0]; i++) {
                    for (var j = 0; j < dimLeft[1]; j++) {
                        res[i][j] = left[i][j] * right;
                    }
                }
            } else {
                throw new Error('Invalid operand for operator "*", in the expression ' + core.toString(left) + ' * ' + core.toString(right) + '.');
            }
        } else {
            res = left * right;
        }
        return res;
    }

    /**
     * Divide two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.div = function(left, right) {
        // (a+b*i)/(c+d*i)=(a*c+b*d)/(c*c+d*d)+i*(b*c-a*d)/(c*c+d*d)
        var res;
        if (core.type(left) == 'complex') {
            if (core.type(right) == 'complex') {
                var real = (core.toNumber(left.real) * core.toNumber(right.real) + core.toNumber(left.imaginary) * core.toNumber(right.imaginary)) / (core.toNumber(right.real) * core.toNumber(right.real) + core.toNumber(right.imaginary) * core.toNumber(right.imaginary));
                var img = (core.toNumber(left.imaginary) * core.toNumber(right.real) - core.toNumber(left.real) * core.toNumber(right.imaginary)) / (core.toNumber(right.real) * core.toNumber(right.real) + core.toNumber(right.imaginary) * core.toNumber(right.imaginary));
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                var real = core.toNumber(left.real) / core.toNumber(right);
                var img = core.toNumber(left.imaginary);
                res = core.complex(real, img);
            } else {
                throw new Error('Invalid operand for operator "/", in the expression ' + core.toString(left) + ' / ' + core.toString(right) + '.');
            }
        } else if (core.type(left) == 'number') {
            if (core.type(right) == 'complex') {
                var real = core.toNumber(left) / core.toNumber(right.real);
                var img = core.toNumber(right.imaginary);
                res = core.complex(real, img);
            } else if (core.type(right) == 'number') {
                res = left / right;
            } else {
                throw new Error('Invalid operand for operator "/", in the expression ' + core.toString(left) + ' / ' + core.toString(right) + '.');
            }
        } else {
            res = left / right;
        }
        return res;
    }

    /**
     * Calculates the rest of the division between two objects.
     * @param {object}   left - The left operand.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.mod = function(left, right) {
        return left % right;
    }

    /**
     * Performs a binary NOT operation.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.bitwiseNot = function(right) {
        return ~right;
    }

    /**
     * Performs a logical NOT operation.
     * @param {object}   right - The right operand.
     * @return {string}  An string represening the result of the operation.
     */
    this.logicalNot = function(right) {
        return !right;
    }
}

core = new Core();/**
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
 * MaiaScript system library.
 * @class
 */
function System() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Convert Unicode caracters to Latin1.
     * @param {string}   str - Unicode string.
     * @return {string}  The Unicode string converted to Latin1.
     */
    this.base64EncodeUnicode = function(str) {
        // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters, 
        // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
        utf8Bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        });
        return btoa(utf8Bytes);
    }

    /**
     * Download a file.
     * @param {string}  fileName - File name.
     * @param {string}  fileData - Data to save.
     * @param {string}  mimeType - Mime type (default: 'text/plain').
     * @return          The file is downloaded.
     */
    this.downloadFile = function(fileName, fileData, mimeType) {
        if (typeof mimeType == 'undefined') {
            var mimeType = 'text/plain';
        }
        var uri = 'data:' + mimeType + ';charset=utf-8;base64,' + this.base64EncodeUnicode(fileData);
        var downloadLink = document.createElement('a');
        downloadLink.href = uri;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    /**
     * Displays a message in the console.
     * @param {string}  text - Text to display.
     */
    this.log = function(text)
    {
        console.log(text);
    }

    /**
     * Displays a message in the console.
     * @param {string}  text - Text to display.
     */
    this.print = function(text)
    {
        this.log(text);
    }

   /**
     * Displays a formated string based on format specifiers passed to the function.
     * @param {string}   fmt - A string containing format specifiers.
     * @param {object}   arguments - Objects to be formatted.
     * @return {string}  A formatted string based on format specifiers passed to the function.
     */
    this.printf = function(fmt)
    {
        this.log(string.sprintFormat(string.sprintfParse(fmt), arguments));
    }

    /**
     * Displays a message on the console and advances the cursor to the next line.
     * @param {string}  text - Text to display.
     */
    this.println = function(text)
    {
        this.log(text + '\r\n');
    }

    /**
     * Reads data from browser storage.
     * @param {object}  obj - Object to store data: {'key': value, 'key': value, ...}
     * @param {object}  callBack - Callback function to call after access to storage.
     * @return          Data from storage.
     */
    this.readDataFromStorage = function(obj, callBack) {
        for (key in obj) {
            if (typeof localStorage.getItem(key) != 'undefined') {
                obj[key] = localStorage.getItem(key);
            } else {
                obj[key] = {};
            }
        }
        if (typeof callBack != 'undefined') {
            callBack();
        }
    }

    /**
     * Imports a native module.
     * @param {string}   moduleName - Module name.
     * @return {object}  The native module reference.
     */
    this.require = function(moduleName)
    {
        var moduleReference;
        if (typeof process !== 'undefined') {
            var moduleReference = require(moduleName);
        }
        return moduleReference;
    }

    /**
     * Displays a message in a dialog box asking for confirmation.
     * @param {string}   text - Text to display.
     * @return {string}  User choice.
     */
    this.showConfirmDialog = function(text)
    {
        return confirm(text);
    }

    /**
     * Displays a message in a dialog box asking you to enter text.
     * @param {string}   text - Text to display.
     * @param {string}   defaultText - Default text to display in the text box.
     * @return {string}  User-typed text.
     */
    this.showInputDialog = function(text, defaultText = '')
    {
        return prompt(text, defaultText);
    }

    /**
     * Displays a message in a dialog box.
     * @param {string}  text - Text to display.
     */
    this.showMessageDialog = function(text)
    {
        alert(text);
    }

    /**
     * Load a MaiaScript module.
     * @param {string}   inputFile - Module name.
     * @return {object}  The MaiaScript module loaded.
     */
    this.source = function(inputFile)
    {
        if (typeof process !== 'undefined') {
            var fs = require('fs');
            var readTextFile = fs.readFileSync;

            function getXml(data) {
                compiledCode.xml += data;
            }

            function read(input) {
                if (/^{.*}$/.test(input)) {
                    return input.substring(1, input.length - 1);
                } else {
                    var content = readTextFile(input, 'utf-8');
                    return content.length > 0 && content.charCodeAt(0) == 0xFEFF ? content.substring(1) : content;
                }
            }

            if (typeof inputFile != 'undefined') {
                var code = read(String(inputFile));
                core.eval(code, global);
            } else {
                throw new Error('Invalid argument for function source. Argument must be a string.');
            }
        }
    }

    /**
     * Upload a file.
     * @param {object}    fileObject - File data structure.
     * @param {function}  callBack - callback to be called when the file is loaded.
     * @return            The file is uploaded.
     */
    this.uploadFile = function(fileObject, callBack) {
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
            var file = e.target.files[0]; 
            fileObject.fullFileName = file.name;
            fileObject.fileName = fileObject.fullFileName.split('.').shift();
            fileObject.fileExtension = fileObject.fullFileName.split('.').pop();
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
                fileObject.fileData = readerEvent.target.result;
                if (typeof callBack != 'undefined') {
                    callBack(fileObject);
                }
            }
        }
        input.click();
    }

    /**
     * Writes data to storage.
     * @param {object}  obj - Object to store data: {'key': value, 'key': value, ...}
     * @param {object}  callBack - Callback function to call after access to storage.
     * @return          Data written to storage.
     */
    this.writeDataToStorage = function(obj, callBack) {
        for (key in obj) {
            if (typeof obj[key] != 'undefined') {
                localStorage.setItem(key, obj[key]);
            } else {
                localStorage.setItem(key, {});
            }
        }
        if (typeof callBack != 'undefined') {
            callBack();
        }
    }
}

system = new System();
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
 * MaiaScript math library.
 * @class
 */
function Mathematics() {
    this.E       = Math.E;
    this.PI      = Math.PI;
    this.SQRT2   = Math.SQRT2;
    this.SQRT1_2 = Math.SQRT1_2;
    this.LN2     = Math.LN2;
    this.LN10    = Math.LN10;
    this.LOG2E   = Math.LOG2E;
    this.LOG10E  = Math.LOG10E;

    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

   /*
    * Complex numbers functions:
    *
    * (a+b*i)/(c+d*i)=(a*c+b*d)/(c*c+d*d)+i*(b*c-a*d)/(c*c+d*d)
    *
    * cos(a+b*i)=cos(a)*cosh(b)-i*sin(a)*sinh(b)
    * sin(a+b*i)=sin(a)*cosh(b)+i*cos(a)*sinh(b)
    * tan(a+b*i)=sin(a+b*i)/cos(a+b*i)
    *
    * cosh(a+b*i)=cosh(a)*cos(b)+i*sinh(a)sin(b)
    * sinh(a+b*i)=sinh(a)*cos(b)+i*cosh(a)sin(b)
    * tanh(a+b*i)=sinh(a+b*i)/cosh(a+b*i)
    *
    * r=abs(a+b*i)=sqrt(a*a+b*b)
    * t=arg(a+b*i)=atan(b/a)
    *
    * exp(a+b*i)=exp(a)*cos(b)+i*sin(b)
    * log(a+b*i)=log(r)+i*t
    *
    * pow(a+b*i,n)=pow(r,n)*cos(n*t)+i*pow(r,n)*sin(n*t)
    * sqrt(a+b*i)=sqrt(r)*cos(t/2)+i*sqrt(r)*sin(t/2)
    *
    */

    /**
     * Returns the positive value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The positive value of x.
     */
    this.abs = function(x)
    {
        var y;
        if (core.type(x) == 'complex') {
            y = Math.sqrt(x.real * x.real + x.imaginary * x.imaginary);
        } else {
            y = Math.abs(x);
        }
        return y;
    }

    /**
     * Returns the arccosine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The arccosine value of x.
     */
    this.acos = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.acos(x);
        }
        return y;
    }

    /**
     * Returns the hyperbolic arccosine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The hyperbolic arccosine value of x.
     */
    this.acosh = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.acosh(x);
        }
        return y;
    }
    /**
     * Returns the complex number argument.
     * @param {object}   x - Value of X.
     * @return {number}  The complex number argument.
     */
    this.arg = function(x)
    {
        // t=arg(a+b*i)=atan(b/a)
        var y;
        if (core.type(x) == 'complex') {
            y = Math.atan(x.imaginary / x.real);
        }
        return y;
    }

    /**
     * Returns the arcsine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The arcsine value of x.
     */
    this.asin = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.asin(x);
        }
        return y;
    }

    /**
     * Returns the hyperbolic arcsine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The hyperbolic arcsine value of x.
     */
    this.asinh = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.asinh(x);
        }
        return y;
    }

    /**
     * Returns the arctangent value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The arctangent value of x.
     */
    this.atan = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.atan(x);
        }
        return y;
    }

    /**
     * Returns the arctangent of the quotient of x and y.
     * @param {object}   x - Value of X.
     * @param {object}   y - Value of Y.
     * @return {number}  The arctangent value of x.
     */
    this.atan2 = function(x, y)
    {
        var z;
        if (core.type(x) == 'number') {
            z = Math.atan2(x, y);
        }
        return z;
    }

    /**
     * Returns the hyperbolic arctangent value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The hyperbolic arctangent value of x.
     */
    this.atanh = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.atanh(x);
        }
        return y;
    }

    /**
     * Returns the cubic root of x.
     * @param {object}   x - Value of X.
     * @return {number}  The cubic root of x.
     */
    this.cbrt = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.cbrt(x);
        }
        return y;
    }

    /**
     * Returns the cosine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The cosine value of x.
     */
    this.cos = function(x)
    {
        // cos(a+b*i)=cos(a)*cosh(b)-i*sin(a)*sinh(b)
        var y;
        if (core.type(x) == 'complex') {
            y = core.complex(Math.cos(x.real) * Math.cosh(x.imaginary), Math.sin(x.real) * Math.sinh(x.imaginary));
        } else {
            y = Math.cos(x);
        }
        return y;
    }

    /**
     * Returns the hyperbolic cosine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The hyperbolic cosine value of x.
     */
    this.cosh = function(x)
    {
        // cosh(a+b*i)=cosh(a)*cos(b)+i*sinh(a)sin(b)
        var y;
        if (core.type(x) == 'complex') {
            y = core.complex(Math.cosh(x.real) * Math.cos(x.imaginary), Math.sinh(x.real) * Math.sin(x.imaginary));
        } else {
            y = Math.cosh(x);
        }
        return y;
    }

    /**
     * Returns the value of x rounded up.
     * @param {object}   x - Value of X.
     * @return {number}  Value of x rounded up.
     */
    this.ceil = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.ceil(x);
        }
        return y;
    }

    /**
     * Converts radians to decimal degrees.
     * @param {object}   x - Value of X.
     * @return {number}  Value of x in decimal degrees.
     */
    this.deg = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = x * (180 / Math.PI);;
        }
        return y;
    }

    /**
     * Returns the value of E^x
     * @param {object}   x - Value of X.
     * @return {number}  Value of E^x.
     */
    this.exp = function(x)
    {
        // exp(a+b*i)=exp(a)*cos(b)+i*sin(b)
        var y;
        if (core.type(x) == 'complex') {
            y = core.complex(Math.exp(x.real) * Math.cos(x.imaginary), Math.sin(x.imaginary));
        } else {
            y = Math.exp(x);
        }
        return y;
    }

    /**
     * Returns the value of x rounded down.
     * @param {object}   x - Value of X.
     * @return {number}  Value of x rounded down.
     */
    this.floor = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.floor(x);
        }
        return y;
    }

    /**
     * Returns the value of the natural logarithm of x.
     * @param {object}   x - Value of X.
     * @return {number}  The value of the natural logarithm of x.
     */
    this.log = function(x)
    {
        // r=abs(a+b*i)=sqrt(a*a+b*b)
        // t=arg(a+b*i)=atan(b/a)
        // log(a+b*i)=log(r)+i*t
        var y;
        if (core.type(x) == 'complex') {
            var r = this.abs(x);
            var t = this.arg(x);
            y = core.complex(Math.log(r), t);
        } else {
            y = Math.log(x);
        }
        return y;
    }

    /**
     * Returns the largest value between x and y.
     * @param {object}   x - Value of X.
     * @param {object}   y - Value of y.
     * @return {number}  The largest value between x and y.
     */
    this.max = function(x, y)
    {
        var y;
        if ((core.type(x) == 'number') && (core.type(y) == 'number')) {
            y = Math.max(x, y);
        }
        return y;
    }

    /**
     * Returns the smallest value between x and y.
     * @param {object}   x - Value of X.
     * @param {object}   y - Value of y.
     * @return {number}  The smallest value between x and y.
     */
    this.min = function(x, y)
    {
        var y;
        if ((core.type(x) == 'number') && (core.type(y) == 'number')) {
            y = Math.min(x, y);
        }
        return y;
    }

    /**
     * Returns the value of x to the power of y.
     * @param {object}   x - Value of X.
     * @param {object}   y - Value of y.
     * @return {number}  Value of x to the power of y.
     */
    this.pow = function(x, y)
    {
        var z = core.power(x, y);
        return z;
    }

    /**
     * Converts decimal degrees to radians.
     * @param {object}   x - Value of X.
     * @return {number}  Value of x in radians.
     */
    this.rad = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = x * (Math.PI / 180);;
        }
        return y;
    }

    /**
     * Returns a random number between 0 and 1.
     * @return {number}  A random number.
     */
    this.random = function()
    {
        var y = Math.random();
        return y;
    }

    /**
     * Returns the value of x rounding to the nearest value.
     * @param {object}   x - Value of X.
     * @return {number}  Value of x rounding to the nearest value.
     */
    this.round = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.round(x);
        }
        return y;
    }

    /**
     * Returns the sine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The sine value of x.
     */
    this.sin = function(x)
    {
        // sin(a+b*i)=sin(a)*cosh(b)+i*cos(a)*sinh(b)
        var y;
        if (core.type(x) == 'complex') {
            y = core.complex(Math.sin(x.real) * Math.cosh(x.imaginary), Math.cos(x.real) * Math.sinh(x.imaginary));
        } else {
            y = Math.sin(x);
        }
        return y;
    }

    /**
     * Returns the hyperbolic sine value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The hyperbolic sine value of x.
     */
    this.sinh = function(x)
    {
        // sinh(a+b*i)=sinh(a)*cos(b)+i*cosh(a)sin(b)
        var y;
        if (core.type(x) == 'complex') {
            y = core.complex(Math.sinh(x.real) * Math.cos(x.imaginary), Math.cosh(x.real) * Math.sin(x.imaginary));
        } else {
            y = Math.sinh(x);
        }
        return y;
    }

    /**
     * Returns the square root of x.
     * @param {object}   x - Value of X.
     * @return {number}  Value of the square root of x.
     */
    this.sqrt = function(x)
    {
        // r=abs(a+b*i)=sqrt(a*a+b*b)
        // t=arg(a+b*i)=atan(b/a)
        // sqrt(a+b*i)=sqrt(r)*cos(t/2)+i*sqrt(r)*sin(t/2)
        var y;
        if (core.type(x) == 'complex') {
            var r = this.abs(x);
            var t = this.arg(x);
            y = core.complex(Math.sqrt(r) * Math.cos(t / 2), Math.sqrt(r) * Math.sin(t / 2));
        } else {
            y = Math.sqrt(x);
        }
        return y;
    }

    /**
     * Returns the tangent value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The tangent value of x.
     */
    this.tan = function(x)
    {
        // tan(a+b*i)=sin(a+b*i)/cos(a+b*i)
        var y;
        if (core.type(x) == 'complex') {
            y = core.div(this.sin(x), this.cos(x));
        } else {
            y = Math.tan(x);
        }
        return y;
    }

    /**
     * Returns the hyperbolic tangent value of x.
     * @param {object}   x - Value of X.
     * @return {number}  The hyperbolic tangent value of x.
     */
    this.tanh = function(x)
    {
        // tanh(a+b*i)=sinh(a+b*i)/cosh(a+b*i)
        var y;
        if (core.type(x) == 'complex') {
            y = core.div(this.sinh(x), this.cosh(x));
        } else {
            y = Math.tanh(x);
        }
        return y;
    }

    /**
     * Returns the integer part of a number.
     * @param {object}   x - Value of X.
     * @return {number}  The integer part of a number
     */
    this.trunc = function(x)
    {
        var y;
        if (core.type(x) == 'number') {
            y = Math.trunc(x);
        }
        return y;
    }
}

math = new Mathematics();
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
 * MaiaScript matrix library.
 * @class
 */
function Matrix() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Returns the mean and standard deviation of the values contained in a matrix.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  Mean and standard deviation of the values contained in a matrix.
     */
    this.avg = function(mtx, r1, c1, r2, c2)
    {
        var res = {
            'avg': 0,
            'dev': 0
        };
        var sx;
        var sx2;
        var n;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                sx = 0;
                sx2 = 0;
                n = 0;
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            sx += mtx[i][j];
                            sx2 += mtx[i][j] * mtx[i][j];
                            n++;
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function avg. All elements must be numeric.');
                        }
                    }
                }
            } else {
                if (dimMatrix.length == 1) {
                    if (typeof c1 == 'undefined') {
                        c1 = 0;
                    }
                    if (typeof c2 == 'undefined') {
                        c2 = dimMatrix[0] - 1;
                    }
                    sx = 0;
                    sx2 = 0;
                    n = 0;
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[j]) == 'number') {
                            sx += mtx[j];
                            sx2 += mtx[j] * mtx[j];
                            n++;
                        } else {
                            throw new Error('Invalid element ' + mtx[j] + ' in matrix for function avg. All elements must be numeric.');
                        }
                    }
                } else {
                    throw new Error('Invalid argument for function avg. The matrix must be one or two-dimensional.');
                }
            }
        } else {
            throw new Error('Invalid argument for function avg. Argument must be a matrix.');
        }
        res.avg = sx / n;
        res.dev = Math.sqrt((sx2 - (sx * sx) / n) / (n - 1));
        return res;
    }

    /**
     * Returns the number of non-zero elements in the matrix.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  The number of non-zero elements in the matrix.
     */
    this.count = function(mtx, r1, c1, r2, c2)
    {
        var res;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                res = 0;
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            if (mtx[i][j] != 0) {
                                res++;
                            }
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function count. All elements must be numeric.');
                        }
                    }
                }
            } else {
                if (dimMatrix.length == 1) {
                    res = 0;
                    if (typeof c1 == 'undefined') {
                        c1 = 0;
                    }
                    if (typeof c2 == 'undefined') {
                        c2 = dimMatrix[0] - 1;
                    }
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[j]) == 'number') {
                            if (mtx[j] != 0) {
                                res++;
                            }
                        } else {
                            throw new Error('Invalid element ' + mtx[j] + ' in matrix for function count. All elements must be numeric.');
                        }
                    }
                } else {
                    throw new Error('Invalid argument for function count. The matrix must be one or two-dimensional.');
                }
            }
        } else {
            throw new Error('Invalid argument for function count. Argument must be a matrix.');
        }
        return res;
    }

    /**
     * Calculates the cross product of two vectors A and B.
     * @param {object}  a - The matrix A.
     * @param {object}  b - The matrix B.
     * @return {array}  A (rows x columns) matrix.
     */
    this.cross = function(a, b)
    {
        var mtx;
        if ((core.type(a) == 'matrix') && (core.type(b) == 'matrix')) {
            var dimA = core.dim(a);
            var dimB = core.dim(b);
            if ((dimA[0] == dimB[0]) && (dimA[1] == dimB[1])) {
                var m = dimA[0];
                var mtx = core.matrix(0, 1, m);
                if (m == 2) {
                    mtx[0] = a[0] * b[1];
                    mtx[1] = a[1] * b[0];
                } else if (m == 3) {
                    mtx[0] = a[1] * b[2] - b[1] * a[2];
                    mtx[1] = a[2] * b[0] - b[2] * a[0];
                    mtx[2] = a[0] * b[1] - b[0] * a[1];
                }
            } else {
                throw new Error('The matrices must have equal dimensions for function cross(), in the expression cross(' + core.toString(a) + "," + core.toString(b) + ').');
            }
        } else {
            throw new Error('The arguments for function cross() must be matrices, in the expression cross(' + core.toString(a) + "," + core.toString(b) + ').');
        }
        return mtx;
    }

    /**
     * Calculates the dot product of two vectors A and B.
     * @param {object}  a - The matrix A.
     * @param {object}  b - The matrix B.
     * @return {array}  A (rows x columns) matrix.
     */
    this.dot = function(a, b)
    {
        var res;
        if ((core.type(a) == 'matrix') && (core.type(b) == 'matrix')) {
            var dimA = core.dim(a);
            var dimB = core.dim(b);
            if ((dimA[0] == dimB[0]) && (dimA[1] == dimB[1])) {
                var m = dimA[0];
                if (m == 2) {
                    res = a[0] * b[0] + a[1] * b[1];
                } else if (m == 3) {
                    res = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
                }
            } else {
                throw new Error('The matrices must have equal dimensions for function cross(), in the expression cross(' + core.toString(a) + "," + core.toString(b) + ').');
            }
        } else {
            throw new Error('The arguments for function dot() must be matrices, in the expression dot(' + core.toString(a) + "," + core.toString(b) + ').');
        }
        return res;
    }

    /**
     * Returns the largest value in an array.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  The smallest value in an array.
     */
    this.max = function(mtx, r1, c1, r2, c2)
    {
        var res;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                res = 0;
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            if (typeof res == 'undefined') {
                                res = mtx[i][j];
                            } else {
                                if (mtx[i][j] > res) {
                                    res = mtx[i][j];
                                }
                            }
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function max. All elements must be numeric.');
                        }
                    }
                }
            } else {
                if (dimMatrix.length == 1) {
                    res = 0;
                    if (typeof c1 == 'undefined') {
                        c1 = 0;
                    }
                    if (typeof c2 == 'undefined') {
                        c2 = dimMatrix[0] - 1;
                    }
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[j]) == 'number') {
                            if (typeof res == 'undefined') {
                                res = mtx[j];
                            } else {
                                if (mtx[j] > res) {
                                    res = mtx[j];
                                }
                            }
                        } else {
                            throw new Error('Invalid element ' + mtx[j] + ' in matrix for function max. All elements must be numeric.');
                        }
                    }
                } else {
                    throw new Error('Invalid argument for function max. The matrix must be one or two-dimensional.');
                }
            }
        } else {
            throw new Error('Invalid argument for function max. Argument must be a matrix.');
        }
        return res;
    }

    /**
     * Returns the smallest value in an array.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  The smallest value in an array.
     */
    this.min = function(mtx, r1, c1, r2, c2)
    {
        var res;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            if (typeof res == 'undefined') {
                                res = mtx[i][j];
                            } else {
                                if (mtx[i][j] < res) {
                                    res = mtx[i][j];
                                }
                            }
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function min. All elements must be numeric.');
                        }
                    }
                }
            } else {
                if (dimMatrix.length == 1) {
                    res = 0;
                    if (typeof c1 == 'undefined') {
                        c1 = 0;
                    }
                    if (typeof c2 == 'undefined') {
                        c2 = dimMatrix[0] - 1;
                    }
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[j]) == 'number') {
                            if (typeof res == 'undefined') {
                                res = mtx[j];
                            } else {
                                if (mtx[j] < res) {
                                    res = mtx[j];
                                }
                            }
                        } else {
                            throw new Error('Invalid element ' + mtx[j] + ' in matrix for function min. All elements must be numeric.');
                        }
                    }
                } else {
                    throw new Error('Invalid argument for function min. The matrix must be one or two-dimensional.');
                }
            }
        } else {
            throw new Error('Invalid argument for function min. Argument must be a matrix.');
        }
        return res;
    }

    /**
     * Calculates the sum of all cells in the matrix.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  Sum of the values contained in a matrix.
     */
    this.sum = function(mtx, r1, c1, r2, c2)
    {
        var res;
        var sx;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                sx = 0;
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            sx += mtx[i][j];
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function sum. All elements must be numeric.');
                        }
                    }
                }
            } else {
                if (dimMatrix.length == 1) {
                    if (typeof c1 == 'undefined') {
                        c1 = 0;
                    }
                    if (typeof c2 == 'undefined') {
                        c2 = dimMatrix[0] - 1;
                    }
                    sx = 0;
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[j]) == 'number') {
                            sx += mtx[j];
                        } else {
                            throw new Error('Invalid element ' + mtx[j] + ' in matrix for function sum. All elements must be numeric.');
                        }
                    }
                } else {
                    throw new Error('Invalid argument for function sum. The matrix must be one or two-dimensional.');
                }
            }
        } else {
            throw new Error('Invalid argument for function sum. Argument must be a matrix.');
        }
        res = sx;
        return res;
    }

    /**
     * Calculates the squared sum of all cells in the matrix.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  Sum of the values contained in a matrix.
     */
    this.sum2 = function(mtx, r1, c1, r2, c2)
    {
        var res;
        var sx;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                sx = 0;
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            sx += mtx[i][j] * mtx[i][j];
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function sum. All elements must be numeric.');
                        }
                    }
                }
            } else {
                if (dimMatrix.length == 1) {
                    if (typeof c1 == 'undefined') {
                        c1 = 0;
                    }
                    if (typeof c2 == 'undefined') {
                        c2 = dimMatrix[0] - 1;
                    }
                    sx = 0;
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[j]) == 'number') {
                            sx += mtx[j] * mtx[j];
                        } else {
                            throw new Error('Invalid element ' + mtx[j] + ' in matrix for function sum. All elements must be numeric.');
                        }
                    }
                } else {
                    throw new Error('Invalid argument for function sum. The matrix must be one or two-dimensional.');
                }
            }
        } else {
            throw new Error('Invalid argument for function sum. Argument must be a matrix.');
        }
        res = sx;
        return res;
    }

    /**
     * Returns the transpose of an array.
     * @param {object}   mtx - The matrix.
     * @param {number}   r1 - First row.
     * @param {number}   c1 - First column.
     * @param {number}   r2 - Last row.
     * @param {number}   c2 - Last column.
     * @return {number}  The transpose of an array.
     */
    this.trans = function(mtx, r1, c1, r2, c2)
    {
        var res;
        if (core.type(mtx) == 'matrix') {
            dimMatrix = core.dim(mtx);
            if (dimMatrix.length == 2) {
                res = 0;
                if (typeof r1 == 'undefined') {
                    r1 = 0;
                }
                if (typeof c1 == 'undefined') {
                    c1 = 0;
                }
                if (typeof r2 == 'undefined') {
                    r2 = dimMatrix[0] - 1;
                }
                if (typeof c2 == 'undefined') {
                    c2 = dimMatrix[1] - 1;
                }
                res = core.matrix(0, dimMatrix[0], dimMatrix[1]);
                for (var i = r1; i <= r2; i++) {
                    for (var j = c1; j <= c2; j++) {
                        if (core.type(mtx[i][j]) == 'number') {
                            res[j][i] = mtx[i][j];
                        } else {
                            throw new Error('Invalid element ' + mtx[i][j] + ' in matrix for function trans. All elements must be numeric.');
                        }
                    }
                }
            } else {
                throw new Error('Invalid argument for function trans. The matrix must be two-dimensional.');
            }
        } else {
            throw new Error('Invalid argument for function trans. Argument must be a matrix.');
        }
        return res;
    }

    /**
     * Calculates the triangular equivalent matrix.
     * @param {object}  mtx - The matrix to calculate the triangular equivalent matrix.
     * @return {array}  A (rows x columns) matrix.
     */
    this.triang = function(mtx)
    {
        if (core.type(mtx) == 'matrix') {
            var dim = core.dim(mtx);
            var m = dim[0];
            var n = dim[1];
            // Convert to the triangular equivalent matrix.
            var cpy = core.copyMatrix(mtx);
            for (k = 0; k < m - 1; k++) {
                for (i = k + 1; i < m; i++) {
                    var scale = -cpy[i][k] / cpy[k][k]
                    for (j = 0; j < n; j++) {
                        cpy[i][j] = cpy[i][j] + scale * cpy[k][j];
                    }
                }
            }
            // Calculates the determinant of the matrix.
            var det = 1;
            for (i = 0; i < m; i++) {
                det = det * cpy[i][i];
            }
            if (det == 0) {
                throw new Error('The matrix is singular, in the expression triang(' + core.toString(mtx) + ').');
            }
        } else {
            throw new Error('The argument for function triang() must be a matrix, in the expression triang(' + core.toString(mtx) + ').');
        }
        return cpy;
    }
}

matrix = new Matrix();/**
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

/* 
 * The sprintf function implemented in this library is based on the JavaScript library sprintf-js,
 * distributed under the following license. The original source code can be obtained from the repository:
 * https://github.com/alexei/sprintf.js.git
 * 
 * Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro>
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of this software nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * MaiaScript string library.
 * @class
 */
function MaiaString() {
    // Regular expressions used by sprintf the parser.
    this.re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Convert an string into camel case object name format.
     * @param {string}   str - String to convert.
     * @param {string}   firstCharToUpperCase - Converts the first character to uppercase.
     * @return {string}  The string converted to camel case.
     */
    this.camelize = function(str, firstCharToUpperCase) {
        function matchChars(match, index) {
            if (+match == 0) {
                return "";
            } else {
                return ((index == 0) && !firstCharToUpperCase) ? match.toLowerCase() : match.toUpperCase();
            }
        }
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, matchChars);
    }

    /**
     * Formats a string based on format specifiers passed to the function.
     * @param {string}   fmt - A string containing format specifiers.
     * @param {object}   arguments - Objects to be formatted.
     * @return {string}  A formatted string based on format specifiers passed to the function.
     */
    this.sprintf = function(fmt) {
        /*
            * Functions with variable number of arguments, use the variable 'arguments'
            * to contain the arguments passed to the function.
            */
        return this.sprintFormat(this.sprintfParse(fmt), arguments);
    }

    /**
     * Formats a string based on format specifiers passed to the function.
     * @param {string}   fmt - A string containing format specifiers.
     * @param {array}    argv - Array containing objects to be formatted.
     * @return {string}  A formatted string based on format specifiers passed to the function.
     */
    this.vsprintf = function(fmt, argv) {
        return this.sprintf.apply(null, [fmt].concat(argv || []));
    }

    /**
     * Formats a string based on an abstract synthetic tree produced by the format specifier compiler.
     * @param {object}   parseTree - Abstract synthetic tree produced by the format specifier compiler.
     * @param {array}    argv - Array containing objects to be formatted.
     * @return {string}  A formatted string based on format specifiers passed to the function.
     */
    this.sprintFormat = function(parseTree, argv) {
        var cursor = 1, treeLength = parseTree.length, arg, output = '', i, k, ph, pad, padCharacter, padLength, isPositive, sign;
        for (i = 0; i < treeLength; i++) {
            if (typeof parseTree[i] === 'string') {
                output += parseTree[i];
            } else if (typeof parseTree[i] === 'object') {
                ph = parseTree[i]
                if (ph.keys) {
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(this.sprintf('Function sprintf cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]];
                    }
                } else if (ph.param_no) {
                    arg = argv[ph.param_no];
                } else {
                    arg = argv[cursor++];
                }
                if (this.re.not_type.test(ph.type) && this.re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg();
                }
                if (this.re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(this.sprintf('Function sprintf expecting number but found %T', arg));
                }
                if (this.re.number.test(ph.type)) {
                    isPositive = arg >= 0;
                }
                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2);
                        break;
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10));
                        break;
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10);
                        break;
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                        break;
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                        break;
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                        break;
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                        break;
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8);
                        break;
                    case 's':
                        arg = String(arg);
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                        break
                    case 't':
                        arg = String(!!arg);
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                        break;
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0;
                        break;
                    case 'v':
                        arg = arg.valueOf();
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg);
                        break;
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16);
                        break;
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                        break;
                }
                if (this.re.json.test(ph.type)) {
                    output += arg;
                } else {
                    if (this.re.number.test(ph.type) && (!isPositive || ph.sign)) {
                        sign = isPositive ? '+' : '-';
                        arg = arg.toString().replace(this.re.sign, '');
                    } else {
                        sign = '';
                    }
                    padCharacter = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' ';
                    padLength = ph.width - (sign + arg).length;
                    pad = ph.width ? (padLength > 0 ? padCharacter.repeat(padLength) : '') : '';
                    output += ph.align ? sign + arg + pad : (padCharacter === '0' ? sign + pad + arg : pad + sign + arg);
                }
            }
        }
        return output;
    }

    var sprintfCache = Object.create(null);

    /**
     * Compiles a string based on the syntactic rules of the C sprintf function.
     * @param {string}   fmt - A string containing format specifiers.
     * @return {object}  Abstract synthetic tree produced for the format specifier.
     */
    this.sprintfParse = function(fmt) {
        if (sprintfCache[fmt]) {
            return sprintfCache[fmt];
        }
        var formatString = fmt, match, parseTree = [], argNames = 0;
        while (formatString) {
            if ((match = this.re.text.exec(formatString)) !== null) {
                parseTree.push(match[0]);
            } else if ((match = this.re.modulo.exec(formatString)) !== null) {
                parseTree.push('%');
            } else if ((match = this.re.placeholder.exec(formatString)) !== null) {
                if (match[2]) {
                    argNames |= 1;
                    var fieldList = [], replacementField = match[2], fieldMatch = [];
                    if ((fieldMatch = this.re.key.exec(replacementField)) !== null) {
                        fieldList.push(fieldMatch[1]);
                        while ((replacementField = replacementField.substring(fieldMatch[0].length)) !== '') {
                            if ((fieldMatch = this.re.key_access.exec(replacementField)) !== null) {
                                fieldList.push(fieldMatch[1]);
                            } else if ((fieldMatch = this.re.index_access.exec(replacementField)) !== null) {
                                fieldList.push(fieldMatch[1]);
                            } else {
                                throw new SyntaxError('Function sprintf failed to parse named argument key');
                            }
                        }
                    } else {
                        throw new SyntaxError('Function sprintf failed to parse named argument key');
                    }
                    match[2] = fieldList;
                } else {
                    argNames |= 2;
                }
                if (argNames === 3) {
                    throw new Error('Function sprintf mixing positional and named placeholders is not (yet) supported');
                }
                parseTree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                );
            } else {
                throw new SyntaxError('Function sprintf unexpected placeholder');
            }
            formatString = formatString.substring(match[0].length);
        }
        return sprintfCache[fmt] = parseTree;
    }
}

string = new MaiaString();
/**
 * @license
 * Copyright 2020 Roberto Luiz Souza Monteiro,
 *                Renata Souza Barreto,
 *                Hernane Borges de Barros Pereira.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at;
 *
 *   http://www.apache.org/licenses/LICENSE-2.0;
 *
 * Unless required by applicable law or agreed to in writing, software;
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, eithermath.express or implied.
 * See the License for the specific language governing permissions and;
 * limitations under the License.
 */

/**
 * MaiaScript Artificial Neural Network (ANN) library.
 * @class
 */
function ANN() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Creates an untrained artificial neural network.
     * @param {string}   topology - Graph topology. It can be:
     *                              complete, random, small world,
     *                              scale-free, hybrid or mlp.
     * @param {number}   numVertices - Number of vertices.
     * @param {number}   numEdges - Number of edges.
     * @param {number}   edgeProbability - Edge probability.
     * @param {number}   averageDegree - Average degree.
     * @param {number}   ni - Number of input neurons.
     * @param {number}   no - Number of output neurons.
     * @param {number}   nl - Number of layers.
     * @param {number}   nhu - Number of hidden units.
     * @return {object}  A neural network.
     */
    this.createANN = function(topology, numVertices, numEdges, edgeProbability, averageDegree, ni, no, nl, nhu) {
        if (typeof topology == 'undefined') {
            topology = 'complete';
        }
        if (typeof numVertices != 'undefined') {
            n = numVertices;
        } else {
            n = 0;
        }
        if (typeof numEdges != 'undefined') {
            m = numEdges;
        } else {
            m = 0;
        }
        if (typeof edgeProbability != 'undefined') {
            p = edgeProbability;
        } else {
            p = 0;
        }
        if (typeof averageDegree != 'undefined') {
            d = averageDegree;
        } else {
            d = 0;
        }
        if (typeof ni == 'undefined') {
            ni = 0;
        }
        if (typeof no == 'undefined') {
            no = 0;
        }
        if (typeof nl == 'undefined') {
            nl = 0;
        }
        if (typeof nhu == 'undefined') {
            nhu = 0;
        }
        // Create a Multi-layer Perceptron (MLP)
        if (topology == 'mlp') {
            n = ni + nl * nhu + no;
        }
        // Create a complete graph.
        if (topology == 'complete') {
            var ANN = core.matrix(1, n + 1, n + 1);
        } else {
            var ANN = core.matrix(0, n + 1, n + 1);
        }
        dimANN = core.dim(ANN);
        // Create a random graph.
        if (topology == 'random') {
            // Calculate the edge probability.
            if (d > 0) {
                p = d / (n - 1);
            }
            // Calculate the number of edge.
            if ((m == 0) && (p > 0)) {
                e = n / 2 * (n - 1) * p;
            } else {
                e = m;
            }
            while (e > 0) {
                i = math.round(math.random() * n);
                j = math.round(math.random() * n);
                if (!((i == j) || (i == 0) || (j == 0))) {
                    if ((ANN[i][j] == 0) && (ANN[j][i] == 0)) {
                        ANN[i][j] = 1;
                        ANN[j][i] = 1;
                        e--;
                    }
                }
            }
        // Create a small world network.
        } else if (topology == 'smallworld') {
            // Create the initial random network.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                while (true) {
                    ki = matrix.count(ANN, i, 1, i, dimANN[1] - 1);
                    if (ki < d) {
                        j = math.round(math.random() * n);
                        if ((i != j) && (j != 0)) {
                            ANN[i][j] = 1;
                            ANN[j][i] = 1;
                        }
                    } else {
                        break;
                    }
                }
            }
            // Rewire network with edge probability p.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                for (j = 1; j < dimANN[1]; j = j + 1) {
                    if (ANN[i][j] == 1) {
                        pij = math.random();
                        if (pij < p) {
                            while (true) {
                                k = math.round(math.random() * n);
                                if ((k != 0) && (i != k) && (ANN[i][k] == 0)) {
                                    ANN[i][j] = 0;
                                    ANN[j][i] = 0;
                                    ANN[i][k] = 1;
                                    ANN[k][i] = 1;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        // Create a scale-free network.
        } else if (topology == 'scalefree') {
            // Create the initial random network.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                while (true) {
                    ki = matrix.count(ANN, i, 1, i, dimANN[1] - 1);
                    if (ki == 0) {
                        j = math.round(math.random() * n);
                        if ((j != 0) && (i != j)) {
                            ANN[i][j] = 1;
                            ANN[j][i] = 1;
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
            // Add new edges with probability p.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                for (j = 1; j < dimANN[1]; j = j + 1) {
                    if ((i != j) && (ANN[i][j] == 0)) {
                        ki = matrix.count(ANN, i, 1, i, dimANN[1] - 1);
                        if (ki < d) {
                            sk = matrix.sum(ANN, 1, 1, dimANN[0] - 1, dimANN[1] - 1);
                            p = math.random();
                            pi = ki / sk;
                            if (pi < p) {
                                ANN[i][j] = 1;
                                ANN[j][i] = 1;
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        // Create an hybrid (scale-free small world) network.
        } else if (topology == 'hybrid') {
            // Create the small world network.
            // Create the initial random network.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                while (true) {
                    ki = matrix.count(ANN, i, 1, i, dimANN[1] - 1);
                    if (ki < d) {
                        j = math.round(math.random() * n);
                        if ((j != 0) && (i != j)) {
                            ANN[i][j] = 1;
                            ANN[j][i] = 1;
                        }
                    } else {
                        break;
                    }
                }
            }
            // Rewire network with edge probability p.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                for (j = 1; j < dimANN[1]; j = j + 1) {
                    if (ANN[i][j] == 1) {
                        pij = math.random();
                        if (pij < p) {
                            while (true) {
                                k = math.round(math.random() * n);
                                if ((k != 0) && (i != k) && (ANN[i][k] == 0)) {
                                    ANN[i][j] = 0;
                                    ANN[j][i] = 0;
                                    ANN[i][k] = 1;
                                    ANN[k][i] = 1;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            // Change it to scale-free.
            // Add new edges with probability p.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                for (j = 1; j < dimANN[1]; j = j + 1) {
                    if ((i != j) && (ANN[i][j] == 0)) {
                        ki = matrix.count(ANN, i, 1, i, dimANN[1] - 1);
                        if (ki < d) {
                            sk = matrix.sum(ANN, 1, 1, dimANN[0] - 1, dimANN[1] - 1);
                            p = math.random();
                            pi = ki / sk;
                            if (pi < p) {
                                ANN[i][j] = 1;
                                ANN[j][i] = 1;
                            }
                        } else {
                            break;
                        }
                    }
                }
            }
        } else if (topology == 'mlp') {
            var lindex = 0;
            var nindex = 1;
            // Create synapses.
            // Connect inputs to the first layer.
            nindex = ni;
            for (var i = 1; i <= ni; i++) {
                for (var j = 1; j <= nhu; j++) {
                    ANN[i][j + nindex] = 1;
                }
            }
            // Connect hidden layers.
            for (var l = 1; l < nl; l++) {
                n1index = ni + (l - 1) * nhu;
                n2index = ni + l * nhu;
                for (var i = 1; i <= nhu; i++) {
                    for (var j = 1; j <= nhu; j++) {
                        ANN[i + n1index][j + n2index] = 1;
                    }
                    //ANN[i + n1index][i + n1index] = 1;
                }
            }
            // Connect last layer to outputs.
            n1index = ni + (nl - 1) * nhu;
            n2index = ni + nl * nhu;
            for (var i = 1; i <= nhu; i++) {
                for (var j = 1; j <= no; j++) {
                    ANN[i + n1index][j + n2index] = 1;
                    //ANN[j + n2index][j + n2index] = 1;
                }
                //ANN[i + n1index, i + n1index] = 1;
            }
            // Add the neurons labels.
            lindex = 0;
            nindex = 1;
            for (var i = 1; i < dimANN[0]; i++) {
                if (lindex == 0) {
                    label = "i" + nindex;
                    nindex++;
                    if (nindex > ni) {
                        lindex++;
                        nindex = 1;
                    }
                } else if ((lindex > 0) & (lindex <= nl)) {
                    label = "h" + lindex + "," + nindex;
                    nindex++;
                    if (nindex > nhu) {
                        lindex++;
                        nindex = 1;
                    }
                } else {
                    label = "o" + nindex;
                    nindex++;
                }
                ANN[0][i] = label;
                ANN[i][0] = label;
            }
        }
        // Add loops (for neural networks).
        if (ni > 0) {
            for (i = ni + 1; i < dimANN[0]; i = i + 1) {
                ANN[i][i] = 1;
            }
        } else {
            // Remove loops.
            for (i = 0; i < dimANN[0]; i = i + 1) {
                ANN[i][i] = 0;
            }
        }
        if (topology == 'mlp') {
            // Add the neurons labels.
            lindex = 0;
            nindex = 1;
            for (i = 1; i < dimANN[0]; i++) {
                if (lindex == 0) {
                    label = "i" + nindex;
                    nindex++;
                    if (nindex > ni) {
                        lindex++;
                        nindex = 1;
                    }
                } else if ((lindex > 0) & (lindex <= nl)) {
                    label = "h" + lindex + "," + nindex;
                    nindex++;
                    if (nindex > nhu) {
                        lindex++;
                        nindex = 1;
                    }
                } else {
                    label = "o" + nindex;
                    nindex++;
                }
                ANN[0][i] = label;
                ANN[i][0] = label;
            }
        } else {
            // Add the vertices labels.
            for (i = 1; i < dimANN[0]; i = i + 1) {
                ANN[0][i] = 'v' + i;
                ANN[i][0] = 'v' + i;
            }
        }
        return ANN;
    }

    /**
     * Returns the labels of an adjacency matrix.
     * @param {object}   ANNMatrix - Adjacency matrix.
     * @return {object}  The labels of an adjacency matrix.
     */
    this.getLabels = function(ANNMatrix) {
        dimANN = core.dim(ANNMatrix);
        var labels = [''];
        for (i = 1; i < dimANN[0]; i++) {
            labels.push(ANNMatrix[i][0]);
        }
        return(labels);
    }

    /**
     * Trains an artificial neural network, represented as an adjacency matrix.
     * @param {object}   ANNMatrix - Adjacency matrix.
     * @param {object}   inMatrix - Input data for training.
     * @param {object}   outMatrix - Output data for training.
     * @param {number}   ni - Number of input neurons.
     * @param {number}   no - Number of output neurons.
     * @param {number}   lRate - Learning rate.
     * @param {string}   AF - Activation function. It can be:
     *                        linear, logistic or tanh.
     * @param {string}   OAF - Activation function of the last layer. It can be:
     *                         linear, logistic or tanh.
     * @return {object}  Trained neural network.
     */
    this.learn = function(ANNMatrix, inMatrix, outMatrix, ni, no, lRate, AF, OAF) {
        if (typeof ni == 'undefined') {
            ni = 0;
        }
        if (typeof no == 'undefined') {
            no = 0;
        }
        if (typeof lRate == 'undefined') {
            lRate = 1;
        }
        if (typeof AF == 'undefined') {
            AF = 'logistic';
        }
        if (typeof OAF == 'undefined') {
            OAF = 'linear';
        }
        var dimANN = core.dim(ANNMatrix);
        var firstOut = dimANN[1] - 1 - no;
        // Clear inputs and outputs.
        for (var i = 0; i < dimANN[0] - 1; i++) {
            ANNMatrix[0][i] = 0.0;
            ANNMatrix[i][0] = 0.0;
            ANNMatrix[i][dimANN[1] - 1] = 0.0;
            ANNMatrix[dimANN[0] - 1][i] = 0.0;
        }
        // Assign inputs.
        for (var j = 0; j < ni; j++) {
            ANNMatrix[j + 1][0] = inMatrix[j];
        }
        // Calculate the neurons output.
        for (var j = ni + 1; j < (dimANN[1] - 1); j++) {
            ANNMatrix[0][j] = 0.0;
            // Weighted sums.
            // x = x1 * w1 + x2 * w2 + ...
            for (var i = 1; i < (dimANN[0] - 1); i++) {
                if (i < j) {
                    if (ANNMatrix[i][j] != 0) {
                        ANNMatrix[0][j] = ANNMatrix[0][j] + ANNMatrix[i][j] * ANNMatrix[i][0];
                    }
                } else if (i == j) {
                    if (ANNMatrix[i][j] != 0) {
                        ANNMatrix[0][j] = ANNMatrix[0][j] + ANNMatrix[i][j];
                    }
                } else {
                    break;
                }
            }
            // Activation function.
            if (j < firstOut) {
                // Linear: f(x) = x
                //         df(x)/dx = 1
                if (AF == 'linear') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = ANNMatrix[0, j];
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = 1.0;
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                //          df(x)/dx = f(x) * (1 - f(x))
                } else if (AF == 'logistic') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = ANNMatrix[j][0] * (1.0 - ANNMatrix[j][0]);
                // Hyperbolic tangent: f(x) = 2 / (1 + e^(-2x)) - 1
                //                     df(x)/dx = 1 - f(x)^2
                } else if (AF == 'tanh') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 2.0 / (1.0 + math.exp(-2.0 * ANNMatrix[0][j])) - 1.0;
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = 1.0 - ANNMatrix[j][0] * ANNMatrix[j][0];
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                //          df(x)/dx = f(x) * (1 - f(x))
                } else {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = ANNMatrix[j][0] * (1.0 - ANNMatrix[j][0]);
                }
            } else {
                // Linear: f(x) = x
                //         df(x)/dx = 1
                if (OAF == 'linear') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = ANNMatrix[0][j];
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = 1.0;
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                //          df(x)/dx = f(x) * (1 - f(x))
                } else if (OAF == 'logistic') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = ANNMatrix[j][0] * (1.0 - ANNMatrix[j][0]);
                // Hyperbolic tangent: f(x) = 2 / (1 + e^(-2x)) - 1
                //                     df(x)/dx = 1 - f(x)^2
                } else if (OAF == 'tanh') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 2.0 / (1.0 + math.exp(-2.0 * ANNMatrix[0][j])) - 1.0;
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = 1.0 - ANNMatrix[j][0] * ANNMatrix[j][0];
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                //          df(x)/dx = f(x) * (1 - f(x))
                } else {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                    // Calculate df(x)/dx for backpropagation.
                    ANNMatrix[j][dimANN[1] - 1] = ANNMatrix[j][0] * (1.0 - ANNMatrix[j][0]);
                }
            }
        }
        // Calculate delta for the output neurons.
        // d = z - y;
        for (var i = 0; i < no; i++) {
            ANNMatrix[dimANN[0] - 1][firstOut + i] = outMatrix[i] - ANNMatrix[firstOut + i][0];
        }
        // Calculate delta for hidden neurons.
        // d1 = w1 * d2 + w2 * d2 + ...
        for (var j = dimANN[1] - 2; j > ni; j--) {
            for (i = ni + 1; i < (dimANN[0] - 1 - no); i++) {
                if (i == j) {
                    break;
                }
                if (ANNMatrix[i][j] != 0) {
                    ANNMatrix[dimANN[0] - 1][i] = ANNMatrix[dimANN[0] - 1][i] + ANNMatrix[i][j] * ANNMatrix[dimANN[0] - 1][j];
                }
            }
        }
        // Adjust weights.
        // x = x1 * w1 + x2 * w2 + ...
        // w1 = w1 + n * d * df(x)/dx * x1
        // w2 = w2 + n * d * df(x)/dx * x2
        for (var j = no + 1; j < (dimANN[1] - 1); j++) {
            for (var i = 1; i < (dimANN[0] - 1 - no); i++) {
                if (i < j) {
                    if (ANNMatrix[i][j] != 0) {
                        ANNMatrix[i][j] = ANNMatrix[i][j] + lRate * ANNMatrix[dimANN[0] - 1][j] * ANNMatrix[j][dimANN[1] - 1] * ANNMatrix[i][0];
                    }
                } else if (i == j) {
                    if (ANNMatrix[i][j] != 0) {
                        ANNMatrix[i][j] = ANNMatrix[i][j] + lRate * ANNMatrix[dimANN[0] - 1][j] * ANNMatrix[j][dimANN[1] - 1];
                    }
                } else {
                    break;
                }
            }
        }
        return ANNMatrix;
    }

    /**
     * It prepares a neural network, represented as an adjacency matrix,
     * replacing cells with value one (1), with random real numbers.
     * @param {object}   ANNMatrix - Adjacency matrix.
     * @param {boolean}  randomize - Fill cells with random real numbers.
     * @param {boolean}  allowLoops - Allow loops.
     * @param {boolean}  negativeWeights - Allow negative weights.
     * @return {object}  Matrix filled with random numbers.
     */
    this.prepare = function(ANNMatrix, randomize, allowLoops, negativeWeights) {
        if (typeof randomize == 'undefined') {
            randomize = false;
        }
        if (typeof allowLoops == 'undefined') {
            allowLoops = false;
        }
        if (typeof negativeWeights == 'undefined') {
            negativeWeights = false;
        }
        var dimANN = core.dim(ANNMatrix);
        // Clear inputs and outputs.
        for (var i = 0; i < dimANN[0]; i++) {
            ANNMatrix[0][i] = 0.0;
            ANNMatrix[i][0] = 0.0;
            if (!allowLoops) {
                ANNMatrix[i][i] = 0.0;
            }
            ANNMatrix[i][dimANN[1] - 1] = 0.0;
            ANNMatrix[dimANN[0] - 1][i] = 0.0;
        }
        // Clear the lower triangular matrix.
        for (i = 1; i < dimANN[0]; i++) {
            for (j = 1; j < dimANN[1]; j++) {
                if (i > j) {
                    ANNMatrix[i][j] = 0.0;
                }
            }
        }
        // Set random weights.
        if (randomize) {
            for (i = 1; i < (dimANN[0] - 1); i++) {
                for (j = 1; j < (dimANN[1] - 1); j++) {
                    if (ANNMatrix[i][j] == 1) {
                        if (negativeWeights) {
                            ANNMatrix[i][j] = 2.0 * math.random() - 1.0;
                        } else {
                            ANNMatrix[i][j] = math.random();
                        }
                    }
                }
            }
        }
        return ANNMatrix;
    }

    /**
     * Sets the labels of an adjacency matrix.
     * @param {object}   ANNMatrix - Adjacency matrix.
     * @param {object}   labels - Matrix labels.
     * @return {object}  The adjacency matrix
     */
    this.setLabels = function(ANNMatrix, labels) {
        dimANN = core.dim(ANNMatrix);
        for (i = 1; i < dimANN[0]; i++) {
            ANNMatrix[i][0] = labels[i];
            ANNMatrix[0][i] = labels[i];
        }
        return(labels);
    }

    /**
     * It processes incoming data using a trained neural network.
     * @param {object}   ANNMatrix - adjacency matrix.
     * @param {object}   inMatrix - Input data for training.
     * @param {number}   ni - Number of input neurons.
     * @param {number}   no - Number of output neurons.
     * @param {string}   AF - Activation function. It can be:
     *                        linear, logistic or tanh.
     * @param {string}   OAF - Activation function of the last layer. It can be:
     *                         linear, logistic or tanh.
     * @param {string}   OF - Output function. It can be:
     *                        linear, step, or none.
     * @param {object}   OFC - Output function coefficients.
     * @return {object}  Trained neural network.
     */
    this.think = function(ANNMatrix, inMatrix, ni, no, AF, OAF, OF, OFC) {
        if (typeof ni == 'undefined') {
            ni = 0;
        }
        if (typeof no == 'undefined') {
            no = 0;
        }
        if (typeof AF == 'undefined') {
            AF = 'logistic';
        }
        if (typeof OAF == 'undefined') {
            OAF = 'linear';
        }
        if (typeof OF == 'undefined') {
            OF = 'none';
        }
        if (typeof OFC == 'undefined') {
            OFC = [1, 0];
        }
        var output = core.matrix(0.0, 1, no);
        var dimANN = core.dim(ANNMatrix);
        var firstOut = dimANN[1] - 1 - no;
        // Clear inputs and outputs.
        for (var i = 0; i < dimANN[0] - 1; i++) {
            ANNMatrix[0][i] = 0.0;
            ANNMatrix[i][0] = 0.0;
            ANNMatrix[i][dimANN[1] - 1] = 0.0;
            ANNMatrix[dimANN[0] - 1][i] = 0.0;
        }
        // Assign inputs.
        for (var j = 0; j < ni; j++) {
            ANNMatrix[j + 1][0] = inMatrix[j];
        }
        // Calculate the neurons output.
        for (var j = ni + 1; j < (dimANN[1] - 1); j++) {
            ANNMatrix[0][j] = 0.0;
            // Weighted sums.
            // x = x1 * w1 + x2 * w2 + ...
            for (var i = 1; i < (dimANN[0] - 1); i++) {
                if (i < j) {
                    if (ANNMatrix[i][j] != 0) {
                        ANNMatrix[0][j] = ANNMatrix[0][j] + ANNMatrix[i][j] * ANNMatrix[i][0];
                    }
                } else if (i == j) {
                    if (ANNMatrix[i][j] != 0) {
                        ANNMatrix[0][j] = ANNMatrix[0][j] + ANNMatrix[i][j];
                    }
                } else {
                    break;
                }
            }
            // Activation function.
            if (j < firstOut) {
                // Linear: f(x) = x
                if (AF == 'linear') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = ANNMatrix[0][j];
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                } else if (AF == 'logistic') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                // Hyperbolic tangent: f(x) = 2 / (1 + e^(-2x)) - 1
                } else if (AF == 'tanh') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 2.0 / (1.0 + math.exp(-2.0 * ANNMatrix[0][j])) - 1.0;
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                } else {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                }
            } else {
                // Linear: f(x) = x
                if (OAF == 'linear') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = ANNMatrix[0][j];
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                } else if (OAF == 'logistic') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                // Hyperbolic tangent: f(x) = 2 / (1 + e^(-2x)) - 1
                } else if (OAF == 'tanh') {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 2.0 / (1.0 + math.exp(-2.0 * ANNMatrix[0][j])) - 1.0;
                // Logistic: f(x) = 1.0 / (1.0 + e^(-x))
                } else {
                    // Calculate y = f(x)
                    ANNMatrix[j][0] = 1.0 / (1.0 + math.exp(-1.0 * ANNMatrix[0][j]));
                }
            }
        }
        // Set the output matrix.
        for (var i = 0; i < no; i++) {
            if (OF == 'linear') {
                output[i] = OFC[0] * ANNMatrix[firstOut + i][0] + OFC[1];
            } else if (OF == 'step') {
                if (OAF == 'linear') {
                    if (ANNMatrix[firstOut + i][0] >= 0.0) {
                        output[i] = 1;
                    } else {
                        output[i] = 0;
                    }
                } else if (OAF == 'logistic') {
                    if (ANNMatrix[firstOut + i][0] >= 0.5) {
                        output[i] = 1;
                    } else {
                        output[i] = 0;
                    }
                } else if (OAF == 'tanh') {
                    if (ANNMatrix[firstOut + i][0] >= 0.0) {
                        output[i] = 1;
                    } else {
                        output[i] = 0;
                    }
                } else {
                    if (ANNMatrix[firstOut + i][0] >= 0.0) {
                        output[i] = 1;
                    } else {
                        output[i] = 0;
                    }
                }
            } else if (OF == 'none') {
                output[i] = ANNMatrix[firstOut + i][0];
            } else {
                output[i] = ANNMatrix[firstOut + i][0];
            }
        }
        return output;
    }

    /**
     * Train an artificial neural network, represented as an adjacency matrix.
     * @param {object}    ANNMatrix - Adjacency matrix.
     * @param {object}    inMatrix - Input data for training.
     * @param {object}    outMatrix - Output data for training.
     * @param {number}    lRate - Learning rate.
     * @param {string}    AF - Activation function. It can be:
     *                         linear, logistic or tanh.
     * @param {string}    OAF - Activation function of the last layer. It can be:
     *                          linear, logistic or tanh.
     * @param {string}    OF - Output function. It can be:
     *                         linear, step or none.
     * @param {string}    OFC - Output function coefficients.
     * @param {number}    maxEpochs - Maximum number of epochs.
     * @param {number}    minimumCorrectness - Minimum correctness.
     * @param {function}  callback - Callback function.
     * @param {number}    interval - Interval between calls from the callback function.
     * @return {object}   Trained neural network.
     */
    this.training = function(ANNMatrix, inMatrix, outMatrix, lRate, AF, OAF, OF, OFC, maxEpochs, minimumCorrectness, callback, interval) {
        if (typeof lRate == 'undefined') {
            lRate = 1;
        }
        if (typeof AF == 'undefined') {
            AF = 'logistic';
        }
        if (typeof OAF == 'undefined') {
            OAF = 'linear';
        }
        if (typeof OF == 'undefined') {
            OF = 'none';
        }
        if (typeof OFC == 'undefined') {
            OFC = [1, 0];
        }
        if (typeof maxEpochs == 'undefined') {
            maxEpochs = 1;
        }
        if (typeof minimumCorrectness == 'undefined') {
            minimumCorrectness = 1;
        }
        if (typeof correctnessMatrix == 'undefined') {
            correctnessMatrix = [];
        }
        if (typeof interval == 'undefined') {
            interval = 0;
        }
        var ANN = core.copyMatrix(ANNMatrix);
        var dimIn = core.dim(inMatrix);
        var dimOut = core.dim(outMatrix);
        var input = core.matrix(0.0, 1, dimIn[1]);
        var output = core.matrix(0.0, 1, dimOut[1]);
        var ANNOut = core.matrix(0.0, 1, dimOut[1]);
        var epochs = 0;
        var epochsCounter = 0;
        var date = core.date();
        var ETL1 = date.getTime();
        var ETL2 = date.getTime();
        var squaredError = core.matrix(0.0, 1, dimIn[0]);
        var ERR = [];
        var SE = 0;
        var RSS = 0;
        var correctness = 0;
        var correctnessMatrix = core.matrix(0.0, maxEpochs + 1, 2);
        while (epochs < maxEpochs) {
            var hits = 0;
            epochs++;
            // Verify learning.
            for (var i = 0; i < dimIn[0]; i++) {
                // Assign inputs and outputs.
                for (var j = 0; j < dimIn[1]; j++) {
                    input[j] = inMatrix[i][j];
                }
                for (var j = 0; j < dimOut[1]; j++) {
                    output[j] = outMatrix[i][j];
                }
                // Verify learning.
                if (OFC != []) {
                    ANNOut = this.think(ANN, input, dimIn[1], dimOut[1], AF, OAF, OF, OFC);
                } else {
                    ANNOut = this.think(ANN, input, dimIn[1], dimOut[1], AF, OAF, OF);
                }
                if (output == ANNOut) {
                    hits++;
                }
                ERR = core.sub(output, ANNOut);
                if (typeof ERR == 'number') {
                    ERR = [ERR];
                }
                SE = matrix.sum2(ERR) / 2.0;
                squaredError[i] = SE;
                RSS = matrix.sum(squaredError);
                correctness = hits / dimIn[0];
                correctnessMatrix[epochs][0] = RSS;
                correctnessMatrix[epochs][1] = correctness;
                if (hits == dimIn[0]) {
                    ANNMatrix = core.copyMatrix(ANN);
                    result = [epochs, RSS, correctnessMatrix];
                    return result;
                }
                if (correctness >= minimumCorrectness) {
                    ANNMatrix = core.copyMatrix(ANN);
                    result = [epochs, RSS, correctnessMatrix];
                    return result;
                }
            }
            // Learn this set.
            for (var i = 0; i < dimIn[0]; i++) {
                // Assign inputs and outputs.
                input = inMatrix[i];
                output = outMatrix[i];
                // Learn this set.
                ANN = this.learn(ANN, input, output, dimIn[1], dimOut[1], lRate, AF, OAF);
            }
            epochsCounter++;
            if (interval != 0) {
                if (typeof callback != 'undefined') {
                    if (epochsCounter >= interval) {
                        ETL2 = date.getTime();
                        var ETL = ETL2 - ETL1;
                        if (typeof callback == 'undefined') {
                            callback(epochs, RSS, correctness, ETL);
                        }
                        epochsCounter = 0;
                        ETL1 = date.getTime();
                    }
                }
            }
        }
        ANNMatrix = ANN;
        result = [epochs, RSS, correctnessMatrix];
        return result;
    }
}

ann = new ANN();/**
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
  * MaiaScript Computer Algebra System library.
  * @class 
  */
function CAS() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }

    /**
     * Evaluates expressions using the Algebrite CAS.
     * For complete reference, see the Algebrite documentation
     * at http://algebrite.org
     * @param {string}   expr - Algebraic expression.
     * @return {object}  Result of the expression.
     */
    this.eval = function(expr)
    {
        var res;
        if (typeof Algebrite != 'undefined') {
            res = Algebrite.run(expr);
        } else {
            throw new Error("The Algebrite CAS was not loaded");
        }
        return res;
    }
}

cas = new CAS();

if (typeof process !== 'undefined') {
    try {
        var Algebrite = require('algebrite');
    } catch (e) {
        console.error(e.message);
    }
}
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
 * MaiaScript GPU compute library.
 * @class
 */
function MaiaGPU() {
    init();
    
    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }
    
    /**
     * Tests whether GPU is supported.
     * @return {boolean}  Returns true if supported and false otherwise.
     */
    this.isSupported = function() {
        var res = false;
        if (typeof(GPU) != "undefined") {
            res = true;
        }
        return res;
    }

    /**
     * Creates a new GPU object.
     * @return {object}  An object to interact with the GPU device.
     */
    this.new = function() {
        var device;
        if (typeof(GPU) != "undefined") {
            device = new GPU();
        }
        return device;
    }
}

gpu = new MaiaGPU();

if (typeof process !== 'undefined') {
    try {
        var {GPU} = require('gpu.js');
    } catch (e) {
        console.error(e.message);
    }
}
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
 * MaiaScript multi-task library.
 * @class
 */
function Task() {
    init();

    /**
     * Creates the attributes of the class.
     */
    function init() {
        // Class attributes goes here.
    }
    
    /**
     * Tests whether multi-tasking is supported in the browser.
     * @return {boolean}  Returns true if supported and false otherwise.
     */
    this.isSupported = function() {
        var res = false;
        if (typeof(Worker) != "undefined") {
            res = true;
        }
        return res;
    }

    /**
     * Creates a new parallel task.
     * The thread will be created in a new scope.
     * For communication with the master thread, the postMessage function (method) and onmessage event must be used.
     * To finish executing the thread, the terminate method must be executed.
     * To import a script from within the thread, you can use the importScripts function.
     * @param {object}   func - Function that will be executed on a new thread.
     * @return {object}  An object to interact with the created thread.
     */
    this.new = function(func) {
        var worker;
        if (typeof(Worker) != "undefined") {
            var script = func.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1];
            var blob = new Blob([script], {type:'text/javascript'});
            if (typeof(window) != "undefined") {
                var blobURL = window.URL.createObjectURL(blob);
            } else {
                var blobURL = 'data:,' + script;
            }
            worker = new Worker(blobURL);
        }
        return worker;
    }
}

task = new Task();

if (typeof process !== 'undefined') {
    try {
        var Worker = require('web-worker');
    } catch (e) {
        console.error(e.message);
    }
    try {
        var Blob = require('cross-blob');
    } catch (e) {
        console.error(e.message);
    }
}
var lexemes = {"adverb":{"adverb":["accidentally","awkwardly","blindly","by","coyly","crazily","defiantly","deliberately","doubtfully","dramatically","dutifully","enormously","evenly","exactly","first","hastily","hungrily","inquisitively","loosely","madly","mortally","mysteriously","nervously","only","seriously","shakily","sharply","silently","solemnly","sternly","technically","through","to","unexpectedly","wildly"],"positiveAdverb":["boldly","bravely","brightly","cheerfully","deftly","devotedly","eagerly","elegantly","faithfully","fortunately","gleefully","gracefully","happily","honestly","innocently","justly","kindly","merrily","obediently","perfectly","politely","powerfully","safely","victoriously","vivaciously","warmly"],"negativeAdverb":["angrily","anxiously","badly","boastfully","foolishly","hopelessly","irritably","jealously","lazily","not","obnoxiously","poorly","rudely","selfishly","wearily"],"adverbAboutTime":["advertisement","always","eventually","finally","frequently","hourly","never","occasionally","often","rarely","regularly","seldom","sometimes","usually","weekly","yearly"],"adverbThatDescribeSpeed":["promptly","quickly","rapidly","slowly","speedily","tediously"]},"article":{"article":[],"definiteArticle":["the"],"indefiniteArticle":["a","an"]},"basicSentenceStructure":{"basicSentenceStructure":["subject","predicate","direct object","indirect object","subject complement",""]},"conjunction":{"conjunction":[],"coordinatingConjunction":["and","but","or","so"],"subordinatingConjunction":["after","although","as","as long as","as soon as","because","before","despite","even though","except","if","in spite of","once","provided that","till","unless","until","when","whereas","while"],"linkingWord":["consequently","finally","firstly","furthermore","however","in addition","on the other hand","secondly","therefore","thirdly",""]},"interjection":{"interjection":["ah","aha","ahem","alas","amen","aw","awesome","aww","bada-bing","bada-bing","bah","baloney","big deal","bingo","boo","boo-hoo","boo-yah","booyah","boy boy","bravo","brilliant","brrr","bull","bye","bye-bye","cheers","come on","cool","cowabunga","dang","darn darn","dear me","duck","duh","eh","enjoy","excellent","fabulous","fantastic","fiddle-dee-dee","fiddledeedee","finally","for heaven's","fore","foul","freeze","gee gee","giddyap","giddyup","golly good","good grief","good heavens","good-bye","goodbye","gosh","great","great balls","ha","hallelujah","heavensheavens","heigh-ho","hello","help","hey hey","hi","hip hip","hiya","hmm","ho-ho-ho","ho-hum","holy mackerel","hooray","howdy howdy","hrm","huh","hurrah","ick","indeed","jeez","kaboom","kapow","lordy lordy","mama mia","man","marvelous","my","my goodness","nah","no problem","no way","nope","nuts","oh oh","ok","okay","ouch","ow","please","poof","shh","super","swell","welcome","well","whoop-de-doo","woo-hoo","wow","yabba dabba","yadda yadda","yippee","yummy"]},"irregularVerb":{"irregularVerb":[["arise","arose","arisen"],["awake","awoke","awoken"],["be","was","been"],["be","were","been"],["bear","bore","born"],["bear","bore","borne"],["beat","beat","beaten"],["become","became","become"],["begin","began","begun"],["bend","bent","bent"],["bet","bet","bet"],["bind","bound","bound"],["bite","bit","bitten"],["bleed","bled","bled"],["blow","blew","blown"],["break","broke","broken"],["breed","bred","bred"],["bring","brought","brought"],["broadcast","broadcast","broadcast"],["build","built","built"],["burn","burned","burned"],["burn","burnt","burnt"],["burst","burst","burst"],["buy","bought","bought"],["can","could","could"],["catch","caught","caught"],["choose","chose","chosen"],["cling","clung","clung"],["come","came","come"],["cost","cost","cost"],["creep","crept","crept"],["cut","cut","cut"],["deal","dealt","dealt"],["dig","dug","dug"],["do","did","done"],["draw","drew","drawn"],["dream","dreamed","dreamed"],["dream","dreamt","dreamt"],["drink","drank","drunk"],["drive","drove","driven"],["eat","ate","eaten"],["fall","fell","fallen"],["feed","fed","fed"],["feel","felt","felt"],["fight","fought","fought"],["find","found","found"],["fly","flew","flown"],["forbid","forbade","forbidden"],["forget","forgot","forgotten"],["forgive","forgave","forgiven"],["freeze","froze","frozen"],["get","got","got"],["give","gave","given"],["go","went","gone"],["grind","ground","ground"],["grow","grew","grown"],["hang","hung","hung"],["have","had","had"],["hear","heard","heard"],["hide","hid","hidden"],["hit","hit","hit"],["hold","held","held"],["hurt","hurt","hurt"],["keep","kept","kept"],["kneel","knelt","knelt"],["know","knew","known"],["lay","laid","laid"],["lead","led","led"],["lean","leaned","leaned"],["lean","leant","leant"],["learn","learned","learned"],["learn","learnt","learnt"],["leave","left","left"],["lend","lent","lent"],["lie","lay","lain"],["lie","lied","lied"],["light","lighted","lighted"],["light","lit","lit"],["lose","lost","lost"],["make","made","made"],["may","might","might"],["mean","meant","meant"],["meet","met","met"],["mow","mowed","mowed"],["mow","mown","mown"],["must","must","must"],["overtake","overtook","overtaken"],["pay","paid","paid"],["put","put","put"],["read","read","read"],["ride","rode","ridden"],["ring","rang","rung"],["rise","rose","risen"],["run","ran","run"],["saw","sawed","sawed"],["saw","sawn","sawn"],["say","said","said"],["see","saw","seen"],["sell","sold","sold"],["send","sent","sent"],["set","set","set"],["sew","sewed","sewed"],["sew","sewn","sewn"],["shake","shook","shaken"],["shall","should","should"],["shed","shed","shed"],["shine","shone","shone"],["shoot","shot","shot"],["show","showed","shown"],["shrink","shrank","shrunk"],["shut","shut","shut"],["sing","sang","sung"],["sink","sank","sunk"],["sit","sat","sat"],["sleep","slept","slept"],["slide","slid","slid"],["smell","smelt","smelt"],["sow","sowed","sowed"],["sow","sown","sown"],["speak","spoke","spoken"],["spell","spelled","spelled"],["spell","spelt","spelt"],["spend","spent","spent"],["spill","spilled","spilled"],["spill","spilt","spilt"],["spit","spat","spat"],["spread","spread","spread"],["stand","stood","stood"],["steal","stole","stolen"],["stick","stuck","stuck"],["sting","stung","stung"],["stink","stank","stunk"],["strike","struck","struck"],["swear","swore","sworn"],["sweep","swept","swept"],["swell","swelled","swelled"],["swell","swollen","swollen"],["swim","swam","swum"],["swing","swung","swung"],["take","took","taken"],["teach","taught","taught"],["tear","tore","torn"],["tell","told","told"],["think","thought","thought"],["throw","threw","thrown"],["understand","understood","understood"],["wake","woke","woken"],["wear","wore","worn"],["weep","wept","wept"],["will","would","would"],["win","won","won"],["wind","wound","wound"],["write","wrote","written"],""]},"name":{"name":["aadil","aaisha","aakash","aaliyah","aamanda","aamil","aamir","aaran","aaren","aarica","aarik","aarika","aarin","aarion","aarn","aaron","aarron","aarthi","aarti","aaryn","abagail","abayomi","abbagail","abbas","abbe","abbey","abbi","abbie","abbigail","abbigale","abbra","abby","abbye","abdallah","abdel","abdiel","abdul","abdulaziz","abdulla","abdullah","abdullatif","abdulrahman","abe","abeer","abel","abelardo","abelina","abelino","abena","abhishek","abi","abie","abiel","abigael","abigail","abigal","abigale","abigayle","abimael","abner","abra","abraham","abrahan","abrahim","abrahm","abram","abran","abrianna","abril","abrina","absalon","abu","abubakar","acacia","ace","acey","achary","achilles","ada","adah","adair","adaira","adal","adalberto","adaline","adaliz","adam","adama","adamm","adams","adan","adana","adara","adarius","addam","addie","addison","addy","adeana","adeel","adekunle","adel","adela","adelaida","adelaide","adelbert","adele","adelia","adelina","adeline","adelita","adell","adella","adelle","adelyn","adem","ademola","aden","adena","adeola","adewale","adham","adi","adia","adian","adil","adin","adina","adine","aditi","aditya","adlai","adler","adley","adnan","adnrea","adnrew","adolfo","adolph","adolpho","adolphus","adon","adonia","adonica","adonis","adonna","adonnis","adora","adra","adrain","adraine","adrea","adrean","adreana","adreanna","adrena","adrew","adria","adrian","adriana","adriane","adriann","adrianna","adrianne","adriano","adric","adriel","adrielle","adrien","adriene","adrienna","adrienne","adrin","adrina","adrion","adron","adryan","adwoa","aeisha","aerial","aerica","aeriel","aerika","aesha","afaf","afiya","afnan","africa","afshin","aftan","aften","aftin","afton","afua","agapito","agata","agatha","agnes","agnieszka","agostino","agron","agueda","agustin","agustina","agustine","aharon","ahlam","ahley","ahmad","ahmed","ahna","ahren","ahron","ahsha","ahslee","ahsley","ahuva","ai","aicia","aida","aidan","aide","aidee","aiden","aiesha","aigner","aiko","aileen","ailene","ailyn","aiman","aime","aimee","aimie","aimy","aina","aine","ainslee","ainsley","aira","aireal","airica","airiel","airika","aisa","aisha","aishah","aishia","aisling","aislinn","aislynn","aixa","aiyana","aiysha","aj","aja","ajani","ajay","ajeenah","ajene","ajit","akai","akash","akbar","akeem","akeen","akeia","akeila","akeim","akeisha","akela","akemi","akesha","akeya","akhil","aki","akia","akiko","akil","akila","akilah","akim","akina","akio","akira","akisha","akita","akiva","akram","akshay","akua","al","ala","alaa","alacia","aladdin","alaena","alain","alaina","alaine","alainna","alan","alana","alanah","alanda","alandis","alando","alandra","alandria","alane","alania","alanna","alannah","alaric","alastair","alauna","alaya","alayna","alayne","alba","alban","albany","albaro","albert","alberta","albertina","alberto","albin","albina","albino","alcides","alda","alden","alder","aldin","aldo","aldon","aldric","aldrich","aldrick","aldwin","alea","aleah","aleana","aleasha","aleatha","alec","alece","alechia","alecia","aleece","aleem","aleen","aleena","aleesa","aleese","aleesha","alegandro","alegra","aleia","aleida","aleigha","aleisa","aleisha","alejandra","alejandrina","alejandro","alejo","alek","aleka","aleksandar","aleksander","aleksandr","aleksandra","alen","alena","alene","alesa","alesander","alesandra","alesandro","alese","alesha","aleshia","alesia","alessa","alessandra","alessandro","alessia","aleta","aletha","alethea","aletheia","alethia","aletta","alex","alexa","alexan","alexandar","alexander","alexandera","alexanderia","alexandra","alexandre","alexandrea","alexandria","alexandrina","alexandro","alexandros","alexaner","alexas","alexcia","alexes","alexi","alexia","alexias","alexie","alexis","alexius","alexsander","alexsandra","alexsis","alexys","alexzander","alexzandra","alexzandria","aleya","aleyda","aleyna","alez","alfonse","alfonso","alfonza","alfonzo","alford","alfred","alfreda","alfredia","alfredo","alfredrick","algernon","algie","ali","alia","aliah","aliana","alica","alice","alicea","alicen","alicha","alichia","alicia","alicyn","alida","alie","aliea","aliecia","aliese","aliesha","alika","aliki","alim","alin","alina","aline","alireza","alis","alisa","alisah","aliscia","alise","alisen","alisha","alishea","alishia","alisia","alison","alissa","alisse","alissia","alisson","alistair","alister","alisyn","alita","alivia","alix","alixandra","alixandria","aliya","aliyah","aliza","alizabeth","alka","allah","allan","allana","allanna","allecia","allegra","allen","allena","allene","allesandra","allex","alli","allia","allicia","allie","allisa","allisen","allisha","allison","allissa","allisyn","allon","allona","allsion","ally","allyce","allycia","allyn","allysa","allyse","allysia","allyson","allyssa","alma","almadelia","almando","almarosa","almeda","almee","almetra","almon","alnisa","alok","alon","alona","alonda","alondra","alondria","alonia","alonna","alonso","alonza","alonzo","alora","aloysius","alpha","alphonse","alphonso","alphonzo","alsha","alsion","alston","alta","altagracia","altariq","alter","althea","alton","altonio","alva","alvaro","alven","alvie","alvin","alvina","alvino","alvis","alvita","alvon","alxis","aly","alyce","alycen","alycia","alyn","alynn","alys","alysa","alyse","alysen","alysha","alyshia","alysia","alyson","alyss","alyssa","alysse","alyssia","alysson","alyx","ama","amabel","amada","amadeo","amadeus","amado","amador","amal","amalia","amalie","amamda","aman","amana","amanada","amand","amanda","amandah","amandajo","amandeep","amandia","amando","amandra","amani","amanie","amantha","amar","amara","amari","amarilis","amarily","amarilys","amaris","amaryllis","amatullah","amaury","amaya","ambar","amber","ambera","amberdawn","amberia","amberle","amberlee","amberleigh","amberley","amberli","amberlie","amberly","amberlyn","amberlynn","ambermarie","amberrose","ambert","ambika","ambor","ambr","ambra","ambre","ambrea","ambreia","ambria","ambriel","ambrose","ambrosia","ambrosio","ambur","ambyr","amdrea","amdrew","ame","amee","ameen","ameena","ameer","ameera","ameerah","ameisha","ameka","amela","amelia","amelie","amelinda","amen","amena","amenda","amer","amera","america","americo","ames","amesha","ameshia","amethyst","amey","ami","amia","amie","amiee","amiel","amika","amilcar","amilia","amin","amina","aminah","aminda","aminta","amir","amira","amirah","amish","amisha","amit","amita","amity","amjad","ammanda","ammar","ammie","ammon","ammy","amna","amol","amon","amonda","amorette","amos","amparo","amr","amrit","amrita","amy","amye","amyjo","amylee","amylynn","amymarie","an","ana","anaalicia","anabel","anabell","anabelle","anacani","anahi","anahita","anai","anais","anaiz","analaura","analee","anali","analia","analicia","analiese","analisa","analise","analissa","analuisa","anamaria","anamarie","anamda","anan","anand","ananda","ananias","anas","anastacia","anastacio","anastasha","anastasia","anastasios","anastassia","anastazia","anatasia","anaya","anber","ancil","anda","andee","ander","andera","anders","anderson","andi","andice","andie","andra","andrae","andray","andraya","andre","andrea","andreah","andreal","andreana","andreanna","andreas","andree","andrei","andreia","andreika","andreina","andreka","andrell","andren","andrena","andres","andrew","andrewjames","andrews","andrey","andreya","andrez","andria","andrian","andriana","andrianna","andrica","andriea","andrienne","andrika","andrina","andris","andromeda","andron","andru","andrus","andrw","andrzej","andy","ane","anecia","anedra","aneesa","aneesah","aneesha","aneisha","aneka","anel","anela","anesa","anesha","aneshia","anesia","anessa","aneta","anetta","anette","angalena","angel","angela","angelamaria","angelamarie","angele","angelea","angelee","angelena","angelene","angeles","angelette","angeli","angelia","angelic","angelica","angelice","angelicia","angelie","angeligue","angelika","angelina","angeline","angelino","angelique","angelisa","angelise","angelita","angelito","angell","angella","angelle","angellica","angelo","angelos","angelyn","angie","angila","angle","anglea","anglia","anglica","angus","anh","anhthu","ani","ania","anibal","anica","aniceto","anicia","aniel","aniela","anielle","aniello","aniesha","anik","anika","anikka","anil","anina","anique","anis","anisa","anisah","anise","anish","anisha","anissa","anita","anitra","anitria","anival","anja","anjali","anjanette","anjani","anjel","anjela","anjelica","anjelina","anjoli","anjuli","anjulie","ankit","ankur","ann","anna","annaalicia","annabel","annabell","annabelle","annah","annais","annalea","annalee","annaleigh","annalicia","annaliese","annaliisa","annalisa","annalise","annalissa","annaliza","annalyn","annalynn","annamae","annamaria","annamarie","annamary","annarose","annastacia","annastasia","anndrea","anndria","anne","anneka","anneke","annel","anneli","annelies","anneliese","annelisa","annelise","annell","annemarie","annessa","annett","annetta","annette","anni","annia","annica","annice","annie","anniemarie","annika","annique","annisha","annissa","annita","annmarie","anntoinette","anny","annya","anorea","anothony","anquinette","anrew","ansel","anselmo","ansley","anson","antar","antasia","antavius","antawn","ante","antero","anterrio","anthea","anthoney","anthoni","anthonie","anthony","antigone","antion","antione","antionette","antionio","antionne","antiono","antjuan","antoin","antoine","antoinette","antoinne","antoino","anton","antone","antonea","antonella","antonette","antoni","antonia","antonie","antonieta","antonietta","antoniette","antonina","antonine","antonino","antonio","antonios","antonique","antonisha","antonius","antony","antonyo","antoria","antowan","antown","antoya","antroine","antron","antrone","antuan","antuane","antwain","antwaine","antwan","antwane","antwanette","antwann","antwaun","antwine","antwion","antwoin","antwoine","antwon","antwone","antwonette","antwuan","antwyne","anuj","anuja","anup","anupama","anwar","any","anya","aoife","aparna","apolinar","apollo","apollonia","apolonia","apolonio","apostolos","apphia","appollonia","appolonia","april","aprile","aprill","aprille","aprilmarie","apryl","apryle","apryll","aquanetta","aqueelah","aquil","aquila","aquilla","aquino","aquita","ara","arabella","arabia","araceli","aracelia","aracelis","aracely","arah","araina","aram","aramis","aran","aranda","araseli","arasely","arash","arben","arcadio","arcelia","arch","archana","archibald","archie","ardell","arden","ardith","ared","arek","areli","arelis","arely","arelys","aren","arena","aretha","argelia","argenis","argentina","argiro","ari","aria","ariadna","ariadne","arial","arian","ariana","ariane","ariann","arianna","arianne","aric","arica","arick","aricka","arie","arieal","ariel","ariela","ariele","ariell","ariella","arielle","arien","arienne","aries","arif","arifa","arik","arika","arin","arion","arionne","aris","arisa","arissa","arista","aristeo","aristides","aristotelis","aristotle","arjun","arjuna","ark","arla","arlan","arlana","arland","arlanda","arlando","arlee","arleen","arleigh","arlen","arlena","arlene","arleta","arletha","arletta","arlette","arley","arlicia","arlie","arlin","arlina","arlinda","arline","arlington","arlis","arlisha","arlo","arlon","arly","arlyn","arman","armand","armanda","armandina","armando","armel","armen","armida","armin","arminda","armon","armond","armondo","arnaldo","arne","arnecia","arnel","arnell","arnesha","arnetra","arnetta","arnie","arnisha","arnita","arno","arnold","arnoldo","arnulfo","aron","arpan","arran","arren","arrin","arrington","arron","arrow","arsenio","arshad","art","artavia","artavious","artavius","artemio","artemis","artemus","artesha","artesia","artez","arthur","arthuro","arti","artia","artie","artina","artis","artisha","artrice","artur","arturo","arun","aruna","arvell","arvin","arvind","arvis","arwa","arwen","arwyn","ary","arya","aryan","aryana","aryeh","aryn","asa","asad","asael","asaf","asante","ascencion","aser","asha","ashanta","ashante","ashanti","ashaunti","ashby","ashea","asheley","ashely","asher","ashey","ashford","ashia","ashira","ashish","ashiya","ashkan","ashla","ashlan","ashland","ashlay","ashle","ashlea","ashleah","ashlee","ashleen","ashlei","ashleigh","ashlely","ashlen","ashley","ashleyann","ashleyanne","ashleymarie","ashli","ashlie","ashliegh","ashlin","ashling","ashlley","ashly","ashlye","ashlyn","ashlyne","ashlynn","ashlynne","ashok","ashraf","ashten","ashtin","ashton","ashtyn","ashwin","asia","asiah","asif","asim","askia","asleigh","asley","asma","asmaa","asmar","ason","aspen","asti","astin","aston","astra","astrid","asucena","asusena","asya","atalie","atanacio","atara","atasha","atavia","athan","athanasia","athanasios","athea","atheena","athena","athenia","athina","athony","atia","atiba","atie","atif","atina","atisha","atiya","atlantis","atlas","atlee","atom","atonio","atoya","atreyu","atthew","attila","aubra","aubre","aubrea","aubree","aubrei","aubrey","aubri","aubrie","aubry","auburn","audel","audelia","audia","audie","audley","audra","audre","audrea","audree","audrey","audri","audria","audrianna","audrie","audrina","audry","august","augusta","augustin","augustina","augustine","augusto","augustus","aul","auna","aundra","aundre","aundrea","aundria","aunna","aura","aurea","aurelia","aureliano","aurelie","aurelio","auren","auriel","aurielle","aurora","austen","austin","austina","austine","auston","austyn","authur","autry","autum","autumn","ava","avalon","avani","avanti","ave","avel","avelina","avelino","aven","averi","averie","averill","avery","avi","avia","avian","aviance","avid","aviel","avigdor","avinash","avis","avital","aviv","aviva","avni","avon","avraham","avram","avril","avrohom","awilda","axel","aya","ayaka","ayana","ayanna","ayasha","ayde","aydee","aydin","ayelet","ayesha","ayeshia","ayinde","ayisha","ayla","ayleen","aylin","ayman","ayme","ayn","aynsley","ayodele","ayonna","ayse","aysha","aysia","ayumi","azad","azadeh","azalea","azalia","azariah","azia","azim","aziz","aziza","azizah","azra","azriel","azucena","azure","azusena","babajide","babak","babatunde","babette","baby","babyboy","babygirl","bach","bahar","bahareh","baila","bailee","bailey","bailie","baily","bakari","baker","baldemar","baldomero","balinda","baltazar","bambi","bambie","bandon","bandy","banesa","banessa","banjamin","bao","barak","barbara","barbarita","barbi","barbie","barbra","barclay","barett","bari","barkley","barnabas","barnaby","barney","baron","barret","barrett","barri","barrie","barrington","barron","barry","bart","bartholomew","bartlett","bartley","bartolo","barton","baruch","basel","bashan","bashar","basheer","bashir","basil","basilia","basilio","basim","basma","bassam","bassem","basya","bathsheba","batsheva","baudelia","baudelio","baudilio","baxter","bayan","baylee","bayley","baylie","baylor","beata","beatrice","beatris","beatrix","beatriz","beatrize","beau","beauregard","beaux","becca","beck","becki","beckie","becky","bedford","bee","beena","bejamin","bekim","bela","belal","belen","belicia","belinda","belkis","belkys","bella","belle","belynda","ben","benaiah","benajamin","benancio","benard","benedict","benigno","benisha","benita","benito","benjain","benjaman","benjamen","benjamim","benjamin","benjamine","benji","benjie","benjiman","benjmain","benn","bennet","bennett","bennie","benny","benoit","benson","bentley","bently","benton","bentzion","benuel","benzion","berenice","berenise","beret","berit","berkeley","berkley","berlin","berlinda","bernabe","bernadette","bernadine","bernard","bernardette","bernardino","bernardo","bernell","bernetta","bernhard","bernice","bernie","bernita","beronica","berry","bert","berta","bertha","bertin","bertina","berton","bertram","bertrand","beryl","bess","bessie","beth","bethaney","bethani","bethanie","bethann","bethanne","bethany","bethel","betheny","bethlehem","betina","betsaida","betsey","betsi","betsie","betsy","bette","betti","bettie","bettina","betty","bettye","bettyjo","betzaida","beulah","bevan","beverlee","beverley","beverly","bevin","bhavesh","bhavin","biagio","biana","bianca","bianka","bibi","bibiana","bich","bienvenido","bijal","bijan","bilal","bill","billi","billie","billiejean","billiejo","billijo","billy","billye","billyjack","billyjoe","bina","bindi","binh","binyamin","binyomin","bionca","biran","biridiana","bishop","bittany","bj","bjorn","blade","bladimir","blain","blaine","blair","blaire","blaise","blake","blakeley","blakely","blanca","blanche","blandon","blane","blas","blase","blayne","blaze","blia","blima","blimie","bliss","blong","blossom","blythe","bo","boaz","bob","bobak","bobbi","bobbie","bobbiejo","bobbiesue","bobbijo","bobby","bobbye","bobbyjo","bobi","bobie","bodie","boe","bolivar","bon","bond","bonifacio","bonita","bonner","bonni","bonnie","bonny","booker","boone","bora","borden","boris","boruch","boston","bowen","bowman","boy","boyce","boyd","bracha","brack","bracken","brad","bradd","braden","bradey","bradford","bradi","bradie","bradlee","bradley","bradly","bradon","brady","brae","braeden","braedon","braheem","braiden","brain","bram","branch","brand","branda","brandace","brandalyn","brandalynn","brandan","brande","brandee","brandeis","brandelyn","branden","brandenn","brandey","brandi","brandice","brandie","brandii","brandilee","brandilyn","brandilynn","brandin","brandis","brandley","brandn","brando","brandolyn","brandom","brandon","brandonlee","brandonn","brandt","brandun","brandy","brandyce","brandye","brandylee","brandyn","branigan","brannan","branndon","brannen","brannigan","brannon","branon","branson","brant","brantley","branton","braulio","braun","braxton","bray","brayan","brayden","braydon","braylon","brayton","bre","brea","breah","brean","breana","breanda","breane","breann","breanna","breanne","breaunna","breck","brecken","breda","bree","breean","breeana","breeann","breeanna","breeanne","breena","breeze","breezie","breezy","breia","breianna","breigh","breland","bren","brena","brenae","brenan","brenda","brendalee","brendalis","brendaliz","brendan","brenden","brendi","brendin","brendon","brendt","brendy","brenee","brenen","brenin","brenna","brennan","brennen","brenner","brennon","brent","brenten","brentin","brentley","brently","brenton","brentt","brentton","brentyn","breon","breona","breonna","bresha","bret","bretney","breton","brett","brettany","brette","brettney","bretton","brewster","breyon","bri","bria","briam","brian","briana","brianca","briane","briann","brianna","brianne","briannon","briant","briar","brice","brick","bridger","bridget","bridgett","bridgette","bridgid","bridgit","bridgitte","bridney","brie","brieana","brieann","brieanna","brieanne","brielle","brien","brienna","brienne","briget","brigett","brigette","brigham","brighid","brigid","brigida","brigit","brigitte","brihany","brin","brina","brinda","brindy","brinkley","brinson","brint","brinton","brion","briona","brionna","brionne","brisa","briseida","brison","bristol","briston","brit","brita","britain","britainy","britaney","britani","britanie","britanny","britany","britian","britiany","britiney","britini","british","britne","britnee","britnei","britney","britni","britnie","britny","briton","britt","britta","brittain","brittainy","brittan","brittane","brittanee","brittaney","brittani","brittania","brittanie","brittanni","brittanny","brittant","brittany","brittay","britten","britteney","britteny","brittiany","brittin","brittiney","brittini","brittinie","brittiny","brittnay","brittne","brittnee","brittnei","brittney","brittni","brittnie","brittny","brittnye","britton","brittony","briza","brnadon","brndon","broadus","broc","brocha","brock","brockton","broderick","brodey","brodi","brodie","brodrick","brody","brogan","brok","bron","brondon","bronson","bronston","bronwen","bronwyn","brook","brooke","brookelyn","brookelynn","brookes","brooklin","brooklyn","brooklynn","brooks","bruce","brucha","bruna","bruno","brya","bryan","bryana","bryann","bryanna","bryanne","bryant","bryce","brycen","bryceson","bryden","bryen","bryheem","bryn","bryna","bryne","brynn","brynna","brynne","bryon","bryony","brysen","bryson","bryston","brytney","brytni","bryton","bryttani","bryttany","bubba","buck","buckley","bucky","bud","buddy","buffie","buffy","buford","bulmaro","bunny","burak","burgandy","burgess","burke","burl","burnell","burt","burton","bushra","buster","butch","byan","byanca","byran","byrant","byron","cabrina","cacey","cachet","cacia","cade","caden","cadence","cadi","cadie","cady","caela","caesar","cagney","caila","cailen","cailey","cailin","cailyn","cain","cainan","caine","caitlan","caitland","caitlen","caitlin","caitlyn","caitlynn","caitrin","cal","cala","calab","calah","calais","calan","calandra","calder","cale","caleb","calee","caleen","caleigh","calem","calen","calena","caley","cali","calib","calie","calin","calina","calisha","calissa","calista","calixto","calla","callahan","callan","calle","callee","callen","calley","calli","callie","calliope","callista","callum","cally","calogero","calum","calvert","calvin","calvina","caly","calyn","calysta","cam","camacho","camala","camara","camarie","camaron","camber","cambri","cambria","camden","camdon","cameisha","camela","camelia","camella","camelle","camellia","cameo","cameron","camesha","camey","cami","camia","camie","camielle","camila","camile","camilia","camilla","camille","camillia","camilo","camisha","cammeron","cammi","cammie","cammy","campbell","camron","camry","camryn","camy","can","canaan","canda","candace","candance","candas","candase","candee","candelaria","candelario","candi","candia","candiace","candias","candice","candida","candido","candie","candies","candis","candise","candiss","candra","candrea","candus","candy","candyce","candyse","canesha","canisha","cannon","canon","cantrell","capri","capria","caprice","capricia","caprisha","cara","carah","caralee","caraline","caralyn","caralynn","cardell","caree","careen","caren","carena","caressa","caresse","carey","cari","cariann","carianne","caridad","carie","carilyn","carime","carin","carina","carine","carinna","carinne","caris","carisa","carisma","carissa","carissia","carita","carl","carla","carlea","carlee","carleen","carleigh","carlen","carlena","carlene","carles","carlesha","carletha","carleton","carletta","carlette","carley","carli","carlie","carlin","carlina","carline","carling","carlis","carlisa","carlise","carlisha","carlisle","carlissa","carlita","carlito","carlo","carlon","carlos","carlota","carlotta","carlson","carlton","carlus","carly","carlye","carlyle","carlyn","carlyne","carlynn","carma","carmalita","carman","carmel","carmela","carmelia","carmelina","carmelita","carmella","carmelle","carmelo","carmen","carmencita","carmesha","carmilla","carmin","carmina","carmine","carmisha","carmon","carnelius","carnell","carnella","carnesha","carnisha","carol","carola","carolan","carolann","carolanne","carole","carolee","carolin","carolina","caroline","carolos","carols","carolyn","carolyne","carolynn","caron","caros","carra","carrell","carrera","carressa","carri","carrianne","carrie","carrieann","carrieanne","carrin","carrington","carrisa","carrissa","carrol","carroll","carry","carsen","carson","carter","cartez","cartier","cartney","cartrell","carvell","carvin","cary","caryl","caryn","cas","casandra","casanova","casaundra","case","casee","casey","cash","casha","casi","casia","casidy","casie","casimir","casimiro","cason","casondra","caspar","casper","cass","cassadie","cassady","cassandra","cassandre","cassandria","cassaundra","cassee","cassey","cassi","cassia","cassidee","cassidi","cassidie","cassidy","cassie","cassiopeia","cassity","cassius","cassondra","cassy","casy","catalina","catalino","catarina","catarino","cate","catelin","catelyn","caterina","caterine","catharine","catherin","catherina","catherine","cathern","catheryn","catheryne","cathi","cathleen","cathlena","cathlene","cathlin","cathlyn","cathrine","cathryn","cathryne","cathy","catie","catina","catiria","catlin","catlyn","caton","catoya","catrell","catrena","catrice","catricia","catrina","catrinia","catriona","catya","cavan","cavin","cayce","caycee","cayci","caycie","cayetano","cayla","caylan","cayle","caylee","cayley","caylie","caylin","cayman","ceaira","ceara","ceasar","ceasare","ceaser","cecelia","cecil","cecila","cecile","cecilia","cecilio","cecille","cecillia","cecily","cedar","ceddrick","cederic","cederick","cedric","cedrick","ceilia","ceira","ceirra","celena","celene","celenia","celes","celest","celesta","celeste","celestia","celestial","celestina","celestine","celestino","celia","celicia","celina","celinda","celine","celines","celisa","celise","celisse","celso","cena","cendy","cephas","cera","cerena","ceri","ceria","cerina","cerise","cerissa","cerita","cerra","cerrissa","cesar","cesario","cesilia","cezar","cha","chablis","chace","chad","chadae","chadd","chaddrick","chade","chadley","chadney","chadric","chadrick","chadwick","chae","chaela","chai","chaia","chaim","chais","chaise","chaka","chakia","chakira","chakita","chala","chalea","chalee","chalese","chaley","chalice","chalise","chalmers","chalon","chalsea","chameka","chamia","chamika","champagne","chamroeun","chan","chana","chanae","chanay","chanc","chance","chancellor","chancelor","chancey","chancie","chancy","chanda","chandara","chandel","chandell","chandelle","chandi","chandler","chandni","chandra","chandrea","chandria","chane","chanee","chaneka","chanel","chanele","chanell","chanelle","chanequa","chanette","chaney","chang","chanh","chani","chanice","chanie","chanielle","chanika","chaniqua","chanique","chanita","channa","channah","channel","channell","channelle","channie","channin","channing","channon","channy","chans","chanse","chanta","chantae","chantal","chantale","chantalle","chantay","chante","chantea","chantee","chantel","chantele","chantell","chantelle","chantha","chantia","chantil","chantile","chantille","chantilly","chantrice","chantry","chantz","chao","chapin","chaquana","chaquetta","chaquita","chara","charae","charda","chardae","chardai","charday","charde","chardee","chardonnay","charece","charee","charell","charelle","charels","charese","chari","charice","charika","charina","charis","charisa","charise","charish","charisha","charisma","charissa","charisse","charistopher","charita","chariti","charitie","charity","charla","charlana","charle","charlee","charleen","charleigh","charlena","charlene","charles","charlese","charlesetta","charleston","charlet","charleton","charlett","charletta","charlette","charley","charli","charlie","charlina","charline","charlisa","charlise","charlisse","charlita","charlotta","charlotte","charls","charlsey","charlsie","charlton","charly","charlye","charlyn","charlynn","charmagne","charmain","charmaine","charmane","charmayne","charmel","charmin","charna","charnae","charnay","charnee","charnell","charnelle","charnette","charnise","charnita","charolette","charon","charonda","charquita","charron","charta","charvis","charyl","chas","chasady","chase","chasen","chasidi","chasidy","chasiti","chasitie","chasitty","chasity","chason","chassidy","chassie","chassity","chasta","chastidy","chastine","chastity","chaston","chasya","chatara","chatherine","chatoya","chau","chaun","chauna","chauncey","chauncy","chaundra","chaunta","chauntae","chauntay","chaunte","chauntel","chauntelle","chava","chavez","chavis","chavon","chavonne","chawn","chay","chaya","chaye","chayla","chayna","chayne","chayse","chaz","chazz","che","chea","chealsey","chee","cheena","cheetara","cheila","chela","chelcee","chelcey","chelci","chelcie","chelcy","chelesa","chelia","chelisa","chelise","chella","chelle","chelsa","chelsae","chelse","chelsea","chelsee","chelsey","chelsi","chelsia","chelsie","chelsy","chemeka","chemere","chemise","chena","chenay","chenel","chenell","chenelle","cheng","chenika","chenille","chenin","chenise","chenita","chennell","chenoa","chequita","cher","chera","cherae","chere","cheree","chereese","cherell","cherelle","cheresa","cherese","cheri","cheria","cherice","cherie","cherika","cherilyn","cherina","cheris","cherisa","cherise","cherish","cherissa","cherisse","cherita","cherith","cherity","cherly","cherlyn","chermaine","cherokee","cheron","cherree","cherrell","cherrelle","cherri","cherrie","cherrise","cherrish","cherron","cherry","chery","cheryl","cherylann","cherylanne","cheryle","cherylee","cheryll","cherylyn","cherylynn","cheskel","chesley","cheslie","chesney","chessa","chessica","chessie","chester","cheston","chet","chetan","chett","chevelle","chevis","chevon","chevonne","chevy","chey","cheyanna","cheyanne","cheyenna","cheyenne","cheyla","cheyne","chez","chi","chia","chiante","chianti","chiara","chico","chidi","chiffon","chika","chikara","chike","chiketa","chikita","chima","chimera","chimere","chimira","china","chinda","chinedu","chinedum","chinenye","ching","chinita","chino","chinwe","chinyere","chioma","chip","chiquetta","chiquita","chiquitta","chirag","chirstina","chirstopher","chisholm","chistian","chistina","chistopher","chisty","chisum","chitara","chivas","chivon","chivonne","chloe","chole","chong","chonte","chontel","choua","chris","chrisandra","chriselda","chrishanna","chrishawn","chrisina","chrislyn","chrisma","chrisopher","chrisotpher","chrissa","chrissie","chrissy","christ","christa","christabel","christain","christal","christalle","christalyn","christan","christana","christanna","christapher","christe","christee","christeen","christeena","christel","christella","christelle","christen","christena","christene","christepher","christerpher","christey","christhoper","christi","christia","christiaan","christian","christiana","christiane","christiann","christianna","christianne","christie","christien","christifer","christin","christina","christinamarie","christine","christinea","christinia","christinna","christion","christiopher","christipher","christle","christmas","christna","christne","christobal","christofer","christoffer","christoher","christohper","christol","christon","christoper","christoph","christophe","christopher","christophere","christopherlee","christophor","christophr","christorpher","christos","christpher","christpoher","christropher","christy","christyl","christyn","christyna","christyne","chrisy","chritina","chritopher","chrles","chrsitopher","chrstina","chrstopher","chrysta","chrystal","chrystel","chrystie","chrystina","chrystine","chrystle","chrystopher","chuck","chuckie","chudney","chue","chukwuemeka","chukwuma","chung","chuong","chyanne","chyla","chyvonne","ciaira","cian","ciana","ciara","ciarra","cicely","cicero","cicily","cidney","cieara","ciearra","cielo","ciera","cierra","cigi","ciji","cilia","cilicia","cimarron","cimberly","cinda","cindel","cindi","cindia","cindra","cindy","cinnamon","cinthia","cinthya","cintia","cipriano","cira","cirilo","ciro","cisco","cj","claiborne","clair","claire","clairissa","clancy","clara","clarance","clare","clarence","claressa","claribel","clarice","clarie","clarinda","clarisa","clarise","clarissa","clarisse","clarivel","clark","clarke","clarrisa","clarrissa","classie","claud","claude","claudell","claudette","claudia","claudie","claudina","claudine","claudio","claudius","claudy","clavin","clay","clayborn","clayborne","clayton","clea","cleavon","clelia","clem","clement","clemente","clementina","clementine","clemmie","clemon","clent","clenton","cleo","cleofas","cleon","cleopatra","cleophus","cleotha","clera","cletis","cletus","cleve","cleveland","clevon","cliff","clifford","cliffton","clifton","clint","clinten","clintin","clinton","clive","cloe","clorinda","clorissa","clover","clovis","clyde","cobin","coby","cochise","coco","coda","codey","codi","codie","cody","colan","colbert","colbey","colbi","colbie","colburn","colby","cole","coleby","coleen","coleman","colena","colene","coleton","coletta","colette","coley","colin","colisha","colleen","collen","collene","collette","collin","collins","collis","collyn","colm","colon","colson","colt","colten","colter","colton","columbus","colvin","colwyn","colyn","comfort","conan","conard","concepcion","concetta","conchetta","conchita","cong","conley","connan","connell","conner","conni","connie","connor","conor","conrad","conrado","conroy","consepcion","constance","constancia","constantina","constantine","constantino","constantinos","consuela","consuella","consuelo","contessa","contina","conway","cooper","cora","coral","coralee","coralia","coralyn","corban","corbett","corbin","corby","cord","cordale","corday","cordelia","cordell","cordia","cordney","coree","coreen","coreena","coren","corena","corene","coretta","corey","cori","corian","corianna","corianne","corie","corin","corina","corinda","corine","corinn","corinna","corinne","corinthia","corinthian","corion","corissa","corita","corky","corley","cormac","corneilius","corneilus","corneisha","cornel","cornelia","cornelio","cornelious","cornelius","cornell","cornellius","cornesha","corney","cornisha","correen","correna","correy","corri","corrie","corrin","corrina","corrine","corrinne","corrissa","corry","corryn","cort","cortez","cortina","cortland","cortlandt","cortne","cortnee","cortney","cortni","cortnie","corvetta","corvette","corwin","corwyn","cory","corydon","coryn","corynn","corynne","cosima","cosme","cosmo","costas","coti","coty","coulter","countney","courey","courney","courntey","courtenay","courteney","courteny","courtland","courtnay","courtne","courtnee","courtnei","courtney","courtni","courtnie","courtny","coury","coutney","covey","coy","craig","craige","craigory","crandall","cranston","craven","crawford","creed","creg","cregg","creig","creighton","crescencio","crescentia","cresencio","cressie","creston","crhistopher","criag","cricket","crickett","crimson","cris","criselda","crispin","crissie","crissy","crist","crista","cristabel","cristal","cristan","cristel","cristela","cristen","cristhian","cristi","cristian","cristiana","cristie","cristin","cristina","cristine","cristinia","cristino","cristle","cristo","cristobal","cristofer","cristopher","cristoval","cristy","cristyn","crosby","cruz","crysal","crysta","crystal","crystalann","crystale","crystalee","crystalina","crystall","crystalle","crystallynn","crystalmarie","crystalrose","crystalyn","crystalynn","crystel","crystella","crystelle","crysten","crysti","crystie","crystin","crystina","crystle","crystol","crytal","cuauhtemoc","cullen","cuong","curits","curley","curran","currie","curry","curt","curtis","curtisha","curtiss","curtissa","curtrina","cushena","cutberto","cutler","cutter","cuyler","cy","cyara","cybil","cybill","cydnee","cydney","cydni","cyle","cyler","cynda","cyndal","cyndel","cyndi","cyndia","cyndy","cynethia","cynthia","cynthiaann","cynthis","cyntia","cyra","cyrena","cyrene","cyril","cyrstal","cyrus","cystal","cythia","cythina","czarina","da","daarina","dace","dacey","dacia","dacian","dadrian","daemon","daena","daesha","daffany","daffney","dafina","dagan","dagmar","dagny","dagoberto","dahlia","dai","daiana","daid","daiel","daielle","dain","daina","daine","dainelle","daira","daisey","daisha","daisi","daisy","daivd","daja","dajon","dajuan","dakesha","dakisha","dakota","dakotah","dal","dala","dalaina","dalal","dalan","dalana","dale","daleena","dalen","dalena","dalene","dalesia","daley","dalia","dalila","dalilah","dalin","dalina","dalisa","dalisha","dallan","dallas","dallen","dallin","dallis","dallon","dalon","dalton","dalvin","dalya","dalyn","dam","damali","daman","damany","damar","damara","damarcus","damario","damaris","damarius","damarys","damein","dameion","dameka","damen","dameon","damesha","dametria","damian","damiana","damiano","damica","damico","damiel","damien","damika","damin","damion","damita","dammon","damon","damond","damone","damonica","damonique","damont","damorris","dan","dana","danae","danah","danamarie","danay","danaya","dandra","dandre","dandrea","dandrell","dane","danea","danecia","danee","daneen","daneil","daneille","daneisha","danel","danell","danella","danelle","danen","danesa","danesha","daneshia","danessa","danetta","danette","dang","dangela","dangelo","danh","dani","dania","danial","danialle","danica","danice","danicia","danie","daniel","daniela","daniele","daniell","daniella","danielle","daniels","daniesha","danika","danil","danile","danille","danilo","danina","danique","danise","danisha","danita","danitra","danitza","dann","danna","dannah","danne","dannel","dannelle","dannette","danni","dannica","dannie","danniel","danniell","danniella","dannielle","dannon","danny","danon","danta","dantae","dantavius","dante","danthony","danton","dantrell","danuel","dany","danya","danyal","danyale","danyeal","danyel","danyele","danyell","danyella","danyelle","danyetta","danyl","danyle","danylle","dao","daphane","daphanie","daphine","daphna","daphne","daphnee","daphney","daphnie","daquan","daquita","dara","darah","daralyn","daran","darbi","darbie","darby","darcee","darcel","darcell","darcelle","darcey","darchelle","darci","darcie","darcus","darcy","darean","darek","darel","darell","darelle","daren","darenda","daria","darian","dariana","daric","darice","darick","dariel","darielle","darien","darik","darilyn","darin","darina","dario","darion","darious","daris","darius","darivs","darl","darla","darleen","darlena","darlene","darline","darling","darly","darlyn","darnel","darnell","darnella","darnelle","darnesha","darneshia","darnetta","darnisha","darold","daron","darra","darrah","darral","darran","darrel","darrell","darrelle","darren","darrian","darrick","darriel","darrien","darrik","darril","darrin","darrio","darrion","darrious","darris","darrius","darrly","darrnell","darrol","darroll","darron","darrow","darry","darryl","darryle","darryll","darryn","darshan","dartagnan","dartanian","dartanion","daruis","darus","darvin","darvis","darwin","darwyn","dary","darya","daryl","daryle","daryll","daryn","dasean","dasha","dashan","dashanna","dashaun","dashawn","dashawna","dashell","dashelle","dashia","dashiell","dashon","dashonda","dasia","dasmond","dat","dathan","datron","daunte","dava","davalyn","davan","davarius","davaughn","dave","daved","davell","daven","davena","daveon","davetta","davette","davey","davi","davia","davian","david","davida","davide","davidlee","davidmichael","davidson","davie","daviel","davielle","davien","davier","davin","davina","davinia","davion","davis","davit","davita","davon","davona","davonda","davone","davonna","davonne","davonte","davy","dawan","dawana","dawanda","dawanna","dawaun","dawayne","dawn","dawna","dawne","dawnell","dawnelle","dawnetta","dawnette","dawnielle","dawnisha","dawnmarie","dawnya","dawnyel","dawon","dawson","dawud","dawyne","dax","daya","dayana","dayanna","dayla","daylan","dayle","dayleen","daylene","daylin","daylon","daymon","daymond","dayn","dayna","dayne","dayon","dayra","daysha","daysi","dayton","daytona","daytron","dayvon","de","dea","deacon","deadra","deadrick","deamber","dean","deana","deandra","deandrae","deandre","deandrea","deandrew","deandria","deane","deangela","deangelo","deangleo","deanglo","deann","deanna","deanndra","deanne","deante","deanthony","deanza","deara","dearl","dearon","deatra","deatrice","deaundra","deaundre","deaunte","deaven","debbi","debbie","debby","debi","debora","deborah","debra","debrah","debralee","debrina","debroah","decarlo","decarlos","december","declan","dede","dedra","dedric","dedrick","dee","deeana","deeandra","deeann","deeanna","deeanne","deedee","deedra","deena","deepa","deepak","deerica","deidra","deidre","deidrea","deion","deirdra","deirdre","deisha","deisi","deisy","deitra","deja","dejah","dejan","dejaun","dejon","dejuan","dejuane","deke","dekendrick","dekota","del","dela","delaina","delaine","delana","delance","delane","delaney","delania","delanie","delano","delante","delawrence","delayna","delbert","deldrick","delecia","deleena","delena","deleon","delfin","delfina","delfino","delia","deliah","delicia","delight","delila","delilah","delina","delinda","delio","delisa","delise","delisha","delissa","deljuan","dell","della","delma","delmar","delmas","delmer","delmi","delmon","delmy","delois","delon","delonna","delonta","delontae","delonte","delora","delorean","deloren","delores","deloria","deloris","delphia","delphina","delphine","delray","delrico","delroy","delta","delton","delvin","delvon","delwin","delwyn","delyla","delynn","demar","demarco","demarcus","demareo","demario","demarion","demaris","demarius","demarko","demarkus","demarques","demarquis","demarr","demarrio","demeatrice","demecia","demeka","demerick","demerius","demesha","demetra","demetre","demetreus","demetri","demetria","demetrias","demetric","demetrice","demetrick","demetrie","demetrio","demetrios","demetrious","demetris","demetrius","demetruis","demetrus","demian","demichael","demika","demisha","demita","demitra","demitri","demitris","demitrius","demitrus","demon","demond","demone","demonica","demont","demonta","demonte","demorio","demorrio","demorris","dempsey","dena","denae","denard","denay","dene","denea","denean","denecia","denee","deneen","deneice","deneisha","denelle","denene","denese","denesha","deneshia","denessa","denetra","denetria","denia","denica","denice","denicia","deniece","denielle","deniesha","denika","denina","denine","deniqua","denis","denisa","denise","denisha","denishia","denisia","denisse","denita","denitra","deniz","denna","dennie","dennis","dennise","dennisha","dennison","denny","dennys","deno","denon","denorris","densie","denson","denton","denver","denyce","denys","denyse","denzel","denzil","deon","deona","deondra","deondrae","deondre","deondria","deone","deonica","deonna","deonta","deontae","deontay","deonte","deontra","deontrae","deontray","depaul","dequan","dequana","dequarius","dequincy","der","derak","derald","deran","deray","dereck","derek","dereka","derel","derell","derelle","deren","derian","deric","derica","derick","dericka","derik","derika","derin","derion","derius","derk","deron","derral","derreck","derrek","derrel","derrell","derrelle","derren","derrian","derric","derrica","derrick","derricka","derrico","derrik","derrill","derrin","derrion","derrious","derris","derrius","derron","derry","derryck","derryl","derwin","deryck","deryk","deryl","desa","desarae","desaray","desaree","desarie","desean","deserae","deseray","desere","deserea","deseree","deserie","desha","deshae","deshan","deshana","deshanda","deshane","deshanna","deshannon","deshaun","deshauna","deshawn","deshawna","deshay","deshon","deshonda","deshondra","deshonna","deshun","deshunda","deshundra","desi","desiderio","desira","desirae","desirai","desiray","desire","desirea","desiree","desirie","desirre","desma","desmon","desmond","desmone","desmund","despina","dessa","dessie","dessirae","desta","destani","destanie","destany","desteny","destin","destine","destinee","destiney","destini","destinie","destiny","destry","detoya","detra","detric","detrice","detrick","detron","deundra","deva","deval","devan","devario","devaris","devarus","devaughn","develle","deven","devery","devi","devika","devin","devina","devine","devion","devita","devlin","devon","devona","devonda","devone","devonn","devonna","devonne","devonta","devonte","devora","devorah","devoris","devra","devri","devron","devyn","dewaine","dewan","dewana","dewanda","dewarren","dewaun","dewayne","dewey","dewight","dewitt","dewon","dex","dexter","dexton","deyanira","deyonna","deysi","dezarae","dezaray","dezaree","dezerae","dezeray","dezirae","deziree","dezman","dezmon","dezmond","dezra","dhara","dhyana","dia","diadra","diahann","diamantina","diamon","diamond","dian","diana","diandra","diandre","diandrea","diandria","diane","diangelo","dianira","diann","dianna","dianne","diante","diara","diaz","dick","dickie","didi","didier","diedra","diedre","diego","diem","diera","dierdre","dierre","diesha","dieter","dietra","dietrich","digna","dijon","dijuan","dilan","dilcia","dillan","dillion","dillon","dimas","dimetrius","dimitra","dimitri","dimitrios","dimitris","dimitrius","dimple","dina","dinah","dinelle","dinero","dinesh","dinesha","dinh","dinisha","dinita","dinna","dino","dinora","dinorah","dion","diona","diondra","diondre","dione","dionicia","dionicio","dionisia","dionisio","dionisios","dionna","dionne","dionta","diontae","dionte","dior","dipesh","dirk","diseree","dishawn","dishon","distin","diva","divina","divine","divya","dixie","dixon","dj","djuan","djuana","dmarcus","dmario","dmitri","dnaiel","dnaielle","dniel","doanld","doc","dock","dodie","dolan","dollie","dolly","dolores","domanic","domanique","domenic","domenica","domenick","domenico","domenik","domenique","dominee","dominek","domineque","dominga","domingo","domingue","domini","dominic","dominica","dominick","dominie","dominigue","dominik","dominika","dominiqua","dominique","domino","dominque","dominquie","domique","domminic","dommonique","domnique","domonic","domonick","domonigue","domonique","domonque","don","dona","donae","donal","donald","donathan","donato","donavan","donaven","donavin","donavon","dondi","dondra","dondrea","dondrell","donecia","doneisha","donel","donell","donella","donelle","donesha","doneshia","donetta","dong","doni","donia","donica","donicia","doniel","donielle","doniesha","donika","doninique","donisha","donita","donivan","donn","donna","donnamarie","donnavan","donnel","donnell","donnelle","donnesha","donnetta","donnette","donnica","donnie","donnielle","donnis","donnisha","donnita","donny","donovan","donovin","donovon","donta","dontae","dontarius","dontavious","dontavis","dontavius","dontay","dontaye","donte","dontee","dontez","dontrail","dontray","dontre","dontrell","donvan","donya","donyea","donyell","donyelle","donyetta","donzell","dora","doran","doray","dorcas","doreen","dorell","dorene","doretha","dori","doria","dorian","dorianne","dorie","dorien","dorina","dorinda","dorine","dorion","doris","dorissa","dornell","doron","dorota","dorothea","dorothy","dorrell","dorrian","dorrie","dorsey","dorthea","dorthy","dory","dottie","doua","doug","douglas","douglass","dov","dove","dovid","dovie","doyal","doyle","dragan","drake","draper","dray","drayton","dreama","drema","dreux","drew","drexel","drey","dru","drue","drusilla","drystal","dshawn","duan","duana","duane","duante","duc","dudley","dugan","dujuan","duke","dulce","dulcie","dulse","duncan","dung","dunia","dunte","duong","dupree","duran","durand","durant","durel","durell","durelle","duriel","duron","durrel","durrell","durwin","dushawn","dustan","dustee","dusten","dusti","dustie","dustin","dustina","dustine","dustn","duston","dustun","dusty","dustyn","dutch","duval","duwan","duwayne","duy","duyen","dvid","dwain","dwaine","dwan","dwana","dwane","dwanna","dward","dwaun","dwayne","dwight","dwon","dwyane","dyamond","dyan","dyana","dyane","dyann","dyanna","dyanne","dyesha","dylan","dylon","dyna","dynasty","dynisha","dyrell","dyron","dyshaun","dyshawn","dyson","dystany","dywane","eamon","eamonn","ean","earl","earle","earlene","earline","earlisha","early","earnest","earnestine","earnie","earvin","eason","easter","easton","eather","eban","ebany","eben","eberardo","ebone","ebonee","eboney","eboni","ebonie","ebonique","ebonne","ebony","ebonye","echo","echoe","ector","ed","eda","edan","edana","edd","eddie","eddrick","eddy","edel","edelmira","edelmiro","eden","eder","edgar","edgard","edgardo","edi","ediberto","edie","edilberto","edin","edina","edison","edith","edlin","edlyn","edmon","edmond","edmund","edmundo","edna","edoardo","edouard","edrian","edric","edrick","edsel","edson","eduard","eduardo","edurdo","edvardo","edwar","edward","edwardo","edwin","edwina","edwrd","edwyn","edy","edythe","effie","effrey","efraim","efrain","efram","efrat","efrem","efren","egan","ehab","ehren","eian","eileen","eilene","eiman","ein","einar","eira","eisha","eitan","eizabeth","ej","ekaterina","ekaterini","eladio","elaina","elaine","elam","elan","elana","elanda","elane","elayna","elayne","elba","elbert","elbia","elbony","elchonon","elda","elden","elder","eldon","eldra","eldred","eldrick","eldridge","eleana","eleanor","eleanora","eleanore","elease","eleasha","eleazar","elecia","electa","electra","eleena","eleesha","eleftheria","eleisha","elektra","elen","elena","eleni","elenita","elese","elesha","eleshia","elessa","elexis","elgin","eli","elia","eliabeth","eliah","eliana","eliane","elias","eliazar","eliberto","elica","elice","eliceo","elicia","elida","elidia","elie","eliel","eliesha","eliezer","eligah","eligio","elihu","elija","elijah","elijio","elimelech","elin","elina","elinor","elio","eliot","eliott","elis","elisa","elisabel","elisabet","elisabeth","elisabetta","elisah","eliscia","elise","elisebeth","eliseo","elisha","elisheba","elisheva","elishia","elisia","elissa","elisse","elita","eliu","eliud","eliyahu","eliz","eliza","elizabath","elizabeht","elizabet","elizabeth","elizabethann","elizabethanne","elizabth","elizaeth","elizbeth","elizebeth","elizet","elizibeth","elke","ella","ellana","elle","ellen","ellena","ellery","elli","ellice","ellie","elliot","elliott","ellis","ellisa","ellise","ellisha","ellison","ellissa","ellsworth","elly","ellyn","ellyse","elma","elmer","elmo","elmore","elnora","elodia","eloisa","eloise","elon","elona","elonda","elonzo","elouise","eloy","elpidio","elric","elroy","elsa","elsbeth","elsie","elson","elspeth","elston","elsy","elton","eluterio","elva","elvera","elvia","elvin","elvina","elvira","elvis","elwin","elwood","ely","elya","elyce","elycia","elysa","elysabeth","elyse","elysha","elysia","elyssa","elysse","elzabeth","elzie","ema","emad","emalee","eman","emanual","emanuel","emanuela","ember","emberly","emeka","emelda","emelia","emelie","emelina","emeline","emely","emerald","emerson","emery","emi","emigdio","emiko","emil","emile","emilee","emileigh","emilene","emiley","emili","emilia","emiliano","emilie","emilio","emillie","emilly","emily","emilyann","emilyanne","emilyn","emilyrose","emma","emmalee","emmaline","emmalynn","emmanual","emmanuel","emmanuela","emmanuell","emmanuella","emmanuelle","emmauel","emmeline","emmet","emmett","emmie","emmily","emmitt","emmy","emmylou","emory","emre","emy","emylee","ena","enas","endia","endre","endy","endya","enedina","eneida","english","enid","enio","enjoli","enjolie","enmanuel","enna","ennifer","ennis","enoc","enoch","enos","enrica","enrico","enrigue","enrique","enriqueta","enrrique","enza","enzo","eoin","eon","ephraim","ephriam","epifanio","equan","era","eran","erasmo","ercia","erek","ereka","eren","erendida","erendira","erez","eri","eria","eriberto","eric","erica","ericberto","ericca","erice","erich","ericha","ericia","erick","ericka","erickson","erico","ericson","erie","erienne","erik","erika","erikka","eriko","erin","erina","erineo","erinn","erinne","eris","eriverto","erkan","erlin","erlinda","erma","ermelinda","erminia","ernesha","ernest","ernestina","ernestine","ernesto","ernie","ernst","erol","eron","erric","errica","errick","erricka","errik","errika","errin","errol","erroll","erron","erskine","erum","ervey","ervin","erving","erwin","eryca","eryk","eryka","eryn","erynn","esau","esdras","esequiel","esgar","esha","esi","esiquio","esmael","esme","esmeralda","esmerelda","esmond","esperansa","esperanza","essence","essica","essie","esta","estaban","estanislao","esteban","estee","estefana","estefani","estefania","estefany","estela","estella","estelle","estephanie","ester","estera","estevan","esteven","esthela","esther","eston","estrella","estrellita","estuardo","etan","ethan","ethel","ethen","etienne","etosha","etoya","etta","etty","eugena","eugene","eugenia","eugenie","eugenio","eugina","eula","eulalia","eulalio","eulanda","eulogio","eun","eunice","eunique","eureka","eusebio","eustacia","eva","evagelia","evalina","evalyn","evamarie","evan","evander","evangela","evangelia","evangelina","evangeline","evangelos","evann","evans","evaristo","eve","evelena","evelia","evelin","evelina","eveline","evelio","evely","evelyn","evelyne","evelynn","evens","ever","everardo","everet","everett","everette","everson","evert","everton","evertt","evett","evetta","evette","evie","evin","evita","evon","evonne","evony","evy","evyan","ewa","eward","exavier","eyad","eytan","ezekial","ezekiel","ezell","ezequiel","ezra","ezzard","fabian","fabiana","fabien","fabienne","fabio","fabiola","fabrice","fabricio","fabrizio","fadi","fady","fahad","fahd","faheem","faiga","faige","faigy","faisal","faith","faithe","faiza","faizan","falan","falana","falecia","falen","falena","falesha","falicia","faline","falisha","fallan","fallen","fallon","fallyn","fallynn","falon","falyn","falynn","fancy","fannie","fanny","fantasia","fara","farah","faraz","fareed","farhad","farhan","farid","farida","faris","farley","faron","farooq","farrah","farrel","farrell","farren","farris","farron","farryn","farshad","faryn","farzad","farzana","fasha","fatema","fatemah","fatemeh","faten","fatima","fatimah","fatin","fatina","fatisha","fauna","faustino","fausto","favian","favio","faviola","fawn","fawna","fay","faydra","faye","faythe","feather","federico","fedrick","feige","feigy","felcia","felecia","felesha","feleshia","felica","felice","felicha","felicia","feliciana","feliciano","felicita","felicitas","felicity","felina","felipa","felipe","felisa","felisha","felishia","felisia","felita","felix","feliz","feliza","felton","female","femi","fenton","feras","ferdinand","ferlando","ferman","fermin","fern","fernado","fernanda","fernandez","fernando","ferrell","ferris","fidel","fidencio","fielding","filberto","filemon","filiberto","filicia","filip","filipe","filisha","filomena","fiona","fionna","fionnuala","fiorella","fitzgerald","fitzroy","flannery","flavia","flavio","flecia","fletcher","flicia","flint","flor","flora","florance","florence","florencia","florencio","florentina","florentino","florian","florine","flossie","floyd","flynn","folasade","folashade","fonda","fong","ford","forest","forrest","fortino","fortunato","fortune","foster","fotini","fotis","foua","fradel","fraida","fraidy","fran","france","francelia","francene","frances","francesa","francesca","francesco","franchesca","francheska","franchot","franci","francia","francico","francie","francina","francine","francis","francisca","francisco","franciso","franco","francois","francoise","franisco","frank","frankey","franki","frankie","franklin","franklyn","franky","fransico","fransisca","fransisco","frantz","franz","fraser","frazier","fred","freda","freddie","freddrick","freddy","frederic","frederica","frederick","fredericka","frederico","fredi","fredick","fredie","fredis","fredo","fredric","fredrica","fredrick","fredricka","fredrico","fredrika","fredy","freedom","freeman","freida","freya","frida","frieda","friedrich","frimet","frisco","fritz","froilan","froylan","fuad","fue","fuller","fulton","fuquan","gabe","gabino","gabirel","gable","gabreil","gabrella","gabrial","gabriel","gabriela","gabriele","gabriell","gabriella","gabrielle","gadiel","gaelan","gaelen","gaetano","gage","gail","gaines","gala","gale","galen","galina","galvin","gamal","gamaliel","gamalier","gannon","gao","gara","garan","garbiel","garcelle","garcia","gardenia","gardner","gared","garen","garet","gareth","garett","garey","garfield","garin","garland","garnell","garner","garnet","garnett","garo","garold","garon","garren","garret","garreth","garrett","garrette","garrick","garrison","garrit","garron","garry","garth","garvin","gary","garylee","gaspar","gaspare","gasper","gaston","gatlin","gaurav","gautam","gaven","gavin","gavino","gavriel","gayla","gayland","gayle","gaylen","gaylon","gaylord","geana","geanie","geanna","geary","geddy","geena","geffery","geffrey","gem","gema","gemayel","gemma","gena","genae","genaro","genavieve","gene","genea","genee","geneen","genell","genelle","general","genesa","genese","genesia","genesis","genessa","genette","geneva","geneve","genevia","genevie","genevieve","genia","genice","genie","genieve","geniffer","genika","genine","genise","genisha","genita","genna","gennaro","genni","gennie","gennifer","genny","geno","genoveva","gentry","geoff","geoffery","geoffrey","geoffry","geofrey","geoggrey","georg","georganna","georganne","george","georgeann","georgeanna","georgeanne","georgena","georges","georgetta","georgette","georgia","georgiana","georgianna","georgie","georgina","georgine","georgio","georgios","geovanna","geovanni","geovanny","geovany","ger","gerad","gerado","gerald","geraldine","geraldo","geralyn","geramie","gerard","gerardo","gerasimos","gerell","geremy","gergory","geri","gerilyn","gerilynn","germain","germaine","german","germany","gerod","geroge","gerold","gerome","geron","geronimo","gerrad","gerrard","gerred","gerrell","gerren","gerri","gerrick","gerrit","gerrod","gerron","gerry","gershon","gerson","gertrude","gessica","gevin","gia","giacomo","gian","giana","giancarlo","gianfranco","giang","gianina","gianna","gianni","giannina","gianpaolo","giavanna","gibran","gibson","gideon","gidget","gifford","gigi","gil","gila","gilbert","gilberto","gilda","gildardo","giles","gill","gillermo","gilles","gillian","gillis","gilverto","gina","ginamarie","ginelle","ginette","ginger","gini","ginia","ginna","ginnette","ginni","ginnie","ginny","gino","giorgio","giovana","giovani","giovanna","giovanni","giovanny","girard","girl","gisel","gisela","gisele","gisell","gisella","giselle","gissel","gissela","gisselle","gita","gittel","gitty","giulia","giuliana","giulio","giuseppe","giuseppina","gizelle","gladimir","gladis","gladys","glen","glenda","glendon","glendy","glenford","glenisha","glenn","glenna","glennis","glennon","glenny","glenwood","glinda","gloria","glorimar","glory","glorya","glyn","glynda","glynis","glynn","glynnis","godfrey","godofredo","godwin","goerge","golda","golden","goldie","golnaz","gonzalo","gordon","gorge","gorje","grabiel","grabiela","grace","graceann","graceanne","gracia","gracie","graciela","grady","graeme","graham","grahm","graig","grandon","grant","granville","gray","grayce","graydon","graylin","grayling","graylon","grayson","grecia","greer","greg","gregary","gregery","gregg","greggory","gregor","gregoria","gregorio","gregory","gregroy","greogry","greta","gretchen","grete","gretel","gretta","grey","greyson","gricel","gricelda","griffen","griffin","griffith","grisel","griselda","grisell","griselle","grissel","grizel","grover","guadalupe","gualberto","guenevere","guerline","guido","guillermina","guillermo","guinevere","guiseppe","gullermo","gumaro","gunnar","gunner","gunther","gurpreet","gus","gustaf","gustav","gustave","gustavo","gustin","guthrie","guy","gwen","gwendalyn","gwendolyn","gwendolyne","gwendolynn","gwenn","gwyn","gwyneth","gwynn","gwynne","gyasi","gyna","gypsy","ha","habib","habiba","hadassa","hadassah","haden","hadiya","hadiyah","hadley","hae","hafeezah","hafsa","hagan","hagen","hagop","hai","haider","haig","hailee","hailey","hailie","haily","haim","hakan","hakeem","hakiem","hakim","hal","hala","halana","halbert","halee","haleigh","halena","haley","hali","halie","halim","halima","halimah","halina","halle","hallee","halleh","halley","halli","hallie","hally","halsey","halston","hamed","hamid","hamilton","hampton","hamza","hamzah","han","hana","hanah","hanan","haneef","haneefah","hang","hanh","hani","hanif","hanifah","hank","hanna","hannah","hannan","hannibal","hans","hansel","hansen","hanson","hao","hara","haralambos","hardy","hari","harinder","haris","harlan","harland","harlen","harley","harlin","harlon","harmon","harmonie","harmony","harold","haroon","harout","harper","harpreet","harrell","harriet","harriett","harris","harrison","harry","hart","harvey","hasaan","hasan","hasani","hashem","hashim","hasina","haskell","hassan","hassen","hasson","hatem","hattie","hau","haunani","hava","haven","havilah","hawley","haydee","hayden","hayes","haylee","hayley","hayli","haylie","hays","hayward","haywood","hazel","hazen","heath","heather","heathr","heaven","heavenly","heba","hebah","heber","hebert","hector","hedy","heena","heide","heidi","heidy","heinz","heith","helaina","helana","helder","helen","helena","helene","helina","hellen","hellena","hema","henderson","hendrick","hendy","henery","heng","henna","henny","henri","henrick","henrietta","henry","henson","her","heraclio","herb","herbert","herbie","herby","heriberto","herica","herlinda","herman","hermelinda","hermes","hermilo","herminia","herminio","hernan","hernandez","hernando","herold","heron","herschel","herschell","hersh","hershel","herson","herve","hervey","hesham","hester","heston","hetal","hether","heyward","hezekiah","hiba","hiedi","hien","hiep","hieu","higinio","hila","hilaree","hilarie","hilario","hilary","hilbert","hilda","hiliary","hillari","hillarie","hillary","hillel","hillery","hilliard","hilliary","hilton","hina","hinda","hindy","hipolito","hiram","hiran","hiroko","hiroshi","hisham","hitesh","hitomi","hoa","hoai","hoan","hoang","hobert","hobie","hoda","hogan","holden","hollan","holland","hollee","holley","holli","hollie","hollis","holly","hollyann","hollyanne","hollye","hollylynn","hollyn","holt","homar","homer","homero","honesty","honey","hong","honor","honora","honorio","hope","horace","horacio","horatio","hortencia","hortensia","hosanna","hosea","houa","houston","hovsep","howard","howell","howie","hoyt","hristopher","huan","hubert","huda","hudson","hue","huey","hugh","hughes","hugo","hugues","huma","humberto","humphrey","humza","hung","hunter","huong","huriel","husain","husam","husayn","hussain","hussein","huston","huy","huyen","hyacinth","hyatt","hydi","hykeem","hyman","hyrum","hyun","ia","iain","ian","iana","ianna","iasha","iban","ibeth","ibn","ibraheem","ibrahim","ichael","icholas","icole","icy","ida","idalia","idania","idelfonso","idella","idrees","idris","ieasha","ieashia","ieesha","ieisha","iesha","ieshia","ife","iffany","ignacio","ignasio","ignatius","iisha","ijeoma","ikaika","ike","ikea","ikechukwu","ikeem","ikeia","ikeisha","ikesha","ikeya","ikia","ikisha","ila","ilaisaane","ilan","ilana","ilda","ildefonso","ilea","ileah","ileana","ileen","ilene","ilia","iliana","ilianna","ilissa","ilka","illana","illiam","illiana","ilona","ilsa","ilse","ilyse","ilyssa","imad","iman","imani","imari","imberly","imelda","immanuel","imran","ina","inda","indalecio","indea","india","indiana","indira","indra","indria","indya","ineisha","ines","inez","infant","inga","inge","inger","ingrid","inisha","inocencio","ioanna","ioannis","iona","iosif","ira","iraida","irais","iram","iran","irasema","irena","irene","irfan","irina","irineo","iris","irish","irisha","irma","irvin","irving","irwin","isa","isaac","isaak","isabel","isabela","isabell","isabella","isabelle","isac","isacc","isadora","isadore","isael","isai","isaia","isaiah","isaias","isaih","isaura","isauro","isela","isha","ishah","ishaq","ishia","ishmael","isiah","isidore","isidoro","isidra","isidro","isis","isla","islam","ismael","ismail","ismeal","isolina","isom","isra","israel","isreal","isrrael","issa","issaac","issac","issiah","ita","italia","itzel","itzia","iva","ivan","ivana","ivane","ivania","ivelis","ivelisse","iveliz","iven","ivery","iveth","ivett","ivette","ivey","ivie","ivin","ivis","ivon","ivone","ivonne","ivori","ivorie","ivory","ivy","iwalani","iyana","iyanna","iyesha","iyona","iyonna","izaak","izabel","izetta","jaala","jaamal","jabar","jabari","jabarri","jabbar","jabe","jabez","jabier","jabin","jabir","jabriel","jabril","jacalyn","jacara","jaccob","jace","jacek","jacelyn","jacen","jacey","jaci","jacie","jacilyn","jacinda","jacinta","jacintha","jacinto","jack","jackalyn","jackalynn","jackee","jackelin","jackeline","jackelyn","jackelyne","jackey","jacki","jackie","jackielyn","jackilyn","jacklene","jacklin","jackline","jacklyn","jacklynn","jackqueline","jackson","jacky","jacleen","jaclene","jaclin","jaclyn","jaclyne","jaclynn","jaclynne","jacob","jacoba","jacobe","jacobi","jacobie","jacobo","jacobus","jacoby","jacolby","jacole","jacon","jacorey","jacory","jacqeline","jacqlyn","jacqualin","jacqualine","jacqualyn","jacquana","jacque","jacqueleen","jacquelene","jacquelin","jacquelina","jacqueline","jacquella","jacquelyn","jacquelyne","jacquelynn","jacquelynne","jacques","jacquese","jacquetta","jacquez","jacqui","jacquia","jacquie","jacquiline","jacquilyn","jacquise","jacquita","jacquleen","jacqulene","jacquline","jacqulyn","jacqulyne","jacqulynn","jacy","jacyln","jad","jada","jade","jadelyn","jaden","jadie","jadine","jadira","jadon","jady","jae","jael","jaelyn","jaemi","jaems","jaeson","jafar","jaffar","jahaira","jahan","jahanna","jahaziel","jahida","jahira","jahmai","jahmal","jahmar","jahmel","jahmil","jahmila","jahn","jahna","jahvon","jai","jaida","jaie","jaima","jaime","jaimee","jaimey","jaimi","jaimie","jaimy","jaina","jaine","jair","jaira","jairo","jairus","jaisa","jaisen","jaison","jaja","jajaira","jajuan","jakara","jake","jakeb","jakeline","jakia","jakita","jakki","jaklyn","jakob","jala","jalal","jalana","jalayne","jaleel","jalena","jalene","jalil","jalisa","jalissa","jalon","jalonda","jalyn","jalynn","jama","jamaal","jamaar","jamae","jamael","jamahl","jamaica","jamail","jamaine","jamal","jamala","jamale","jamall","jaman","jamar","jamara","jamarcus","jamari","jamario","jamarion","jamaris","jamarius","jamarkus","jamarl","jamarr","jamarrio","jamas","jamaul","jamaur","jame","jameal","jameca","jamecia","jamee","jameeka","jameel","jameela","jameelah","jamei","jameica","jameika","jameil","jameila","jameisha","jameka","jamekia","jamel","jamela","jamelia","jamell","jamella","jamelle","jamelyn","jamen","jamena","jamera","jamere","jameria","jamerson","james","jamesa","jamese","jamesedward","jamesha","jameshia","jamesia","jamesmichael","jameson","jamespaul","jamesrobert","jametta","jamey","jamez","jami","jamia","jamiah","jamian","jamianne","jamica","jamichael","jamicheal","jamie","jamiee","jamiel","jamielee","jamielyn","jamielynn","jamieson","jamika","jamil","jamila","jamilah","jamile","jamilee","jamilia","jamill","jamilla","jamillah","jamille","jamilyn","jamilynn","jamin","jamina","jamine","jamir","jamira","jamis","jamisa","jamise","jamisha","jamison","jammal","jammar","jammi","jammie","jammy","jamol","jamon","jamond","jamone","jamonica","jamonte","jamorris","jams","jamy","jamye","jan","jana","janae","janah","janai","janal","janalee","janalyn","janan","janara","janathan","janay","janaya","janaye","jandi","jane","janea","janeal","janean","janeane","janece","janecia","janee","janeen","janeese","janeice","janeika","janeil","janeisha","janeka","janel","janele","janell","janella","janelle","janely","janene","janequa","janes","janesa","janese","janesha","janessa","janesse","janet","janeth","janett","janetta","janette","janey","jani","jania","janica","janice","janie","janiece","janiel","janielle","janiesha","janifer","janika","janin","janina","janine","janiqua","janique","janira","janis","janise","janisha","janita","janitza","janmichael","jann","janna","jannae","jannah","janne","jannel","jannell","jannelle","jannet","janneth","jannett","jannetta","jannette","jannice","jannie","jannifer","jannine","janny","janos","jansen","janson","janssen","jantz","jantzen","january","japheth","jaquan","jaquana","jaquanda","jaquanna","jaquay","jaquelin","jaqueline","jaquelyn","jaquelynn","jaquetta","jaquette","jaquila","jaquilla","jaquis","jaquita","jaquitta","jaquline","jara","jarad","jarae","jarah","jaramie","jaran","jardin","jared","jaree","jarek","jarel","jarell","jarelle","jaremy","jaren","jaret","jarett","jarette","jari","jarica","jarid","jarin","jaris","jarit","jarita","jaritza","jarius","jarmaine","jarmal","jarmar","jarmarcus","jarmel","jarod","jarold","jarom","jarome","jaron","jaronda","jarrad","jarreau","jarred","jarrel","jarrell","jarren","jarret","jarrett","jarrette","jarrid","jarriel","jarrin","jarris","jarrod","jarron","jarryd","jaruis","jarvis","jaryd","jasamine","jasan","jasdeep","jase","jaselyn","jasen","jashan","jashawn","jashira","jashua","jasie","jasimine","jasin","jasine","jasleen","jaslyn","jaslynn","jasma","jasmaine","jasman","jasmeen","jasmen","jasmin","jasmina","jasmine","jasmond","jasmyn","jasmyne","jasn","jason","jasper","jassen","jassica","jasson","jatara","jatasha","jatavia","jathan","jatin","jatoya","jauan","jaun","jaunita","javan","javanna","javar","javares","javaris","javarius","javarus","javaughn","javed","javell","javen","javetta","javian","javid","javier","javin","javis","javon","javonda","javone","javonna","javonne","javonte","javoris","jawaan","jawad","jawan","jawana","jawanda","jawann","jawanna","jawara","jawaun","jawon","jawuan","jaxon","jay","jaya","jayce","jaycee","jayci","jaycie","jaycob","jayda","jayde","jaydee","jayden","jaye","jayesh","jayla","jayleen","jaylene","jaylin","jaylon","jaylyn","jaylynn","jayma","jaymar","jayme","jaymee","jaymes","jaymeson","jaymi","jaymie","jayna","jayne","jaynee","jaynell","jaynie","jayquan","jayro","jaysen","jayson","jayvon","jazelle","jazlyn","jazma","jazmaine","jazman","jazmen","jazmin","jazmine","jazmon","jazmyn","jazmyne","jazz","jazzlyn","jazzman","jazzmen","jazzmin","jazzmine","jazzmon","jb","jc","jd","jean","jeana","jeanann","jeanclaude","jeane","jeanee","jeaneen","jeanell","jeanelle","jeanene","jeanet","jeanett","jeanetta","jeanette","jeani","jeanice","jeanie","jeanine","jeaninne","jeanise","jeanita","jeanmarie","jeanna","jeanne","jeannea","jeannete","jeannett","jeannetta","jeannette","jeannie","jeannifer","jeannine","jeanny","jeanpaul","jeanpierre","jeb","jebadiah","jebediah","jecory","jed","jedadiah","jedd","jedediah","jediah","jedidiah","jeena","jeff","jefferey","jefferson","jeffery","jeffey","jeffifer","jeffory","jeffrey","jeffrie","jeffry","jefrey","jehan","jehna","jehnna","jehu","jejuan","jelani","jelena","jelisa","jema","jemaine","jemal","jemar","jemarcus","jemario","jemeka","jemel","jemell","jemia","jemima","jemimah","jemma","jen","jena","jenae","jenafer","jenah","jenai","jenalea","jenalee","jenalyn","jenay","jenaya","jency","jene","jenea","jeneal","jenean","jenee","jeneen","jenefer","jenel","jenell","jenelle","jenene","jenesa","jenese","jenesis","jenessa","jenet","jenetta","jenette","jeneva","jenevieve","jeni","jenia","jenica","jenice","jenie","jeniece","jenifer","jeniffer","jenika","jenilee","jenille","jenilyn","jenine","jenipher","jenise","jenisha","jenita","jenna","jennae","jennafer","jennah","jennalee","jennalyn","jennalynn","jenne","jennefer","jennel","jennell","jennelle","jennessa","jennett","jennette","jenney","jennfier","jenni","jennica","jennice","jennie","jenniefer","jennier","jennife","jennifer","jenniferann","jenniferlee","jenniferlynn","jennifermarie","jenniffer","jennifier","jennifr","jenniger","jennika","jennilee","jennilyn","jennine","jennings","jennipher","jennis","jennise","jenny","jennyfer","jennylyn","jeno","jens","jensen","jenson","jentry","jeny","jeoffrey","jeorge","jera","jerad","jerae","jerald","jeraldine","jeralyn","jeralynn","jerame","jeramey","jerami","jeramiah","jeramie","jeramy","jeran","jerard","jerardo","jere","jered","jeree","jerel","jerell","jeremaih","jeremaine","jereme","jeremey","jeremi","jeremia","jeremiah","jeremian","jeremias","jeremie","jeremy","jeren","jeresa","jeret","jerett","jeri","jeriah","jerianne","jerica","jericho","jerick","jerid","jeriel","jeriesha","jerika","jerilyn","jerilynn","jerime","jerimey","jerimiah","jerimie","jerimy","jerin","jeris","jermain","jermaine","jermal","jermale","jerman","jermane","jermanie","jermany","jermarcus","jermario","jermeka","jermel","jermell","jermery","jermey","jermiah","jermichael","jermie","jermika","jermine","jermon","jermond","jermone","jermy","jerod","jerode","jerold","jerome","jeromey","jeromi","jeromiah","jeromie","jeromy","jeron","jerone","jeronica","jeronimo","jerra","jerrad","jerral","jerrald","jerramie","jerrard","jerred","jerrel","jerrell","jerremy","jerren","jerret","jerrett","jerri","jerria","jerrica","jerrick","jerrico","jerrid","jerrie","jerrilyn","jerrin","jerrit","jerritt","jerrod","jerrold","jerron","jerrud","jerry","jerryd","jersey","jerson","jerusha","jervon","jeryl","jes","jesalyn","jese","jesenia","jeshua","jesi","jesiah","jesica","jesicca","jesie","jesika","jeslyn","jess","jessa","jessaca","jessalyn","jessalynn","jessamine","jessamy","jessamyn","jesscia","jesse","jesseca","jessee","jesseka","jesselee","jesselyn","jessen","jessenia","jessey","jessi","jessia","jessic","jessica","jessicaann","jessicah","jessicalynn","jessicamarie","jessicca","jessice","jessicia","jessie","jessieca","jessika","jessilyn","jessina","jesslyn","jessup","jessy","jessyca","jessye","jessyka","jestin","jestina","jestine","jeston","jesus","jesusa","jesusita","jesyca","jetaime","jethro","jett","jetta","jevin","jevon","jewel","jewell","jezabel","jezebel","jezreel","jhamal","jheri","jhoanna","jhon","jhonathan","jhonny","ji","jia","jibril","jihad","jihan","jiles","jilian","jill","jillan","jillana","jillayne","jillean","jillene","jillia","jilliam","jillian","jilliann","jillianne","jillien","jillienne","jillmarie","jillyan","jillyn","jim","jimell","jimena","jimi","jimmi","jimmie","jimmy","jimmylee","jimy","jin","jina","jinelle","jinger","jinna","jinnie","jinny","jiovanni","jiselle","jl","jo","joab","joachim","joal","joan","joana","joanathan","joane","joangela","joani","joanie","joann","joanna","joannah","joanne","joannie","joanthan","joany","joao","joaquim","joaquin","joaquina","joas","joathan","job","jobe","jobeth","jobie","joby","jocelin","jocelyn","jocelyne","jocelynn","jock","joclyn","jocob","jodan","jodee","jodelle","jodi","jodie","jody","joe","joeann","joeanna","joeanthony","joel","joelene","joeline","joell","joella","joelle","joellen","joellyn","joelouis","joely","joenathan","joeseph","joesph","joetta","joette","joey","joffrey","joh","johan","johana","johann","johanna","johannah","johanne","johannes","johanthan","johathan","johathon","johm","john","johna","johnadam","johnanna","johnanthan","johnanthony","johnatan","johnathan","johnathen","johnathn","johnathon","johnaton","johncharles","johnchristopher","johnda","johndaniel","johndavid","johnell","johnelle","johnesha","johnetta","johnette","johney","johnhenry","johni","johnica","johnice","johnie","johniece","johnika","johnisha","johnita","johnjoseph","johnmark","johnmichael","johnn","johnna","johnnathan","johnnell","johnnetta","johnnie","johnny","johnnylee","johnpatrick","johnpaul","johnpeter","johnphillip","johnrobert","johnson","johnston","johntae","johnthan","johnthomas","johnwilliam","johny","johsua","johua","joi","joia","joie","jojo","jolan","jolanda","jolanta","jolean","jolee","joleen","joleigh","jolena","jolene","joleta","joletta","joli","jolie","jolina","joline","jolita","jolleen","jolly","jolyn","jolynn","jomar","jomara","jomarie","jomo","jon","jona","jonah","jonahtan","jonas","jonatan","jonatha","jonathan","jonathandavid","jonathen","jonathon","jondavid","jone","jonee","jonel","jonell","jonelle","joneric","jonerik","jones","jonetta","jonette","jonh","joni","jonica","jonie","jonika","jonique","jonisha","jonita","jonmichael","jonn","jonna","jonnathan","jonnell","jonnelle","jonni","jonnie","jonny","jonothan","jonovan","jonpaul","jonquil","jontae","jontay","jonte","jontel","jonthan","jontue","joon","joram","jorda","jordache","jordan","jordana","jordann","jordanna","jordanne","jorden","jordi","jordie","jordin","jordon","jordy","jordyn","jorel","jorell","jorge","jorgeluis","jorgen","jori","jorie","jorja","jorje","joron","jorrell","jory","josa","josalyn","joscelyn","josclyn","jose","joseangel","joseantonio","josecarlos","josedejesus","josef","josefa","josefina","josefine","joseh","josehua","josel","joselin","joseline","joselito","joseluis","joselyn","josemanuel","josemiguel","joseph","josephina","josephine","josephus","josetta","josette","josey","josh","josha","joshalyn","joshau","joshaua","joshawa","josheua","joshia","joshlyn","joshoa","joshu","joshua","joshuah","joshual","joshuamichael","joshue","joshuea","joshuia","joshus","joshuwa","joshwa","josi","josiah","josianne","josias","josie","josilyn","josjeph","joslin","joslyn","joslynn","joson","jospeh","josph","josselyn","jossie","jossue","josten","jostin","josua","josue","josuha","jourdan","journey","jousha","joushua","jovan","jovana","jovanda","jovani","jovanie","jovanna","jovanne","jovanni","jovanny","jovany","jovaughn","jovita","jovon","jovonda","jovonna","jovonne","jowan","jowanna","joy","joya","joyanna","joyanne","joyce","joyceann","joycelyn","joycelynn","joye","joyelle","joylyn","joylynn","jozef","jozette","jr","jsoeph","jssica","jt","jua","juan","juana","juanalberto","juanantonio","juancarlos","juanesha","juanisha","juanita","juanito","juanjose","juanmanuel","juanna","juante","juaquin","jubilee","jud","judah","judas","judd","jude","judea","judge","judi","judie","judit","judith","judson","judy","jujuan","jule","juleah","julee","juleen","julene","jules","juli","julia","julian","juliana","juliane","juliann","julianna","julianne","julie","julieann","julieanna","julieanne","julien","juliene","julienne","juliet","julieta","julietta","juliette","julina","juline","julio","juliocesar","julious","julisa","julissa","julita","julius","jull","jullian","juluis","july","jumaane","jumana","jun","junaid","june","junette","jung","junho","junia","junie","junior","junious","juniper","junita","junius","junko","jurel","jurell","juri","jurrell","jury","jushua","jusitn","justa","justan","justeen","justen","justene","justi","justice","justin","justina","justine","justinn","justino","justion","justis","justn","justo","juston","justus","justyn","justyne","juvenal","juvencio","juventino","juwan","juwanda","jvon","jw","jwan","jyl","jyoti","ka","kabir","kabrina","kacee","kacey","kachina","kaci","kacia","kacie","kacy","kade","kadee","kadeidra","kaden","kadi","kadie","kadijah","kadin","kady","kae","kael","kaela","kaelah","kaelee","kaeleigh","kaeley","kaeli","kaelin","kaely","kaelyn","kaelynn","kaeo","kaetlyn","kahealani","kahla","kahley","kahlil","kai","kaia","kaija","kaila","kailah","kailani","kaile","kailee","kaileen","kaileigh","kailen","kailene","kailey","kaili","kailie","kailin","kaily","kailyn","kailynn","kain","kaine","kainoa","kaipo","kaira","kaisa","kaiser","kaisha","kaithlyn","kaitlan","kaitland","kaitlen","kaitlin","kaitlyn","kaitlynn","kaitrin","kaity","kaiulani","kaiya","kaj","kaja","kajuan","kal","kala","kalah","kalan","kalana","kalandra","kalani","kale","kalea","kaleah","kaleb","kalee","kaleem","kaleen","kaleena","kalei","kaleigh","kalem","kalen","kalena","kalene","kalenna","kaleo","kalesha","kaley","kali","kalia","kalib","kalicia","kalie","kalief","kalika","kalil","kalila","kalilah","kalim","kalin","kalina","kalinda","kalisa","kalisha","kalissa","kalla","kallan","kalle","kallen","kalli","kallie","kalliopi","kallista","kally","kalman","kalon","kalvin","kaly","kalyn","kalynn","kalysta","kam","kama","kamaal","kamal","kamala","kamar","kamara","kamaria","kamau","kamber","kambria","kamecia","kamee","kameelah","kameisha","kameka","kameko","kamel","kamela","kamelia","kameron","kamesha","kameshia","kametria","kami","kamia","kamica","kamie","kamika","kamil","kamila","kamilah","kamilla","kamille","kamini","kamira","kamisha","kammi","kammie","kammy","kamran","kamrin","kamron","kamryn","kana","kanani","kanda","kandace","kandance","kandas","kandee","kandi","kandice","kandie","kandis","kandise","kandiss","kandra","kandrea","kandus","kandy","kandyce","kane","kaneesha","kaneisha","kanesha","kaneshia","kanetha","kanethia","kanetra","kang","kania","kanika","kanisha","kanitha","kanitra","kanoe","kansas","kao","kaori","kapri","kaprice","kara","karah","karalee","karaline","karalyn","karalynn","karan","karee","kareem","kareema","kareemah","kareen","kareena","karel","karema","karen","karena","karenann","karenda","karene","karesha","karessa","karey","kari","karia","kariann","karianne","karie","karilee","karilyn","karilynn","karim","karima","karimah","karime","karin","karina","karinda","karine","karinna","karinne","karis","karisa","karisha","karishma","karisma","karissa","karista","karita","karitza","karl","karla","karle","karlee","karleen","karleigh","karlene","karlesha","karletta","karley","karli","karlie","karlin","karlis","karlisa","karlisha","karlita","karlo","karlon","karlos","karlton","karly","karlyn","karma","karman","karmen","karmesha","karmin","karmyn","karna","karne","karol","karole","karolina","karoline","karolyn","karon","karra","karrah","karren","karri","karrie","karriem","karrin","karrina","karrisa","karrissa","karry","karson","karsten","karter","karthik","kartik","kartina","kary","karyl","karyn","karyna","kasandra","kasaundra","kasee","kaseem","kasey","kash","kasha","kashana","kashara","kashaun","kashawn","kashawna","kasheena","kashena","kashia","kashif","kashina","kashira","kashmir","kashonda","kashonna","kasi","kasia","kasie","kasim","kason","kasondra","kassandra","kassandre","kassaundra","kassey","kassi","kassia","kassidi","kassidy","kassie","kassim","kassondra","kassy","kasy","katalin","katalina","katana","katara","katarina","katarzyna","katasha","kate","katee","kateena","katelan","kateland","katelin","katelyn","katelynd","katelynn","katelynne","katera","kateri","kateria","katerina","katerine","katerra","katessa","katey","kathaleen","katharina","katharine","katharyn","katheleen","kathelyn","katherin","katherina","katherine","kathern","katheryn","katheryne","kathi","kathia","kathie","kathleen","kathlena","kathlene","kathline","kathlyn","kathlynn","kathreen","kathren","kathrin","kathrina","kathrine","kathryn","kathryne","kathy","kathya","kathyleen","kathyrn","kati","katia","katiana","katiann","katianne","katie","katieann","katiejo","katielynn","katilyn","katima","katina","katira","katiria","katisha","katja","katlin","katlyn","katlynn","katon","katonya","katora","katoya","katrece","katreena","katrell","katrena","katrese","katri","katrice","katricia","katrin","katrina","katrine","katrinia","katrinna","katrisha","katryn","katryna","katti","kattie","katty","katura","katurah","katy","katya","katye","kavan","kaveh","kaven","kavin","kavita","kavitha","kavon","kawan","kawana","kawanda","kawanna","kawika","kay","kaya","kayanna","kayce","kaycee","kayci","kaycie","kayde","kaydee","kaydi","kaye","kayela","kayla","kaylah","kaylan","kayle","kaylea","kaylee","kayleen","kayleigh","kaylen","kaylena","kaylene","kayley","kayli","kaylie","kayliegh","kaylin","kayln","kaylon","kaylor","kaylyn","kaylynn","kaylynne","kayna","kayne","kayron","kayse","kaysee","kaysha","kayshia","kaysi","kaysie","kayte","kayti","kaytie","kaytlin","kaytlyn","kayvon","kc","kea","keagan","keah","keaira","keala","kealani","kealy","kean","keana","keanan","keandra","keandre","keandrea","keane","keanna","keara","kearra","kearstin","keary","keasha","keath","keaton","keauna","keaundra","kecia","kedar","kedra","kedric","kedrick","kedron","kee","keefe","keegan","keela","keelan","keeley","keeli","keelia","keelie","keelin","keely","keelyn","keena","keenan","keenen","keenon","keera","kees","keesa","keesha","keeton","keevin","keeyana","kegan","kehaulani","kehinde","kei","keia","keiana","keiandra","keianna","keiara","keidra","keiko","keil","keila","keilah","keion","keiona","keionna","keir","keira","keirra","keiry","keisa","keisha","keishawn","keishawna","keishia","keita","keith","keitha","keithan","keithen","keithon","keitra","kejuan","kekoa","kela","kelan","kelby","kelcey","kelci","kelcie","kelcy","keldrick","kelechi","kelee","keleigh","keli","kelii","kelin","kelina","kelisha","kelita","kellan","kelle","kellee","kelleen","kelleigh","kellen","kellene","keller","kelley","kelli","kelliann","kellianne","kellie","kellijo","kellin","kellina","kellis","kellisha","kellon","kellsey","kelly","kellyann","kellyanne","kellye","kellyjo","kellymarie","kellyn","kelon","kelse","kelsea","kelsee","kelsey","kelsha","kelsi","kelsie","kelsy","kelton","kelvin","kelvina","kelvis","kely","kelyn","kema","kemal","kemberly","kemeshia","kemia","kemisha","kemper","kemuel","ken","kena","kenan","kenard","kenda","kendahl","kendal","kendale","kendall","kendalyn","kendel","kendell","kendelle","kenderick","kendi","kendl","kendle","kendon","kendra","kendrea","kendrell","kendria","kendric","kendrick","kendricks","kendrix","kendyl","kendyll","kenecia","keneisha","kenesha","keneshia","keneta","keneth","kenetha","kenetra","keng","keni","kenia","keniesha","kenika","kenise","kenisha","kenita","kenith","kenitra","kenja","kenji","kenley","kenn","kenna","kennan","kennard","kenndra","kennedy","kennen","kennesha","kennet","kenneth","kennetha","kennethia","kennetta","kennette","kenney","kenni","kennia","kennie","kennis","kennisha","kennita","kennith","kennon","kennth","kenny","kennya","keno","kenon","kenora","kenosha","kenric","kenrick","kenroy","kensey","kenson","kent","kenta","kentaro","kenton","kentrel","kentrell","kenya","kenyada","kenyan","kenyana","kenyanna","kenyarda","kenyata","kenyatta","kenyetta","kenyon","kenyona","kenyonna","kenyotta","kenzi","kenzie","keo","keoka","keoki","keola","keon","keona","keonda","keondra","keone","keoni","keonia","keonna","keonta","keonte","keosha","keoshia","kera","kerbi","kerby","kereem","kerek","keren","kerensa","keri","keriann","kerianne","keric","kerie","kerilyn","kerin","kerisha","kerissa","kerline","kermit","kern","keron","kerra","kerri","kerriann","kerrianne","kerrick","kerrie","kerrigan","kerrin","kerron","kerry","kerryn","kersten","kerstin","kervin","kerwin","kery","keryn","kesa","kesha","keshana","keshawn","keshia","keshonda","kesia","kesley","keslie","kessa","kester","keston","kestrel","ketan","ketra","ketrina","ketsia","ketura","keturah","keundra","keva","kevan","keven","kevi","kevia","kevin","kevina","kevis","kevon","kevyn","kewan","kewana","kewanna","keya","keyaira","keyan","keyana","keyandra","keyanna","keyatta","keyauna","keyetta","keyla","keylee","keyna","keyo","keyon","keyona","keyonda","keyondra","keyonia","keyonna","keyosha","keyra","keysha","keystal","keystle","keyundra","keywanda","kezia","keziah","kha","khadija","khadijah","khai","khaleah","khaled","khaleel","khaleelah","khalfani","khalia","khaliah","khalid","khalif","khalil","khalila","khalilah","khalisha","khan","khandi","khang","khanh","khara","khari","khary","khayyam","khia","khiana","khira","khoa","khoi","khou","khristen","khristian","khristina","khristine","khristopher","khristy","khrystal","khrystina","khuong","ki","kia","kiah","kiala","kian","kiana","kiandra","kiann","kianna","kiante","kiara","kiarra","kiauna","kiel","kiela","kiele","kiely","kien","kienan","kieonna","kiera","kieran","kiernan","kieron","kierra","kierstan","kiersten","kierstin","kierston","kiesha","kiet","kieth","kieu","kiffany","kiira","kiirsten","kijuan","kijuana","kiki","kila","kilah","kile","kilee","kileen","kiley","killian","kim","kima","kimanh","kimani","kimarie","kimball","kimbely","kimber","kimberely","kimberle","kimberlee","kimberleigh","kimberley","kimberli","kimberlie","kimberlly","kimberly","kimberlyann","kimberlyn","kimbery","kimblery","kimbley","kimbra","kimbrly","kimerly","kimesha","kimi","kimia","kimika","kimiko","kimisha","kimmy","kimo","kimya","kimyata","kimyatta","kina","kinard","kinberly","kinda","kindal","kindall","kindel","kindell","kindle","kindra","kindsey","kindy","kinesha","kineta","king","kingsley","kingston","kinisha","kinley","kinsey","kinsley","kinya","kinyata","kinyatta","kinzi","kinzie","kiona","kiondra","kionna","kiosha","kip","kiplin","kipp","kira","kiran","kirbi","kirbie","kirby","kiri","kiriaki","kirin","kirk","kirkland","kirra","kirstan","kirsten","kirsti","kirstie","kirstin","kirstina","kirstine","kirston","kirstopher","kirsty","kirstyn","kirt","kirtis","kisa","kisha","kishia","kit","kita","kitrina","kitt","kittie","kitty","kiva","kiwana","kiwanna","kiya","kiyana","kiyoko","kiyomi","kiyonna","kizzie","kizzy","kjell","kjersten","kjersti","kjirsten","klara","klarissa","klaudia","klaus","klayton","klint","klinton","klye","knox","knut","ko","kobi","koby","koda","kodey","kodi","kodie","kody","kofi","kohl","koji","kojo","kolbi","kolby","kole","kolin","kolina","kolleen","kollin","kolt","kolton","komal","kong","kongmeng","konica","konnie","konrad","konstance","konstantina","konstantinos","kora","koral","koran","koree","koren","korena","korey","kori","korie","korin","korina","korine","korinna","korinne","korissa","koron","korrey","korri","korrie","korrin","korrina","korrine","korry","kortez","kortnee","kortney","kortni","kortnie","kortny","kory","koryn","kosha","kosta","kostantinos","kostas","kota","koty","kou","kourtnee","kourtney","kourtni","kourtnie","koury","kraig","kramer","kreg","kregg","kreig","kreston","kricket","krieg","kris","krisandra","krisanne","kriselda","krish","krisha","krishana","krisheena","krishna","krishonda","krislyn","kriss","krissa","krissi","krissie","krissy","krista","kristain","kristal","kristalyn","kristalynn","kristan","kriste","kristee","kristeen","kristeena","kristel","kristelle","kristen","kristena","kristene","kristi","kristia","kristian","kristiana","kristiane","kristiann","kristianna","kristianne","kristie","kristien","kristilyn","kristin","kristina","kristine","kristinejoy","kristinia","kristjan","kristle","kristofer","kristoffer","kristofor","kristoher","kristol","kriston","kristopher","kristy","kristyann","kristyl","kristylee","kristyn","kristyna","kristyne","krizia","krupa","kruti","krysta","krystal","krystale","krystall","krystalmarie","krystalyn","krystalynn","krystan","kryste","krysteen","krysteena","krystel","krystelle","krysten","krysti","krystian","krystie","krystil","krystin","krystina","krystine","krystl","krystle","krystn","krystol","krystopher","krystyl","krystyn","krystyna","krzysztof","kue","kula","kule","kumar","kumiko","kunal","kursten","kurstin","kurt","kurtis","kush","kuuipo","kuulei","kvin","kwame","kwan","kwana","kwasi","kwesi","ky","kya","kyan","kyana","kyanna","kyanne","kyara","kye","kyeisha","kyera","kyesha","kyeshia","kyiesha","kyisha","kyla","kylah","kylan","kyland","kyle","kylea","kylee","kyleen","kyleigh","kylen","kylene","kyler","kyley","kyli","kylie","kylon","kym","kymber","kymberlee","kymberley","kymberli","kymberly","kyna","kynan","kyndal","kyndall","kyndel","kyndra","kyoko","kyon","kyona","kyonna","kyra","kyran","kyree","kyria","kyriakos","kyrie","kyron","kyrstal","kyrsten","kyrstle","kyson","kystal","la","labaron","labarron","labrandon","labrian","lacandice","lacara","lacarla","lace","lacee","lacey","lachanda","lachandra","lachasity","lachell","lachelle","lachrisha","lachrista","laci","lacia","lacie","lacinda","lacole","laconia","lacora","lacorey","lacory","lacosta","lacourtney","lacoya","lacreasha","lacrecia","lacresha","lacreshia","lacresia","lacretia","lacrisha","lacrystal","lacy","lacye","ladaisha","ladale","ladana","ladanna","ladarian","ladarious","ladaris","ladarius","ladarren","ladarrius","ladarryl","ladawn","ladawna","ladd","laddie","ladeidra","ladell","ladena","laderrick","ladina","ladon","ladonna","ladonya","ladora","ladreka","lady","lael","laesha","lafayette","lafe","lafonda","lagena","lagina","laguan","laguana","laguanda","laguisha","laguita","lai","laiken","laila","lailani","laina","laine","lainey","lainie","laisa","laisha","laith","laiza","lajoy","lajoya","lajuan","lajuana","lakaisha","lakara","lakasha","lakashia","lake","lakea","lakeasha","lakecia","lakedia","lakedra","lakeena","lakeesha","lakeeta","lakeia","lakeidra","lakeish","lakeisha","lakeita","lakeith","lakeitha","lakeithia","lakela","laken","lakendra","lakendria","lakendrick","lakenya","lakeria","lakesha","lakeshia","lakesia","laketa","laketha","lakethia","laketra","laketta","lakevia","lakeya","lakeyia","lakeysha","lakia","lakiesha","lakin","lakina","lakindra","lakira","lakisa","lakisha","lakishia","lakita","lakitha","lakiya","lakoya","lakresha","lakrisha","lakshmi","lakyn","lakysha","lalita","lam","lamaar","lamanda","lamar","lamara","lamarcus","lamare","lamario","lamark","lamarkus","lamarr","lambert","lamberto","lameisha","lameka","lamekia","lamel","lamesha","lamia","lamichael","lamika","lamisha","lamon","lamond","lamonda","lamone","lamonica","lamont","lamonte","lamorris","lan","lana","lanae","lanard","lanay","lanaya","lance","lancelot","lancer","landa","landan","landen","lander","landi","landin","landis","landon","landra","landria","landry","landy","lane","lanea","lanee","laneesha","laneice","laneisha","laneka","lanell","lanesha","laneshia","lanessa","lanetra","lanetta","lanette","laney","lang","langdon","langston","lani","lanie","laniece","lanier","lanika","laniqua","lanise","lanisha","lanita","lanna","lannette","lannie","lannis","lanny","lanora","lanorris","lao","laparis","laporcha","laporche","laporchia","laporscha","laporsha","laportia","laprecious","lapria","laquan","laquana","laquanda","laquandra","laquanna","laquanta","laquasha","laquasia","laquata","laqueena","laqueisha","laquenta","laquesha","laqueshia","laqueta","laquetta","laquette","laquia","laquida","laquiesha","laquilla","laquina","laquincy","laquinda","laquinn","laquinta","laquinton","laquisha","laquista","laquita","laquite","laquitha","laquitta","laquonda","lara","larae","larah","laraine","laramie","laramy","laranda","laray","laree","lareesa","lareina","larell","larelle","laren","larena","larenda","larenzo","laresa","laresha","laressa","laretha","larhonda","lari","laria","larice","larico","larie","larina","larinda","larisa","larisha","larissa","larita","lark","larkin","larnell","laron","laronda","larosa","laroy","laroya","larra","larraine","larrell","larren","larrisa","larrissa","larry","lars","larsen","larson","larua","larue","laruen","lary","laryn","larysa","laryssa","lasalle","lasandra","lasasha","lasaundra","lasean","lasha","lashae","lashala","lashana","lashanda","lashandra","lashane","lashann","lashanna","lashannon","lashanta","lashante","lashara","lashaun","lashauna","lashaunda","lashaundra","lashaunna","lashaunta","lashawn","lashawna","lashawnda","lashawndra","lashawnna","lashawnta","lashay","lashaya","lashaye","lashayla","lashea","lasheena","lasheika","lasheka","lashell","lashelle","lashia","lashieka","lashika","lashon","lashona","lashonda","lashondra","lashone","lashonna","lashonta","lashun","lashuna","lashunda","lashundra","lashunna","lasondra","lasonia","lasonya","lastacia","lastarr","lasundra","laszlo","lataisha","latandra","latangela","latanya","latara","latarra","latarsha","latasha","latashia","latasia","latausha","latavia","latavius","lataya","lateasha","latecia","lateef","lateefah","lateesha","lateia","lateisha","lateka","lateria","laterica","laterra","laterrance","laterria","laterrica","latesa","latese","latesha","lateshia","latesia","latessa","lateya","latham","lathan","lathisa","latia","latice","laticia","latiesha","latif","latifa","latifah","latiffany","latika","latina","latisa","latise","latish","latisha","latishia","latisia","latissa","latitia","lativia","latiya","latoia","latoiya","latona","latonda","latonia","latonja","latonya","latora","latori","latoria","latorie","latorra","latorria","latorrie","latorya","latosha","latoshia","latoy","latoya","latoyah","latoyer","latoyia","latoyna","latravia","latravis","latrease","latrece","latrecia","latreece","latrell","latrelle","latrena","latrenda","latresa","latrese","latresha","latressa","latria","latrica","latrice","latricia","latriece","latrina","latrise","latrisha","latrista","latron","latroy","latroya","latyra","latysha","lauar","laudan","launa","laura","lauraann","laurabeth","laurajean","laural","lauralee","lauran","laurance","laurann","laure","lauree","laureen","laurel","laurelin","lauren","laurena","laurence","laurencio","laurene","laurenmarie","laurent","lauretta","laurette","lauri","lauria","laurice","laurie","laurieann","laurien","laurin","laurina","laurinda","laurine","laurissa","lauro","laurren","lauryn","lavada","laval","lavale","lavanda","lavar","lavaris","lavarr","lavaughn","lavel","lavell","lavelle","lavender","lavenia","lavera","lavern","laverna","laverne","laveta","lavetta","lavette","lavina","lavinia","lavita","lavon","lavona","lavonda","lavone","lavonia","lavonna","lavonne","lavonte","lavoris","lavra","lavren","lawana","lawanda","lawanna","lawayne","lawerence","lawonda","lawrance","lawren","lawrence","lawson","lawton","laya","layce","laycee","laycie","layla","layna","layne","laysa","layton","laytona","laytoya","lazar","lazaro","lazaros","lazarus","lazer","lc","le","lea","leaann","leah","leaha","leahanna","leala","leamon","lean","leana","leanda","leander","leandra","leandre","leandrea","leandrew","leandro","leane","leann","leanna","leanne","leanora","leanthony","leasha","leatha","leatrice","lebaron","lebron","lecia","lecole","lecresha","leda","ledarius","lee","leea","leeah","leeana","leeander","leeandra","leeandrea","leeann","leeanna","leeanne","leela","leeland","leena","leeroy","leesa","leesha","leevi","leeza","legrande","leha","lehi","lehua","lei","leia","leiah","leianna","leib","leif","leigh","leigha","leighann","leighanna","leighanne","leighton","leiha","leila","leilani","leiloni","leinani","leisa","leisha","leisl","leith","lejon","lekeisha","lekeith","lekendrick","lekesha","lekeshia","lekeya","lekia","lekisha","lekita","lela","leland","lelani","lelia","lelsie","lemar","lemarcus","lemario","lemarr","lemont","lemuel","len","lena","lenae","lenamarie","lenard","lenay","lene","lenea","lenee","leneisha","lenell","lenette","leng","lenia","lenin","lenise","lenisha","lenita","lenn","lenna","lennard","lennie","lennis","lennon","lennox","lenny","lenora","lenord","lenore","lenox","lensey","lenton","lenwood","lenzy","leo","leobardo","leola","leon","leona","leonard","leonarda","leonardo","leoncio","leonda","leondra","leonel","leonela","leonidas","leonides","leonila","leonna","leonor","leonora","leonte","leontyne","leopold","leopoldo","leor","leora","leota","leotis","lequan","lequisha","lequita","lera","lerin","leron","lerone","leroy","les","lesa","lesbia","lesette","lesha","leshae","leshaun","leshawn","leshay","leshea","leshia","leshonda","lesia","leslea","leslee","lesleigh","lesley","lesleyann","lesleyanne","lesli","leslie","leslieann","leslieanne","lesly","leslye","lessa","lessie","lesslie","lester","leta","letasha","letecia","letesha","leteshia","letetia","letha","letia","letica","leticia","letina","letisha","letisia","letitia","letizia","letonya","letoria","letoya","letrice","letricia","letticia","lettie","letty","lev","levar","levell","levelle","levern","levester","levi","levin","levina","levis","levita","leviticus","levon","levy","lewis","lex","lexi","lexie","lexis","lexy","leya","leyla","leyna","lezette","lezli","lezlie","li","lia","liam","lian","liana","liane","liani","liann","lianna","lianne","liat","liba","libbie","libby","liberty","liborio","librada","librado","licet","lichelle","licia","lida","lidia","liela","liem","lien","lieren","lierin","liesel","liesl","liezl","ligia","liisa","lila","lilah","lili","lilia","lilian","liliana","liliane","liliano","lilibeth","lilith","lilli","lillia","lilliam","lillian","lilliana","lilliane","lillianna","lillie","lilly","lilton","lily","lilyana","lilyanne","lin","lina","linae","lincoln","linda","lindamarie","linday","linde","lindee","lindell","linden","lindey","lindi","lindie","lindon","lindsay","lindse","lindsee","lindsey","lindsi","lindsie","lindsy","lindy","lindzey","lindzie","lindzy","linea","linell","linette","linford","ling","linh","linn","linna","linnea","linnette","linnie","lino","linsay","linsday","linsdey","linsey","linsie","linsy","linton","linus","linwood","linzey","linzi","linzie","linzy","lional","lionel","lionell","lirio","lisa","lisaann","lisabeth","lisamarie","lisandra","lisandro","lisanne","lisbeth","lise","liset","liseth","lisett","lisette","lisha","lisl","lislie","lissa","lisset","lissete","lisseth","lissett","lissette","lita","litany","litisha","lititia","little","liv","livia","liz","liza","lizabeth","lizandra","lizandro","lizann","lizbet","lizbeth","lizet","lizeth","lizett","lizette","lizza","lizzet","lizzete","lizzeth","lizzett","lizzette","lizzie","llesenia","llewellyn","lloyd","lluvia","loan","lofton","logan","loida","lois","lola","lolita","loma","lon","lona","londa","londell","london","lonell","lonetta","long","loni","lonna","lonnell","lonnie","lonny","lonzell","lonzo","lopaka","lor","lora","lorah","loraine","loralee","loralei","loralie","loran","loranzo","lord","lorea","loreal","lorean","loreana","loredana","loree","loreen","loreena","lorelei","lorell","lorelle","loren","lorena","lorence","lorenda","lorene","lorenia","lorenna","lorenso","lorenz","lorenza","lorenzo","loreto","loretta","lori","loria","loriana","loriann","lorianna","lorianne","loribeth","lorie","loriel","lorielle","lorien","lorilee","lorilei","lorimar","lorin","lorina","lorinda","lorine","loring","lorissa","lorn","lorna","lorne","lorra","lorraina","lorraine","lorren","lorrena","lorretta","lorri","lorrie","lorrin","lorry","lory","loryn","lotoya","lottie","lou","louann","louella","louie","louis","louisa","louise","loura","lourdes","louvenia","love","lovell","lovely","lovelyn","lovette","lovey","lovie","lovina","lowell","lowen","loyal","loyd","loyda","ltoya","lu","luan","luana","luann","luanna","luanne","lubna","luc","luca","lucan","lucas","lucerito","lucero","lucette","luci","lucia","lucian","luciana","lucianna","luciano","lucie","lucien","lucienne","lucila","lucile","lucille","lucina","lucinda","lucine","lucio","lucious","lucius","lucky","lucrecia","lucresha","lucretia","lucus","lucy","ludia","ludivina","ludwig","lue","luella","lugenia","luigi","luis","luisa","luisalberto","luisana","luisanna","luiscarlos","luismiguel","luiz","luiza","lukas","luke","lukus","lula","luna","lupe","lupita","luqman","lura","lurdes","lurena","lus","lusia","luther","lutisha","luvenia","luvia","luz","luzmaria","ly","lyda","lydell","lydia","lydon","lyla","lyle","lyly","lyman","lyn","lyna","lynae","lynard","lynda","lyndale","lynde","lyndee","lyndell","lynden","lyndi","lyndia","lyndie","lyndon","lyndsay","lyndse","lyndsee","lyndsey","lyndsi","lyndsie","lyndsy","lyndy","lynea","lynell","lynelle","lynesha","lynessa","lynett","lynetta","lynette","lynise","lynita","lynlee","lynn","lynna","lynnae","lynne","lynnea","lynnell","lynnetta","lynnette","lynnsey","lynsay","lynsey","lynsi","lynsie","lynwood","lynze","lynzee","lynzi","lynzie","lynzy","lyonel","lyra","lyric","lysa","lysander","lysandra","lysette","lyssa","lyza","lyzette","ma","maari","mabel","mable","mac","macall","macario","macarthur","mace","maceo","macey","macgregor","machael","machell","machelle","maci","macie","maciel","macio","mack","mackenzi","mackenzie","macon","macrina","macus","macy","madai","madaline","madalyn","maddalena","maddie","maddison","madelaine","madeleine","madelin","madeline","madelyn","madelyne","madelynn","madia","madiha","madilyn","madina","madison","madolyn","madonna","madyson","mae","maegan","maegen","maeghan","maeve","magali","magalie","magaly","magan","magda","magdalen","magdalena","magdalene","magdaleno","magdalyn","magdeline","magdiel","magen","maggi","maggie","maggy","maghan","maghen","magic","magin","magnolia","magnum","magnus","magon","maha","mahala","mahalia","mahdi","mahealani","maheen","maher","mahesh","mahina","mahlon","mahmood","mahmoud","mahogany","mahogony","mahyar","mai","maia","maichael","maida","maigan","maigen","maija","maika","maiko","maila","maile","maili","maira","maire","mairead","mairin","maisha","maisie","maite","maja","majesta","majid","major","majorie","makaela","makaila","makala","makayla","makeba","makeda","makeia","makeisha","makena","makenna","makenzie","makesha","makeya","makia","makida","makila","makinzie","makisha","makita","makoto","mala","malachi","malaika","malaina","malak","malaka","malanie","malari","malarie","malary","malcolm","malcom","male","malea","maleah","maleaha","malee","maleia","malek","maleka","malena","malene","malerie","malessa","malgorzata","mali","malia","maliha","malik","malika","malikah","malin","malina","malinda","malini","malisa","malisha","malissa","malita","malka","malky","mallarie","mallary","mallerie","mallery","mallie","mallisa","mallissa","mallori","mallorie","mallory","maloree","malori","malorie","malory","malvin","maly","malynda","mamie","man","mana","manal","manan","manda","mandee","mandeep","mandel","mandi","mandie","mandilyn","mando","mandrell","mandy","manfred","manika","manish","manisha","manna","manny","manoah","manolo","manpreet","mansi","mansoor","mansour","manu","manual","manuel","manuela","manuella","manya","mao","maquita","mar","mara","marah","maral","maram","maranatha","maranda","marbella","marbin","marc","marcal","marcanthony","marcas","marcedes","marcee","marcel","marcela","marcelina","marceline","marcelino","marcell","marcella","marcelle","marcello","marcellous","marcellus","marcelo","marcelus","marcey","marche","marchell","marchella","marchelle","marchello","marchetta","marci","marcia","marcial","marciano","marcie","marcin","marcio","marco","marcoantonio","marcos","marcquis","marcus","marcy","mardi","mare","maree","mareena","mareesa","marek","marella","maren","marena","marenda","mareo","maresa","maresha","mareshah","maressa","maretta","margalit","margan","margaret","margaretann","margarete","margarett","margaretta","margarette","margarita","margarite","margarito","margaux","margeaux","margery","margherita","margie","margit","margo","margot","margret","margrett","marguerite","margues","marguetta","marguis","marguita","margulia","margurite","mari","maria","mariachristina","mariadejesus","mariadel","mariadelaluz","mariadelcarmen","mariaelena","mariaguadalupe","mariah","mariaisabel","marialuisa","mariam","mariama","marian","mariana","marianela","mariann","marianna","marianne","mariano","mariateresa","mariatheresa","mariavictoria","maribel","maribell","maribeth","marica","maricarmen","marice","maricel","maricela","maricella","marichelle","maricia","marico","maricruz","maricus","marie","mariea","marieann","marieke","mariel","mariela","marielena","mariella","marielle","mariesa","marieta","marietta","mariette","marigny","marija","marijane","marijo","marika","mariko","marilee","marilena","marili","marilin","marilou","marilu","mariluz","marily","marilyn","marilynn","marin","marina","marinda","marinna","marino","mario","marion","mariquita","maris","marisa","marisabel","marisel","marisela","marisella","marisha","marisia","marisol","marison","marissa","marit","marita","marites","maritsa","maritza","marium","marius","marivel","mariya","mariza","marizol","marja","marjan","marjon","marjorie","marjory","mark","marka","markale","markanthony","markas","markcus","marke","markeda","markee","markeese","markeeta","markeia","markeis","markeisha","markeita","markeith","markel","markela","markell","markella","markelle","markese","markesha","markeshia","marketa","marketia","marketta","markey","markeya","markeyta","marki","markia","markice","markida","markie","markiesha","markina","markis","markise","markisha","markita","markitta","marko","markos","markus","marla","marlaina","marlana","marland","marlanda","marlayna","marle","marlea","marlee","marleen","marleigh","marleina","marlen","marlena","marlene","marlenne","marleny","marley","marli","marlicia","marlie","marlin","marlina","marlinda","marline","marlisa","marlise","marlisha","marlissa","marlo","marlon","marlos","marlow","marlowe","marly","marlyn","marlynn","marlys","marnae","marne","marnee","marnell","marni","marnie","marnita","maron","marquail","marquan","marquarius","marquasha","marquay","marque","marquee","marquel","marquell","marquella","marquelle","marquerite","marques","marquesa","marquese","marquesha","marqueshia","marqueta","marquetta","marquette","marquez","marquia","marquice","marquida","marquie","marquies","marquin","marquis","marquisa","marquise","marquisha","marquist","marquita","marquite","marquitta","marqus","marranda","marrio","marrisa","marrissa","marry","marsela","marsell","marsha","marshae","marshal","marshall","marshawn","marshay","marsheena","marshell","marshelle","marshia","marshon","mart","marta","martavious","martavius","marte","martel","martell","martellis","marten","martez","martha","marti","martia","martin","martina","martine","martinez","martinique","martino","martisha","martiza","martize","martrel","martrell","martrice","marty","martyn","marucs","marva","marvel","marvell","marvelous","marven","marvette","marvin","marvina","marvis","marwa","marwan","mary","marya","maryalice","maryam","maryann","maryanna","maryanne","marybel","marybell","marybeth","marycatherine","maryclaire","maryclare","marye","maryelizabeth","maryellen","maryetta","maryfrances","marygrace","maryhelen","maryia","maryjane","maryjo","marykate","marykatherine","marykathleen","marykathryn","maryl","maryland","marylee","marylin","marylou","marylouise","marylu","marylyn","marylynn","marymargaret","maryn","maryrose","marysa","marysia","marysol","maryssa","masha","mashanda","mashell","masiel","mason","massiel","massimo","master","mat","matalie","matan","matasha","mateo","mathan","mathaniel","mathew","mathhew","mathias","mathieu","mathilda","mathilde","mathis","matia","matias","matilda","matilde","matisha","matrice","matricia","matt","mattea","matteo","mattew","matthan","matthe","matthen","matther","mattheu","matthew","matthews","matthias","matthieu","matti","mattia","mattie","mattison","mattlock","matty","maude","maudie","maura","maureen","mauri","mauria","maurica","maurice","mauricia","mauricio","maurie","maurilio","maurine","maurio","maurisa","maurisha","maurissa","maurita","maurizio","mauro","maury","maverick","mavis","max","maxamillion","maxfield","maxie","maxim","maxime","maximilian","maximiliano","maximillian","maximino","maximo","maxine","maxmillian","maxton","maxwell","maxx","may","maya","maybelle","maybelline","mayda","mayela","mayer","maygan","maygen","mayla","maylee","mayleen","maylene","maylin","mayling","maylynn","mayme","maynard","maynor","mayo","mayra","mayte","mayumi","mayur","mazen","mazin","mber","mcarthur","mccall","mccoy","mcihael","mckay","mckayla","mckell","mckenna","mckenzie","mckinley","mckinsey","mckinzie","mclean","me","mea","meagan","meagen","meaghan","meaghann","meaghen","meagon","meah","meara","mecaela","mecca","mechel","mechelle","mecos","medina","mee","meegan","meeghan","meeka","meena","meenakshi","meera","meesha","meg","mega","megan","megann","meganne","megean","megen","meggan","meggen","meggi","meggie","meggin","megha","megham","meghan","meghana","meghann","meghanne","meghean","meghen","megin","megnan","megon","megumi","megyn","mehan","mehdi","mehgan","mehmet","mehran","mehul","mehwish","mei","meia","meigan","meighan","meika","meiling","meir","meira","meisha","meka","mekayla","mekia","mekos","mel","melaina","melaine","melana","melandie","melanee","melaney","melani","melania","melanie","melannie","melany","melba","melchizedek","melchor","meldoy","mele","melea","meleah","meleane","melecio","melena","melessa","melia","melida","melina","melinda","melindasue","melisa","melisha","meliss","melissa","melissaann","melissasue","melisse","melissia","melisssa","melita","melitza","meliza","mellanie","mellisa","mellissa","mellody","melodee","melodi","melodie","melody","melondy","melonee","meloney","melonie","melony","melquiades","melton","melva","melvin","melvina","melvyn","melynda","melysa","melyssa","memorie","memory","mena","menachem","mendel","mendi","mendy","meng","menno","meosha","meoshia","mera","meranda","merced","mercede","mercedes","mercedez","mercy","meredeth","meredith","meredyth","meri","meriah","meriam","merica","merida","merideth","meridith","merilee","merilyn","merinda","merisa","merissa","merl","merle","merlin","merlinda","merline","merlyn","merrell","merri","merrick","merridith","merrie","merrilee","merrill","merrissa","merritt","merry","merton","mervin","mervyn","mery","meryl","meryn","mesha","meshach","meshawn","meshell","meshelle","meshia","messiah","meta","metta","meyer","meyosha","mi","mia","miah","miasia","mica","micael","micaela","micaella","micah","micahel","micaiah","mical","micala","micale","mican","micayla","miceala","micha","michae","michaeal","michael","michaela","michaelangelo","michaelanthony","michaeldavid","michaele","michaelene","michaelia","michaeljohn","michaella","michaelle","michaelpaul","michaelvincent","michaelyn","michah","michail","michal","michala","michale","michalle","michea","micheal","micheala","michel","michela","michelangelo","michele","michelene","michelina","micheline","michell","michella","michelle","michiel","michiko","micholas","michole","michon","mick","mickael","mickaela","mickala","mickayla","mickeal","mickel","mickelle","mickey","micki","mickie","mickle","micky","micole","midori","mieka","mieko","miesha","migdalia","migel","mignon","miguel","miguelangel","mihcael","mija","mika","mikael","mikaela","mikah","mikail","mikaila","mikal","mikala","mikayla","mike","mikea","mikeal","mikeala","mikeisha","mikel","mikela","mikell","mikella","mikelle","mikenna","mikesha","mikey","mikeya","mikhael","mikhail","mikhaila","miki","mikia","mikiala","mikio","mikita","mikka","mikkel","mikki","miko","mikol","mikos","mila","milagro","milagros","milam","milan","milana","milburn","mildred","milena","miles","milessa","milford","milinda","milisa","milissa","milka","millard","miller","millicent","millie","millisa","millissa","milly","milo","milos","milton","mily","mimi","min","mina","minda","mindee","mindi","mindie","mindy","minerva","minette","ming","minh","minique","minna","minnie","minta","miquel","mir","mira","miracle","miranda","mireille","mirel","mirella","mireya","miri","miriah","miriam","mirian","mirinda","mirissa","mirlande","mirna","miroslava","mirra","mirranda","mirta","mirtha","miryam","mirza","misa","misael","mischa","misha","mishael","mishell","mishelle","missi","missie","missy","mistee","mister","misti","mistie","mistina","misty","mitch","mitcheal","mitchel","mitchell","mitchelle","mitesh","mithcell","mitra","mitul","mitzi","mitzy","miya","miyoshi","mizraim","modesta","modesto","mohamad","mohamed","mohammad","mohammed","mohit","mohsin","moira","moise","moises","moishe","moiz","molli","mollie","molly","mollye","momoko","mona","monae","monalisa","monchel","monchell","moncia","mone","moneca","moneika","moneisha","moneka","monesha","monet","monette","monic","monica","monice","monick","monico","monifa","monigue","monik","monika","moniqua","monique","monisha","monque","monquie","monroe","monta","montae","montague","montana","montanna","montario","montavious","montavius","monte","montee","montel","montell","montey","montez","montgomery","montia","montie","montoya","montral","montre","montreal","montrel","montrell","montrelle","montrez","montrice","monty","monya","morad","moraima","moranda","mordechai","moreen","morena","morgaine","morgan","morgana","morgann","morganne","morgen","morghan","morgin","moria","moriah","morio","morrell","morris","morrisa","mortez","morton","mose","moses","moshe","mostafa","moustafa","moya","mozell","mrk","muhamed","muhammad","muhammed","muna","muneerah","munir","murad","murice","muriel","murphy","murray","murry","musa","mustafa","my","mya","myah","mycal","mychael","mychal","mycheal","myda","myeasha","myeisha","myesha","myeshia","myhanh","myia","myiesha","myisha","myishia","myka","mykah","mykal","mykel","mykia","mykisha","myla","mylan","mylene","myles","mylinda","mylinh","mylissa","myndi","mynor","myosha","myra","myranda","myrella","myria","myriah","myriam","myrlande","myrna","myron","myrtle","mysha","mystery","mysti","mystie","mystique","na","naa","naaman","nabeel","nabil","nabila","nabor","nachelle","nachman","nachole","nachum","nacole","nada","nadean","nadeem","nadeen","nadege","nadeige","nadene","nader","nadia","nadim","nadina","nadine","nadir","nadira","nadirah","nadiya","nadiyah","nadja","nadya","naeem","naeemah","nael","nafeesa","nafeesah","nafis","naftali","naguan","naheed","nahla","nahshon","nahum","nai","naida","nail","naila","nailah","naim","naima","naimah","nainoa","naiomi","nairobi","nairoby","nairy","naisha","naiya","naja","najah","najee","naji","najib","najla","najma","najwa","nakea","nakecia","nakeda","nakedra","nakeena","nakeesha","nakeeta","nakeia","nakeisha","nakeita","nakendra","nakesha","nakeshia","naketa","nakeya","nakia","nakiah","nakiea","nakiesha","nakieta","nakima","nakisha","nakita","nakiya","nakkia","nakyia","nalani","nalee","nalleli","nallely","nam","namiko","namrata","nan","nana","nanci","nancie","nancy","nancyann","nandita","nanette","nani","nanisha","nannette","nansi","naomi","naomie","napolean","napoleon","naquan","naquita","nara","narada","narah","narayana","narciso","narda","nari","naria","narin","narissa","narita","nary","nasario","naseem","nash","nasha","nashae","nashawn","nashay","nashea","nashika","nashira","nasia","nasir","nasiya","nasreen","nasser","nastacia","nastasha","nastashia","nastasia","nastassia","nastassja","nasya","natacha","natacia","natahsa","natale","natalee","natali","natalia","natalie","nataline","natally","nataly","natalya","natalye","natan","natanael","natane","natanya","natarsha","natasa","natascha","natash","natasha","natashia","natasia","natassia","natassja","natausha","natavia","nataya","nate","nateasha","natesha","nateshia","natessa","natha","nathaiel","nathali","nathalia","nathalie","nathaly","nathan","nathanael","nathanal","nathaneal","nathanel","nathania","nathanial","nathaniel","nathasha","nathen","natheniel","nathifa","nathon","natia","naticia","natika","natilee","natilie","natina","natisha","natishia","natividad","natlie","natonya","natosha","natoshia","natoya","natricia","natthew","naudia","naureen","nausheen","nava","navarro","naveed","naveen","navia","navid","navin","navy","nawal","nayda","nayeli","nayra","nazanin","nazario","nazia","nazir","nazish","ncole","ndidi","ndrew","neal","neale","nechama","nechelle","necia","necole","ned","neda","nedra","neel","neelam","neeley","neelie","neely","neema","neena","neenah","neeraj","neesa","neesha","nefertiti","nefi","neftali","neftaly","negar","neghan","negin","neha","nehemiah","neida","neidra","neil","neila","neill","neilson","neiman","neisha","neka","nekeia","nekeisha","nekesha","nekeshia","nekia","nekisha","nekita","nekole","nelda","nelia","nelida","nelissa","nell","nella","nelle","nellie","nelly","nels","nelson","nelvin","nely","nena","neng","neomi","nephi","nereida","nereyda","neri","nerissa","nery","nesa","nesha","nessa","nessie","nestor","netasha","netra","nettie","neva","nevada","neveen","neville","nevin","newell","newman","newton","neysa","neysha","nga","ngan","nghia","ngoc","ngocanh","ngozi","nguyen","nguyet","nhan","nhi","nhia","nhu","nhung","nhut","nia","nial","niall","niasha","nicaela","nicanor","nicasio","niccole","nichael","nichalas","nichalos","nichel","nichele","nichelle","nichlas","nichlos","nichlous","nichoal","nichoals","nichoel","nichol","nichola","nicholad","nicholai","nicholas","nicholaus","nichole","nicholes","nicholette","nicholi","nicholis","nicholl","nicholle","nicholos","nichols","nicholus","nick","nickalas","nickalaus","nickalos","nickalus","nickcole","nickelous","nickey","nicki","nickia","nickie","nickisha","nicklas","nicklaus","nicklous","nickol","nickolaos","nickolas","nickolaus","nickole","nickoles","nickolus","nickos","nicky","nicle","nicloe","niclole","nico","nicodemus","nicol","nicola","nicolaas","nicolai","nicolas","nicolasa","nicolaus","nicole","nicolet","nicoletta","nicolette","nicoli","nicolina","nicolle","nicollette","nicolo","nicos","nicosha","nida","nidal","nidhi","nidia","nidya","niel","niels","niema","niesha","nieshia","nieves","nigel","nigeria","nija","nijah","nik","nika","nikcole","nikea","nikeisha","nikela","nikesh","nikesha","nikeshia","niketa","nikeya","nikhil","niki","nikia","nikie","nikisha","nikita","nikitta","nikiya","nikka","nikki","nikkia","nikkie","nikkita","nikko","nikkol","nikkolas","nikkole","niklas","niklaus","niko","nikol","nikola","nikolai","nikolaos","nikolas","nikolaus","nikole","nikoleta","nikolos","nikos","nila","nilda","nile","niles","nilesh","nils","nilsa","nima","nimesh","nimisha","nina","ninamarie","ninfa","ninja","nino","niomi","niquita","nira","niraj","nirali","nirav","nirvana","nisa","nisha","nishan","nishant","nisreen","nissa","nita","nitasha","nithya","nitin","nitza","niva","nivea","nivia","nixon","niya","niyoka","njideka","nkauj","nkechi","nnamdi","nneka","nnenna","noa","noah","noal","noam","noami","noble","nochum","nocole","noe","noel","noelani","noele","noelia","noell","noella","noelle","noemi","noemy","noga","noha","nohealani","nohemi","nola","nolan","noland","nolberto","nolen","nona","nonie","noor","noora","nora","norah","norbert","norberto","noreen","norelle","nori","noriko","norine","noris","norissa","norma","normajean","norman","normand","normandy","norris","norvell","norwood","nou","nour","noura","nova","novella","novia","nowell","nthony","nubia","nunzio","nura","nuria","nuvia","nya","nyah","nyasha","nyasia","nycole","nydia","nyeisha","nyema","nyesha","nyeshia","nygel","nyia","nyiesha","nyisha","nykia","nykole","nyla","nyle","nyles","nyoka","nyomi","nyree","nyshia","nyssa","nyya","nzinga","oakley","oanh","obadiah","obdulio","obed","obert","obie","obinna","obrain","obrian","obrien","obryan","oceana","ocie","octavia","octavian","octaviano","octavio","octavious","octavis","octavius","odalis","odalys","odelia","odell","odessa","odette","odie","odilia","odin","odis","odyssey","ofelia","ogden","ogechi","ohn","ola","olabode","olaf","olajuwon","olan","olando","olanrewaju","olatokunbo","olawale","olegario","olen","olga","olin","oliva","olive","oliver","olivia","olivier","ollie","olubunmi","oluchi","olufemi","olusegun","oluwakemi","oluwatosin","olympia","oma","omair","omaira","omar","omara","omari","omarr","omayra","omega","omer","omero","omesha","omid","omolara","omolola","omri","ona","onalee","ondrea","oneal","oneida","oneil","oneill","onelia","onesimo","onica","onika","onisha","onix","ontario","onterrio","onyx","oona","opal","ophelia","ora","oracio","oral","oralia","oran","orelia","oren","orenthal","orestes","oriana","orie","orin","orion","oris","orlan","orland","orlanda","orlando","orly","orren","orrin","orry","orson","orval","orville","ory","osama","osamah","osbaldo","osborne","oscar","osha","oshua","osiel","osiris","oskar","osman","osmar","osmond","ossie","osualdo","osvaldo","oswald","oswaldo","otavia","otha","othello","otilia","otis","otisha","otniel","otoniel","ottis","otto","ovidio","owen","ozell","oziel","ozzie","ozzy","pa","pablo","paden","padraic","padraig","pagan","page","paige","paisley","pal","palmer","paloma","pam","pamala","pamela","pamelia","pamella","pamla","panagiota","panagiotis","panayiota","panayiotis","pandora","pang","pansy","pao","paola","paolo","paradise","parag","paraskevi","pari","paris","parisa","parish","parker","parks","parnell","parris","parrish","parry","parth","partick","pascal","pascale","pascha","paschal","pascual","pasha","pasquale","passion","pat","patience","patina","patra","patrece","patrecia","patrese","patria","patric","patrica","patrice","patricia","patricie","patricio","patrick","patrik","patrina","patrisha","patrisia","patrizia","patsy","patterson","patti","pattie","patton","pattrick","patty","paul","paula","paulanthony","paulette","paulina","pauline","paulino","paulita","paulmichael","paulo","pavan","pavielle","pawel","paxton","payal","payam","payton","paz","peaches","pearce","pearl","pearla","pearlie","pearline","pearson","pebbles","peder","pedro","pegah","peggi","peggie","peggy","penelope","peng","penina","penn","penney","penni","pennie","penny","peony","pepper","pepsi","per","percell","percival","percy","perez","perfecto","peri","perla","perlita","pernell","perri","perrin","perris","perry","persephone","pervis","pessy","petar","pete","peter","peterson","petra","petrina","peyton","phaedra","phallon","phalon","phat","phebe","phelan","phelicia","pheng","phi","phil","philadelphia","philana","philbert","philemon","philicia","philip","philipe","philipp","philippa","philippe","phillip","phillipe","phillippe","phillips","phillis","philomena","phineas","phoebe","phoenicia","phoenix","phong","phoua","phu","phuc","phung","phuoc","phuong","phylicia","phylis","phyllicia","phyllip","phyllis","pia","piera","pierce","pierra","pierre","piers","pierson","pieter","pietro","pilar","pinar","pinchas","pinchus","pinky","piotr","piper","pj","placido","polly","ponciano","pooja","poonam","porcha","porche","porchia","porcia","porcsha","porfirio","porscha","porsche","porschea","porschia","porsha","porshe","porshea","porshia","porter","portia","poua","powell","pranay","prashant","pratik","pratima","precilla","precious","preethi","preeti","prem","prentice","prentis","prentiss","prescilla","prescious","prescott","presley","prestina","preston","price","pricila","pricilla","pricillia","pricsilla","prince","princella","princes","princess","princessa","princeston","princeton","printice","prisca","priscella","priscila","priscilla","priscillia","prisilla","prisma","pritesh","priti","priya","priyanka","promise","prudence","prudencio","pual","puanani","puaolena","puja","punam","purcell","purnell","purvis","qasim","qiana","quan","quana","quanah","quanda","quandra","quaneisha","quanesha","quanetta","quanette","quang","quanisha","quanita","quanta","quantarius","quante","quantez","quantia","quantina","quantisha","quantrell","quartez","quashawn","quashon","quason","quatisha","quay","queen","queena","queenie","quenesha","quenna","quennel","quentella","quenten","quentez","quentin","quentina","quentisha","quenton","qui","quiana","quianna","quienton","quillan","quin","quince","quincey","quincy","quindell","quinesha","quinetta","quinette","quinisha","quinita","quinlan","quinn","quinnita","quinta","quintana","quintasha","quintel","quintell","quintella","quinten","quintessa","quintez","quintin","quintina","quintisha","quinton","quintrell","quintus","quinzell","quiona","quisha","qunicy","qunisha","quoc","quran","quron","qushawn","quwan","quyen","raashida","rabecca","rabecka","rabia","race","rachael","rachal","rachale","rachana","rache","racheal","rachel","rachele","rachell","rachelle","rachelmarie","rachiel","rachna","racine","rackel","racquel","rad","radames","radha","radhika","radley","rae","raeann","raeanna","raeanne","raechal","raechel","raechell","raechelle","raegan","raeleen","raelene","raelyn","raelynn","raena","raeshawn","raeven","rafael","rafaela","rafe","rafeal","raffael","raffaele","raffi","raffinee","rafi","rafik","rafiq","ragan","ragina","raguel","raha","rahcel","raheel","raheem","raheen","raheim","rahel","rahiem","rahim","rahman","rahmel","rahmell","rahn","rahsaan","rahshawn","rahul","raiford","rain","raina","rainbow","raine","rainer","rainey","rainie","rainier","rainy","raisa","raissa","raiza","raizel","raizy","raj","raja","rajah","rajan","rajani","rajeev","rajesh","raji","rajinder","rajiv","rakeem","rakeisha","rakel","rakesh","rakesha","rakia","rakisha","raleigh","ralph","ralphael","ralpheal","ralphel","ralston","ram","rama","raman","ramanda","ramar","rambo","ramel","ramell","ramero","ramesh","ramey","rami","ramia","ramie","ramin","ramina","ramirez","ramiro","ramon","ramona","ramond","ramonda","ramondo","ramone","ramonia","ramonita","ramos","ramsay","ramses","ramsey","ramy","ramzi","ramzy","rana","ranada","ranae","ranald","ranaldo","ranardo","rance","rand","randa","randal","randale","randall","randalyn","randee","randel","randell","randi","randie","randle","randol","randolf","randolph","random","randon","randy","rane","ranee","raneisha","ranelle","ranesha","ranessa","raney","rani","rania","ranier","raniesha","ranika","ranisha","ranita","ranjit","rankin","ransen","ransom","ranson","rany","raoul","raphael","raphaela","rapheal","raphel","raquel","raquell","raquelle","rasaan","rasan","raschelle","rasean","rasha","rashaad","rashaan","rashad","rashada","rashan","rashana","rashanda","rashanna","rashard","rashaud","rashaun","rashauna","rashaunda","rashawn","rashawna","rashawnda","rashed","rasheda","rashee","rasheed","rasheeda","rasheedah","rasheem","rasheen","rasheena","rasheida","rasheka","rashel","rashell","rashelle","rashi","rashia","rashid","rashida","rashidah","rashidi","rashika","rashmi","rashod","rashon","rashonda","rashun","rashunda","rasul","ratha","rattana","raudel","raul","raushanah","ravan","raven","ravi","ravin","ravis","ravon","ravyn","rawley","ray","raya","rayan","rayann","rayanna","rayanne","rayburn","rayce","raychel","raychelle","raye","rayfield","rayford","rayla","rayland","rayleen","raylene","raylon","raylynn","raymar","raymon","raymond","raymondo","raymone","raymont","raymund","raymundo","rayn","rayna","raynaldo","raynard","rayne","raynell","raynette","raynisha","raynold","raynor","rayon","raysa","raysean","rayshan","rayshaun","rayshawn","rayshell","rayshon","rayshun","rayven","rayvon","raziel","rc","rea","reagan","ream","reana","reann","reanna","reanne","reannon","reba","rebakah","rebbeca","rebbecca","rebbie","rebcca","rebeca","rebecah","rebecca","rebeccah","rebecka","rebeckah","rebeka","rebekah","rebekan","rebekha","rebekka","rebekkah","rebel","rebella","recardo","recco","rechel","rechelle","reco","redell","redmond","reece","reed","reem","reema","reena","reese","reesha","reeshemah","reeva","refugio","regan","regena","reggie","reggina","regginald","regina","reginal","reginald","reginaldo","regine","reginia","regino","reginold","regis","regnald","regory","reham","rehana","reid","reiko","reilly","reina","reinaldo","reine","reisha","rejeana","reka","rekeisha","rekha","rekia","rekita","reko","rema","rembert","remi","remigio","remijio","remington","remo","remona","remus","remy","ren","rena","renada","renae","renald","renaldo","renard","renardo","renata","renate","renato","renaud","renay","renda","rendell","rendi","rendy","rene","renea","renecia","renee","reneisha","reneka","renel","renell","renelle","renesha","renessa","reneta","renetta","renette","renia","renier","renika","renisha","renita","renn","renna","renne","rennie","renny","reno","renso","renzo","reo","requel","requita","resa","resha","reshard","reshawn","reshma","reshonda","reshunda","reta","retha","retta","reuben","reuven","reva","revae","reve","revecca","revel","revis","rex","rexford","rey","reyes","reymundo","reyn","reyna","reynaldo","reynard","reynol","reynold","reynoldo","reynolds","reza","rhandi","rhapsody","rhawnie","rhea","rheana","rheanna","rheanne","rheannon","rhema","rhen","rhesa","rhet","rhett","rhian","rhiana","rhianna","rhiannan","rhiannon","rhianon","rhoda","rhoderick","rhona","rhonda","rhondalyn","rhyan","rhys","ria","rian","riana","riane","riann","rianna","rianne","riannon","ric","rica","ricahrd","ricard","ricardo","riccardo","ricci","ricco","rich","richad","richael","richanda","richar","richard","richardo","richardson","richel","richele","richelle","richerd","richie","richmond","richrd","richy","rick","ricka","rickell","rickelle","rickey","ricki","rickia","rickie","rickita","ricky","rico","ricquita","rifka","rigel","rigo","rigoberto","rigoverto","rihana","rik","rika","riki","rikita","rikki","riko","rilee","riley","rima","rina","rinaldo","rinda","rindi","rindy","rio","rion","risa","rise","risha","rishard","rishawn","rishi","rissa","ristin","rita","ritchie","rith","rithy","rito","rittany","ritu","riva","rivka","rivkah","rivky","riyad","rj","roanna","rob","robb","robbert","robbi","robbie","robbin","robby","robbyn","robecca","rober","robert","roberta","robertlee","roberto","robertson","robet","robi","robie","robin","robina","robinson","robrt","roby","robyn","robyne","robynn","robynne","rocco","roche","rocheal","rochel","rochele","rochell","rochelle","rocio","rock","rockell","rockey","rockford","rockie","rockwell","rocky","rod","rodderick","roddrick","roddy","rodell","roderic","roderick","rodger","rodman","rodney","rodolfo","rodrecus","rodric","rodrick","rodrickus","rodricus","rodrigo","rodrigues","rodriguez","rodrigus","rodrique","rodriques","rodriquez","rody","roel","rogelio","roger","rogerick","rogers","rogue","rohan","rohini","rohit","rohn","roisin","rojelio","rola","rolan","roland","rolanda","rolandas","rolando","rolf","rolland","rollie","rollin","rolly","rolonda","rolondo","roma","romain","romaine","romale","roman","romana","romanda","romar","rome","romeka","romel","romelia","romell","romeo","romero","romie","romina","rommel","rommy","romney","romon","romona","romondo","romone","romualdo","romulo","romy","ron","rona","ronak","ronal","ronald","ronalda","ronaldo","ronan","ronda","rondal","rondale","rondall","rondalyn","rondel","rondell","rondi","rondy","ronee","roneisha","roneka","ronel","ronell","ronelle","ronesha","roneshia","ronetta","ronette","roney","roni","ronica","ronie","ronika","ronique","ronisha","ronit","ronita","ronn","ronna","ronnel","ronnell","ronnette","ronney","ronni","ronnica","ronnie","ronnika","ronnisha","ronnita","ronny","ronrico","ronson","ronte","rontrell","rony","ronya","roopa","roosevelt","roque","rori","rory","rosa","rosaelena","rosalba","rosalee","rosaleen","rosalia","rosalie","rosalina","rosalind","rosalinda","rosaline","rosalio","rosalva","rosalyn","rosalynn","rosamaria","rosamond","rosana","rosangela","rosann","rosanna","rosanne","rosaria","rosario","rosaura","roschelle","roscoe","rose","roseann","roseanna","roseanne","roselee","roselia","roselie","roselina","roseline","rosella","roselle","roselyn","roselynn","rosemaria","rosemarie","rosemary","rosena","rosenda","rosendo","rosetta","rosevelt","rosey","roshan","roshana","roshanda","roshanna","roshaun","roshaunda","roshawn","roshawnda","rosheda","rosheena","roshell","roshelle","roshni","roshonda","roshunda","roshundra","rosia","rosibel","rosie","rosina","rosio","rosita","rosland","roslyn","roslynn","ross","rossana","rossi","rossy","roswell","rosy","roth","rothana","roula","rowan","rowdy","rowena","rowland","roxan","roxana","roxane","roxann","roxanna","roxanne","roxie","roxsana","roxxanne","roxy","roy","roya","royal","royale","royce","rozalind","rozalyn","rozanna","rozanne","rozina","rozlyn","ruben","rubens","rubi","rubie","rubin","rubina","ruby","ruchi","ruddy","rudi","rudie","rudolf","rudolfo","rudolph","rudy","rueben","ruel","rufina","rufino","rufus","rui","rukiya","rula","rulon","rumaldo","rupa","rupert","ruperto","rush","rushabh","russ","russel","russell","rusti","rustin","ruston","rusty","rut","ruth","ruthann","ruthanna","ruthanne","ruthie","ruthy","ruven","ruy","ry","rya","ryan","ryane","ryanlee","ryann","ryanna","ryanne","rydell","ryder","rye","ryen","ryheem","ryker","rylan","ryland","ryle","rylee","ryley","rylie","ryna","ryne","rynell","ryo","ryon","ryosuke","ryu","saad","saadia","saara","saba","sabah","sabas","sabastian","sabin","sabina","sabine","sabino","sable","sabra","sabre","sabrea","sabreen","sabreena","sabrena","sabrenia","sabria","sabrina","sabrine","sacha","sacheen","sachi","sachiko","sachin","sada","sadae","sadaf","sadarian","sade","sadi","sadia","sadie","sadiq","sadiyya","sadonna","saeed","safa","safia","safiya","safiyah","safiyyah","sagar","sage","sahar","sahara","sahib","sahil","sahira","sahra","sahwn","sai","said","saida","saidah","saima","saint","saira","sairah","saisha","sakeena","sakeenah","sakia","sakina","sakinah","sakura","sal","salah","salam","salbador","saleem","saleena","saleh","salem","salena","salicia","salim","salima","salina","salley","sallie","sally","sallyann","salma","salman","salome","salomon","salote","salvador","salvadore","salvatore","saly","sam","samad","samah","saman","samanatha","samanda","samanta","samantah","samanth","samantha","samanthajo","samanthan","samanthia","samar","samara","samaria","samarra","samatha","sambath","sameer","sameera","sameerah","samer","sameul","sami","samia","samie","samika","samina","samir","samira","samirah","samiyah","sammantha","sammi","sammie","sammijo","sammuel","sammy","samnang","samona","samone","samora","samory","sampson","samson","samual","samuel","samuele","samuell","samule","samy","samyra","san","sana","sanaa","sanah","sanam","sanaz","sanchez","sandee","sandeep","sander","sanders","sandhya","sandi","sandie","sandon","sandor","sandra","sandrea","sandria","sandrika","sandro","sandy","sanela","sanford","sang","sanika","sanita","sanjay","sanjiv","sanjuana","sanjuanita","sanna","sanora","sanovia","sanquetta","santa","santana","santania","santanna","santez","santia","santiago","santina","santino","santo","santonio","santos","santosh","santrice","sanuel","sanya","sapan","sapna","sapphira","sapphire","saprina","saquan","sara","saraann","sarabeth","sarae","sarah","sarahann","sarahanne","sarahbeth","sarahelizabeth","sarahi","sarahjane","sarahlynn","sarai","sarajane","sarajo","saralee","saralyn","saran","sarath","saray","sarde","sareena","saren","sarena","saretta","sargon","sarh","sarha","sari","sariah","sarica","sarika","sarin","sarina","sarit","sarita","sarkis","saroeun","saroun","saroya","sarra","sarrah","sary","sasan","sascha","sasha","sasheen","sashia","saskia","satara","sateria","satia","satin","satomi","satoya","saturnino","satyra","sauel","saul","saulo","saundra","saurabh","sausha","savahanna","savahna","savana","savanah","savanha","savanna","savannah","saverio","savhanna","savina","savoeun","savvas","sawyer","saxon","sayaka","sayed","sayra","saysha","sayuri","scarlet","scarlett","scarlette","schneider","schneur","schuyler","schyler","scot","scott","scotti","scottie","scotty","sea","seaira","seairra","seamus","sean","seana","seanmichael","seann","seanna","seanpatrick","seanpaul","seara","searra","season","seaton","sebastian","sebastien","sebrena","sebrina","secilia","secret","seda","sedale","seddrick","sederick","sedric","sedrick","see","seema","seena","seferino","segundo","seiji","seirra","sejal","sekina","sekou","selah","seleena","selena","selene","selenia","selenne","selia","selicia","selim","selin","selina","selinda","selma","selwyn","semaj","semone","sena","senaida","sendy","seneca","senequa","seng","senta","sentoria","september","seqouia","sequan","sequana","sequia","sequita","sequoia","sequoya","sequoyah","sera","serafin","serafina","serah","sereena","serena","serene","serenity","serenna","seretha","serge","sergei","sergio","serigo","serina","serita","serjio","serra","serrena","serria","serrina","serrita","servando","sesar","setareh","seth","seung","sevag","sevan","seve","severiano","severin","severo","seville","seyed","seymour","sha","shaakira","shaan","shaana","shabana","shabazz","shabnam","shacara","shacarra","shaconda","shaconna","shacora","shad","shada","shadae","shadai","shadawn","shaday","shadaya","shade","shadee","shadeed","shadi","shadia","shadie","shadonna","shadrach","shadrick","shady","shae","shaela","shaelene","shaelyn","shaelynn","shaen","shaena","shafiq","shaguana","shahana","shahanna","shahara","shaheed","shaheem","shaheen","shaheerah","shahera","shahid","shahida","shahidah","shahin","shahla","shahzad","shai","shaida","shaila","shailyn","shain","shaina","shaindel","shaindy","shaine","shainna","shaira","shajuan","shajuana","shaka","shakara","shakea","shakeda","shakedra","shakeela","shakeem","shakeema","shakeena","shakeeta","shakeia","shakeila","shakeisha","shakeita","shakeitha","shakela","shakelia","shakema","shakemia","shakena","shakendra","shakenia","shakenna","shakera","shakeria","shakerra","shakesha","shaketa","shaketha","shaketta","shakevia","shakeya","shakeyla","shakia","shakiera","shakila","shakim","shakima","shakina","shakinah","shakir","shakira","shakirah","shakisha","shakita","shakiya","shakka","shakoya","shakyra","shala","shalaina","shalaine","shalamar","shalan","shalana","shalanda","shalandra","shalandria","shalane","shalay","shalaya","shalayne","shalea","shalee","shaleen","shaleena","shaleka","shalena","shalene","shalese","shaleta","shaletha","shaletta","shaley","shalia","shalice","shalie","shalimar","shalin","shalina","shalinda","shalini","shalisa","shalise","shalisha","shalita","shallen","shallon","shalom","shalon","shalona","shalonda","shalunda","shalyce","shalyn","shalynn","shama","shamaine","shamaka","shamanda","shamar","shamara","shamaria","shamarr","shamarra","shamaya","shambra","shameca","shamecca","shameek","shameeka","shameika","shameka","shamekia","shamel","shamela","shamella","shamequa","shamera","shamere","shameria","shametra","shamia","shamica","shamicka","shamieka","shamika","shamille","shamina","shamir","shamira","shamire","shammara","shamon","shamona","shamone","shamonica","shamonique","shamra","shamus","shamya","shamyra","shan","shana","shanae","shanah","shanai","shanan","shanara","shanay","shanaya","shanaz","shance","shanda","shandee","shandel","shandell","shandelle","shandi","shandia","shandie","shandon","shandora","shandra","shandrea","shandreka","shandria","shandrika","shandy","shane","shanea","shaneaka","shaneca","shanece","shanee","shaneeka","shaneen","shaneequa","shaneia","shaneice","shaneika","shaneil","shaneisha","shaneka","shanekia","shanel","shanell","shanelle","shanena","shanequa","shanera","shaneria","shanese","shanesha","shanessa","shanet","shaneta","shanetra","shanetta","shanette","shaney","shani","shania","shanica","shanice","shanicka","shanicqua","shaniece","shanieka","shanigua","shanika","shanikka","shanikqua","shanin","shanina","shanine","shaniqua","shanique","shanise","shanisha","shanita","shanitra","shanitta","shanka","shankar","shanley","shann","shanna","shannah","shannan","shannara","shanne","shannel","shannell","shannelle","shannen","shannette","shannice","shannon","shannyn","shanon","shanquita","shant","shanta","shantae","shantai","shantail","shantal","shantale","shantana","shantara","shantavia","shantay","shantaya","shante","shantea","shantee","shantel","shantele","shantell","shantella","shantelle","shanteria","shanterica","shanterra","shanterria","shantez","shanti","shantia","shantiel","shantika","shantil","shantina","shantivia","shantoria","shantoya","shantrel","shantrell","shantrice","shantya","shanya","shanyn","shaquala","shaquan","shaquana","shaquanda","shaquanna","shaquanta","shaqueena","shaquela","shaquella","shaqueta","shaquetta","shaquila","shaquilla","shaquina","shaquira","shaquita","shaquitta","shaquna","shaquoia","shaqwana","shar","shara","sharad","sharae","sharah","sharai","sharalyn","sharan","sharanda","sharay","sharaya","sharayah","sharda","shardae","shardai","sharday","sharde","shardea","shardee","shardey","shardi","sharea","sharece","sharee","shareece","shareef","shareema","shareen","shareena","shareese","shareka","sharell","sharelle","sharen","sharena","sharene","sharenna","sharesa","sharese","sharetha","sharetta","sharhonda","shari","sharia","shariah","shariann","sharica","sharice","sharicka","sharida","sharie","shariece","sharief","sharieka","sharif","sharifa","sharifah","shariff","sharika","sharilyn","sharin","sharina","sharis","sharise","sharissa","sharisse","sharita","sharity","sharkia","sharla","sharlee","sharleen","sharlena","sharlene","sharletta","sharley","sharli","sharlie","sharlotte","sharlyn","sharmaine","sharmane","sharmayne","sharmel","sharmila","sharna","sharnae","sharnay","sharne","sharnell","sharnelle","sharnette","sharnice","sharnise","sharnita","sharod","sharolyn","sharon","sharona","sharonda","sharone","sharonica","sharonn","sharquita","sharra","sharree","sharrell","sharri","sharrie","sharrod","sharron","sharronda","sharyl","sharyn","shasha","shashana","shasta","shastina","shata","shatanya","shatara","shatarra","shatavia","shataya","shateka","shatera","shateria","shaterica","shaterra","shaterrica","shatia","shatika","shatina","shatisha","shatiya","shatonia","shatonna","shatonya","shatora","shatoria","shatoya","shatrice","shatyra","shaughn","shaughnessy","shaul","shaun","shauna","shaunda","shaundra","shaundrea","shaune","shaunel","shaunelle","shaunette","shaunice","shaunika","shaunita","shaunn","shaunna","shaunta","shauntae","shauntavia","shauntay","shaunte","shauntea","shauntee","shauntel","shauntell","shauntelle","shauntia","shauntina","shauntrice","shauri","shavana","shavanna","shavannah","shavar","shavaughn","shavaun","shavawn","shavette","shavina","shavita","shavon","shavona","shavonda","shavondra","shavone","shavonn","shavonna","shavonne","shavonte","shaw","shawana","shawanda","shawanna","shawn","shawna","shawnae","shawnda","shawndale","shawndra","shawndrea","shawndrika","shawne","shawnee","shawneen","shawneequa","shawnell","shawnelle","shawnequa","shawnese","shawnesha","shawnetta","shawnette","shawnice","shawnie","shawniece","shawnika","shawnique","shawnise","shawnita","shawnna","shawnta","shawntae","shawntai","shawntavia","shawntay","shawntaya","shawnte","shawntee","shawntel","shawntell","shawntelle","shawntez","shawntia","shawon","shawona","shawta","shay","shaya","shayda","shaye","shayla","shaylah","shaylee","shayleen","shaylen","shaylene","shaylin","shaylyn","shaylynn","shayn","shayna","shayne","shaynna","shayon","shayron","shayvonne","shazia","shea","sheala","shealene","shealyn","shealynn","shean","sheana","sheanna","sheba","sheddrick","shedrick","sheela","sheelah","sheema","sheen","sheena","sheenah","sheenna","sheera","sheetal","shehzad","sheika","sheila","sheilah","sheilamarie","sheilla","sheina","sheka","shekela","sheketa","shekeya","shekia","shekima","shekina","shekinah","shekira","shekita","shela","shelagh","shelah","shelaine","shelbe","shelbey","shelbi","shelbie","shelby","sheldon","sheleena","shelena","shelene","shelese","sheli","shelia","shelina","shelisa","shelise","shelita","shella","shelle","shellee","shelley","shelli","shellie","shellina","shelly","shellyann","shelonda","shelsea","shelton","shem","shemeika","shemeka","shemekia","shemia","shemica","shemicka","shemika","shena","shenae","shenandoah","shenay","shene","shenea","shenee","sheneka","shenell","shenelle","shenequa","shenequia","shenetra","shenetta","sheng","shenia","shenica","shenice","shenicka","sheniece","shenika","sheniqua","shenique","shenise","shenisha","shenita","shenna","shepard","shephanie","shequetta","shequila","shequita","shequitta","shera","sherae","sherah","sherard","sheray","shere","sherea","sherece","sheree","shereece","shereen","shereena","shereese","shereka","sherell","sherelle","sheren","sherena","sherene","sheresa","sherese","sheretta","sheri","sheria","sherian","sherica","sherice","shericka","sherida","sheridan","sherie","sheriece","sherif","sherika","sherille","sherilyn","sherilynn","sherin","sherina","sherine","sherise","sherissa","sherisse","sherita","sheritta","sherkia","sherley","sherlonda","sherly","sherlyn","shermaine","sherman","shermeka","shermika","sherna","shernita","sherod","sheron","sheronda","sheronica","sherquita","sherra","sherre","sherree","sherrel","sherrell","sherrelle","sherrese","sherri","sherria","sherriann","sherrica","sherrice","sherrie","sherrika","sherril","sherrill","sherrilyn","sherrina","sherrita","sherrod","sherron","sherronda","sherry","sherryann","sherryl","shervin","sherwin","sherwood","sheryl","sherylann","shetara","sheterica","sheva","shevelle","shevon","shevonne","shey","sheyenne","sheyla","sheyna","shian","shiana","shiann","shianna","shianne","shie","shiela","shiesha","shifra","shiketa","shikha","shikira","shikita","shila","shilah","shilo","shiloh","shilpa","shimeka","shimika","shimon","shin","shina","shineka","shinika","shiniqua","shinita","shiquita","shira","shirah","shiraz","shiree","shireen","shirell","shirelle","shiri","shirin","shirita","shirlee","shirleen","shirlena","shirlene","shirley","shiron","shital","shiv","shiva","shivani","shivon","shivonne","shley","shloime","shlomo","shmeka","shmuel","shneur","sho","shola","sholanda","sholom","sholonda","shomari","shon","shona","shonda","shondell","shondra","shone","shonelle","shonetta","shoni","shonika","shonna","shonta","shontae","shontai","shontavia","shontay","shontaya","shonte","shontel","shontell","shontelle","shonteria","shontia","shoshana","shoshanna","shoshannah","shoua","shraga","shree","shreena","shrena","shreya","shrita","shronda","shruti","shua","shuan","shulem","shun","shunda","shundra","shundreka","shundrika","shunita","shunta","shuntae","shuntavia","shuntay","shunte","shuntel","shunteria","shuree","shyam","shyann","shyanna","shyanne","shyla","shylah","shyler","shylo","shyra","shyvonne","sia","sian","siana","sianna","siaosi","siara","siarra","sibyl","sicily","sid","siddharth","sidney","sidra","siearra","siedah","siena","sienna","siera","sierra","sierria","sigifredo","signe","sigourney","sigrid","sila","silas","silbia","silena","silva","silvana","silvano","silver","silverio","silvester","silvestre","silvia","silviano","silvina","silvio","sim","sima","simcha","simeon","simi","simmie","simon","simona","simone","simpson","simran","sina","sinan","sinclair","sindi","sindia","sindy","sinead","sinthia","sintia","siobahn","sioban","siobhan","siomara","sion","sione","sir","sirena","siri","sirron","sissy","sita","sitha","sivan","sixto","skip","skipper","sky","skye","skyeler","skyla","skylar","skyler","skylor","slade","sloan","sloane","slyvia","smantha","smauel","smita","smith","sneha","snow","so","sobia","socorro","socrates","soctt","sofia","sofie","sohrab","soila","sojourner","sok","sokha","sokhom","sol","solana","solange","solangel","soledad","soleil","solina","soloman","solomon","solon","solveig","somer","sommer","somnang","son","sona","sonal","sonali","sondra","song","sonia","sonja","sonnet","sonni","sonnia","sonnie","sonny","sonora","sony","sonya","soo","sophal","sophan","sophana","sophanna","sophat","sopheak","sopheap","sophia","sophie","sophy","sora","soraida","sorangel","soraya","soren","sotero","sotirios","sou","soua","soyla","sparkle","special","spence","spencer","spenser","spiro","spiros","spring","squire","srah","srinivas","stacee","stacey","staceyann","stachia","staci","stacia","stacie","stacy","stacye","stafanie","stafford","staley","stalin","stan","stanely","stanford","stanley","stanton","staphanie","star","starkeisha","starkisha","starla","starlena","starlene","starlet","starlett","starlette","starlina","starlyn","starlynn","starnisha","starr","starrla","starsha","stasha","stasia","stavros","steele","stefan","stefanee","stefani","stefania","stefanie","stefano","stefanos","stefany","stefen","steffan","steffani","steffanie","steffany","steffen","steffon","stefon","stehanie","stella","sten","stepahnie","stepanie","stepehn","stepen","stepfanie","stepfon","stephaie","stephaine","stephan","stephana","stephane","stephanee","stephaney","stephani","stephania","stephanie","stephanieann","stephanine","stephannie","stephano","stephanos","stephany","stephanye","stephen","stephene","stephenie","stephens","stephenson","stepheny","stephine","stephnie","stephon","stephone","stephonie","sterling","stesha","stetson","stevan","steve","stevee","steveland","steven","stevens","stevenson","stevette","stevi","stevie","stevin","stevon","stevyn","steward","stewart","stina","stirling","stoney","stony","storm","stormey","stormi","stormie","stormy","stpehen","stphanie","stratton","stuart","su","suad","suan","suanne","subrina","sudeep","sue","sueann","sueanne","sueellen","suellen","suhail","suhey","sujey","sulaiman","suleiman","sulema","suliman","sullivan","sully","sulma","sultan","sultana","suly","suman","sumeet","sumer","sumera","sumit","summar","summer","summers","sumner","sun","sundae","sunday","sundee","sundeep","sung","suni","sunil","sunita","sunni","sunnie","sunny","sunshine","suong","suraj","suresh","susa","susan","susana","susane","susann","susanna","susannah","susanne","susette","susi","susie","susy","sutton","suzan","suzana","suzann","suzanna","suzannah","suzanne","suzette","suzie","suzy","suzzanne","suzzette","sven","swati","sweet","sweta","sy","sybil","syble","sybrina","sydne","sydnee","sydney","sydni","sydnie","syed","syeda","sylena","sylina","syliva","sylivia","sylvan","sylvana","sylver","sylvester","sylvia","sylvie","symantha","symeon","symone","syndy","synthia","syreeta","syrena","syretta","syrita","ta","taavon","tab","tabatha","tabbatha","tabbetha","tabbitha","tabetha","tabethia","tabia","tabita","tabitha","tabithia","tacara","tacarra","taccara","taci","tacia","tacoma","tacora","tacoya","tacy","tad","tadd","tadeusz","tae","taeisha","taelor","taesha","tafari","taffany","taffy","taft","taggart","tahara","taheerah","tahesha","tahir","tahira","tahirah","tahisha","tahlia","tahnee","tahra","tai","taiesha","taija","taina","taira","tairra","taisa","taisha","taisia","tait","taiwan","taiwo","taj","taja","taji","tajuan","tajuana","tajuanna","takahiro","takara","takarra","takasha","takashi","takecia","takeela","takeena","takeesha","takeia","takeila","takeisha","takela","takelia","takendra","takenya","takera","takeria","takesha","takeshia","takeya","takeysha","takia","takila","takima","takina","takindra","takira","takisha","takita","takiya","takiyah","takyra","tal","tala","talal","talan","talana","talar","talaya","talayah","talbot","talea","taleah","taleasha","taleen","taleisha","talena","talesha","taleshia","taletha","tali","talia","taliah","talib","talicia","talika","talin","talina","talisa","talisha","talishia","talissa","talitha","talley","tallie","tallon","tallulah","talmadge","talmage","talon","talonda","talor","talya","tam","tama","tamaine","tamaira","tamala","tamar","tamara","tamarah","tamarcus","tamare","tamari","tamaria","tamario","tamarra","tamatha","tamaya","tamber","tambi","tambra","tambria","tamea","tameca","tamecia","tamecka","tameeka","tameika","tameisha","tameka","tamekia","tamela","tamella","tamer","tamera","tameria","tamerra","tamesha","tameshia","tami","tamia","tamica","tamicka","tamie","tamieka","tamika","tamikia","tamikka","tamiko","tamila","tamilia","tamillia","tamir","tamira","tamirra","tamisha","tamitha","tamiya","tamkia","tamla","tammara","tammera","tammi","tammie","tammra","tammy","tamora","tamoya","tamra","tamsen","tamyra","tan","tana","tanae","tanaia","tanairi","tanara","tanasha","tanasia","tanay","tanaya","tanda","tandi","tandra","tandrea","tandria","tandy","tanea","taneasha","tanecia","tanee","taneeka","taneesha","taneika","taneisha","taneka","tanekia","tanequa","taner","tanera","tanesha","taneshia","tanesia","tanessa","tanetta","taneya","tang","tangee","tangela","tangie","tani","tania","tanica","tanicia","tanicka","taniesha","tanika","tanina","taniqua","tanisha","tanishia","tanita","taniya","tanja","tanjanika","tanna","tanner","tannette","tannia","tannya","tansy","tanya","tanyia","tanzania","taquan","taquana","taquia","taquila","taquilla","taquisha","taquita","taquoya","tara","taraann","tarah","taralee","taralyn","taralynn","taran","taraneh","taras","taree","tarek","tarel","tarell","taren","tarena","tarence","tareq","taresa","taressa","tareva","tarez","tarha","tari","taria","tarica","tarik","tarika","tarin","tarina","tariq","tarique","tarisha","tarissa","tarita","tarl","tarna","tarnesha","tarnisha","taro","taron","taronda","tarra","tarrah","tarran","tarrance","tarrell","tarren","tarrence","tarria","tarrin","tarron","tarry","tarryn","tarsha","tarun","tarus","tarvaris","tarvis","taryll","taryn","taryne","tarynn","tascha","tasha","tashae","tashana","tashanda","tashanna","tashara","tashauna","tashawn","tashawna","tashawnda","tashay","tashayla","tashea","tasheba","tasheema","tasheena","tasheika","tasheka","tashelle","tashema","tashena","tashenna","tashera","tashia","tashiana","tashiba","tashieka","tashika","tashima","tashina","tashira","tashonda","tashonna","tashunda","tasia","tasneem","tasnim","tassia","tassie","tata","tate","tatia","tatiana","tatianna","tatum","tatyana","tauheedah","tauna","taundra","tauni","taunya","taura","taurean","tauren","taureon","taurus","tausha","tava","tavaras","tavares","tavaris","tavarius","tavarus","tavia","tavian","tavin","tavio","tavis","tavish","tavius","tavon","tavoris","tawain","tawan","tawana","tawanda","tawanna","tawna","tawnee","tawney","tawni","tawnia","tawnie","tawny","tawnya","tawonda","tawsha","taya","tayanna","tayla","taylar","tayler","taylon","taylor","taylore","tayna","taysha","taysia","tayvon","taz","tazia","teagan","teagen","teague","teah","teaira","teairra","teal","teala","teana","teandra","teandre","teanna","teara","tearia","tearle","tearra","teasha","teaundra","teaya","tecora","ted","tedd","teddi","teddie","teddrick","teddy","tedi","tedra","tedric","tedrick","tee","teea","teegan","teejay","teela","teena","teenamarie","teesha","teffany","tegan","tehani","tehila","tehran","teia","teiara","teila","teira","teirra","teisha","tej","teja","tejal","tejas","tejay","tejuan","teka","tekeisha","tekesha","tekeshia","tekia","tekisha","tekla","tekoa","tel","tela","telah","telecia","telena","telesforo","telesha","telia","telicia","telina","telisa","telisha","tell","telly","telma","temeka","temekia","temia","temika","temisha","temitope","temperance","tempess","tempest","tempestt","temple","tena","tenaya","tenea","tenecia","tenee","teneil","teneisha","teneka","tenell","tenelle","tenequa","tenesha","teneshia","tenesia","teneya","teng","tenia","tenica","tenicia","tenielle","teniesha","tenika","tenile","tenille","teniqua","tenisa","tenise","tenisha","tenita","tenley","tenna","tennia","tennile","tennille","teodora","teodoro","teodulo","teofilo","teon","teona","teondra","teonia","teonna","teosha","tephanie","teppei","tequan","tequia","tequila","tequilla","tequisha","tequita","tera","terah","teralyn","teran","terance","terasa","terasha","terea","tereasa","tereka","terell","terelle","teren","terena","terence","teresa","terese","teresha","teresita","teressa","terez","tereza","teri","teria","teriann","terica","tericka","terika","terilyn","terin","terina","terisa","terisha","termaine","teron","terra","terrace","terrah","terrail","terral","terrall","terran","terrance","terre","terrel","terrell","terrelle","terren","terrence","terresa","terri","terria","terrial","terrian","terriann","terrica","terrick","terricka","terrie","terrika","terril","terrill","terrilyn","terrilynn","terrin","terrina","terrion","terris","terrisa","terron","terry","terryl","terryn","tertia","teryl","teryn","tesa","tesha","teshara","teshia","tesia","tesla","tess","tessa","tessia","tessica","tessie","tessy","teven","tevis","tevita","tex","texas","teya","teyana","teyona","thad","thaddaeus","thaddeaus","thaddeus","thaddius","thadeus","thadius","thaer","thai","thais","thalia","thane","thang","thanh","thao","thara","thary","thatcher","thavy","thayer","thayne","thea","theadora","theadore","theary","thedore","thelbert","thelma","theo","theodis","theodor","theodora","theodore","theodoros","theodus","theon","theophilus","theordore","theotis","thera","theran","theresa","therese","theresia","theressa","theron","therron","thersa","thi","thia","thien","thierry","thimothy","thinh","tho","thoa","thoams","thoeun","thom","thomas","thomasina","thomasine","thompson","thoms","thomson","thong","thor","thorin","thorn","thornton","thu","thuan","thurman","thurston","thuy","thy","thyda","tia","tiago","tiah","tiaira","tiajuana","tiamarie","tiana","tiandra","tiane","tiani","tianna","tiara","tiare","tiarra","tiasha","tiauna","tiawana","tibisay","tichelle","tieara","tiearra","tieasha","tieisha","tieka","tiela","tien","tiera","tierica","tiernan","tierney","tierra","tierre","tiesha","tieshia","tifanee","tifani","tifanie","tifany","tiffancy","tiffane","tiffanee","tiffaney","tiffani","tiffanie","tiffannie","tiffanny","tiffany","tiffanyann","tiffanye","tiffay","tiffeney","tiffeny","tiffiany","tiffine","tiffiney","tiffini","tiffinie","tiffiny","tiffnay","tiffney","tiffny","tiffony","tighe","tija","tijuan","tijuana","tika","tikeisha","tikia","tikisha","tila","tilla","tillie","tilton","tim","timara","timaree","timarie","timathy","timber","timberly","timeka","timekia","timesha","timi","timia","timika","timisha","timithy","timmie","timmothy","timmy","timohty","timon","timonthy","timoteo","timoth","timothee","timotheus","timothey","timothy","timoty","timtohy","timur","tin","tina","tinamarie","tinea","tineka","tinesha","tinia","tinika","tinisha","tinita","tino","tinsley","tion","tiona","tionna","tiphani","tiphanie","tiphany","tiquan","tira","tiron","tirrell","tirso","tirzah","tisa","tisha","tishana","tishanna","tishara","tishawn","tishawna","tisheena","tishia","tishina","titania","titiana","tito","titus","tivon","tiwana","tiwanna","tiya","tiyana","tiziana","tj","toan","tobey","tobi","tobiah","tobias","tobie","tobin","toby","tocara","tocarra","toccara","tod","todd","toddrick","todrick","toi","tolulope","tom","tomara","tomas","tomasa","tomasina","tomasz","tomeka","tomekia","tomer","tomesha","tomeshia","tomi","tomica","tomie","tomika","tomisha","tomislav","tommi","tommie","tommy","tomoko","tomothy","tomy","tona","tonda","tondalaya","tondra","tonee","toneisha","toneka","tonesha","toneshia","tonette","toney","tong","tonga","toni","tonia","toniann","tonica","tonie","tonika","tonimarie","toniqua","tonique","tonisha","tonita","tonja","tonna","tonnetta","tonny","tony","tonya","tonyetta","tonyia","topacio","topaz","tor","tora","toran","tore","toree","torell","toren","torey","tori","toria","torian","toriano","toribio","torie","torin","torrance","torre","torrell","torren","torrence","torrey","torri","torrian","torrie","torris","torry","tory","tosca","tosh","tosha","toshia","toshiba","toshua","tou","toua","toure","toussaint","tova","tovah","tove","towana","towanda","towanna","townsend","toy","toya","toye","toyia","trace","tracee","tracey","traci","tracie","tracina","tracy","tracyann","tradd","trae","tralana","tram","tramain","tramaine","tramane","tramayne","tramel","tramell","trammell","trampus","tran","trandon","tranell","trang","traniece","tranise","tranquilino","trapper","trasha","travanti","travares","travaris","travarus","travas","travell","travelle","traven","traveon","traver","travers","traves","travia","travian","travin","travion","travious","travis","travius","travon","travonne","travonta","travoris","travus","tray","trayon","trayvon","tre","treana","treanna","treasa","treasure","treavor","trebor","trecia","treena","treg","trell","trellis","tremain","tremaine","tremayne","tremel","tremell","tremika","trena","trenae","trenda","trene","trenea","trenecia","trenee","trenice","treniece","trenika","trenise","trenisha","trenna","trent","trenten","trentin","trenton","tres","tresa","tresha","tressa","tressia","tressie","treva","trevan","trevar","trevell","trever","trevin","trevion","trevis","trevon","trevonte","trevor","trey","treyvon","tri","tria","triana","trianna","trica","tricha","trichelle","tricia","trimaine","trina","trinette","trinh","trini","trinidad","trinika","trinisha","trinity","trinton","trish","trisha","trishia","trissa","trista","tristain","tristan","tristen","tristia","tristian","tristin","tristina","tristine","triston","tristy","tristyn","triva","trivia","trixie","tron","trong","troy","truc","trudi","trudie","trudy","truly","trumaine","truman","trung","truong","tryone","trysta","trystan","tu","tuan","tucker","tuesday","tulio","tully","tung","tunisha","tunisia","tuongvi","turan","turell","turhan","turner","turquoise","turrell","tuyen","tuyet","twana","twanda","twanisha","twanna","twila","twyla","ty","tya","tyan","tyana","tyann","tyanna","tyanne","tyara","tyasia","tyce","tychelle","tye","tyeasha","tyechia","tyeesha","tyeisha","tyerra","tyesa","tyese","tyesha","tyeshia","tyeson","tyffani","tyffanie","tyffany","tyhesha","tyia","tyiesha","tyisha","tyishia","tyjuan","tyke","tykeisha","tykesha","tykia","tykisha","tyla","tylan","tylar","tyleen","tylen","tylene","tyler","tylesha","tylia","tylicia","tylisha","tylor","tylynn","tymber","tymeka","tymel","tymika","tymon","tyna","tynan","tyne","tyneesha","tyneisha","tynell","tynesha","tyneshia","tynetta","tynia","tynica","tynika","tynise","tynisha","tynishia","tyonna","tyquan","tyra","tyran","tyre","tyrece","tyree","tyreece","tyreek","tyreese","tyreik","tyrek","tyreka","tyrel","tyrell","tyrelle","tyren","tyrene","tyrese","tyresha","tyrhonda","tyria","tyrice","tyrie","tyriek","tyrik","tyrin","tyrina","tyris","tyrisha","tyrome","tyron","tyronda","tyrone","tyronica","tyronn","tyronne","tyrrell","tyrus","tysen","tysha","tyshaun","tyshawn","tysheena","tysheka","tyshell","tyshelle","tyshema","tyshia","tyshon","tyson","tywan","tywana","tywanda","tywanna","tywon","tzipora","tziporah","tzipporah","tzivia","tzvi","ubaldo","uchechi","uchenna","ugo","ulanda","ulices","ulises","ulisses","ulyses","ulysses","umair","umar","una","undra","undrea","uniqua","unique","unknown","urban","urbano","uri","uriah","urias","uriel","ursula","usher","usman","ustin","utopia","uvaldo","uyen","uzma","uzoamaka","va","vada","vahe","vaishali","val","valaree","valari","valaria","valarie","valbona","valdemar","valecia","valeen","valen","valena","valencia","valene","valenica","valente","valentin","valentina","valentine","valentino","valeri","valeria","valeriano","valerie","valerieann","valerio","valery","valeska","valicia","valincia","valinda","valine","valisa","valisha","valissa","vallerie","vallery","valori","valorie","valrie","valynn","van","vana","vanassa","vance","vanda","vandell","vander","vanecia","vanesa","vanesha","vaness","vanessa","vanessamarie","vanessia","vanette","vaneza","vang","vangie","vania","vanisha","vanita","vanity","vann","vanna","vannak","vannary","vannesa","vannessa","vanny","vanya","varina","varonica","varsha","vartan","varun","vashawn","vashon","vashti","vasiliki","vasilios","vasilis","vassilios","vatche","vaughan","vaughn","veasna","veda","veena","velda","velencia","velia","velicia","velina","velinda","velissa","velma","velvet","vena","venancio","vencent","venecia","venesa","venesha","venessa","venetia","venetta","venice","venise","venisha","venita","vennessa","venson","ventura","venus","veonica","vera","verdell","verena","verenice","verity","verlin","verlinda","verlon","vern","verna","vernal","vernard","verne","vernell","vernetta","vernice","vernisha","vernita","vernon","vernonica","veroncia","veronia","veronica","veronika","veronique","verronica","vesna","vessica","vesta","vester","vi","viana","vianca","vianey","vianna","vianney","vibol","vic","vicent","vicenta","vicente","vick","vicken","vickey","vicki","vickie","vicktoria","vicky","victor","victoria","victoriana","victoriano","victorino","victorio","victory","vida","vidal","vidhya","vidya","vien","vienna","viet","vijay","vika","vikas","vikash","viki","vikki","vikram","viktor","viktoria","viliami","vilma","vimal","vina","vinay","vince","vincent","vincente","vincenza","vincenzo","vincient","vineet","vinessa","vinh","vinita","vinod","vinson","vinton","vinyette","viola","violet","violeta","violetta","violette","vipul","viraj","virak","virgen","virgie","virgil","virgilio","virgina","virginia","viridiana","vishal","vishnu","vita","vito","vittoria","vittorio","vivek","vivi","vivian","viviana","vivianna","vivien","vivienne","vladimir","von","vonda","vondell","vonessa","vonetta","vong","vonn","vonnie","vontrell","vonzell","vu","vue","vuong","vuthy","vy","vyron","wa","wacey","waddell","wade","wael","wafa","wagner","wai","waldemar","waldo","waleed","waleska","wali","walid","walker","wallace","wallis","wally","walt","walter","walton","wanda","wang","wanisha","wanita","waqas","ward","wardell","warner","warren","waseem","washington","watson","waverly","wayde","wayland","waylen","waylon","wayman","waymon","waymond","wayne","webster","wednesday","wei","weldon","wellington","wells","welton","wenceslao","wendall","wende","wendel","wendell","wendi","wendie","wendolyn","wendy","wenonah","werner","wes","weslee","wesley","weslie","wesly","wess","wessley","west","westen","westin","westley","westly","weston","wheeler","whisper","whit","whitley","whitnee","whitney","whitni","whitnie","whitt","whittney","wil","wilber","wilbert","wilberto","wilbur","wilburn","wilda","wilder","wiley","wilford","wilfred","wilfredo","wilfrid","wilfrido","wilhelm","wilhelmina","wilhemina","wiliam","wilisha","will","willa","willaim","willam","willard","willem","willena","willetta","willette","willia","william","williams","willian","willie","willilam","willington","willis","willliam","willow","willy","wilma","wilmary","wilmer","wilson","wilton","windell","windsor","windy","winfield","winford","winfred","wing","winifred","winn","winnie","winona","winslow","winston","winter","winton","wissam","witney","wlliam","wm","wojciech","wolfgang","won","woodie","woodley","woodrow","woody","worth","wray","wren","wright","wyatt","wykesha","wykeshia","wykisha","wylene","wylie","wyman","wynetta","wynn","wynona","wynonna","wynter","wynton","xandria","xanthe","xavia","xavier","xaviera","xavion","xeng","xenia","xia","ximena","xiomara","xiong","xochil","xochilt","xochitl","xuan","xue","xylina","xzavier","yaa","yaacov","yaakov","yadhira","yadira","yael","yaffa","yahaira","yahayra","yahira","yahya","yair","yaira","yajaira","yajayra","yakima","yakov","yalanda","yale","yalitza","yalonda","yamaris","yamil","yamile","yamilet","yamileth","yamilette","yaminah","yamira","yan","yana","yancey","yancy","yaneli","yanelis","yaneris","yanessa","yanet","yaneth","yanette","yang","yanina","yanique","yanira","yanitza","yaniv","yanna","yannick","yaquelin","yara","yareli","yarelis","yarenis","yaritza","yaseen","yasemin","yaser","yasheka","yashica","yashika","yashira","yasin","yasir","yasmeen","yasmin","yasmina","yasmine","yasser","yavonda","yaw","yazan","yazmin","yecenia","yecheskel","yechezkel","yechiel","yedidya","yee","yehoshua","yehuda","yehudah","yehudis","yelitza","yen","yeng","yeni","yennifer","yenny","yentel","yentl","yer","yesenia","yeshaya","yesica","yesika","yessenia","yessica","yetta","yetunde","yevette","yezenia","yiannis","ying","yisrael","yisroel","yitty","yitzchak","yitzchok","ymelda","yoana","yoanna","yobani","yocheved","yoel","yohance","yoko","yoland","yolanda","yolando","yolonda","yomaira","yomara","yomayra","yon","yona","yonah","yonas","yonatan","yonathan","yong","yoni","york","yosef","yoselin","yoselyn","yoseph","yoshiko","yoshio","youa","youlanda","young","yousef","yousif","youssef","yovani","ysabel","ysenia","ysidro","yu","yudith","yuji","yukari","yuki","yukiko","yuko","yul","yulanda","yulia","yuliana","yulisa","yulissa","yulonda","yumi","yumiko","yun","yung","yuri","yuriana","yuridia","yuriko","yury","yusef","yusra","yusuf","yusuke","yuvia","yvan","yves","yvett","yvette","yvon","yvonna","yvonne","zabrina","zac","zacariah","zacarias","zacary","zaccary","zacchaeus","zach","zacharey","zachari","zacharia","zachariah","zacharian","zacharias","zacharie","zachary","zacheriah","zachery","zachory","zachrey","zachry","zack","zackariah","zackary","zackery","zackory","zackry","zafirah","zahid","zahir","zahira","zahra","zaid","zaida","zain","zaina","zainab","zaira","zak","zakaria","zakary","zakee","zakery","zaki","zakia","zakiya","zakiyah","zakiyyah","zalika","zalman","zalmen","zan","zana","zandra","zandrea","zandria","zane","zaneta","zanetta","zara","zarah","zarina","zarinah","zasha","zavier","zavion","zaynab","zaynah","zayne","zayra","zeb","zebadiah","zebariah","zebedee","zebediah","zebulen","zebulon","zebulun","zechariah","zed","zedrick","zeena","zeeshan","zeferino","zehra","zeina","zeinab","zeke","zelda","zelene","zella","zelma","zena","zenaida","zenas","zenia","zenna","zeno","zenobia","zenon","zephaniah","zephyr","zer","zerrick","zeshan","zeth","zeus","zev","zia","ziad","zina","zinnia","ziomara","zion","zipporah","zita","ziyad","zoe","zoey","zofia","zohra","zoila","zola","zoltan","zong","zonia","zora","zoraida","zorina","zoua","zubair","zubin","zulay","zuleika","zulema","zuleyka","zully","zulma","zvi",""]},"nounPlural":{"nounPlural":["abilities","abroads","abuses","accesses","accidents","accounts","acts","actia","actives","activities","actors","ads","additia","addresses","administratia","adults","advances","advantages","advertisings","advices","affairs","affects","afternoa","ages","agencies","agents","agreements","airs","airlines","airports","alarms","alcohols","alternatives","ambitia","amounts","analyses","analysts","angers","angles","animals","annuals","answers","anxieties","anybodies","anythings","anywheres","apartments","appeals","appearances","apples","applicatia","appointments","areas","arguments","arms","armies","arrivals","arts","articles","asides","asks","aspects","assignments","assists","assistances","assistants","associates","associatia","assumptia","atmospheres","attacks","attempts","attentia","attitudes","audiences","authors","averages","awards","awarenesses","babies","backs","backgrounds","bads","bags","bakes","balances","balls","bands","banks","bars","bases","baseballs","bases","baskets","bats","baths","bathrooms","battles","beaches","bears","beats","beautifuls","beds","bedrooms","beers","beginnings","beings","bells","belts","benches","bends","benefits","bets","beyonds","bicycles","bids","bigs","bikes","bills","birds","births","birthdays","bits","bites","bitters","blacks","blames","blanks","blinds","blocks","bloods","blows","blues","boards","boats","bodies","bones","boni","books","boots","borders","bosses","bothers","bottles","bottoms","bowls","boxes","boys","boyfriends","brains","branches","braves","breads","breaks","breakfasts","breasts","breaths","bricks","bridges","brieves","brilliants","broads","brothers","browns","brushes","buddies","budgets","bugs","buildings","bunches","burns","buses","businesses","butta","buys","buyers","cabinets","cables","cakes","calendars","calls","calms","cameras","camps","campaigns","cans","cancels","cancers","candidates","candles","candies","caps","capitals","cars","cards","cares","careers","carpets","carries","cases","cashes","cats","catches","categories","causes","celebratia","cells","chains","chairs","challenges","champia","championships","chances","changes","channels","chapters","characters","charges","charities","charts","checks","cheeks","chemicals","chemistries","chests","chickens","children","childhoods","chips","chocolates","choices","churches","cigarettes","cities","claims","classes","classics","classrooms","clerks","clicks","clients","climates","clocks","closets","clotheses","clouds","clubs","clues","coaches","coasts","coats","codes","coffees","colds","collars","collectia","colleges","combinatia","combines","comforts","comfortables","commands","comments","commercials","commissia","committees","comma","communicatia","communities","companies","comparisa","competitia","complaints","complexes","computers","concentrates","concepts","concerns","concerts","conclusia","conditia","conferences","confidences","conflicts","confusia","connectia","consequences","consideratia","consists","constants","constructia","contacts","contests","contexts","contracts","contributia","controls","conversatia","converts","cooks","cookies","copies","corners","costs","counts","counters","countries","counties","couples","courages","courses","courts","cousins","covers","cows","cracks","crafts","crashes","crazies","creams","creatives","credits","crews","criticisms","crosses","cries","cultures","cups","currencies","currents","curves","customers","cuts","cycles","dads","damages","dances","dares","darks","datas","databases","dates","daughters","days","deads","deals","dealers","dears","deaths","debates","debts","decisia","deeps","definitia","degrees","delays","deliveries","demands","departments","departures","dependents","deposits","depressia","depths","descriptia","designs","designers","desires","desks","details","developments","devices","devils","diamonds","diets","differences","difficulties","digs","dimensia","dinners","directia","directors","dirts","disasters","disciplines","discounts","discussia","diseases","dishes","disks","displays","distances","distributia","districts","divides","doctors","documents","dogs","doors","dots","doubles","doubts","drafts","drags","dramas","draws","drawers","drawings","dreams","dresses","drinks","drives","drivers","drops","drunks","dues","dumps","dusts","duties","ears","earths","eases","easts","eats","economicses","economies","edges","editors","educatia","effects","effectives","efficiencies","efforts","eggs","electia","elevators","emergencies","emotia","emphases","employs","employees","employers","employments","ends","energies","engines","engineers","engineerings","entertainments","enthusiasms","entrances","entries","environments","equals","equipments","equivalents","errors","escapes","essays","establishments","estates","estimates","evenings","events","evidences","exams","examinatia","examples","exchanges","excitements","excuses","exercises","existences","exits","experiences","experts","explanatia","expressia","extensia","extents","externals","extremes","eyes","faces","facts","factors","fails","failures","falls","familiars","families","fans","farms","farmers","fats","fathers","faults","fears","features","fees","feeds","feedbacks","feels","feelings","females","fews","fields","fights","figures","files","fills","films","finals","finances","findings","fingers","finishes","fires","fishes","fishings","fixes","flights","floors","flows","flowers","flies","foci","folds","followings","foods","feet","footballs","forces","forevers","forms","formals","fortunes","foundatia","frames","freedoms","friends","friendships","fronts","fruits","fuels","funs","functia","funerals","funnies","futures","gains","games","gaps","garages","garbages","gardens","gasses","gates","gathers","gears","genes","generals","gifts","girls","girlfriends","gives","glads","glasses","gloves","goes","goals","gods","golds","golves","goods","governments","grabs","grades","grands","grandfathers","grandmothers","grasses","greats","greens","groceries","grounds","groups","growths","guarantees","guards","guesses","guests","guidances","guides","guitars","guys","habits","hairs","halves","halls","hands","handles","hangs","harms","hats","hates","heads","healths","hearings","hearts","heats","heavies","heights","hells","helloes","helps","hides","highs","highlights","highways","hires","historians","histories","hits","holds","holes","holidays","homes","homeworks","honeys","hooks","hopes","horrors","horses","hospitals","hosts","hotels","hours","houses","housings","humans","hunts","hurries","hurts","husbands","ices","ideas","ideals","ives","illegals","images","imaginatia","impacts","implements","importances","impresses","impressia","improvements","inactia","incidents","incomes","increases","independences","independents","indicatia","individuals","industries","inevitables","inflatia","influences","informatia","initials","initiatives","injuries","insects","insides","inspectia","inspectors","instances","instructia","insurances","intentia","interactia","interests","internals","internationals","internets","interviews","introductia","investments","invites","ira","islands","issues","its","items","jackets","jobs","joins","joints","jokes","judges","judgments","juices","jumps","juniors","juries","keeps","keys","kicks","kids","kills","kinds","kings","kisses","kitchens","knees","knives","knowledges","labs","lacks","ladders","ladies","lakes","lands","landscapes","languages","laughs","laws","lawyers","lays","layers","leads","leaders","leaderships","leadings","leagues","leathers","leaves","lectures","legs","lengths","lessa","lets","letters","levels","libraries","lies","lives","lifts","lights","limits","lines","links","lips","lists","listens","literatures","livings","loads","loans","locals","locatia","locks","logs","longs","looks","losses","loves","lows","lucks","lunches","machines","magazines","mails","mains","maintenances","majors","makes","males","malls","men","managements","managers","manners","manufacturers","manies","maps","marches","marks","markets","marketings","marriages","masters","matches","mates","materials","maths","matters","maximums","maybes","meals","meanings","measurements","meats","medias","medicines","mediums","meets","meetings","members","memberships","memories","mentia","menus","messes","messages","metals","methods","middles","midnights","mights","milks","minds","mines","minimums","minors","minutes","mirrors","misses","missia","mistakes","mixes","mixtures","mobiles","modes","models","moms","moments","moneys","monitors","months","moods","mornings","mortgages","mosts","mothers","motors","mountains","mice","mouths","moves","movies","muds","muscles","musics","nails","names","nasties","natia","nationals","natives","naturals","natures","neats","necessaries","necks","negatives","negotiatia","nerves","nets","networks","newses","newspapers","nights","nobodies","noises","normals","norths","noses","notes","nothings","notices","novels","numbers","nurses","objects","objectives","obligatia","occasia","offers","offices","officers","officials","oils","ones","openings","operatia","opinia","opportunities","opposites","optia","oranges","orders","ordinaries","organizatia","originals","others","outcomes","outsides","ovens","owners","paces","packs","packages","pages","pains","paints","paintings","pairs","panics","papers","parents","parks","parkings","parts","particulars","partners","parties","passes","passages","passengers","passia","pasts","paths","patiences","patients","patterns","pauses","pays","payments","peaces","peaks","pens","penalties","pensia","peoples","percentages","perceptia","performances","periods","permissia","permits","people","personals","personalities","perspectives","phases","philosophies","phones","photos","phrases","physicals","physicses","pianos","picks","pictures","pies","pieces","pins","pipes","pitches","pizzas","places","plans","planes","plants","plastics","plates","platforms","plays","players","pleasures","plenties","poems","poets","poetries","points","polices","policies","politicses","pollutia","pools","pops","populatia","positia","positives","possessia","possibilities","possibles","posts","pots","potatoes","potentials","pounds","powers","practices","preferences","preparatia","presences","presents","presentatia","presidents","presses","pressures","prices","prides","priests","primaries","principles","prints","priors","priorities","privates","prizes","problems","procedures","processes","produces","products","professia","professionals","professors","profiles","profits","programs","progresses","projects","promises","promotia","prompts","prooves","properties","proposals","protectia","psychologies","publics","pulls","punches","purchases","purples","purposes","pushes","puts","qualities","quantities","quarters","queens","questia","quiets","quits","quotes","races","radioes","rains","raises","ranges","rates","ratioes","raws","reaches","reactia","reads","readings","realities","reasa","receptia","recipes","recognitia","recommendatia","records","recordings","recovers","reds","references","reflectia","refrigerators","refuses","regia","registers","regrets","regulars","relatia","relationships","relatives","releases","relieves","remotes","removes","rents","repairs","repeats","replacements","replies","reports","representatives","republics","reputatia","requests","requirements","researches","reserves","residents","resists","resolutia","resolves","resorts","resources","respects","responds","responses","responsibilities","rests","restaurants","results","returns","reveals","revenues","reviews","revolutia","rewards","rices","riches","rides","rings","rips","rises","risks","rivers","roads","robots","rocks","roles","rolls","roofs","rooms","ropes","roughs","rounds","routines","rows","royals","rubs","ruins","rules","runs","rushes","sads","saves","safeties","sails","salads","salaries","sales","salts","samples","sands","sandwiches","satisfactia","saves","savingses","scales","scenes","schedules","schemes","schools","sciences","scores","scratches","screens","screws","scripts","seas","searches","seasa","seats","seconds","secrets","secretaries","sectia","sectors","securities","selectia","selves","sells","seniors","senses","sensitives","sentences","series","serves","services","sessia","sets","settings","sexes","shakes","shames","shapes","shares","shes","shelters","shifts","shines","ships","shirts","shocks","shoes","shoots","shops","shoppings","shots","shoulders","shows","showers","sicks","sides","signs","signals","signatures","significances","sillies","silvers","simples","sings","singers","singles","sinks","sirs","sisters","sites","situatia","sizes","skills","skins","skirts","skies","sleeps","slices","slides","slips","smells","smiles","smokes","snows","societies","socks","softs","softwares","soils","solids","solutia","somewheres","sa","songs","sorts","sounds","soups","sources","souths","spaces","spares","speakers","specials","specialists","specifics","speeches","speeds","spells","spends","spirits","spirituals","spites","splits","sports","spots","sprays","spreads","springs","squares","stables","stafves","stages","stands","standards","stars","starts","states","statements","statia","stati","stays","steaks","steals","steps","sticks","stills","stocks","stomaches","stops","storages","stores","storms","stories","strains","strangers","strategies","streets","strengths","stresses","stretches","strikes","strings","strips","strokes","structures","struggles","students","studioes","studies","stufves","stupids","styles","subjects","substances","successes","sucks","sugars","suggestia","suits","summers","suns","supermarkets","supports","surgeries","surprises","surrounds","surveys","suspects","sweets","swims","swimmings","swings","switches","sympathies","systems","tables","tackles","tales","talks","tanks","taps","targets","tasks","tastes","taxes","teas","teaches","teachers","teachings","teams","tears","technologies","telephones","televisia","tells","temperatures","temporaries","tennes","tensia","terms","tests","texts","thankses","themes","theories","things","thoughts","throats","tickets","ties","tills","times","tips","titles","todays","toes","tomorrows","tones","tongues","tonights","tools","teeth","tops","topics","totals","touches","toughs","tours","tourists","towels","towers","towns","tracks","trades","traditia","traffics","trains","trainers","trainings","transitia","transportatia","trashes","travels","treats","trees","tricks","trips","troubles","trucks","trusts","truths","tries","tunes","turns","twists","twoes","types","uncles","understandings","unia","uniques","units","universities","uppers","upstairses","uses","users","usuals","vacatia","valuables","values","variatia","varieties","vasts","vegetables","vehicles","versia","videoes","views","villages","viri","visits","visuals","voices","volumes","waits","wakes","walks","walls","wars","warnings","washes","watches","waters","waves","ways","weaknesses","wealths","wears","weathers","webs","weddings","weeks","weekends","weights","weirds","welcomes","wests","westerns","wheels","whereases","whiles","whites","wholes","wives","wills","wins","winds","windows","wines","wings","winners","winters","wishes","witnesses","women","wonders","woods","words","works","workers","workings","worlds","worries","worths","wraps","writers","writings","yards","years","yellows","yesterdays","yous","youngs","youths","zones",""]},"nounSingular":{"nounSingular":["ability","abroad","abuse","access","accident","account","act","action","active","activity","actor","ad","addition","address","administration","adult","advance","advantage","advertising","advice","affair","affect","afternoon","age","agency","agent","agreement","air","airline","airport","alarm","alcohol","alternative","ambition","amount","analysis","analyst","anger","angle","animal","annual","answer","anxiety","anybody","anything","anywhere","apartment","appeal","appearance","apple","application","appointment","area","argument","arm","army","arrival","art","article","aside","ask","aspect","assignment","assist","assistance","assistant","associate","association","assumption","atmosphere","attack","attempt","attention","attitude","audience","author","average","award","awareness","baby","back","background","bad","bag","bake","balance","ball","band","bank","bar","base","baseball","basis","basket","bat","bath","bathroom","battle","beach","bear","beat","beautiful","bed","bedroom","beer","beginning","being","bell","belt","bench","bend","benefit","bet","beyond","bicycle","bid","big","bike","bill","bird","birth","birthday","bit","bite","bitter","black","blame","blank","blind","block","blood","blow","blue","board","boat","body","bone","bonus","book","boot","border","boss","bother","bottle","bottom","bowl","box","boy","boyfriend","brain","branch","brave","bread","break","breakfast","breast","breath","brick","bridge","brief","brilliant","broad","brother","brown","brush","buddy","budget","bug","building","bunch","burn","bus","business","button","buy","buyer","cabinet","cable","cake","calendar","call","calm","camera","camp","campaign","can","cancel","cancer","candidate","candle","candy","cap","capital","car","card","care","career","carpet","carry","case","cash","cat","catch","category","cause","celebration","cell","chain","chair","challenge","champion","championship","chance","change","channel","chapter","character","charge","charity","chart","check","cheek","chemical","chemistry","chest","chicken","child","childhood","chip","chocolate","choice","church","cigarette","city","claim","class","classic","classroom","clerk","click","client","climate","clock","closet","clothes","cloud","club","clue","coach","coast","coat","code","coffee","cold","collar","collection","college","combination","combine","comfort","comfortable","command","comment","commercial","commission","committee","common","communication","community","company","comparison","competition","complaint","complex","computer","concentrate","concept","concern","concert","conclusion","condition","conference","confidence","conflict","confusion","connection","consequence","consideration","consist","constant","construction","contact","contest","context","contract","contribution","control","conversation","convert","cook","cookie","copy","corner","cost","count","counter","country","county","couple","courage","course","court","cousin","cover","cow","crack","craft","crash","crazy","cream","creative","credit","crew","criticism","cross","cry","culture","cup","currency","current","curve","customer","cut","cycle","dad","damage","dance","dare","dark","data","database","date","daughter","day","dead","deal","dealer","dear","death","debate","debt","decision","deep","definition","degree","delay","delivery","demand","department","departure","dependent","deposit","depression","depth","description","design","designer","desire","desk","detail","development","device","devil","diamond","diet","difference","difficulty","dig","dimension","dinner","direction","director","dirt","disaster","discipline","discount","discussion","disease","dish","disk","display","distance","distribution","district","divide","doctor","document","dog","door","dot","double","doubt","draft","drag","drama","draw","drawer","drawing","dream","dress","drink","drive","driver","drop","drunk","due","dump","dust","duty","ear","earth","ease","east","eat","economics","economy","edge","editor","education","effect","effective","efficiency","effort","egg","election","elevator","emergency","emotion","emphasis","employ","employee","employer","employment","end","energy","engine","engineer","engineering","entertainment","enthusiasm","entrance","entry","environment","equal","equipment","equivalent","error","escape","essay","establishment","estate","estimate","evening","event","evidence","exam","examination","example","exchange","excitement","excuse","exercise","existence","exit","experience","expert","explanation","expression","extension","extent","external","extreme","eye","face","fact","factor","fail","failure","fall","familiar","family","fan","farm","farmer","fat","father","fault","fear","feature","fee","feed","feedback","feel","feeling","female","few","field","fight","figure","file","fill","film","final","finance","finding","finger","finish","fire","fish","fishing","fix","flight","floor","flow","flower","fly","focus","fold","following","food","foot","football","force","forever","form","formal","fortune","foundation","frame","freedom","friend","friendship","front","fruit","fuel","fun","function","funeral","funny","future","gain","game","gap","garage","garbage","garden","gas","gate","gather","gear","gene","general","gift","girl","girlfriend","give","glad","glass","glove","go","goal","god","gold","golf","good","government","grab","grade","grand","grandfather","grandmother","grass","great","green","grocery","ground","group","growth","guarantee","guard","guess","guest","guidance","guide","guitar","guy","habit","hair","half","hall","hand","handle","hang","harm","hat","hate","head","health","hearing","heart","heat","heavy","height","hell","hello","help","hide","high","highlight","highway","hire","historian","history","hit","hold","hole","holiday","home","homework","honey","hook","hope","horror","horse","hospital","host","hotel","hour","house","housing","human","hunt","hurry","hurt","husband","ice","idea","ideal","if","illegal","image","imagination","impact","implement","importance","impress","impression","improvement","inaction","incident","income","increase","independence","independent","indication","individual","industry","inevitable","inflation","influence","information","initial","initiative","injury","insect","inside","inspection","inspector","instance","instruction","insurance","intention","interaction","interest","internal","international","internet","interview","introduction","investment","invite","iron","island","issue","it","item","jacket","job","join","joint","joke","judge","judgment","juice","jump","junior","jury","keep","key","kick","kid","kill","kind","king","kiss","kitchen","knee","knife","knowledge","lab","lack","ladder","lady","lake","land","landscape","language","laugh","law","lawyer","lay","layer","lead","leader","leadership","leading","league","leather","leave","lecture","leg","length","lesson","let","letter","level","library","lie","life","lift","light","limit","line","link","lip","list","listen","literature","living","load","loan","local","location","lock","log","long","look","loss","love","low","luck","lunch","machine","magazine","mail","main","maintenance","major","make","male","mall","man","management","manager","manner","manufacturer","many","map","march","mark","market","marketing","marriage","master","match","mate","material","math","matter","maximum","maybe","meal","meaning","measurement","meat","media","medicine","medium","meet","meeting","member","membership","memory","mention","menu","mess","message","metal","method","middle","midnight","might","milk","mind","mine","minimum","minor","minute","mirror","miss","mission","mistake","mix","mixture","mobile","mode","model","mom","moment","money","monitor","month","mood","morning","mortgage","most","mother","motor","mountain","mouse","mouth","move","movie","mud","muscle","music","nail","name","nasty","nation","national","native","natural","nature","neat","necessary","neck","negative","negotiation","nerve","net","network","news","newspaper","night","nobody","noise","normal","north","nose","note","nothing","notice","novel","number","nurse","object","objective","obligation","occasion","offer","office","officer","official","oil","one","opening","operation","opinion","opportunity","opposite","option","orange","order","ordinary","organization","original","other","outcome","outside","oven","owner","pace","pack","package","page","pain","paint","painting","pair","panic","paper","parent","park","parking","part","particular","partner","party","pass","passage","passenger","passion","past","path","patience","patient","pattern","pause","pay","payment","peace","peak","pen","penalty","pension","people","percentage","perception","performance","period","permission","permit","person","personal","personality","perspective","phase","philosophy","phone","photo","phrase","physical","physics","piano","pick","picture","pie","piece","pin","pipe","pitch","pizza","place","plan","plane","plant","plastic","plate","platform","play","player","pleasure","plenty","poem","poet","poetry","point","police","policy","politics","pollution","pool","pop","population","position","positive","possession","possibility","possible","post","pot","potato","potential","pound","power","practice","preference","preparation","presence","present","presentation","president","press","pressure","price","pride","priest","primary","principle","print","prior","priority","private","prize","problem","procedure","process","produce","product","profession","professional","professor","profile","profit","program","progress","project","promise","promotion","prompt","proof","property","proposal","protection","psychology","public","pull","punch","purchase","purple","purpose","push","put","quality","quantity","quarter","queen","question","quiet","quit","quote","race","radio","rain","raise","range","rate","ratio","raw","reach","reaction","read","reading","reality","reason","reception","recipe","recognition","recommendation","record","recording","recover","red","reference","reflection","refrigerator","refuse","region","register","regret","regular","relation","relationship","relative","release","relief","remote","remove","rent","repair","repeat","replacement","reply","report","representative","republic","reputation","request","requirement","research","reserve","resident","resist","resolution","resolve","resort","resource","respect","respond","response","responsibility","rest","restaurant","result","return","reveal","revenue","review","revolution","reward","rice","rich","ride","ring","rip","rise","risk","river","road","robot","rock","role","roll","roof","room","rope","rough","round","routine","row","royal","rub","ruin","rule","run","rush","sad","safe","safety","sail","salad","salary","sale","salt","sample","sand","sandwich","satisfaction","save","savings","scale","scene","schedule","scheme","school","science","score","scratch","screen","screw","script","sea","search","season","seat","second","secret","secretary","section","sector","security","selection","self","sell","senior","sense","sensitive","sentence","series","serve","service","session","set","setting","sex","shake","shame","shape","share","she","shelter","shift","shine","ship","shirt","shock","shoe","shoot","shop","shopping","shot","shoulder","show","shower","sick","side","sign","signal","signature","significance","silly","silver","simple","sing","singer","single","sink","sir","sister","site","situation","size","skill","skin","skirt","sky","sleep","slice","slide","slip","smell","smile","smoke","snow","society","sock","soft","software","soil","solid","solution","somewhere","son","song","sort","sound","soup","source","south","space","spare","speaker","special","specialist","specific","speech","speed","spell","spend","spirit","spiritual","spite","split","sport","spot","spray","spread","spring","square","stable","staff","stage","stand","standard","star","start","state","statement","station","status","stay","steak","steal","step","stick","still","stock","stomach","stop","storage","store","storm","story","strain","stranger","strategy","street","strength","stress","stretch","strike","string","strip","stroke","structure","struggle","student","studio","study","stuff","stupid","style","subject","substance","success","suck","sugar","suggestion","suit","summer","sun","supermarket","support","surgery","surprise","surround","survey","suspect","sweet","swim","swimming","swing","switch","sympathy","system","table","tackle","tale","talk","tank","tap","target","task","taste","tax","tea","teach","teacher","teaching","team","tear","technology","telephone","television","tell","temperature","temporary","tennis","tension","term","test","text","thanks","theme","theory","thing","thought","throat","ticket","tie","till","time","tip","title","today","toe","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","total","touch","tough","tour","tourist","towel","tower","town","track","trade","tradition","traffic","train","trainer","training","transition","transportation","trash","travel","treat","tree","trick","trip","trouble","truck","trust","truth","try","tune","turn","twist","two","type","uncle","understanding","union","unique","unit","university","upper","upstairs","use","user","usual","vacation","valuable","value","variation","variety","vast","vegetable","vehicle","version","video","view","village","virus","visit","visual","voice","volume","wait","wake","walk","wall","war","warning","wash","watch","water","wave","way","weakness","wealth","wear","weather","web","wedding","week","weekend","weight","weird","welcome","west","western","wheel","whereas","while","white","whole","wife","will","win","wind","window","wine","wing","winner","winter","wish","witness","woman","wonder","wood","word","work","worker","working","world","worry","worth","wrap","writer","writing","yard","year","yellow","yesterday","you","young","youth","zone",""]},"prefix":{"prefix":["a","ante","anti","auto","circum","co","com","contra","de","dis","en","ex","extra","hetero","homo","hyper","il","in","inter","intra","macro","micro","mono","non","omni","post","pre","sub","sym","tele","trans","tri","un","uni","up",""]},"preposition":{"preposition":["with"]},"pronoun":{"pronoun":[],"personalPronoun":["i","we","you","he","she","it","they"],"objectPronoun":["me","us","you","her","him","it","them"],"possessivePronoun":["mine","ours","yours","hers","his","theirs"],"possessiveAdjectivePronoun":["my","our","your","her","his","their"],"reflexivePronoun":["myself","yourself","herself","himself","itself","ourselves","own","yourselves","themselves"],"intensivePronoun":["myself","yourself","herself","himself","itself","ourselves","yourselves","themselves"],"indefinitePronoun":["all","another","any","anybody","anyone","anything","both","each","either","everybody","everyone","everything","few","many","most","neither","no one","nobody","none","nothing","one","other","others","several","some","somebody","someone","something","such"],"demonstrativePronoun":["such","that","these","this","those"],"interrogativePronoun":["what","whatever","which","whichever","who","whoever","whom","whomever","whose"],"relativePronoun":["as","that","what","whatever","which","whichever","who","whoever","whom","whomever","whose"],"archaicPronoun":["thee","thine","thou","thy","ye"],"pronominalAdjective":["all","another","any","anybody","anyone","anything","as","aught","both","each","each other","either","enough","everybody","everyone","everything","few","he","her","hers","herself","him","himself","his","i","idem","it","its","itself","many","me","mine","most","my","myself","naught","neither","no one","nobody","none","nothing","nought","one","one another","other","others","ought","our","ours","ourself","ourselves","several","she","some","somebody","someone","something","somewhat","such","suchlike","that","thee","their","theirs","theirself","theirselves","them","themself","themselves","there","these","they","thine","this","those","thou","thy","thyself","us","we","what","whatever","whatnot","whatsoever","whence","where","whereby","wherefrom","wherein","whereinto","whereof","whereon","wheresoever","whereto","whereunto","wherever","wherewith","wherewithal","whether","which","whichever","whichsoever","who","whoever","whom","whomever","whomso","whomsoever","whose","whosesoever","whosever","whoso","whosoever","ye","yon","yonder","you","your","yours","yourself","yourselves"]},"regularVerb":{"regularVerb":[["accompany","accompanied"],["accustom","accustom"],["act","acted"],["add","added"],["address","addressed"],["advertise","advertised"],["agree","agreed"],["aid","aided"],["allow","allowed"],["amuse","amused"],["annoy","annoyed"],["answer","answered"],["appeal","appealed"],["appear","appeared"],["approach","approached"],["arrange","arranged"],["arrest","arrested"],["arrive","arrived"],["ask","asked"],["assist","assisted"],["attend","attended"],["balance","balanced"],["banish","banished"],["bark","barked"],["beg","begged"],["behave","behaved"],["believe","believed"],["belong","belonged"],["bless","blessed"],["board","boarded"],["boil","boiled"],["boost","boosted"],["breathe","breathed"],["brush","brushed"],["call","called"],["care","cared"],["carry","carried"],["change","changed"],["charge","charged"],["check","checked"],["choke","choked"],["clean","cleaned"],["climb","climbed"],["close","closed"],["comb","combed"],["complete","completed"],["consist","consisted"],["cook","cooked"],["cool","cooled"],["count","counted"],["cover","covered"],["crash","crashed"],["craw","crawl"],["cross","crossed"],["cry","cried"],["dance","danced"],["dare","dared"],["declare","declared"],["delay","delayed"],["deliver","delivered"],["deny","denied"],["dial","dialled"],["die","died"],["dine","dined"],["drag","dragged"],["dress","dressed"],["drop","dropped"],["dry","dried"],["ease","eased"],["enclose","enclosed"],["engage","engaged"],["enjoy","enjoyed"],["envy","envied"],["erase","erased"],["exchange","exchanged"],["exclaim","exclaimed"],["explain","explained"],["express","expressed"],["fail","failed"],["fasten","fastened"],["file","filed"],["fill","filled"],["finish","finished"],["fire","fired"],["fish","fished"],["fix","fixed"],["follow","followed"],["frighten","frightened"],["fry","fried"],["gain","gained"],["guess","guessed"],["happen","happened"],["help","helped"],["hunt","hunted"],["hurry","hurried"],["imagine","imagined"],["injure","injured"],["iron","ironed"],["judge","judged"],["kill","killed"],["kiss","kissed"],["laugh","laughed"],["leak","leaked"],["like","liked"],["lock","locked"],["look","looked"],["love","loved"],["manage","managed"],["mark","marked"],["marry","married"],["massage","massaged"],["measure","measured"],["milk","milked"],["miss","missed"],["move","moved"],["obey","obeyed"],["observe","observed"],["offer","offered"],["open","opened"],["order","ordered"],["park","parked"],["pass","passed"],["perform","performed"],["phone","phoned"],["pick","picked"],["plan","planed"],["play","played"],["please","pleased"],["plough","ploughed"],["polish","polished"],["pour","poured"],["practice","practiced"],["pray","prayed"],["prefer","preferred"],["promise","promised"],["pronounce","pronounced"],["protect","protected"],["pull","pulled"],["punish","punished"],["push","pushed"],["rain","rained"],["raise","raised"],["reach","reached"],["realize","realized"],["receive","received"],["refuse","refused"],["register","registered"],["remain","remained"],["remember","remembered"],["repair","repaired"],["repeat","repeated"],["report","reported"],["request","requested"],["require","required"],["reserve","reserved"],["resolve","resolved"],["rest","rested"],["return","returned"],["row","rowed"],["save","saved"],["search","searched"],["serve","served"],["settle","settled"],["sign","signed"],["slap","slapped"],["slip","slipped"],["smile","smiled"],["smoke","smoked"],["snow","snowed"],["spill","spilled"],["stage","staged"],["stay","stayed"],["stop","stopped"],["stretch","stretched"],["study","studied"],["suffer","suffered"],["swallow","swallowed"],["switch","switched"],["tackle","tackled"],["talk","talked"],["thank","thanked"],["tire","tired"],["touch","touched"],["train","trained"],["trap","trapped"],["travel","travelled"],["trouble","troubled"],["try","tried"],["turn","turned"],["unpack","unpacked"],["use","used"],["visit","visited"],["wait","waited"],["walk","walked"],["warm","warmed"],["warn","warned"],["wash","washed"],["watch","watched"],["water","watered"],["weigh","weighed"],["wish","wished"],["work","worked"],["wreck","wrecked"]]},"suffix":{"suffix":[],"nounSuffix":["acy","al","ance","dom","ence","er","ism","ist","ity","ment","ness","or","ship","sion","tion","ty"],"verbSuffix":["ate","en","fy","ify","ise","ize"],"adjectiveSuffix":["able","al","esque","ful","ible","ic","ical","ious","ish","ive","less","ous","y"]}}/**
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
     * Analyzes a text and identifies all tokens present in it.
     * @param {string}   text - The text to scan for tokens.
     * @param {array}    sentencesSeparators - The sentences separators list.
     * @param {string}   wordClassesToOmit - Word classes to omit.
     * @return {array}   The array containing all tokens found.
     */
    this.getTokens = function(text, sentencesSeparators, wordClassesToOmit) {
        var textSentences = core.splitCSV(text, sentencesSeparators);

        var classesToOmit = []
        if (core.type(wordClassesToOmit) != 'undefined') {
            var classesToOmit = core.splitCSV(wordClassesToOmit, ' ,');
        }

        var json = [];

        function isNotEmpty(element) {
            return element != '';
        }
        
        for (var j = 0; j < textSentences.length; j++) {
            var words = core.splitCSV(core.trim(textSentences[j], '\r\n'), ' \t,\r\n', true).filter(isNotEmpty);
            var tokens = [];
            for (var k = 0; k < words.length; k++) {
                var token = {
                    "class": "Unknown",
                    "subClass": "Unknown",
                    "subSubClass": "Unknown",
                    "object": core.toLowerCase(words[k])
                }
                for (const wordClass in lexemes) {
                    for (const wordSubClass in lexemes[wordClass]) {
                        if (Array.isArray(lexemes[wordClass][wordSubClass])) {
                            var wordList = lexemes[wordClass][wordSubClass];
                            if ((wordClass == "irregularVerb") || (wordClass == "regularVerb")) {
                                for (var w = 0; w < wordList.length; w++) {
                                    var index = wordList[w].indexOf(core.toLowerCase(words[k]))
                                    if (index != -1) {
                                        var subClass = 'Infinitive';
                                        if (index == 1) {
                                            subClass = 'SimplePast';
                                        } else if (index == 2) {
                                            subClass = 'PastParticiple';
                                        }
                                        token = {
                                            "class": string.camelize(wordClass, true),
                                            "subClass": subClass,
                                            "subSubClass": "Unknown",
                                            "object": core.toLowerCase(wordList[w][0])
                                        }
                                        break;
                                    }
                                }
                            } else if (wordClass == "nounPlural") {
                                singularWordList = lexemes["nounSingular"]["nounSingular"];
                                wordIndex = wordList.indexOf(core.toLowerCase(words[k])) 
                                if (wordIndex != -1) {
                                    token = {
                                        "class": string.camelize(wordClass, true),
                                        "subClass": string.camelize(wordSubClass, true),
                                        "subSubClass": "Unknown",
                                        "object": core.toLowerCase(singularWordList[wordIndex])
                                    }
                                    break;
                                }
                            } else if ((wordClass == "prefix") || (wordClass == "suffix")) {
                                break;
                            } else {
                                if (wordList.includes(core.toLowerCase(words[k]))) {
                                    token = {
                                        "class": string.camelize(wordClass, true),
                                        "subClass": string.camelize(wordSubClass, true),
                                        "subSubClass": "Unknown",
                                        "object": core.toLowerCase(words[k])
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                var omitWord = false;
                for (var z = 0; z < classesToOmit.length; z++) {
                    if ((string.camelize(classesToOmit[z], true) == token.class) || (string.camelize(classesToOmit[z], true) == token.subClass)) {
                        omitWord = true;
                    }
                }
                if (!omitWord) {
                    tokens.push(token);
                }
            }

            json.push(tokens);
        }

        return json;
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
            var sentencesSeparators = ':;.?!';
            var wordClassesToOmit = "";

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
                        system.log('       --omit               Word classes to omit.');
                        process.exit(0);
                    } else if (argv[i] == '-o') {
                        i++;
                        outputFile = argv[i];
                    } else if (argv[i] == '--omit') {
                        i++;
                        wordClassesToOmit = argv[i];
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
                                
                                var fileContents = read(String(file));

                                var json = thisLexer.getTokens(fileContents, sentencesSeparators, wordClassesToOmit);

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