import PrivateLayout from './Private/PrivateLayout';
import PublicLayout from './Public/PublicLayout';
import { AppLayoutProps } from './AppLayout.d';

function AppLayout({ isAuthenticated, children }: Readonly<AppLayoutProps>) {
  return (
    <div>
      {isAuthenticated ? (
        <PrivateLayout>{children}</PrivateLayout>
      ) : (
        <PublicLayout>{children}</PublicLayout>
      )}
    </div>
  );
}

export default AppLayout;
