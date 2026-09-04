# Search Console update — 4 September 2026

This build was refined around the real query patterns shown in the supplied Search Console screenshots.

## Query → page mapping
- `will my sofa fit calculator` → home + sofa guide
- `how to measure if furniture will fit` → measuring guide
- `will this furniture fit in my car calculator` → clarified in home FAQ (the tool is not presented as a full vehicle-loading simulator)
- `will my furniture fit calculator` → home
- `how to tell if sofa will fit through doorway` → sofa guide + doorway guide
- `sofa diagonal depth calculator` → new dedicated interactive diagonal calculator
- `furniture fitting`, `will my sofa fit`, `couch fit` → home + sofa guide

## What changed
- Home title, description, H1 and visible copy now align more closely with the strongest observed sofa-calculator intent while retaining broad furniture-fit relevance.
- Measuring guide now targets the exact informational intent “how to measure if furniture will fit.”
- Sofa guide copy and internal links were strengthened around “will my sofa fit” and doorway-fit intent.
- Added `/sofa-diagonal-depth-calculator/` with a real height × depth diagonal calculator, clear formula, and strong caveats so it does not over-promise doorway fit.
- Added WebApplication structured data for the interactive tools, without ratings/review spam.
- Updated internal links and sitemap.
- Updated `dateModified`/`lastmod` to 2026-09-04 on changed pages.

## Deploy / Search Console
1. Upload this full build to the same GitHub Pages repo/path; do not create a new project URL.
2. Verify all five sitemap URLs load.
3. Search Console → Sitemaps: resubmit `sitemap.xml` if needed.
4. URL Inspection → Request indexing once for the changed home page, sofa guide, measuring guide, and new diagonal calculator page.
5. Avoid editing titles every day. Compare 7-day and 28-day performance after Google has recrawled the changes.

## Important
The 24-hour average position is based on very few impressions, so it is a promising signal but not enough data to claim a stable ranking improvement. This build prioritizes the query patterns that Google is already testing rather than adding large amounts of near-duplicate content.
