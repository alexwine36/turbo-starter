import type { TRPCContextInnerWithSession } from '@repo/trpc/src/server/create-context';
import type { OrganizationCreateSchema } from './organization-create-schema'
import { z } from 'zod';
import { formatOrganizationData,
organizationSelectFields
 } from "@repo/common-types";

type OrganizationCreateOptions = {
    ctx: TRPCContextInnerWithSession;
    input: OrganizationCreateSchema;
}

export const organizationCreateHandler = async ({ ctx, input }: OrganizationCreateOptions) => {

    const { prisma, session } = ctx;
    
    const res = await prisma.organization.create({
          data: {...input},
          ...organizationSelectFields
        });
    return formatOrganizationData(res);
}

export type OrganizationCreateResponse = Awaited<ReturnType<typeof organizationCreateHandler>>;