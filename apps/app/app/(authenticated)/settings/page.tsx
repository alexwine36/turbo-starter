import { auth } from '@repo/auth/auth';
import { Heading } from '@repo/design-system/components/custom/typography';
import { redirect } from 'next/navigation';
import { Header } from '../components/header';

const Settings = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }
  if (
    !session.user.currentOrganizationId ||
    session.user.currentRole === 'MEMBER'
  ) {
    redirect('/');
  }
  return (
    <>
      <Header page="Settings" pages={[]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Heading>Wassup</Heading>
      </div>
    </>
  );
};

export default Settings;
