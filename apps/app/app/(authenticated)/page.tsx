import { database } from '@repo/database';
import { RichTextDisplay } from '@repo/design-system/components/custom/rich-text-display';
import { RichTextInput } from '@repo/design-system/components/inputs/rich-text-input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Separator } from '@repo/design-system/components/ui/separator';
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
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id} className="aspect-video rounded-xl">
              <CardHeader>
                <CardTitle>{page.name?.toUpperCase()}</CardTitle>
                <Separator />
              </CardHeader>

              <CardContent>
                {/* biome-ignore lint/suspicious/noExplicitAny: Need to add type information */}
                <RichTextDisplay ops={page.content as any} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="min-h-[100vh] flex-1 rounded md:min-h-min">
          <RichTextInput />
        </div>
      </div>
    </>
  );
};

export default App;
