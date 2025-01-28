interface RouteProps {
  href: string;
  label: string;
}

const navRoutes: RouteProps[] = [
  {
    href: '#features',
    label: 'Features',
  },
  {
    href: '#services',
    label: 'Services',
  },
  {
    href: '#testimonials',
    label: 'Testimonials',
  },
  {
    href: '#pricing',
    label: 'Pricing',
  },
];

const getStarted = {
  href: '/app',
  label: 'Get Started',
};

export const MarketingLinks = {
  navRoutes,
  getStarted,
};
