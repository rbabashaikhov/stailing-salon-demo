import { Helmet } from 'react-helmet-async';
import { DEMO_MODE } from '../config/env';
import { salon } from '../data/salon';

const PREVIEW_ROBOTS = 'noindex,nofollow,noarchive,nosnippet';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function Seo({ title, description, path, jsonLd }: SeoProps) {
  const graph = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <html lang="ru" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={DEMO_MODE ? PREVIEW_ROBOTS : 'index,follow'} />
      {DEMO_MODE ? <meta name="googlebot" content={PREVIEW_ROBOTS} /> : null}
      {DEMO_MODE ? <meta name="yandex" content={PREVIEW_ROBOTS} /> : null}
      {!DEMO_MODE ? (
        <link rel="canonical" href={`${salon.seo.siteUrl}${path === '/' ? '/' : path}`} />
      ) : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={salon.name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {graph.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
