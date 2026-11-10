/* ===========================================================================
   WRITING PAGE — builds writing.html from js/clips.js.
   You shouldn't need to edit this file. Add or change pieces in clips.js.
   =========================================================================== */

(function () {
  "use strict";

  var C = window.CLIPS || { publishers: [], items: [] };
  var PAGE_SIZE = 50;

  /* ---- helpers ---------------------------------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function $(sel) { return document.querySelector(sel); }
  function isArchived(url) { return /web\.archive\.org/i.test(url || ""); }
  function year(d) { return String(d || "").slice(0, 4); }
  function fmtNum(n) { return n.toLocaleString("en-US"); }

  var pubs = {};
  (C.publishers || []).forEach(function (p) { pubs[p.key] = p; });
  function pubName(key) { return pubs[key] ? pubs[key].name : key; }

  var items = (C.items || []).filter(function (i) { return !i.hide; });

  function typeLabel(i) {
    return i.topic ? i.type + " · " + i.topic : i.type;
  }

  function linkTag(url) {
    if (!url) return '<span class="tag tag--plain">NO LINK</span>';
    return isArchived(url)
      ? '<span class="tag tag--plain" title="Original page is gone; this opens a saved copy on the Wayback Machine">ARCHIVED</span>'
      : '<span class="tag tag--live">LIVE</span>';
  }

  function titleLink(i) {
    return i.url
      ? '<a href="' + esc(i.url) + '" target="_blank" rel="noopener">' + esc(i.title) + "</a>"
      : esc(i.title);
  }

  /* ---- stats ------------------------------------------------------------ */

  var years = items.map(function (i) { return year(i.date); }).filter(Boolean).sort();
  var pubCount = {};
  var typeCount = {};
  items.forEach(function (i) {
    pubCount[i.pub] = (pubCount[i.pub] || 0) + 1;
    typeCount[i.type] = (typeCount[i.type] || 0) + 1;
  });
  var usedPubs = (C.publishers || []).filter(function (p) { return pubCount[p.key]; });
  var typeOrder = Object.keys(typeCount).sort(function (a, b) { return typeCount[b] - typeCount[a]; });
  var archivedCount = items.filter(function (i) { return isArchived(i.url); }).length;

  document.querySelectorAll("[data-writing-total]").forEach(function (el) { el.textContent = fmtNum(items.length); });
  document.querySelectorAll("[data-writing-outlets]").forEach(function (el) { el.textContent = usedPubs.length; });
  document.querySelectorAll("[data-writing-years]").forEach(function (el) {
    el.textContent = years.length ? years[0] + "–" + years[years.length - 1] : "";
  });

  var stats = $('[data-render="writing-stats"]');
  if (stats) {
    stats.innerHTML =
      '<table class="table table--spec"><tbody>' +
        '<tr><th scope="row">Pieces</th><td>' + fmtNum(items.length) + "</td></tr>" +
        '<tr><th scope="row">Outlets</th><td>' + usedPubs.map(function (p) { return esc(p.name); }).join(", ") + "</td></tr>" +
        '<tr><th scope="row">Formats</th><td>' + typeOrder.map(function (t) {
          return esc(t) + " (" + typeCount[t] + ")";
        }).join(", ") + "</td></tr>" +
        '<tr><th scope="row">Years</th><td>' + esc(years[0] || "") + "–" + esc(years[years.length - 1] || "") + "</td></tr>" +
        '<tr><th scope="row">Archived links</th><td>' + fmtNum(archivedCount) + " open a saved copy on the Wayback Machine</td></tr>" +
      "</tbody></table>";
  }

  /* ---- selected writing ------------------------------------------------- */

  var featRoot = $('[data-render="writing-featured"]');
  if (featRoot) {
    var feat = items.filter(function (i) { return i.featured; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    featRoot.className = "cards cards--3";
    featRoot.innerHTML = feat.map(function (i, n) {
      return '<article class="card">' +
        '<div class="card__bar"><span class="card__fig-no">' + esc(pubName(i.pub).toUpperCase()) + "</span>" +
          '<span class="card__fig-no">' + esc(i.date.slice(0, 7)) + "</span></div>" +
        '<div class="card__body">' +
          '<h3 class="card__title">' + esc(i.title) + "</h3>" +
          '<p class="card__summary muted">' + esc(typeLabel(i)) + "</p>" +
          (i.url ? '<div class="card__actions"><a class="btn btn--primary" href="' + esc(i.url) +
            '" target="_blank" rel="noopener">Read it &rarr;</a> ' + linkTag(i.url) + "</div>" : "") +
        "</div></article>";
    }).join("");
  }

  /* ---- publisher tiles -------------------------------------------------- */

  var state = { pub: "all", type: "all", year: "all", q: "", sort: "new", showAll: false };

  var pubRoot = $('[data-render="writing-pubs"]');
  function renderPubs() {
    if (!pubRoot) return;
    pubRoot.className = "pubs";
    pubRoot.setAttribute("role", "group");
    pubRoot.setAttribute("aria-label", "Filter the archive by publisher");
    var tiles = [{ key: "all", name: "All outlets", note: "" }].concat(usedPubs);
    pubRoot.innerHTML = tiles.map(function (p) {
      var n = p.key === "all" ? items.length : pubCount[p.key];
      var face = p.logo
        ? '<img class="pub__logo" src="' + esc(p.logo) + '" alt="' + esc(p.name) + '" ' +
          'onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'pub__name\',textContent:this.alt}))">'
        : '<span class="pub__name">' + esc(p.name) + "</span>";
      return '<button type="button" class="pub" data-pub="' + esc(p.key) + '" aria-pressed="' + (state.pub === p.key) + '">' +
        face +
        '<span class="pub__meta">' + n + (n === 1 ? " piece" : " pieces") + (p.note ? " · " + esc(p.note) : "") + "</span>" +
      "</button>";
    }).join("");
  }
  if (pubRoot) {
    pubRoot.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pub]");
      if (!b) return;
      var key = b.getAttribute("data-pub");
      state.pub = (state.pub === key && key !== "all") ? "all" : key;
      state.showAll = false;
      syncControls();
      renderPubs();
      renderArchive();
      var target = $("#archive");
      if (target && target.getBoundingClientRect().top > window.innerHeight * 0.6) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  /* ---- archive: controls + table --------------------------------------- */

  var archRoot = $('[data-render="writing-archive"]');

  function option(value, label, selected) {
    return '<option value="' + esc(value) + '"' + (selected ? " selected" : "") + ">" + esc(label) + "</option>";
  }

  function buildControls() {
    var yearList = years.filter(function (y, i, a) { return a.indexOf(y) === i; }).reverse();
    return '<div class="controls">' +
      '<label class="control control--grow"><span class="control__k">Search</span>' +
        '<input type="search" data-ctl="q" placeholder="Search titles" autocomplete="off"></label>' +
      '<label class="control"><span class="control__k">Outlet</span><select data-ctl="pub">' +
        option("all", "All outlets", true) +
        usedPubs.map(function (p) { return option(p.key, p.name + " (" + pubCount[p.key] + ")"); }).join("") +
      "</select></label>" +
      '<label class="control"><span class="control__k">Format</span><select data-ctl="type">' +
        option("all", "All formats", true) +
        typeOrder.map(function (t) { return option(t, t + " (" + typeCount[t] + ")"); }).join("") +
      "</select></label>" +
      '<label class="control"><span class="control__k">Year</span><select data-ctl="year">' +
        option("all", "All years", true) +
        yearList.map(function (y) { return option(y, y); }).join("") +
      "</select></label>" +
      '<label class="control"><span class="control__k">Sort</span><select data-ctl="sort">' +
        option("new", "Newest first", true) + option("old", "Oldest first") + option("pub", "By outlet") +
      "</select></label>" +
    "</div>" +
    '<p class="results" aria-live="polite" data-results></p>' +
    '<div class="table-wrap"><table class="table table--archive">' +
      "<thead><tr>" +
        '<th class="col-date">Date</th>' +
        '<th class="col-pub hide-sm">Outlet</th>' +
        "<th>Title</th>" +
        '<th class="col-type hide-sm">Format</th>' +
        '<th class="col-link hide-sm">Link</th>' +
      "</tr></thead><tbody data-rows></tbody>" +
    "</table></div>" +
    '<p class="actions" data-more></p>';
  }

  function syncControls() {
    if (!archRoot) return;
    archRoot.querySelectorAll("[data-ctl]").forEach(function (el) {
      var k = el.getAttribute("data-ctl");
      if (el.value !== state[k]) el.value = state[k];
    });
  }

  function filtered() {
    var q = state.q.trim().toLowerCase();
    var list = items.filter(function (i) {
      return (state.pub === "all" || i.pub === state.pub) &&
        (state.type === "all" || i.type === state.type) &&
        (state.year === "all" || year(i.date) === state.year) &&
        (!q || i.title.toLowerCase().indexOf(q) !== -1 || (i.topic || "").indexOf(q) !== -1);
    });
    list.sort(function (a, b) {
      if (state.sort === "old") return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
      if (state.sort === "pub") {
        var pa = pubName(a.pub), pb = pubName(b.pub);
        if (pa !== pb) return pa < pb ? -1 : 1;
      }
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    return list;
  }

  function renderArchive() {
    if (!archRoot) return;
    var list = filtered();
    var shown = state.showAll ? list : list.slice(0, PAGE_SIZE);
    archRoot.querySelector("[data-rows]").innerHTML = shown.length
      ? shown.map(function (i) {
          return "<tr>" +
            '<td class="col-date mono">' + esc(i.date) + "</td>" +
            '<td class="hide-sm">' + esc(pubName(i.pub)) + "</td>" +
            "<td>" + titleLink(i) +
              '<span class="row-meta">' + esc(pubName(i.pub)) + " · " + esc(typeLabel(i)) +
              (isArchived(i.url) ? " · archived" : "") + "</span></td>" +
            '<td class="hide-sm">' + esc(typeLabel(i)) + "</td>" +
            '<td class="hide-sm">' + linkTag(i.url) + "</td>" +
          "</tr>";
        }).join("")
      : '<tr><td colspan="5" class="muted">Nothing matches those filters.</td></tr>';

    var filteredNote = (state.pub !== "all" ? " from " + pubName(state.pub) : "");
    archRoot.querySelector("[data-results]").innerHTML =
      "Showing <strong>" + fmtNum(shown.length) + "</strong> of " + fmtNum(list.length) +
      (list.length === items.length ? " pieces" : " matching pieces" + esc(filteredNote)) +
      (list.length !== items.length ? ' &middot; <button type="button" class="linklike" data-reset>Clear filters</button>' : "");

    var more = archRoot.querySelector("[data-more]");
    more.innerHTML = list.length > shown.length
      ? '<button type="button" class="btn" data-showall>Show all ' + fmtNum(list.length) + " &darr;</button>"
      : "";
  }

  if (archRoot) {
    archRoot.innerHTML = buildControls();
    archRoot.addEventListener("input", function (e) {
      var k = e.target.getAttribute("data-ctl");
      if (!k) return;
      state[k] = e.target.value;
      state.showAll = false;
      if (k === "pub") renderPubs();
      renderArchive();
    });
    archRoot.addEventListener("click", function (e) {
      if (e.target.closest("[data-showall]")) { state.showAll = true; renderArchive(); }
      if (e.target.closest("[data-reset]")) {
        state = { pub: "all", type: "all", year: "all", q: "", sort: state.sort, showAll: false };
        archRoot.querySelector('[data-ctl="q"]').value = "";
        syncControls(); renderPubs(); renderArchive();
      }
    });
  }

  renderPubs();
  renderArchive();
})();
