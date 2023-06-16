import type { Diagnostic } from "./diagnostics";
export const Diagnostics = {
    _0_or_1_: { code: 0, message: "{0} or {1}" } as Diagnostic,
    Constant_expected: { code: 1000, message: "Constant expected" } as Diagnostic,
    _0_expected: { code: 1001, message: "{0} expected" } as Diagnostic,
    Unexpected_token_0_: { code: 1002, message: "Unexpected token {0}" } as Diagnostic,
    Invalid_character: { code: 1003, message: "Invalid character" } as Diagnostic,
    Unterminated_string_literal: { code: 1004, message: "Unterminated string literal" } as Diagnostic,
    Invalid_escape_sequence: { code: 1005, message: "Invalid escape sequence" } as Diagnostic,
    Digit_expected: { code: 1006, message: "Digit expected" } as Diagnostic,
    Production_expected: { code: 1007, message: "Production expected" } as Diagnostic,
    Unterminated_identifier_literal: { code: 1008, message: "Unterminated identifier literal" } as Diagnostic,
    Obsolete_0_: { code: 1009, message: "Obsolete: {0}", warning: true } as Diagnostic,
    HTML_trivia_not_allowed_here: { code: 1010, message: "HTML trivia not allowed here" } as Diagnostic,
    Unicode_code_points_with_more_than_four_digits_may_not_have_leading_zeros: { code: 1011, message: "Unicode code points with more than four digits may not have leading zeros" } as Diagnostic,
    Unicode_code_point_is_outside_of_the_allowed_range: { code: 1012, message: "Unicode code point is outside of the allowed range" } as Diagnostic,
    Unicode_code_points_should_use_an_uppercase_U_prefix: { code: 1013, message: "Unicode code points should use an uppercase 'U+' prefix", warning: true } as Diagnostic,
    Unicode_code_points_should_use_uppercase_hexadecimal_digits: { code: 1014, message: "Unicode code points should use uppercase hexadecimal digits", warning: true } as Diagnostic,
    Unicode_character_name_that_includes_a_code_point_must_have_a_description: { code: 1015, message: "Unicode character name that includes a code point must have a description" } as Diagnostic,
    Unicode_character_name_may_not_start_with_U_unless_it_is_a_valid_code_point: { code: 1016, message: "Unicode character name may not start with 'U+' unless it is a valid code point" } as Diagnostic,
    Cannot_find_name_0_: { code: 2000, message: "Cannot find name: '{0}'" } as Diagnostic,
    Duplicate_identifier_0_: { code: 2001, message: "Duplicate identifier: '{0}'" } as Diagnostic,
    Duplicate_terminal_0_: { code: 2002, message: "Duplicate terminal: `{0}`" } as Diagnostic,
    Argument_0_cannot_be_specified_multiple_times: { code: 2003, message: "Argument '{0}' cannot be specified multiple times" } as Diagnostic,
    Production_0_does_not_have_a_parameter_named_1_: { code: 2004, message: "Production '{0}' does not have a parameter named '{1}'" } as Diagnostic,
    Production_0_is_missing_parameter_1_All_definitions_of_production_0_must_specify_the_same_formal_parameters: { code: 2006, message: "Production '{0}' is missing parameter '{1}'. All definitions of production '{0}' must specify the same formal parameters" } as Diagnostic,
    There_is_no_argument_given_for_parameter_0_: { code: 2007, message: "There is no argument given for parameter '{0}'" } as Diagnostic,
    Parameter_0_is_unused: { code: 2008, message: "Parameter '{0}' is unused" } as Diagnostic,
};
