const DIGITS = token(sep1(/[0-9]+/, /_+/))
const HEX_DIGITS = token(sep1(/[A-Fa-f0-9]+/, '_'))
const PREC = {
  // https://introcs.cs.princeton.edu/java/11precedence/
  COMMENT: 0,      // //  /*  */ /** */ #!
  ASSIGN: 1,       // =  += -=  *=  /=  %=  &=  ^=  |=  <<=  >>=  >>>=
  DECL: 2,
  ELEMENT_VAL: 2,
  TERNARY: 3,      // ?:
  OR: 4,           // ||
  AND: 5,          // &&
  BIT_OR: 6,       // |
  BIT_XOR: 7,      // ^
  BIT_AND: 8,      // &
  EQUALITY: 9,     // ==  !=
  GENERIC: 10,
  REL: 10,         // <  <=  >  >=  instanceof
  SHIFT: 11,       // <<  >>  >>>
  ADD: 12,         // +  -
  MULT: 13,        // *  /  %
  CAST: 14,        // (Type)
  OBJ_INST: 14,    // new
  UNARY: 15,       // ++a  --a  a++  a--  +  -  !  ~
  ARRAY: 16,       // [Index]
  OBJ_ACCESS: 16,  // .
  PARENS: 16,      // (Expression)
  CLASS_LITERAL: 17,  // .
};

module.exports = grammar({
    name: 'groovy',
    
    extras: $ => [
        $.line_comment,
        $.block_comment,
        //$.groovydoc_comment,
        //$.shebang_line_comment,
        /\s/
    ],
      
    rules: {
        source_file: $ => repeat($.statement),
        
        // Literals

        _literal: $ => choice(
            //$.decimal_integer_literal,
            // TODO: other kinds of literals
        ),

        // Expressions

        _expression: $ => choice(
            //$.assignment_expression,
            // TODO: other kinds of expression
        ),

        // Statements

        statement: $ => choice(
            //$.declaration,
            // TODO: other kinds of statement
        ),
        
        // Annotations

        _annotation: $ => choice(
            // TODO: other kinds of annotations
        ),

        // Declarations

        declaration: $ => prec(PREC.DECL, choice(
            //$.module_declaration,
            // TODO: other kinds of declaration
        )),

        // Types

        _type: $ => choice(
            //$._unannotated_type,
            //$.annotated_type
        ),
    
        _unannotated_type: $ => choice(
            //$._simple_type,
            //$.array_type
        ),
    
        _simple_type: $ => choice(
            // $.void_type,
            // $.integral_type,
            // $.floating_point_type,
            // $.boolean_type,
            // alias($.identifier, $.type_identifier),
            // $.scoped_type_identifier,
            // $.generic_type
        ),

        // http://stackoverflow.com/questions/13014947/regex-to-match-a-c-style-multiline-comment/36328890#36328890
        comment: $ => choice(
            $.line_comment,
            $.block_comment,
        ),
  
        line_comment: $ => token(prec(PREC.COMMENT, seq('//', /[^\n]*/))),
    
        block_comment: $ => token(prec(PREC.COMMENT,
            seq(
            '/*',
            /[^*]*\*+([^/*][^*]*\*+)*/,
            '/'
            )
        )),
    
      }
  });
  
function sep1(rule, separator) {
return seq(rule, repeat(seq(separator, rule)));
}

function commaSep1(rule) {
return seq(rule, repeat(seq(',', rule)))
}

function commaSep(rule) {
return optional(commaSep1(rule))
}