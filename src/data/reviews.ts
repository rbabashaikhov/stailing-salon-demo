export type ReviewCard = {
  id: string;
  kind: 'summary';
  title: string;
  body: string;
  caption: string;
};

export const reviews: ReviewCard[] = [
  {
    id: 'r1',
    kind: 'summary',
    title: 'К своему мастеру',
    body: 'Гости часто отмечают внимательность специалистов и то, что возвращаются к ним повторно.',
    caption: 'По отзывам на Яндекс Картах',
  },
  {
    id: 'r2',
    kind: 'summary',
    title: 'Годами к одним и тем же специалистам',
    body: 'В отзывах отдельно хвалят конкретных мастеров и то, что к ним ходят годами.',
    caption: 'По отзывам на Яндекс Картах',
  },
];
