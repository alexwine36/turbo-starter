import { database } from '@repo/database';
import { RichTextDisplay } from '@repo/design-system/components/custom/rich-text-display';
import { RichTextInput } from '@repo/design-system/components/inputs/rich-text-input';
import type { Metadata } from 'next';
import { Header } from './components/header';
const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const pages = await database.page.findMany();

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
          {/* <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
              <div>
                <Badge>Hello bro</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card> */}

          {pages.map((page) => (
            <div key={page.id} className="aspect-video rounded-xl bg-muted/50">
              {page.name}
              <RichTextDisplay ops={page.content} />
            </div>
          ))}
        </div>
        {/* <Button>Hello</Button> */}

        <div className="min-h-[100vh] flex-1 rounded md:min-h-min">
          <RichTextInput />
        </div>
      </div>
    </>
  );
};

export default App;
