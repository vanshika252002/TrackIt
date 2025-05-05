import { AppLayoutProps } from '../AppLayout.d';
import Navbar from '../Public/Navbar';

function PrivateLayout({ children }: Readonly<AppLayoutProps>): JSX.Element {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
}

export default PrivateLayout;
