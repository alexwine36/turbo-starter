import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { OrganizationUpdateSchema } from './organization-update-schema'
import { z } from 'zod';
import { formatOrganizationData,
organizationSelectFields
 } from "@repo/common-types";

type OrganizationUpdateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: OrganizationUpdateSchema;
}

export const organizationUpdateHandler = async ({ ctx, input }: OrganizationUpdateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.organization.update({
          where: {
            id: input.id
          },
          data: {...input},
          ...organizationSelectFields
        });
    return formatOrganizationData(res);
}

export type OrganizationUpdateResponse = Awaited<ReturnType<typeof organizationUpdateHandler>>;