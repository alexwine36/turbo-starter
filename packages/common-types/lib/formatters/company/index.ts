import { Prisma } from '@repo/database';
import { CompanyData } from '../../company';

export const companySelectFields =
  Prisma.validator<Prisma.CompanyDefaultArgs>()({
    include: {},
  });

type CompanyWithData = Prisma.CompanyGetPayload<typeof companySelectFields>;

export const formatCompanyData = (company: CompanyWithData): CompanyData => {
  return {
    ...CompanyData.parse(company),
  };
};
