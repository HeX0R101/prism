/*
Original Code by Bas Groothedde
!!MANY THANKS!! I never would have made this, regex and me will never be best friends ;)
==> https://codepen.io/ImagineProgramming/details/JYydBy/
slightly changed to pass all tests
*/


Prism.languages.pbfasm = {
  'comment': /;.*$/m,
  'string': /("|'|`)(?:\\?.)*?\1/m,
  'function': {
    pattern: /^(?:(\s*\!\s*))[0-9a-zA-Z]+(?=\s|$)/im,
    lookbehind: true
  },
  'function-inline': {
    pattern: /(?:(\s*\:\s*))[0-9a-zA-Z]+(?=\s)/im,
    lookbehind: true,
    alias: 'function'
  },
  'label': {
    pattern: /^(?:(\s*\!\s*))[A-Za-z._?$@][\w.?$@~#]*(?=:)/m,
    lookbehind: true,
    alias: 'fasm-label'
  },
  'keyword': [
    /(?:extern|extern|global)[^;\r\n]*/im,
    /(?:CPU|FLOAT|DEFAULT).*$/m
  ],
  'register': {
    pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|sp|si|di)|[cdefgs]s|mm[0-9]+)\b/i
  },
  'number': /(?:\b|-|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|\d*\.?\d+(?:\.?e[+-]?\d+)?[dt]?)\b/i,
  'operator': /[\[\]*+\-\/%<>=&|$!\,\.:]/
};

// Named label reference, i.e.: jne label1
Prism.languages.insertBefore('pbfasm', 'function', {
  'label-reference-addressed': {
    pattern: /(?:(\s*\!\s*j[a-zA-Z]+\s+))(?:[A-Za-z._?$@][\w.?$@~#]*)/mi,
    lookbehind: true,
    alias: 'fasm-label'
  }
});

// Anonymous label references, i.e.: jmp @b
Prism.languages.insertBefore('pbfasm', 'label-reference-addressed', {
  'label-reference-anonymous': {
    pattern: /(?:(\s*\!\s*j[a-zA-Z]+\s+))(?:\@[fb]{1})/mi,
    lookbehind: true,
    alias: 'fasm-label'
  }
});

// PureBasic support, steal stuff from ansi-c
Prism.languages.purebasic = Prism.languages.extend('clike', {
  'important': /\*(?:[a-zA-Z0-9_]+)\b/i,
  'number': /(?:\$[0-9a-f]+|\b-?\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  'operator': /\@\*[0-9a-zA-Z_]+|(?:\@|\?)[0-9a-zA-Z_]+|\*[0-9a-zA-Z_]+|\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]|\@/,
  'function': {
    pattern: /\b(?:[a-z0-9_]+)(?:\.[a-z0-9_]+)?\s*(?=\()/i
  },
  'comment': /(?:\;.*)/i
});

Prism.languages.insertBefore('purebasic', 'function', {
  'keyword': {
    pattern: /\b(?:declarecdll|declaredll|compilerselect|compilercase|compilerdefault|compilerendselect|compilererror|enableexplicit|disableexplicit|not|and|or|xor|calldebugger|debuglevel|enabledebugger|disabledebugger|restore|read|includepath|includebinary|threaded|runtime|with|endwith|structureunion|endstructureunion|align|newlist|newmap|interface|endinterface|extends|enumeration|endenumeration|swap|foreach|continue|fakereturn|goto|gosub|return|break|module|endmodule|declaremodule|enddeclaremodule|declare|declarec|prototype|prototypec|enableasm|disableasm|dim|redim|data|datasection|enddatasection|to|procedurereturn|debug|default|case|select|endselect|as|import|endimport|importc|compilerif|compilerelse|compilerendif|compilerelseif|end|structure|endstructure|while|wend|for|next|step|if|else|elseif|endif|repeat|until|procedure|proceduredll|procedurec|procedurecdll|endprocedure|protected|shared|static|global|define|includefile|xincludefile|macro|endmacro)\b/i
  }
});

Prism.languages.insertBefore('purebasic', 'keyword', {
  'tag': /(?:\#[a-zA-Z0-9_]+)/,
  'asm': {
    pattern: /(^\s*)(?:\!.*)/im,
    lookbehind: true,
    inside: Prism.languages.pbfasm,
    alias: 'tag'
  }
});

Prism.languages.pbfasm = Prism.languages['purebasic'];
delete Prism.languages.purebasic['class-name'];
delete Prism.languages.purebasic['boolean'];

