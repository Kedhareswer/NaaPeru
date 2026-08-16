/**
 * Generates public/resume.html from public/profile.json.
 * Pure Node — no headless browser required. The page renders a
 * portfolio-matching view on screen and a clean A4 layout when printed
 * (the in-page "Download PDF" button just calls window.print()).
 *
 * Run manually with: node scripts/generate-resume.mjs
 * Regenerate whenever profile.json changes.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const profile = JSON.parse(readFileSync(join(ROOT, "public", "profile.json"), "utf-8"));
const OUT_FILE = join(ROOT, "public", "resume.html");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const { personalInfo, summary, skills, experience, education, certifications } = profile;

const sectionTitle = (label) => `
    <div class="section-title">
      <span class="rule"></span>
      <h2>${esc(label)}</h2>
    </div>`;

const experienceHtml = experience
  .map(
    (job) => `
      <div class="entry">
        <div class="entry-head">
          <div>
            <h3>${esc(job.role)}</h3>
            <p class="entry-sub">${esc(job.company)} <span class="dot">&middot;</span> ${esc(job.location)}</p>
          </div>
          <p class="entry-period">${esc(job.duration)}</p>
        </div>
        <ul>
          ${job.achievements.map((a) => `<li>${esc(a)}</li>`).join("\n          ")}
        </ul>
      </div>`,
  )
  .join("\n");

const educationHtml = education
  .map(
    (edu) => `
      <div class="entry entry--compact">
        <div class="entry-head">
          <div>
            <h3>${esc(edu.institution)}</h3>
            <p class="entry-sub">${esc(edu.degree)}${edu.specialization ? ` <span class="dot">&middot;</span> ${esc(edu.specialization)}` : ""}</p>
          </div>
          <p class="entry-period">${esc(edu.duration)}</p>
        </div>
        <p class="entry-meta">${esc(edu.location)}${edu.cgpa ? ` <span class="dot">&middot;</span> CGPA ${esc(edu.cgpa)}` : ""}${edu.marks ? ` <span class="dot">&middot;</span> Marks ${esc(edu.marks)}` : ""}${edu.gpa ? ` <span class="dot">&middot;</span> GPA ${esc(edu.gpa)}` : ""}</p>
      </div>`,
  )
  .join("\n");

const skillGroups = [
  ["Languages", skills.programmingLanguages],
  ["AI / ML", skills.aiMlFrameworks],
  ["Web", skills.webTechnologies],
  ["Data & Cloud", [...skills.databases, ...skills.dataVisualization, ...skills.cloudPlatforms]],
  ["Specializations", skills.specializations],
];

const skillsHtml = skillGroups
  .map(
    ([label, items]) => `
      <div class="skill-row">
        <p class="skill-label">${esc(label)}</p>
        <p class="skill-items">${items.map(esc).join(" &middot; ")}</p>
      </div>`,
  )
  .join("\n");

const certsHtml = certifications
  .slice(0, 6)
  .map(
    (c) => `
        <div class="cert">
          <p class="cert-title">${esc(c.name)}</p>
          <p class="cert-meta">${esc(c.issuer)} <span class="dot">&middot;</span> ${esc(c.date)}</p>
        </div>`,
  )
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(personalInfo.name)} — Resume</title>
<meta name="robots" content="noindex, nofollow" />
<link rel="icon" type="image/png" href="/elements4.png" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #0e0f11;
    --card: rgba(255,255,255,0.03);
    --border: rgba(255,255,255,0.12);
    --ink: #f5f3f1;
    --muted: rgba(245,243,241,0.62);
    --red: #c22a1c;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .toolbar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: rgba(14,15,17,0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .toolbar a {
    color: var(--muted);
    text-decoration: none;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    transition: color .2s;
  }
  .toolbar a:hover { color: var(--ink); }
  .toolbar button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--red);
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    cursor: pointer;
    transition: background .2s;
  }
  .toolbar button:hover { background: #a8231a; }

  .sheet {
    max-width: 860px;
    margin: 0 auto;
    padding: 56px 40px 80px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 20px;
    border-bottom: 2px solid var(--border);
    padding-bottom: 24px;
    margin-bottom: 28px;
  }
  .header h1 {
    margin: 0 0 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }
  .header .role {
    margin: 0;
    font-size: 11px;
    font-weight: 700;
    color: var(--red);
    text-transform: uppercase;
    letter-spacing: 0.3em;
  }
  .contact {
    text-align: right;
    font-size: 12px;
    color: var(--muted);
    line-height: 1.8;
  }
  .contact strong { color: var(--ink); font-weight: 600; }

  .summary {
    font-size: 15px;
    color: var(--muted);
    max-width: 640px;
    line-height: 1.7;
    margin: 0 0 36px;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 40px 0 18px;
  }
  .section-title .rule { width: 28px; height: 2px; background: var(--red); display: inline-block; }
  .section-title h2 {
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-weight: 700;
  }

  .entry { margin-bottom: 22px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
  .entry:last-child { border-bottom: none; }
  .entry--compact { margin-bottom: 16px; padding-bottom: 14px; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; }
  .entry-head h3 { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; }
  .entry-sub { margin: 3px 0 0; font-size: 12.5px; color: var(--red); font-weight: 500; }
  .entry-period { margin: 0; font-size: 11px; color: var(--muted); white-space: nowrap; text-transform: uppercase; letter-spacing: 0.1em; }
  .entry-meta { margin: 5px 0 0; font-size: 12px; color: var(--muted); }
  .dot { opacity: 0.5; margin: 0 2px; }
  .entry ul { margin: 10px 0 0; padding-left: 18px; }
  .entry li { margin-bottom: 5px; font-size: 13px; color: var(--ink); line-height: 1.55; }

  .skill-row { display: flex; gap: 20px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .skill-row:last-child { border-bottom: none; }
  .skill-label { margin: 0; width: 140px; flex-shrink: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: var(--red); }
  .skill-items { margin: 0; font-size: 13px; color: var(--ink); line-height: 1.6; }

  .two-col { display: flex; gap: 48px; flex-wrap: wrap; }
  .two-col .col { flex: 1; min-width: 260px; }

  .cert { margin-bottom: 12px; }
  .cert-title { margin: 0; font-size: 13px; font-weight: 600; }
  .cert-meta { margin: 2px 0 0; font-size: 11.5px; color: var(--muted); }

  .footer-note {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
    font-size: 10px;
    color: var(--muted);
    text-align: center;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  @media (max-width: 640px) {
    .header { flex-direction: column; align-items: flex-start; }
    .contact { text-align: left; }
    .sheet { padding: 40px 20px 60px; }
  }

  @media print {
    @page { size: A4; margin: 16mm 14mm; }
    .toolbar { display: none; }
    html, body {
      background: #ffffff;
      color: #151414;
    }
    :root {
      --border: #e4dfdc;
      --ink: #151414;
      --muted: #5b5757;
      --red: #be2518;
    }
    .sheet { padding: 0; max-width: none; }
    .entry, .skill-row { break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <a href="/about">&larr; Back to portfolio</a>
    <button onclick="window.print()">
      Download PDF
    </button>
  </div>

  <div class="sheet">
    <div class="header">
      <div>
        <h1>${esc(personalInfo.name)}</h1>
        <p class="role">${esc(personalInfo.title)} <span class="dot">/</span> ${esc(personalInfo.alternativeTitles.slice(0, 2).join(" / "))}</p>
      </div>
      <div class="contact">
        <div><strong>${esc(personalInfo.email)}</strong></div>
        <div>${esc(personalInfo.phone)} <span class="dot">&middot;</span> ${esc(personalInfo.location)}</div>
        <div>${esc(personalInfo.linkedin.replace("https://www.", ""))}</div>
        <div>${esc(personalInfo.github.replace("https://", ""))}</div>
      </div>
    </div>

    <p class="summary">${esc(summary)}</p>

    ${sectionTitle("Experience")}
    ${experienceHtml}

    <div class="two-col">
      <div class="col">
        ${sectionTitle("Education")}
        ${educationHtml}
      </div>
      <div class="col">
        ${sectionTitle("Certifications")}
        ${certsHtml}
      </div>
    </div>

    ${sectionTitle("Skills")}
    ${skillsHtml}

    <div class="footer-note">Generated from live portfolio data &middot; kedhar.vercel.app</div>
  </div>
</body>
</html>
`;

writeFileSync(OUT_FILE, html, "utf-8");
console.log(`Resume written to ${OUT_FILE.replace(ROOT, ".")}`);
