import { auth } from '@repo/auth/auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Container } from '@repo/design-system/components/ui/container';
import { redirect } from 'next/navigation';
import { Header } from '../components/header';
import { CompanyTable } from './components/company-table';
const CompaniesPage = async () => {
  const session = await auth();

  if (
    !session?.user.currentOrganizationId ||
    session.user.currentRole === 'MEMBER'
  ) {
    redirect('/');
  }

  return (
    <>
      <Header page="Companies" pages={[]} />
      <Container>
        <Card>
          <CardHeader>
            <CardTitle>Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <CompanyTable />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CompaniesPage;
