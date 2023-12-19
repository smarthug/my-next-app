import { styled, Typography, Box } from '@mui/material';
import NextLink from 'next/link';
// import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import Container from '@/components/Container';
import { media } from '@/utils/media';

// Define your styled components with MUI's styled function
const FooterWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(12.5),
  paddingBottom: theme.spacing(5),
  backgroundColor: 'rgb(var(--secondary))',
  
  color: 'rgb(var(--textSecondary))',
}));

const ListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

const ListHeader = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2.25rem',
  marginBottom: '2.5rem',
});

const ListWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '5rem',
  marginRight: '5rem',
  '& > *:not(:first-child)': {
    marginTop: '1rem',
  },
  [media('<=tablet')]: {
    flex: '0 40%',
    marginRight: '1.5rem',
  },
  [media('<=phone')]: {
    flex: '0 100%',
    marginRight: '0',
  },
});

const ListItemWrapper = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem',
  '& a': {
    textDecoration: 'none',
    color: `rgba(${theme.palette.text.secondary}, 0.75)`,
  },
}));

const ShareBar = styled(Box)({
  '& > *:not(:first-child)': {
    marginLeft: '1rem',
  },
});

const BottomBar = styled(Box)({
  marginTop: '6rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [media('<=tablet')]: {
    flexDirection: 'column',
  },
});

// FooterList functional component
function FooterList({ title, items }) {
  return (
    <ListWrapper>
      <ListHeader variant="body1">{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

// ListItem functional component
function ListItem({ title, href }) {
  return (
    <ListItemWrapper variant="subtitle2">
      <NextLink href={href} passHref>
        {title}
      </NextLink>
    </ListItemWrapper>
  );
}

// Main Footer functional component
export default function Footer() {
  const footerItems = [
    {
      title: 'Company',
      items: [
        { title: 'Privacy Policy', href: '/privacy-policy' },
        { title: 'Cookies Policy', href: '/cookies-policy' },
      ],
    },
    {
      title: 'Product',
      items: [
        { title: 'Features', href: '/features' },
        { title: 'Something', href: '/something' },
        { title: 'Something else', href: '/something-else' },
        { title: 'And something else', href: '/and-something-else' },
      ],
    },
    {
      title: 'Knowledge',
      items: [
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' },
        { title: 'FAQ', href: '/faq' },
        { title: 'Help Center', href: '/help-center' },
      ],
    },
    // {
    //   title: 'Something',
    //   items: [
    //     { title: 'Features2', href: '/features2' },
    //     { title: 'Something2', href: '/something2' },
    //     { title: 'Something else2', href: '/something-else2' },
    //     { title: 'And something else2', href: '/and-something-else2' },
    //   ],
    // },
  ];

  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem) => (
            <FooterList key={singleItem.title} {...singleItem} />
          ))}
        </ListContainer>
        <BottomBar>
          <ShareBar>
            {/* Social icons and links here */}
          </ShareBar>
          {/* Copyright text here */}
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}
