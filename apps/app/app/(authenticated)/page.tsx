import type { Metadata } from 'next';
import { Header } from './components/header';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

// biome-ignore lint/suspicious/useAwait: no need yet
const App = async () => {
  //   const pages = await database.page.findMany();
  //   const { orgId } = await auth();

  //   if (!orgId) {
  //     notFound();
  //   }

  return (
    <>
      <Header
        pages={['Building Your Application', 'Having Fun']}
        page="Data Fetching"
      >
        {/* {env.LIVEBLOCKS_SECRET && (
          <CollaborationProvider orgId={orgId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )} */}
        {/* <Button>Hello</Button> */}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* {pages.map((page) => (
            <div key={page.id} className="aspect-video rounded-xl bg-muted/50">
              {page.name}
            </div>
          ))} */}
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </>
  );
};

export default App;
