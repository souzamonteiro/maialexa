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
