import * as React from 'react';
import { Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavTabs = () => {
  const router = useRouter();

  // A function to match the current route with the tab value
  const currentTab = () => {
    switch (router.pathname) {
      case '/':
        return 0;
      case '/creators/deploy/basic':
        return 1;
      case '/creators/deploy/milestone':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Tabs value={currentTab()} aria-label="Navigation Tabs">
      <Link href="/" passHref>
        <Tab label="Home" />
      </Link>
      <Link href="/creators/deploy/basic" passHref>
        <Tab label="basic" />
      </Link>
      <Link href="/creators/deploy/milestone" passHref>
        <Tab label="milestone" />
      </Link>
    </Tabs>
  );
};

export default NavTabs;
