/* ===========================================================================
   RENDER — builds the generated parts of every page from js/data.js.
   You shouldn't need to edit this file. Content changes go in js/data.js.

   What it fills in (by attribute):
     data-render="filters"     Work category buttons
     data-render="projects"    Work cards
     data-render="services"    Services table
     data-render="latest"      Homepage Latest feed (newest few)
     data-render="latest-all"  Full activity log (notes.html)
     data-render="notes"       Blog post list (notes.html)
     data-section-no           Section numbers 01, 02 … in page order
     data-year / data-rev / data-sheet-no / data-email / data-linkedin
     (data-sheet-no shows the value of data-sheet set on <body>)

   Pages one folder down (notes/…) set  <body data-prefix="../">  so that
   relative links from data.js still point to the right place.
   =========================================================================== */

(function () {
  "use strict";

  var S = window.SITE || {};
  var site = S.site || {};
  var prefix = document.body.getAttribute("data-prefix") || "";

  /* ---- helpers ---------------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function isExternal(url) { return /^https?:/i.test(url || ""); }

  function href(url) {
    if (!url) return "";
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(url)) return url;
    return prefix + url;
  }

  function linkAttrs(url) {
    return 'href="' + esc(href(url)) + '"' +
      (isExternal(url) ? ' target="_blank" rel="noopener"' : "");
  }

  function parseDate(d) {
    var m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(d || "");
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1);
  }

  function isNew(d) {
    var dt = parseDate(d);
    if (!dt) return false;
    var days = (Date.now() - dt.getTime()) / 86400000;
    return days >= 0 && days <= (S.NEW_DAYS || 30);
  }

  function byDateDesc(a, b) {
    var x = parseDate(a.date), y = parseDate(b.date);
    return (y ? y.getTime() : 0) - (x ? x.getTime() : 0);
  }

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function discipline(key) {
    var list = S.disciplines || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].key === key) return list[i];
    }
    return { key: key || "other", label: String(key || "other").toUpperCase(), tint: "transparent" };
  }

  /* ---- page furniture --------------------------------------------------- */

  each("[data-year]", function (el) { el.textContent = new Date().getFullYear(); });
  each("[data-rev]", function (el) { el.textContent = site.revision || ""; });
  each("[data-sheet-no]", function (el) { el.textContent = document.body.getAttribute("data-sheet") || ""; });
  each("[data-section-no]", function (el, i) { el.textContent = pad(i + 1); });

  each("[data-email]", function (el) {
    if (!site.email || /example\.com$/i.test(site.email)) { el.remove(); return; }
    el.setAttribute("href", "mailto:" + site.email);
    el.textContent = site.email;
  });
  each("[data-linkedin]", function (el) {
    if (site.linkedin) el.setAttribute("href", site.linkedin);
  });

  /* ---- work: cards ------------------------------------------------------ */

  /* Projects marked draft: true are skipped entirely. */
  var projects = (S.projects || []).filter(function (p) { return !p.draft; });
  var pRoot = document.querySelector('[data-render="projects"]');

  if (pRoot) {
    pRoot.className = "cards";
    pRoot.innerHTML = projects.map(function (p, i) {
      var d = discipline(p.discipline);
      var specs = p.specs || {};

      var rows = Object.keys(specs).map(function (k) {
        return "<dt>" + esc(k) + "</dt><dd>" + esc(specs[k]) + "</dd>";
      }).join("");

      var actions = (p.links || []).slice();
      if (p.file) actions.push({ label: p.fileLabel || "View the file", url: p.file });

      var actionHtml = actions.map(function (a, j) {
        return '<a class="btn' + (j === 0 ? " btn--primary" : "") + '" ' + linkAttrs(a.url) + ">" +
          esc(a.label) + " &rarr;</a>";
      }).join("");

      var fig = p.image
        ? '<figure class="card__fig"><img src="' + esc(href(p.image)) + '" alt="' +
            esc(p.imageAlt || p.title) + '" loading="lazy"></figure>'
        : "";

      return '<article class="card" data-discipline="' + esc(d.key) + '">' +
        '<div class="card__bar">' +
          '<span class="card__fig-no">FIG. ' + pad(i + 1) + "</span>" +
          '<span class="tag" style="background:' + esc(d.tint) + '">' + esc(d.label) + "</span>" +
        "</div>" +
        fig +
        '<div class="card__body">' +
          '<h3 class="card__title">' + esc(p.title) + "</h3>" +
          '<p class="card__summary">' + esc(p.summary) + "</p>" +
          (rows ? '<dl class="spec">' + rows + "</dl>" : "") +
          (actionHtml ? '<div class="card__actions">' + actionHtml + "</div>" : "") +
        "</div>" +
      "</article>";
    }).join("");
  }

  /* ---- work: category filters ------------------------------------------ */

  var fRoot = document.querySelector('[data-render="filters"]');

  if (fRoot && projects.length) {
    var counts = {};
    projects.forEach(function (p) {
      var k = discipline(p.discipline).key;
      counts[k] = (counts[k] || 0) + 1;
    });

    var chips = [{ key: "all", label: "ALL", n: projects.length }];
    (S.disciplines || []).forEach(function (d) {
      if (counts[d.key]) chips.push({ key: d.key, label: d.label, n: counts[d.key], tint: d.tint });
    });

    fRoot.className = "filters";
    fRoot.setAttribute("role", "group");
    fRoot.setAttribute("aria-label", "Filter work by category");
    fRoot.innerHTML = chips.map(function (c, i) {
      return '<button type="button" class="chip" data-filter="' + esc(c.key) + '" aria-pressed="' + (i === 0) + '">' +
        (c.tint ? '<span class="chip__key" style="background:' + esc(c.tint) + '"></span>' : "") +
        esc(c.label) + ' <span class="chip__n">' + c.n + "</span></button>";
    }).join("");

    fRoot.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;
      var key = btn.getAttribute("data-filter");
      each("[data-filter]", function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      each(".card[data-discipline]", function (card) {
        card.hidden = key !== "all" && card.getAttribute("data-discipline") !== key;
      });
    });
  }

  /* ---- services table --------------------------------------------------- */

  var sRoot = document.querySelector('[data-render="services"]');

  if (sRoot) {
    var n = 0;
    var body = (S.services || []).map(function (g) {
      return '<tr class="group"><td colspan="5">' + esc(g.group) + "</td></tr>" +
        (g.items || []).map(function (it) {
          n++;
          var open = /available/i.test(it.status || "");
          return "<tr>" +
            '<td class="no hide-sm">' + pad(n) + "</td>" +
            "<td>" + esc(it.name) + "</td>" +
            '<td class="hide-sm">' + esc(it.format) + "</td>" +
            '<td class="status ' + (open ? "status--open" : "muted") + '">' + esc(it.status) + "</td>" +
            '<td class="link-col hide-sm"><a class="btn btn--small" href="#contact">INQUIRE &rarr;</a></td>' +
          "</tr>";
        }).join("");
    }).join("");

    sRoot.innerHTML =
      '<div class="table-wrap"><table class="table">' +
        "<thead><tr>" +
          '<th class="col-no hide-sm">No.</th>' +
          "<th>Service</th>" +
          '<th class="col-format hide-sm">Format</th>' +
          '<th class="col-status">Status</th>' +
          '<th class="link-col hide-sm"><span class="sr-only">Inquire</span></th>' +
        "</tr></thead>" +
        "<tbody>" + body + "</tbody>" +
      "</table></div>";
  }

  /* ---- latest + notes --------------------------------------------------- */

  function logHtml(items) {
    return '<div class="log">' + items.map(function (it) {
      var title = it.url ? "<a " + linkAttrs(it.url) + ">" + esc(it.title) + "</a>" : esc(it.title);
      return '<div class="log__item">' +
        '<div class="log__date">' + esc(it.date) + "</div>" +
        "<div>" +
          '<p class="log__title">' +
            (isNew(it.date) ? '<span class="tag tag--new">NEW</span> ' : "") +
            title +
            (it.tag ? ' <span class="tag tag--plain">' + esc(it.tag) + "</span>" : "") +
          "</p>" +
          (it.desc ? '<p class="log__desc">' + esc(it.desc) + "</p>" : "") +
        "</div>" +
      "</div>";
    }).join("") + "</div>";
  }

  var notes = (S.notes || []).slice().sort(byDateDesc);

  /* The feed = latest entries + blog posts, newest first. */
  var feed = (S.latest || []).concat(notes.map(function (p) {
    return { date: p.date, title: p.title, desc: p.desc, url: p.url, tag: p.tag || "NOTE" };
  })).sort(byDateDesc);

  each('[data-render="latest"]', function (el) {
    el.innerHTML = feed.length
      ? logHtml(feed.slice(0, S.HOMEPAGE_LATEST_COUNT || 3))
      : '<p class="muted">Nothing here yet.</p>';
  });

  each('[data-render="latest-all"]', function (el) {
    el.innerHTML = feed.length ? logHtml(feed) : '<p class="muted">Nothing here yet.</p>';
  });

  each('[data-render="notes"]', function (el) {
    el.innerHTML = notes.length ? logHtml(notes) : '<p class="muted">No posts yet.</p>';
  });
})();
