import { Prisma } from '@repo/database';
import { OrganizationData } from '../../organization';

export const organizationSelectFields =
Prisma.validator<Prisma.OrganizationDefaultArgs>()({
  include: {

  },
  });

  type OrganizationWithData = Prisma.OrganizationGetPayload< typeof organizationSelectFields>;

    export const formatOrganizationData = (
    organization: OrganizationWithData
    ): OrganizationData => {
    return {
    ...OrganizationData.parse(organization),

    };
    };