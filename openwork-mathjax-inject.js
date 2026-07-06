/**
 * =========================================================
 *  OpenWork — MathJax Inject Snippet
 *  ----------------------------------
 *  DevTools snippet to render LaTeX math in chat messages.
 *
 *  Usage:
 *    1. Open DevTools: Ctrl+Shift+I (Win/Linux) / Cmd+Option+I (Mac)
 *    2. Sources tab > Snippets > New snippet
 *    3. Paste this code, save (Ctrl+S)
 *    4. Right-click > Run (or Ctrl+Enter)
 * =========================================================
 */
(function () {
  'use strict';

  if (window.__owMathInjected) {
    console.log('[MathJax] Already loaded. Re-rendering...');
    window.renderMath();
    return;
  }

  // ─── CSS Overrides ──────────────────────────────────────
  var css = document.createElement('style');
  css.id = 'ow-math-css';
  css.textContent = [
    /* Display math: left-aligned with horizontal scroll */
    'mjx-container[display="true"] { display: block !important; text-align: left !important; margin: 6px 0 !important; }',
    'mjx-container[display="true"] svg { margin-left: 0 !important; margin-right: auto !important; }',
    /* Prevent line breaks inside rendered math */
    '.MathJax svg { display: inline-block !important; vertical-align: middle !important; }',
    '.MathJax_Display { display: inline-block !important; margin: 8px 0 !important; text-align: left !important; overflow-x: auto; overflow-y: hidden; max-width: 100%; }',
    '.message-content .MathJax_Display, [class*="message"] .MathJax_Display { word-break: normal !important; white-space: nowrap !important; }',
    /* Matrix/table elements */
    '.MathJax table { display: inline-table !important; vertical-align: middle !important; }',
    '.MathJax .mjx-table { display: inline-table !important; }',
    '.MathJax .mjx-mtable { display: inline-block !important; }',
    /* Bullet point compatibility */
    'li .MathJax_Display { display: inline !important; }',
    'li .MathJax svg { display: inline !important; }',
  ].join('\n');
  document.head.appendChild(css);

  // ─── MathJax Configuration ──────────────────────────────
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
      processEnvironments: true,
      tags: 'ams',
    },
    options: {
      enableMenu: false,
      ignoreHtmlClass: 'no-mathjax',
      processHtmlClass: '',
      renderEmpty: true,
    },
    svg: {
      fontCache: 'global',
      scale: 1.0,
    },
    startup: {
      typeset: false,
      ready: function () {
        MathJax.startup.defaultReady();
        console.log('[MathJax] Ready! (auto-typeset disabled)');
      },
    },
  };

  // ─── Helper: convert $$ → \[ \] ────────────────────────
  function preprocessDisplayMath(html) {
    return html.replace(/\$\$([\s\S]+?)\$\$/g, function (m, tex) {
      return '\\[' + tex.trim() + '\\]';
    });
  }

  // ─── Inject MathJax from CDN ────────────────────────────
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  script.async = true;

  script.onload = function () {
    window.__owMathInjected = 1;
    console.log('[MathJax] Injected successfully!');

    // ── DOM Preprocessing ──
    function preprocessDOM() {
      var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      var nodes = [];
      while (walker.nextNode()) {
        var node = walker.currentNode;
        if (node.nodeValue && node.nodeValue.includes('$$')) {
          nodes.push(node);
        }
      }
      nodes.forEach(function (node) {
        var text = node.nodeValue;
        var processed = text.replace(/\$\$([\s\S]+?)\$\$/g, function (m, tex) {
          return '\\[' + tex.trim() + '\\]';
        });
        processed = processed.replace(/\$([^\$\n]+?)\$/g, function (m, tex) {
          return '\\(' + tex.trim() + '\\)';
        });
        if (processed !== text) {
          node.nodeValue = processed;
        }
      });
    }

    // ── Render ──
    function doRender() {
      try {
        preprocessDOM();
        if (window.MathJax && window.MathJax.typesetPromise) {
          return window.MathJax.typesetPromise();
        }
      } catch (e) {
        console.warn('[MathJax] Render error:', e);
      }
    }

    // ── MutationObserver (debounced) ──
    var timer;
    var observer = new MutationObserver(function (mutations) {
      var hasNew = mutations.some(function (m) {
        return m.addedNodes.length > 0;
      });
      if (hasNew) {
        clearTimeout(timer);
        timer = setTimeout(doRender, 500);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('[MathJax] Watching for new messages...');

    // ── Expose global re-render function ──
    window.renderMath = doRender;

    // ── First render ──
    doRender();
  };

  script.onerror = function () {
    console.error('[MathJax] Failed to load from CDN. Check your internet connection.');
    // Try fallback CDN
    var fallback = document.createElement('script');
    fallback.src =
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.min.js';
    fallback.async = true;
    fallback.onload = function () {
      window.__owMathInjected = 1;
      console.log('[MathJax] Injected successfully! (fallback CDN)');
      window.MathJax.typeset();
    };
    document.head.appendChild(fallback);
  };

  document.head.appendChild(script);
  console.log('[MathJax] Loading from CDN...');
})();
