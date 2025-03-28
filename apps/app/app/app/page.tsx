import type { Metadata } from 'next';
import { CompanyCard } from './company/components/company-card';
import { Header } from './components/header';
const title = 'Acme Inc';
const description = 'My application.';
export const metadata: Metadata = {
  title,
  description,
};

const App = () => {
  return (
    <>
      <Header pages={[]} page="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <CompanyCard />
      </div>
    </>
  );
};

export default App;
