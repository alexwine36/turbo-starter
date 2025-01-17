export const formatUser = <
  T extends {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  },
>(
  user: T
) => {
  const display = (user.name ? user.name : user.email) || '';
  return {
    ...user,
    image: user.image || undefined,
    name: user.name || '',
    initials: display
      ? display.split(' ').reduce((acc, cur) => {
          return acc + cur[0].toUpperCase();
        }, '')
      : '',
  };
};
