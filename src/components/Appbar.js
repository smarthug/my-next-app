import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UserButton from "./UserButton";
import Link from "next/link";

export default function ResponsiveDrawer() {
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (link) => {
    setAnchorEl(null);
    if (link) {
      router.push(link);
    }
  };

  return (
    <Box>
      <AppBar
        sx={{
          background: "rgba(255, 255, 255, 0.50)",
          boxShadow: `0px 0px 5px 0px rgba(0, 0, 0, 0.15)`,
          backdropFilter: `blur(3px)`,
          WebkitBackdropFilter: `blur(3px)`,
        }}
      >
        <Toolbar sx={{}}>
          <div>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                width: "48px",
                height: "48px",
              }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Image src="/MenuIcon.png" alt="menu" width="48" height="48" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleClose("/")}>Home</MenuItem>
              <MenuItem onClick={() => handleClose("/profile")}>Profile</MenuItem>
              {/* <MenuItem onClick={() => handleClose("/list")}>List</MenuItem> */}
            </Menu>



          </div>
          <Box sx={{ flexGrow: 1 }} />
          <ConnectButton label="CONNECT WALLET" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",

              marginLeft: "20px",
            }}
          >
            <Link href="/creators/projects">
              <Button >
                프로젝트 올리기
              </Button>
            </Link>

            <UserButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
