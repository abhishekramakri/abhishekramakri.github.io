// ---------------------------------------------------------------------------
// Narrative visualization engine: "The Turn"
//
// PARAMETERS (state variables driving the whole app):
//   currentScene  - integer index into SCENES[], the martini-glass "stem"
//                   (scenes 0-2) vs "bowl" (scene 3, free exploration)
//   exploreView   - only used in scene 3 ("year" | "program"), which sub-view
//                   of the free-exploration scene is showing
//   activeYear /
//   activeSite    - which datum is currently hovered, drives the tooltip
// ---------------------------------------------------------------------------

(function () {
  "use strict";

  const MARGIN = { top: 28, right: 34, bottom: 44, left: 54 };
  const VB_W = 960, VB_H = 540;
  const INNER_W = VB_W - MARGIN.left - MARGIN.right;
  const INNER_H = VB_H - MARGIN.top - MARGIN.bottom;

  const YEAR_DATA = CRIME_DATA.homicidesByYear;
  const Y_MAX = 380; // fixed across scenes so the trend is visually comparable

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function eraOf(year) {
    if (year < 2015) return "neutral";
    if (year <= 2022) return "crisis";
    return "decline";
  }

  // Splits the year series into contiguous, visually-connected era segments
  // (each segment repeats its last point as the first point of the next,
  // so the polyline reads as one continuous line colored by era).
  function eraSegments(data) {
    const segs = [];
    let current = null;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const era = eraOf(d.year);
      if (!current || current.era !== era) {
        if (current) segs.push(current);
        current = { era, points: current ? [current.points[current.points.length - 1], d] : [d] };
      } else {
        current.points.push(d);
      }
    }
    if (current) segs.push(current);
    return segs;
  }

  // -------------------------------------------------------------------------
  // Shared scaffolding: axes, line/dots, annotation helpers
  // -------------------------------------------------------------------------

  function makeScales(yearDomain) {
    const x = d3.scaleLinear().domain(yearDomain).range([0, INNER_W]);
    const y = d3.scaleLinear().domain([0, Y_MAX]).range([INNER_H, 0]);
    return { x, y };
  }

  function drawAxes(g, x, y, yearTicks) {
    const gridG = g.append("g").attr("class", "gridline");
    gridG.selectAll("line")
      .data(y.ticks(5))
      .join("line")
      .attr("x1", 0).attr("x2", INNER_W)
      .attr("y1", d => y(d)).attr("y2", d => y(d));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(10));

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${INNER_H})`)
      .call(d3.axisBottom(x).tickValues(yearTicks).tickFormat(d3.format("d")).tickSize(0).tickPadding(10));
  }

  function drawEraLine(g, x, y, data) {
    const line = d3.line().x(d => x(d.year)).y(d => y(d.homicides)).curve(d3.curveMonotoneX);
    const segs = eraSegments(data);
    g.append("g").attr("class", "line-layer")
      .selectAll("path")
      .data(segs)
      .join("path")
      .attr("class", d => `line-path era-${d.era}`)
      .attr("d", d => line(d.points));
    return segs;
  }

  function drawDots(g, x, y, data, { hoverable = false, onHover, onLeave, onMove } = {}) {
    const sel = g.append("g").attr("class", "dot-layer")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("class", d => `dot era-${eraOf(d.year)}${hoverable ? " hoverable" : ""}`)
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.homicides))
      .attr("r", hoverable ? 6 : 4.5);

    if (hoverable) {
      sel.on("mouseenter", function (event, d) {
          d3.select(this).classed("is-active", true);
          if (onHover) onHover(event, d);
        })
        .on("mousemove", function (event, d) {
          if (onMove) onMove(event, d);
        })
        .on("mouseleave", function (event, d) {
          d3.select(this).classed("is-active", false);
          if (onLeave) onLeave(event, d);
        });
    }
    return sel;
  }

  function drawEraLegend(g, items, atX, atY) {
    const leg = g.append("g").attr("class", "era-legend").attr("transform", `translate(${atX},${atY})`);
    let dx = 0;
    items.forEach(it => {
      const row = leg.append("g").attr("transform", `translate(${dx},0)`);
      row.append("circle").attr("class", `swatch-${it.era}`).attr("r", 5).attr("cy", -4);
      const t = row.append("text").attr("x", 12).attr("y", 0).text(it.label);
      dx += 12 + t.node().getComputedTextLength() + 22;
    });
  }

  function pointAnnotation({ x, y, dx, dy, title, label, wrap = 190 }) {
    return { note: { title, label, wrap }, x, y, dx, dy };
  }

  function renderAnnotations(g, annotations, type) {
    const makeAnnotations = d3.annotation()
      .type(type || d3.annotationLabel)
      .annotations(annotations);
    g.append("g").attr("class", "annotation-group").call(makeAnnotations);
  }

  function drawBracket(g, { x1, x2, y, title, label }) {
    const bg = g.append("g").attr("class", "bracket-annotation");
    const path = d3.path();
    path.moveTo(x1, y + 8);
    path.lineTo(x1, y);
    path.lineTo(x2, y);
    path.lineTo(x2, y + 8);
    bg.append("path").attr("class", "bracket-line").attr("d", path.toString());
    bg.append("text").attr("class", "bracket-title").attr("x", (x1 + x2) / 2).attr("y", y - 20).attr("text-anchor", "middle").text(title);
    bg.append("text").attr("x", (x1 + x2) / 2).attr("y", y - 6).attr("text-anchor", "middle").text(label);
  }

  function drawStatCard(g, { x, y, w = 190, h = 74, value, label, good = false }) {
    const card = g.append("g").attr("class", "stat-card").attr("transform", `translate(${x},${y})`);
    card.append("rect").attr("width", w).attr("height", h).attr("rx", 10);
    card.append("text").attr("class", `stat-value${good ? " good" : ""}`).attr("x", 16).attr("y", 32).text(value);
    const lbl = card.append("text").attr("class", "stat-label").attr("x", 16).attr("y", 52);
    wrapText(lbl, label, w - 30, 13);
  }

  function wrapText(textSel, str, width, lineHeight) {
    const words = str.split(/\s+/).reverse();
    let word, line = [], lineNumber = 0;
    let tspan = textSel.text(null).append("tspan").attr("x", 16).attr("dy", 0);
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width && line.length > 1) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = textSel.append("tspan").attr("x", 16).attr("dy", lineHeight).text(word);
        lineNumber++;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Tooltip (scene 3 / free exploration only)
  // -------------------------------------------------------------------------

  const tooltipEl = document.getElementById("tooltip");
  const chartWrap = document.querySelector(".nv-chart-wrap");

  function showTooltip(event, html) {
    tooltipEl.innerHTML = html;
    tooltipEl.hidden = false;
    moveTooltip(event);
  }
  function moveTooltip(event) {
    const wrapRect = chartWrap.getBoundingClientRect();
    let left = event.clientX - wrapRect.left + 16;
    let top = event.clientY - wrapRect.top - 10;
    const ttW = 260;
    if (left + ttW > wrapRect.width) left = event.clientX - wrapRect.left - ttW - 16;
    tooltipEl.style.left = left + "px";
    tooltipEl.style.top = top + "px";
  }
  function hideTooltip() {
    tooltipEl.hidden = true;
  }

  // -------------------------------------------------------------------------
  // Scene 1: A City in Crisis (2010-2022)
  // -------------------------------------------------------------------------

  function renderScene1(g) {
    const { x, y } = makeScales([2010, 2022]);
    const data = YEAR_DATA.filter(d => d.year <= 2022);
    const ticks = [2010, 2012, 2014, 2015, 2017, 2019, 2022];

    drawAxes(g, x, y, ticks);
    drawEraLine(g, x, y, data);
    drawDots(g, x, y, data);
    drawEraLegend(g, [
      { era: "neutral", label: "Before the spike" },
      { era: "crisis", label: "300+ homicides / year" }
    ], 0, 14);

    drawBracket(g, {
      x1: x(2015), x2: x(2022), y: y(370),
      title: "8 years above 300 homicides",
      label: "2015 – 2022, every single year"
    });

    renderAnnotations(g, [
      pointAnnotation({
        x: x(2015), y: y(344), dx: 75, dy: 55,
        title: "Freddie Gray, April 2015",
        label: "Gray dies in BPD custody; unrest follows. Homicides jump 63% in a single year, from 211 to 344."
      })
    ]);
  }

  // -------------------------------------------------------------------------
  // Scene 2: The Turn (2010-2025)
  // -------------------------------------------------------------------------

  function renderScene2(g) {
    const { x, y } = makeScales([2010, 2025]);
    const data = YEAR_DATA;
    const ticks = [2010, 2013, 2016, 2019, 2022, 2025];

    drawAxes(g, x, y, ticks);
    drawEraLine(g, x, y, data);
    drawDots(g, x, y, data);
    drawEraLegend(g, [
      { era: "neutral", label: "Before the spike" },
      { era: "crisis", label: "Crisis plateau" },
      { era: "decline", label: "After GVRS launch" }
    ], 0, 14);

    renderAnnotations(g, [
      pointAnnotation({
        x: x(2022), y: y(333), dx: -150, dy: 70,
        title: "GVRS launches Jan. 11, 2022",
        label: "A group-violence strategy pairs outreach and services for the highest-risk individuals with focused enforcement, starting in the Western District."
      }),
      pointAnnotation({
        x: x(2025), y: y(133), dx: -70, dy: 60,
        title: "133: a 50-year low",
        label: "Down 31% from 2024 alone, and Baltimore's fewest homicides in nearly five decades."
      })
    ]);

    drawStatCard(g, {
      x: 8, y: 40,
      value: `−${CRIME_DATA.fiveYearComparison.homicideDeclinePct}%`,
      label: `Homicides, ${CRIME_DATA.fiveYearComparison.baseYear}–${CRIME_DATA.fiveYearComparison.compareYear}`,
      good: true
    });
    drawStatCard(g, {
      x: 210, y: 40,
      value: `−${CRIME_DATA.fiveYearComparison.shootingDeclinePct}%`,
      label: `Nonfatal shootings, ${CRIME_DATA.fiveYearComparison.baseYear}–${CRIME_DATA.fiveYearComparison.compareYear}`,
      good: true
    });
  }

  // -------------------------------------------------------------------------
  // Scene 3: Where It's Working, The Community Model
  // -------------------------------------------------------------------------

  function renderScene3(g) {
    const ss = CRIME_DATA.safeStreets;
    const bars = [
      { label: "Statistically significant reduction", count: ss.sitesStatisticallySignificant, tone: "var(--nv-blue-1)", note: ss.significantSites.join(", ") },
      { label: "Reduction, not statistically significant", count: ss.sitesWithHomicideReduction - ss.sitesStatisticallySignificant, tone: "var(--nv-blue-2)", note: "" },
      { label: "No measurable reduction", count: ss.sitesStudied - ss.sitesWithHomicideReduction, tone: "var(--nv-blue-3)", note: "" }
    ];

    const chartTop = 24, barH = 34, barGap = 30, noteReserve = 42, labelColW = 0;
    const maxCount = d3.max(bars, d => d.count);
    const barScaleW = d3.scaleLinear().domain([0, maxCount]).range([0, 300]);

    const barsG = g.append("g").attr("class", "safe-streets-bars").attr("transform", `translate(0,${chartTop})`);
    let cursorY = 0;
    bars.forEach((b) => {
      const row = barsG.append("g").attr("transform", `translate(0,${cursorY})`);
      row.append("text").attr("class", "bar-label").attr("x", 0).attr("y", -8).text(`${b.label} (${b.count} of ${ss.sitesStudied})`);
      row.append("rect").attr("class", "bar").attr("x", 0).attr("y", 0).attr("height", barH).attr("width", barScaleW(b.count)).attr("fill", b.tone).attr("rx", 4);
      cursorY += barH + barGap;
      if (b.note) {
        const noteText = row.append("text").attr("class", "bar-sitelist").attr("x", 0).attr("y", barH + 16);
        wrapText(noteText, b.note, 420, 14);
        cursorY += noteReserve;
      }
    });

    // GVRS Western District pilot stat cards, to the right
    const gv = CRIME_DATA.gvrsPilot;
    const cardX = 470, cardTop = 10;
    drawStatCard(g, { x: cardX, y: cardTop, w: 220, value: `−${gv.homicideShootingReductionPct}%`, label: "Homicides & shootings, Western District pilot", good: true });
    drawStatCard(g, { x: cardX + 240, y: cardTop, w: 220, value: `−${gv.carjackingReductionPct}%`, label: "Carjackings, same 18-month pilot window", good: true });

    const launchNote = g.append("text").attr("class", "bar-sitelist").attr("x", cardX).attr("y", cardTop + 74 + 24);
    wrapText(launchNote, `GVRS launched ${gv.launchDate} in the ${gv.district}. ${gv.displacement}`, 460, 15);
    launchNote.selectAll("tspan").attr("x", cardX);

    const expansionNote = g.append("text").attr("class", "bar-sitelist").attr("x", cardX).attr("y", cardTop + 74 + 24 + 46);
    wrapText(expansionNote, `Expanded to ${gv.expansion.map(e => `${e.district} (${e.date})`).join(" and ")}.`, 460, 15);
    expansionNote.selectAll("tspan").attr("x", cardX);

    renderAnnotations(g, [
      {
        note: { title: "The pattern: longer-running programs, bigger effects", label: "The 5 Safe Streets sites open 4+ years averaged 22% fewer homicides than predicted, and citywide, sites cut nonfatal shootings 23%.", wrap: 210 },
        x: barScaleW(bars[0].count), y: chartTop + barH / 2, dx: 110, dy: 150
      }
    ]);
  }

  // -------------------------------------------------------------------------
  // Scene 4: Explore the Data (free exploration)
  // -------------------------------------------------------------------------

  let exploreView = "year";

  function renderScene4(g) {
    if (exploreView === "year") {
      renderScene4Year(g);
    } else {
      renderScene4Program(g);
    }
  }

  function renderScene4Year(g) {
    const { x, y } = makeScales([2010, 2025]);
    const data = YEAR_DATA;
    const ticks = data.map(d => d.year).filter(yr => yr % 2 === 0 || yr === 2025 || yr === 2015);

    drawAxes(g, x, y, ticks);
    drawEraLine(g, x, y, data);
    drawEraLegend(g, [
      { era: "neutral", label: "Before the spike" },
      { era: "crisis", label: "Crisis plateau" },
      { era: "decline", label: "After GVRS launch" }
    ], 0, 14);

    drawDots(g, x, y, data, {
      hoverable: true,
      onHover: (event, d) => {
        const note = CRIME_DATA.yearNotes[d.year];
        showTooltip(event, `<div class="nv-tt-title">${d.year}: ${d.homicides} homicides</div>${note ? `<div class="nv-tt-body">${note}</div>` : ""}`);
      },
      onMove: moveTooltip,
      onLeave: hideTooltip
    });
  }

  function renderScene4Program(g) {
    const sites = CRIME_DATA.safeStreets.siteTimeline;
    const currentYear = 2026;
    const x = d3.scaleLinear().domain([2007, currentYear]).range([0, INNER_W]);
    const rowH = 26, rowGap = 30;

    const gridG = g.append("g").attr("class", "gridline");
    const ticks = [2007, 2010, 2013, 2016, 2019, 2022, 2025];
    gridG.selectAll("line").data(ticks).join("line")
      .attr("x1", d => x(d)).attr("x2", d => x(d))
      .attr("y1", 0).attr("y2", sites.length * (rowH + rowGap));
    g.append("g").attr("class", "axis axis--x")
      .attr("transform", `translate(0,${sites.length * (rowH + rowGap)})`)
      .call(d3.axisBottom(x).tickValues(ticks).tickFormat(d3.format("d")).tickSize(0).tickPadding(10));

    const sig = new Set(CRIME_DATA.safeStreets.significantSites);

    const rows = g.append("g").attr("class", "timeline-rows");
    sites.forEach((s, i) => {
      const ry = i * (rowH + rowGap);
      const endYear = s.end || currentYear;
      const row = rows.append("g").attr("transform", `translate(0,${ry})`);
      row.append("text").attr("class", "timeline-label").attr("x", 0).attr("y", -8)
        .text(`${s.name}${sig.has(s.name) ? " ★" : ""}, ${s.region}`);

      row.append("rect")
        .attr("class", "timeline-bar")
        .attr("x", x(s.start)).attr("y", 0)
        .attr("width", Math.max(4, x(endYear) - x(s.start))).attr("height", rowH)
        .attr("rx", 5)
        .attr("fill", sig.has(s.name) ? "var(--nv-decline)" : "var(--nv-blue-2)")
        .on("mouseenter", function (event) {
          d3.select(this).classed("is-active", true);
          const statusLine = sig.has(s.name)
            ? "One of the 4 sites with a statistically significant homicide reduction."
            : "One of 11 Safe Streets sites evaluated citywide.";
          showTooltip(event, `<div class="nv-tt-title">${s.name}</div><div class="nv-tt-body">${s.region} &middot; ${s.start}–${s.end || "present"}<br>${statusLine}</div>`);
        })
        .on("mousemove", moveTooltip)
        .on("mouseleave", function () {
          d3.select(this).classed("is-active", false);
          hideTooltip();
        });
    });

    const footnote = g.append("text")
      .attr("class", "bar-sitelist")
      .attr("x", 0).attr("y", sites.length * (rowH + rowGap) + 44);
    wrapText(footnote, "Shown: 7 of the 11 evaluated sites with a confirmed public launch date. Penn North, the 4th statistically significant site, is not shown here because its launch date wasn't in the public record used for this project.", INNER_W, 15);
    footnote.selectAll("tspan").attr("x", 0);
  }

  function renderScene4Controls(container) {
    container.hidden = false;
    container.innerHTML = "";

    const yearBtn = document.createElement("button");
    yearBtn.className = "nv-toggle-btn" + (exploreView === "year" ? " is-active" : "");
    yearBtn.type = "button";
    yearBtn.textContent = "By Year";
    yearBtn.addEventListener("click", () => { exploreView = "year"; renderCurrentScene(); });

    const programBtn = document.createElement("button");
    programBtn.className = "nv-toggle-btn" + (exploreView === "program" ? " is-active" : "");
    programBtn.type = "button";
    programBtn.textContent = "By Program Site";
    programBtn.addEventListener("click", () => { exploreView = "program"; renderCurrentScene(); });

    const hint = document.createElement("span");
    hint.className = "nv-hint-pill";
    hint.textContent = "• Hover any point or bar for details";

    container.appendChild(yearBtn);
    container.appendChild(programBtn);
    container.appendChild(hint);
  }

  // -------------------------------------------------------------------------
  // Scene registry + engine
  // -------------------------------------------------------------------------

  const SCENES = [
    {
      title: "A City in Crisis",
      dek: "For eight straight years after 2015, Baltimore recorded more than 300 homicides annually.",
      caption: "Homicides per year, Baltimore City, 2010–2022. Freddie Gray's death in April 2015 is followed by unrest and a lasting rise in violence that holds through 2022.",
      render: renderScene1
    },
    {
      title: "The Turn",
      dek: "In January 2022, a new violence-reduction strategy launched, and three years later, homicides had fallen to a level not seen in nearly 50 years.",
      caption: "The same series, extended through 2025. The Group Violence Reduction Strategy (GVRS) launches in the Western District in January 2022, and homicides decline in each of the three years that follow.",
      render: renderScene2
    },
    {
      title: "Where It's Working",
      dek: "Two separate evaluations, of Safe Streets sites and of the GVRS pilot, offer neighborhood-level evidence for the citywide trend.",
      caption: "Left: outcomes across the 11 Safe Streets sites evaluated by Johns Hopkins researchers (2023). Right: results from the GVRS pilot's first 18 months in the Western District, the model since expanded to two more districts.",
      render: renderScene3
    },
    {
      title: "Explore the Data",
      dek: "Switch views and hover any point or bar for the exact numbers behind each chart.",
      caption: "Free exploration: toggle between the full year-by-year homicide series and the timeline of Safe Streets program sites. The program-site view shows the 7 of 11 evaluated sites with a confirmed public launch date; ★ marks the ones with a statistically significant homicide reduction.",
      render: renderScene4,
      hasControls: true
    }
  ];

  let currentScene = 0;

  const svgSel = d3.select("#scene-svg").attr("viewBox", `0 0 ${VB_W} ${VB_H}`);
  const kickerEl = document.getElementById("scene-kicker");
  const titleEl = document.getElementById("scene-title");
  const dekEl = document.getElementById("scene-dek");
  const captionEl = document.getElementById("scene-caption");
  const controlsEl = document.getElementById("scene-controls");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const dotsEl = document.getElementById("scene-dots");

  function buildDots() {
    dotsEl.innerHTML = "";
    SCENES.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "nv-scene-dot" + (i === currentScene ? " is-active" : "");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Go to scene ${i + 1}: ${s.title}`);
      b.addEventListener("click", () => { currentScene = i; renderCurrentScene(); });
      dotsEl.appendChild(b);
    });
  }

  function renderCurrentScene() {
    hideTooltip();
    svgSel.selectAll("*").remove();
    const g = svgSel.append("g").attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

    const scene = SCENES[currentScene];
    kickerEl.textContent = `Scene ${currentScene + 1} of ${SCENES.length}`;
    titleEl.textContent = scene.title;
    dekEl.textContent = scene.dek;
    captionEl.textContent = scene.caption;

    if (scene.hasControls) {
      renderScene4Controls(controlsEl);
    } else {
      controlsEl.hidden = true;
      controlsEl.innerHTML = "";
    }

    scene.render(g);

    btnPrev.disabled = currentScene === 0;
    btnNext.disabled = currentScene === SCENES.length - 1;
    Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle("is-active", i === currentScene));
  }

  btnPrev.addEventListener("click", () => {
    if (currentScene > 0) { currentScene--; renderCurrentScene(); }
  });
  btnNext.addEventListener("click", () => {
    if (currentScene < SCENES.length - 1) { currentScene++; renderCurrentScene(); }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") btnNext.click();
    if (e.key === "ArrowLeft") btnPrev.click();
  });

  buildDots();
  renderCurrentScene();
})();
