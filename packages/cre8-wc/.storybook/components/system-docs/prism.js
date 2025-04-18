/* PrismJS 1.25.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+git+markdown+jsx+tsx+scss+typescript */
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = (function (u) {
    var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ');
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return e.__id || Object.defineProperty(e, '__id', {value: ++n}), e.__id;
          },
          clone: function t(e, r) {
            var a, n;
            switch (((r = r || {}), M.util.type(e))) {
              case 'Object':
                if (((n = M.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e)) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case 'Array':
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e; ) {
              var n = t.exec(e.className);
              if (n) return n[1].toLowerCase();
              e = e.parentElement;
            }
            return 'none';
          },
          setLanguage: function (e, n) {
            (e.className = e.className.replace(RegExp(t, 'gi'), '')), e.classList.add('language-' + n);
          },
          currentScript: function () {
            if ('undefined' == typeof document) return null;
            if ('currentScript' in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName('script');
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = 'no-' + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function (e, n) {
            var t = M.util.clone(M.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {};
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e) for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = a[l]);
              }
            var s = r[t];
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function (e, n) {
                n === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var i = M.util.objId;
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l);
                var o = n[l],
                  s = M.util.type(o);
                'Object' !== s || a[i(o)] ? 'Array' !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a)) : ((a[i(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          M.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          M.hooks.run('before-highlightall', r),
            (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
            M.hooks.run('before-all-elements-highlight', r);
          for (var a, i = 0; (a = r.elements[i++]); ) M.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r];
          M.util.setLanguage(e, r);
          var i = e.parentElement;
          i && 'pre' === i.nodeName.toLowerCase() && M.util.setLanguage(i, r);
          var l = {element: e, language: r, grammar: a, code: e.textContent};
          function o(e) {
            (l.highlightedCode = e),
              M.hooks.run('before-insert', l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run('after-highlight', l),
              M.hooks.run('complete', l),
              t && t.call(l.element);
          }
          if (
            (M.hooks.run('before-sanity-check', l),
            (i = l.element.parentElement) && 'pre' === i.nodeName.toLowerCase() && !i.hasAttribute('tabindex') && i.setAttribute('tabindex', '0'),
            !l.code)
          )
            return M.hooks.run('complete', l), void (t && t.call(l.element));
          if ((M.hooks.run('before-highlight', l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(JSON.stringify({language: l.language, code: l.code, immediateClose: !0}));
            } else o(M.highlight(l.code, l.grammar, l.language));
          else o(M.util.encode(l.code));
        },
        highlight: function (e, n, t) {
          var r = {code: e, grammar: n, language: t};
          return (
            M.hooks.run('before-tokenize', r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run('after-tokenize', r),
            W.stringify(M.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new i();
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o];
                  s = Array.isArray(s) ? s : [s];
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + ',' + u) return;
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias;
                    if (h && !c.pattern.global) {
                      var v = c.pattern.toString().match(/[imsuy]*$/)[0];
                      c.pattern = RegExp(c.pattern.source, v + 'g');
                    }
                    for (var p = c.pattern || c, m = a.next, y = i; m !== t.tail && !(l && y >= l.reach); y += m.value.length, m = m.next) {
                      var k = m.value;
                      if (t.length > n.length) return;
                      if (!(k instanceof W)) {
                        var x,
                          b = 1;
                        if (h) {
                          if (!(x = z(p, y, n, f)) || x.index >= n.length) break;
                          var w = x.index,
                            A = x.index + x[0].length,
                            P = y;
                          for (P += m.value.length; P <= w; ) (m = m.next), (P += m.value.length);
                          if (((P -= m.value.length), (y = P), m.value instanceof W)) continue;
                          for (var E = m; E !== t.tail && (P < A || 'string' == typeof E.value); E = E.next) b++, (P += E.value.length);
                          b--, (k = n.slice(y, P)), (x.index -= y);
                        } else if (!(x = z(p, 0, k, f))) continue;
                        var w = x.index,
                          L = x[0],
                          S = k.slice(0, w),
                          O = k.slice(w + L.length),
                          j = y + k.length;
                        l && j > l.reach && (l.reach = j);
                        var C = m.prev;
                        S && ((C = I(t, C, S)), (y += S.length)), q(t, C, b);
                        var N = new W(o, g ? M.tokenize(L, g) : L, d, L);
                        if (((m = I(t, C, N)), O && I(t, m, O), 1 < b)) {
                          var _ = {cause: o + ',' + u, reach: j};
                          e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach);
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = M.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = M.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: W,
      };
    function W(e, n, t, r) {
      (this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || '').length);
    }
    function z(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function i() {
      var e = {value: null, prev: null, next: null},
        n = {value: null, prev: e, next: null};
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function I(e, n, t) {
      var r = n.next,
        a = {value: t, prev: n, next: r};
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) {
          var r = '';
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {type: e.type, content: n(e.content, t), tag: 'span', classes: ['token', e.type], attributes: {}, language: t},
          i = e.alias;
        i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run('wrap', a);
        var l = '';
        for (var o in a.attributes) l += ' ' + o + '="' + (a.attributes[o] || '').replace(/"/g, '&quot;') + '"';
        return '<' + a.tag + ' class="' + a.classes.join(' ') + '"' + l + '>' + a.content + '</' + a.tag + '>';
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close();
              },
              !1
            )),
        M
      );
    var r = M.util.currentScript();
    function a() {
      M.manual || M.highlightAll();
    }
    if ((r && ((M.filename = r.src), r.hasAttribute('data-manual') && (M.manual = !0)), !M.manual)) {
      var l = document.readyState;
      'loading' === l || ('interactive' === l && r && r.defer)
        ? document.addEventListener('DOMContentLoaded', a)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(a)
        : window.setTimeout(a, 16);
    }
    return M;
  })(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: {pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0},
  prolog: {pattern: /<\?[\s\S]+?\?>/, greedy: !0},
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': {pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null},
      string: {pattern: /"[^"]*"|'[^']*'/, greedy: !0},
      punctuation: /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: {pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0},
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {pattern: /^<\/?[^\s>\/]+/, inside: {punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/}},
      'special-attr': [],
      'attr-value': {pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: {punctuation: [{pattern: /^=/, alias: 'attr-equals'}, /"|'/]}},
      punctuation: /\/?>/,
      'attr-name': {pattern: /[^\s>\/]+/, inside: {namespace: /^[^\s>\/:]+:/}},
    },
  },
  entity: [{pattern: /&[\da-z]{1,8};/i, alias: 'named-entity'}, /&#x?[\da-f]{1,8};/i],
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function (a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      var s = {};
      (s['language-' + e] = {pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e]}),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {'included-cdata': {pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s}};
      t['language-' + e] = {pattern: /[\s\S]+/, inside: Prism.languages[e]};
      var n = {};
      (n[a] = {
        pattern: RegExp(
          '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(/__/g, function () {
            return a;
          }),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore('markup', 'cdata', n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function (a, e) {
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp('(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
        lookbehind: !0,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: !0, alias: [e, 'language-' + e], inside: Prism.languages[e]},
              punctuation: [{pattern: /^=/, alias: 'attr-equals'}, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector',
        },
        keyword: {pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0},
      },
    },
    url: {
      pattern: RegExp('\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
      greedy: !0,
      inside: {function: /^url/i, punctuation: /^\(|\)$/, string: {pattern: RegExp('^' + e.source + '$'), alias: 'url'}},
    },
    selector: {pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + e.source + ')*(?=\\s*\\{)'), lookbehind: !0},
    string: {pattern: e, greedy: !0},
    property: {pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: !0},
    important: /!important\b/i,
    function: {pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0},
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'));
})(Prism);
Prism.languages.clike = {
  comment: [
    {pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0},
    {pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0},
  ],
  string: {pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0},
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {punctuation: /[.\\]/},
  },
  keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: !0},
  ],
  keyword: [
    {pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0},
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      '(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'
    ),
    lookbehind: !0,
  },
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        'regex-source': {pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: !0, alias: 'language-regex', inside: Prism.languages.regex},
        'regex-delimiter': /^\/|\/$/,
        'regex-flags': /^[a-z]+$/,
      },
    },
    'function-variable': {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: 'function',
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript},
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    hashbang: {pattern: /^#!.*/, greedy: !0, alias: 'comment'},
    'template-string': {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': {pattern: /^`|`$/, alias: 'string'},
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {'interpolation-punctuation': {pattern: /^\$\{|\}$/, alias: 'punctuation'}, rest: Prism.languages.javascript},
        },
        string: /[\s\S]+/,
      },
    },
    'string-property': {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: 'property',
    },
  }),
  Prism.languages.insertBefore('javascript', 'operator', {
    'literal-property': {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: 'property',
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined('script', 'javascript'),
    Prism.languages.markup.tag.addAttribute(
      'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
      'javascript'
    )),
  (Prism.languages.js = Prism.languages.javascript);
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
  command: {pattern: /^.*\$ git .*$/m, inside: {parameter: /\s--?\w+/}},
  coord: /^@@.*@@$/m,
  'commit-sha1': /^commit \w{40}$/m,
};
!(function (s) {
  function n(n) {
    return (
      (n = n.replace(/<inner>/g, function () {
        return '(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))';
      })),
      RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + n + ')')
    );
  }
  var e = '(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+',
    t = '\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))'.replace(/__/g, function () {
      return e;
    }),
    a = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)';
  (s.languages.markdown = s.languages.extend('markup', {})),
    s.languages.insertBefore('markdown', 'prolog', {
      'front-matter-block': {
        pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
        lookbehind: !0,
        greedy: !0,
        inside: {punctuation: /^---|---$/, 'front-matter': {pattern: /\S+(?:\s+\S+)*/, alias: ['yaml', 'language-yaml'], inside: s.languages.yaml}},
      },
      blockquote: {pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation'},
      table: {
        pattern: RegExp('^' + t + a + '(?:' + t + ')*', 'm'),
        inside: {
          'table-data-rows': {
            pattern: RegExp('^(' + t + a + ')(?:' + t + ')*$'),
            lookbehind: !0,
            inside: {'table-data': {pattern: RegExp(e), inside: s.languages.markdown}, punctuation: /\|/},
          },
          'table-line': {pattern: RegExp('^(' + t + ')' + a + '$'), lookbehind: !0, inside: {punctuation: /\||:?-{3,}:?/}},
          'table-header-row': {
            pattern: RegExp('^' + t + '$'),
            inside: {'table-header': {pattern: RegExp(e), alias: 'important', inside: s.languages.markdown}, punctuation: /\|/},
          },
        },
      },
      code: [
        {pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/, lookbehind: !0, alias: 'keyword'},
        {
          pattern: /^```[\s\S]*?^```$/m,
          greedy: !0,
          inside: {
            'code-block': {pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m, lookbehind: !0},
            'code-language': {pattern: /^(```).+/, lookbehind: !0},
            punctuation: /```/,
          },
        },
      ],
      title: [
        {pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m, alias: 'important', inside: {punctuation: /==+$|--+$/}},
        {pattern: /(^\s*)#.+/m, lookbehind: !0, alias: 'important', inside: {punctuation: /^#+|#+$/}},
      ],
      hr: {pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation'},
      list: {pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation'},
      'url-reference': {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          variable: {pattern: /^(!?\[)[^\]]+/, lookbehind: !0},
          string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: 'url',
      },
      bold: {
        pattern: n('\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*'),
        lookbehind: !0,
        greedy: !0,
        inside: {content: {pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {}}, punctuation: /\*\*|__/},
      },
      italic: {
        pattern: n('\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*'),
        lookbehind: !0,
        greedy: !0,
        inside: {content: {pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {}}, punctuation: /[*_]/},
      },
      strike: {
        pattern: n('(~~?)(?:(?!~)<inner>)+\\2'),
        lookbehind: !0,
        greedy: !0,
        inside: {content: {pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {}}, punctuation: /~~?/},
      },
      'code-snippet': {
        pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
        lookbehind: !0,
        greedy: !0,
        alias: ['code', 'keyword'],
      },
      url: {
        pattern: n('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),
        lookbehind: !0,
        greedy: !0,
        inside: {
          operator: /^!/,
          content: {pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {}},
          variable: {pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0},
          url: {pattern: /(^\]\()[^\s)]+/, lookbehind: !0},
          string: {pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/, lookbehind: !0},
        },
      },
    }),
    ['url', 'bold', 'italic', 'strike'].forEach(function (e) {
      ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (n) {
        e !== n && (s.languages.markdown[e].inside.content.inside[n] = s.languages.markdown[n]);
      });
    }),
    s.hooks.add('after-tokenize', function (n) {
      ('markdown' !== n.language && 'md' !== n.language) ||
        !(function n(e) {
          if (e && 'string' != typeof e)
            for (var t = 0, a = e.length; t < a; t++) {
              var r = e[t];
              if ('code' === r.type) {
                var i = r.content[1],
                  o = r.content[3];
                if (i && o && 'code-language' === i.type && 'code-block' === o.type && 'string' == typeof i.content) {
                  var l = i.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'),
                    s = 'language-' + (l = (/[a-z][\w-]*/i.exec(l) || [''])[0].toLowerCase());
                  o.alias ? ('string' == typeof o.alias ? (o.alias = [o.alias, s]) : o.alias.push(s)) : (o.alias = [s]);
                }
              } else n(r.content);
            }
        })(n.tokens);
    }),
    s.hooks.add('wrap', function (n) {
      if ('code-block' === n.type) {
        for (var e = '', t = 0, a = n.classes.length; t < a; t++) {
          var r = n.classes[t],
            i = /language-(.+)/.exec(r);
          if (i) {
            e = i[1];
            break;
          }
        }
        var o = s.languages[e];
        if (o)
          n.content = s.highlight(
            (function (n) {
              var e = n.replace(d, '');
              return (e = e.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (n, e) {
                var t;
                if ('#' === (e = e.toLowerCase())[0]) return (t = 'x' === e[1] ? parseInt(e.slice(2), 16) : Number(e.slice(1))), u(t);
                var a = p[e];
                return a || n;
              }));
            })(n.content),
            o,
            e
          );
        else if (e && 'none' !== e && s.plugins.autoloader) {
          var l = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random());
          (n.attributes.id = l),
            s.plugins.autoloader.loadLanguages(e, function () {
              var n = document.getElementById(l);
              n && (n.innerHTML = s.highlight(n.textContent, s.languages[e], e));
            });
        }
      }
    });
  var d = RegExp(s.languages.markup.tag.pattern.source, 'gi'),
    p = {amp: '&', lt: '<', gt: '>', quot: '"'},
    u = String.fromCodePoint || String.fromCharCode;
  s.languages.md = s.languages.markdown;
})(Prism);
!(function (o) {
  var t = o.util.clone(o.languages.javascript),
    e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})';
  function n(t, n) {
    return (
      (t = t
        .replace(/<S>/g, function () {
          return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)';
        })
        .replace(/<BRACES>/g, function () {
          return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})';
        })
        .replace(/<SPREAD>/g, function () {
          return e;
        })),
      RegExp(t, n)
    );
  }
  (e = n(e).source),
    (o.languages.jsx = o.languages.extend('markup', t)),
    (o.languages.jsx.tag.pattern = n(
      '</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>'
    )),
    (o.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
    (o.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
    (o.languages.jsx.tag.inside.tag.inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
    (o.languages.jsx.tag.inside.comment = t.comment),
    o.languages.insertBefore('inside', 'attr-name', {spread: {pattern: n('<SPREAD>'), inside: o.languages.jsx}}, o.languages.jsx.tag),
    o.languages.insertBefore(
      'inside',
      'special-attr',
      {
        script: {
          pattern: n('=<BRACES>'),
          alias: 'language-javascript',
          inside: {'script-punctuation': {pattern: /^=(?=\{)/, alias: 'punctuation'}, rest: o.languages.jsx},
        },
      },
      o.languages.jsx.tag
    );
  var i = function (t) {
      return t ? ('string' == typeof t ? t : 'string' == typeof t.content ? t.content : t.content.map(i).join('')) : '';
    },
    r = function (t) {
      for (var n = [], e = 0; e < t.length; e++) {
        var a = t[e],
          s = !1;
        if (
          ('string' != typeof a &&
            ('tag' === a.type && a.content[0] && 'tag' === a.content[0].type
              ? '</' === a.content[0].content[0].content
                ? 0 < n.length && n[n.length - 1].tagName === i(a.content[0].content[1]) && n.pop()
                : '/>' === a.content[a.content.length - 1].content || n.push({tagName: i(a.content[0].content[1]), openedBraces: 0})
              : 0 < n.length && 'punctuation' === a.type && '{' === a.content
              ? n[n.length - 1].openedBraces++
              : 0 < n.length && 0 < n[n.length - 1].openedBraces && 'punctuation' === a.type && '}' === a.content
              ? n[n.length - 1].openedBraces--
              : (s = !0)),
          (s || 'string' == typeof a) && 0 < n.length && 0 === n[n.length - 1].openedBraces)
        ) {
          var g = i(a);
          e < t.length - 1 && ('string' == typeof t[e + 1] || 'plain-text' === t[e + 1].type) && ((g += i(t[e + 1])), t.splice(e + 1, 1)),
            0 < e && ('string' == typeof t[e - 1] || 'plain-text' === t[e - 1].type) && ((g = i(t[e - 1]) + g), t.splice(e - 1, 1), e--),
            (t[e] = new o.Token('plain-text', g, null, g));
        }
        a.content && 'string' != typeof a.content && r(a.content);
      }
    };
  o.hooks.add('after-tokenize', function (t) {
    ('jsx' !== t.language && 'tsx' !== t.language) || r(t.tokens);
  });
})(Prism);
!(function (e) {
  (e.languages.typescript = e.languages.extend('javascript', {
    'class-name': {
      pattern:
        /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: !0,
      greedy: !0,
      inside: null,
    },
    builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
  })),
    e.languages.typescript.keyword.push(
      /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
      /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
      /\btype\b(?=\s*(?:[\{*]|$))/
    ),
    delete e.languages.typescript.parameter,
    delete e.languages.typescript['literal-property'];
  var s = e.languages.extend('typescript', {});
  delete s['class-name'],
    (e.languages.typescript['class-name'].inside = s),
    e.languages.insertBefore('typescript', 'function', {
      decorator: {pattern: /@[$\w\xA0-\uFFFF]+/, inside: {at: {pattern: /^@/, alias: 'operator'}, function: /^[\s\S]+/}},
      'generic-function': {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
        greedy: !0,
        inside: {
          function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
          generic: {pattern: /<[\s\S]+/, alias: 'class-name', inside: s},
        },
      },
    }),
    (e.languages.ts = e.languages.typescript);
})(Prism);
!(function (e) {
  var a = e.util.clone(e.languages.typescript);
  (e.languages.tsx = e.languages.extend('jsx', a)), delete e.languages.tsx.parameter, delete e.languages.tsx['literal-property'];
  var t = e.languages.tsx.tag;
  (t.pattern = RegExp('(^|[^\\w$]|(?=</))(?:' + t.pattern.source + ')', t.pattern.flags)), (t.lookbehind = !0);
})(Prism);
(Prism.languages.scss = Prism.languages.extend('css', {
  comment: {pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0},
  atrule: {pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/, inside: {rule: /@[\w-]+/}},
  url: /(?:[-a-z]+-)?url(?=\()/i,
  selector: {
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
    inside: {parent: {pattern: /&/, alias: 'important'}, placeholder: /%[-\w]+/, variable: /\$[-\w]+|#\{\$[-\w]+\}/},
  },
  property: {pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/, inside: {variable: /\$[-\w]+|#\{\$[-\w]+\}/}},
})),
  Prism.languages.insertBefore('scss', 'atrule', {
    keyword: [
      /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
      {pattern: /( )(?:from|through)(?= )/, lookbehind: !0},
    ],
  }),
  Prism.languages.insertBefore('scss', 'important', {variable: /\$[-\w]+|#\{\$[-\w]+\}/}),
  Prism.languages.insertBefore('scss', 'function', {
    'module-modifier': {pattern: /\b(?:as|hide|show|with)\b/i, alias: 'keyword'},
    placeholder: {pattern: /%[-\w]+/, alias: 'selector'},
    statement: {pattern: /\B!(?:default|optional)\b/i, alias: 'keyword'},
    boolean: /\b(?:false|true)\b/,
    null: {pattern: /\bnull\b/, alias: 'keyword'},
    operator: {pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/, lookbehind: !0},
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
