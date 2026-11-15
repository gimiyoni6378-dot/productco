# SEO and AEO tools

The project includes portable, project-scoped Codex skills. Open this repository in Codex on another computer to use them; do not copy API credentials into Git.

## Codex SEO

- Upstream: [zhtyyx/codex-seo](https://github.com/zhtyyx/codex-seo)
- Bundled source: `.agents/vendor/codex-seo`
- Skill version: 2.5.0, MIT license
- Upstream commit: `f8fcfad14c89e0584b5cd68a3e49ae97651dee1e`
- Project skills: `.agents/skills/seo*`

The bundled runtime supports Python 3.11–3.14. On macOS or Linux, set the source root and initialize the isolated runtime on each computer that will execute its audit scripts:

```bash
CODEX_SEO_ROOT="$(git rev-parse --show-toplevel)/.agents/vendor/codex-seo" \
  "$(git rev-parse --show-toplevel)/.agents/vendor/codex-seo/scripts/codex-seo" setup
```

Use `doctor --json` to check readiness. On Windows, use the bundled `install.ps1` instructions in `.agents/vendor/codex-seo/README.md`; it installs skills for that Windows user. Google Search Console and other Google API access require a separate local authorization on each computer. Credentials belong in the user's config directory, never this repository.

## GEO Optimizer

- Upstream: [Auriti-Labs/geo-optimizer-skill](https://github.com/Auriti-Labs/geo-optimizer-skill)
- Project skill: `.agents/skills/geo-optimizer/SKILL.md`
- MIT license; audit package version checked here: `4.23.0`
- Upstream commit: `cc5ae3aadfd520b9e813111e2c0892c504703fbb`

With `uv` installed, run an audit without adding a persistent system package:

```bash
uvx --from geo-optimizer-skill==4.23.0 geo audit \
  --url https://93seconds.co.kr/ --no-plugins
```

The audit reads public pages and reports the tool's own readiness score. That score is not a Google ranking or a measure of AI citations. `geo fix` previews changes by default; review them before writing files.

## Current audit notes

The 2026-11-15 public-site audit found the homepage and privacy page reachable, Googlebot and common answer-engine crawlers allowed, and the canonical and sitemap present. The GEO tool flagged an absent `llms.txt` and stale service descriptions in page metadata/FAQ. Its multi-page score of 57/100 (homepage 65/100) is a proprietary heuristic, not search-performance evidence. No Google Search Console API credentials were available to the bundled CLI during this audit.
