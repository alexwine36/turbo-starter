// import { auth, currentUser } from '@repo/auth/server';
import { SidebarProvider } from '@repo/design-system/components/ui/sidebar';
// import { showBetaFeature } from '@repo/feature-flags';
// import { NotificationsProvider } from '@repo/notifications/components/provider';
// import { secure } from '@repo/security';
import type { ReactNode } from 'react';
// import { PostHogIdentifier } from './components/posthog-identifier';
import { GlobalSidebar } from './components/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

// biome-ignore lint/suspicious/useAwait: no async stuff yet
const AppLayout = async ({ children }: AppLayoutProperties) => {
  // if (env.ARCJET_KEY) {
  //   await secure(['CATEGORY:PREVIEW']);
  // }

  // const user = await currentUser();
  // const { redirectToSignIn } = await auth();
  // const betaFeature = await showBetaFeature();

  // if (!user) {
  //   return redirectToSignIn();
  // }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        {/* {betaFeature && (
            <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
              Beta feature now available
            </div>
          )} */}
        {children}
      </GlobalSidebar>
    </SidebarProvider>
  );
};

export default AppLayout;
