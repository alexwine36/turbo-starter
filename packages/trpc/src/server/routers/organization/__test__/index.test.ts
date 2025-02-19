import { faker } from '@faker-js/faker';
import { getTestCaller } from '../../../../utils/test-utils';

describe('Organization', () => {
  describe('create', () => {
    test('should first', async () => {
      const { trpc, refreshCaller } = await getTestCaller('create');
      const currentUser = await trpc.user.me({});

      expect(currentUser).toBeTruthy();
      expect(currentUser?.currentOrganizationId).toBeNull();
      const res = await trpc.organization.create({
        name: faker.company.name(),
        image: faker.image.avatar(),
        slug: faker.internet.domainWord(),
        type: 'sample',
      });
      expect(res).toBeTruthy();

      // Refresh the caller to get the updated user
      const newTrpc = await refreshCaller();
      const updatedUser = await newTrpc.user.me({});
      expect(updatedUser?.currentOrganizationId).toBe(res.id);
      expect(updatedUser?.currentRole).toBe('OWNER');
    });
  });
});
