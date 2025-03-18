import { Button } from '@repo/design-system/components/ui/button';
import { HandPlatter } from 'lucide-react';
import { COMPANY_NAME } from '../../utils/constants';
const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
];

export const NavBar = () => {
  return (
    <div className="border-b">
      <nav className="mx-2 flex gap-4 p-2">
        <div className="flex items-center gap-2">
          <HandPlatter />
          <span className="font-bold">{COMPANY_NAME}</span>
        </div>
        <div>
          {links.map((link) => (
            <Button variant="ghost" key={link.label}>
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};
