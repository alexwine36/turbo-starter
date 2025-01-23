import { auth } from '@repo/auth/auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { redirect } from 'next/navigation';
import { Header } from '../components/header';
import { OrganizationProvider } from './components/organization-provider';
const Settings = async () => {
  const session = await auth();

  if (
    !session?.user.currentOrganizationId ||
    session.user.currentRole === 'MEMBER'
  ) {
    redirect('/');
  }

  return (
    <>
      <Header page="Settings" pages={[]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <CardTitle>Organization Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationProvider
              organizationId={session.user.currentOrganizationId}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Settings;
