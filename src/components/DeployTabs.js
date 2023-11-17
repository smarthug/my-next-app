import * as React from 'react';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NavTabs = () => {
  const router = useRouter();

  // A function to match the current route with the tab value
  const currentTab = () => {
    switch (router.pathname) {
      case '/creators/projects':
        return 0;
      case '/creators/deploy/basic':
        return 1;
      case '/creators/deploy/milestone':
        return 2;
      case '/creators/deploy/options':
        return 3;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const handleWindowClose = (e) => {
      var confirmationMessage = 'Are you sure you want to leave?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    // Add event listener for the beforeunload event
    window.addEventListener('beforeunload', handleWindowClose);

    // Function to confirm navigation
    const handleRouteChange = (url, { shallow }) => {
      if (!window.confirm('Are you sure you want to leave?')) {
        router.events.emit('routeChangeError');
        throw `Route change to ${url} was aborted (this error can be safely ignored).`;
      }
    };

    // Add event listener for route changes in Next.js
    router.events.on('routeChangeStart', handleRouteChange);

    // Clean up the event listeners
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <Tabs value={currentTab()} aria-label="Navigation Tabs">
      <Link href="/creators/projects" passHref>
        <Tab label="Home" />
      </Link>
      <Link href="/creators/deploy/basic" passHref>
        <Tab label="basic" />
      </Link>
      <Link href="/creators/deploy/milestone" passHref>
        <Tab label="milestone" />
      </Link>
      <Link href="/creators/deploy/options" passHref>
        <Tab label="options" />
      </Link>
    </Tabs>
  );
};

export default NavTabs;
