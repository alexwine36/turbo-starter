'use client';

import { trpc } from '@/utils/trpc';
import {
type OrganizationData,
OrganizationInput,
getSchemaDefaults,
} from '@repo/common-types';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import {
Form,
FormInput,
zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { OrganizationTypes } from '../organization-types';


type OrganizationFormProps = OrganizationTypes & {
onSuccess: (value: OrganizationData) => void;
organization?: OrganizationData;
};

export const OrganizationForm: React.FC<OrganizationFormProps> = ({
  organization,
  onSuccess,
  }) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<OrganizationInput>({
    resolver: zodResolver(OrganizationInput),
    defaultValues: {
    ...getSchemaDefaults(OrganizationInput),
    ...organization,
    },
    });

    const handleSuccess = (data: OrganizationData) => {
    toast({
    title: 'Success',
    description: organization ? 'Organization saved' : 'Organization created',
    variant: 'success',
    });
    utils.organization.getAll.invalidate();
    onSuccess(data);
    };

    const { mutate: create } = trpc.organization.create.useMutation({
    onSuccess: (d) => {
    handleSuccess(d);
    },
    });

    const { mutate: update } = trpc.organization.update.useMutation({
    onSuccess: (d) => {
    handleSuccess(d);
    },
    });

    const onSubmit = (data: OrganizationInput) => {
    console.log(data);
    if (organization?.id) {
    // update
    update({
    id: organization.id,
    ...data,
    });
    } else {
    create(data);
    }
    };

    return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full flex-wrap gap-4">
          <FormInput className="min-w-72 flex-auto" label="Name" control={form.control} name="name" />

        </div>

        <div className="flex justify-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
    );
    };