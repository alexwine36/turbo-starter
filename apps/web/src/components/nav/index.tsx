import { Button } from '@repo/design-system/components/ui/button';
import { Container } from '@repo/design-system/components/ui/container';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

type NavProps = {
  children: React.ReactNode;
};

export const Nav = ({ children }: NavProps) => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-sidebar p-4">
        <div className="flex w-full items-center justify-start gap-2">
          <div>Logo</div>
          <div>
            {links.map((link) => (
              <Button variant="ghost" key={link.name} asChild>
                <a href={link.href}>{link.name}</a>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Button>Something</Button>
        </div>
      </nav>

      <Container className="flex flex-col gap-4">{children}</Container>
    </div>
  );
};
