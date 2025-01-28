import { useToast } from '@repo/design-system/hooks/use-toast';
import type React from 'react';
import { useForm } from 'react-hook-form';
import {
  type CompanyData,
  CompanyInput,
  type CompanyUpdateInput,
} from '../../../../../../../packages/database/types';
import {
  Form,
  FormInput,
  zodResolver,
} from '../../../../../../../packages/design-system/components/inputs';
import { Button } from '../../../../../../../packages/design-system/components/ui/button';
import { trpc } from '../../../../../utils/trpc';

type CompanyFormProps = {
  onSuccess: (value: CompanyData) => void;
  company?: CompanyUpdateInput;
  organizationId: string;
};

export const CompanyForm: React.FC<CompanyFormProps> = ({
  company,
  organizationId,
  onSuccess,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CompanyInput>({
    resolver: zodResolver(CompanyInput),
    defaultValues: {
      name: '',
      slug: '',
      website: undefined,
      social: {},
      type: 'Something',
      //   image: '',
      description: '',
      organizationId,
      ...company,
    },
  });

  const handleSuccess = (data: CompanyData) => {
    toast({
      title: 'Company saved',
      // description: 'Organization saved',
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

  const { mutate: update } = trpc.company.edit.useMutation({
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
          <FormInput
            className="min-w-72 flex-auto"
            label="Slug"
            control={form.control}
            disabled={!!company}
            name="slug"
            prefix={'/'}
          />
          <FormInput
            // className="flex-1"
            className="min-w-72 flex-auto"
            label="Website"
            control={form.control}
            name="website"
            //   prefix={'/'}
          />
          <FormInput
            // className="flex-1"
            className="min-w-72 flex-auto"
            label="Image"
            control={form.control}
            name="image"
            //   prefix={'/'}
          />
        </div>
        <FormInput
          type="textarea"
          label="Description"
          control={form.control}
          name="description"
        />
        <div className="flex justify-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
