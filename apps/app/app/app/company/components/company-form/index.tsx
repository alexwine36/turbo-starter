'use client';

import { trpc } from '@/utils/trpc';
import {
  type CompanyData,
  CompanyInput,
  getSchemaDefaults,
} from '@repo/common-types';
import {
  Form,
  FormInput,
  zodResolver,
} from '@repo/design-system/components/inputs';
import { Button } from '@repo/design-system/components/ui/button';
import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import type { CompanyTypes } from '../company-types';

type CompanyFormProps = CompanyTypes & {
  onSuccess: (value: CompanyData) => void;
  company?: CompanyData;
};

export const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CompanyInput>({
    resolver: zodResolver(CompanyInput),
    defaultValues: {
      ...getSchemaDefaults(CompanyInput),
      ...company,
    },
  });

  const handleSuccess = (data: CompanyData) => {
    toast({
      title: 'Success',
      description: company ? 'Company saved' : 'Company created',
      variant: 'success',
    });
    utils.company.getAll.invalidate();
    onSuccess(data);
  };

  const { mutate: create } = trpc.company.create.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const { mutate: update } = trpc.company.update.useMutation({
    onSuccess: (d) => {
      handleSuccess(d);
    },
  });

  const onSubmit = (data: CompanyInput) => {
    console.log(data);
    if (company?.id) {
      // update
      update({
        id: company.id,
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
          <FormInput
            className="min-w-72 flex-auto"
            label="Name"
            control={form.control}
            name="name"
          />
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
