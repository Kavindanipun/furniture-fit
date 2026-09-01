# SEO action plan for FitBeforeYouBuy

## Already implemented in this build
- Clean, concise home title targeting the broad furniture intent plus sofa/doorway intent.
- Exact-intent sofa page for queries such as “will my sofa fit” and “will my sofa fit through the door”.
- Separate high-value informational pages for furniture delivery measurement and doorway measurement.
- Internal linking across the calculator and guides.
- Unique page titles, H1s, meta descriptions and canonical URLs.
- Crawlable HTML content; calculator enhancement does not hide the core answers behind JavaScript.
- Large image previews enabled, 1200×675 relevant images, descriptive alt text, Open Graph images and image sitemap entries.
- 96×96 PNG favicon.
- Updated XML sitemap and robots.txt.
- WebPage/Breadcrumb structured data; no fake ratings or review markup.
- FAQ content remains visible, but FAQ rich-result markup is intentionally not used.
- Fast static assets, no external libraries, deferred JavaScript, explicit image dimensions, responsive layout and accessible inputs.
- Calculator now tests 0°–90° rotated rectangular faces instead of only simple straight orientation checks.

## Do immediately after upload
1. Deploy the entire folder to the GitHub Pages repository root.
2. Verify these four URLs load:
   - `/furniture-fit/`
   - `/furniture-fit/sofa-fit-through-door/`
   - `/furniture-fit/measure-furniture-for-delivery/`
   - `/furniture-fit/measure-doorway-for-furniture/`
3. Search Console → Sitemaps → submit `sitemap.xml`.
4. URL Inspection → request indexing once for each of the four URLs.
5. Test the home URL in Google Rich Results Test and confirm there are no blocking crawl/indexing problems.

## What to monitor
Use Search Console Performance with 7-day and 28-day windows. Watch:
- Impressions
- Clicks
- CTR
- Average position
- Queries with impressions but position roughly 11–40
- Pages gaining new queries

Prioritize real queries that Google is already showing the site for. Improve the exact page that receives those impressions rather than stuffing every query into the home title.

## Off-site work that code alone cannot do
- Earn real links/mentions from relevant moving, furniture, interior-design, home-improvement or measurement resources.
- Share the calculator where it genuinely solves a user problem; avoid automated link building and paid link schemes.
- If the project becomes long-term, consider a memorable custom domain so the brand can build its own reputation independent of a GitHub path.
- Add genuinely useful new content only when Search Console shows a distinct user intent; do not create dozens of near-duplicate keyword pages.

## Important
No legitimate SEO implementation can guarantee the #1 result. Ranking depends on query demand, competition, content usefulness, page experience, site reputation and links/mentions in addition to technical SEO.
