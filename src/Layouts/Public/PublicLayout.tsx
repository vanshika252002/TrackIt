import { AppLayoutProps } from '../AppLayout.d';
// import Navbar from './Navbar';

function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      {children}

      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
