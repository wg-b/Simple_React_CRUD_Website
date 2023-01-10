import * as React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Link,
} from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import AdbIcon from "@mui/icons-material/Adb";
import HelpIcon from "@mui/icons-material/Help";
import { signOut } from "store/actions/auth.action";
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


import PrivacyPolicyPDF from "assets/pdf/UK_Privacy_Policy.pdf";
import CookiePolicyPDF from "assets/pdf/UK_Cookie_Policy_PDF.pdf";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    placement="bottom"
    arrow
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const ResponsiveAppBar = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state: any) => state.auth);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    dispatch<any>(signOut()).then(() => navigate("/"))
  };

  const goToHelp = () => {
    navigate("/how-to-play");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            fontFamily="monospace"
            fontWeight="700"
            sx={{
              mr: 2,
              flexGrow: "1",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            COUNTECT
          </Typography>

          {userData.accessToken ? (
            <Box sx={{ flexGrow: 0 }}>
              <StyledTooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData.user?.username?.toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </StyledTooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Sign out</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/contact-us")}>
                  <Typography textAlign="center">Contact Us</Typography>
                </MenuItem>
                <MenuItem onClick={goToHelp}>
                  <Typography textAlign="center">How to play</Typography>
                </MenuItem>
                <MenuItem component={Link} href={PrivacyPolicyPDF} target="_blank">
                  <Typography textAlign="center">Privacy Policy</Typography>
                </MenuItem>
                <MenuItem component={Link} href={CookiePolicyPDF} target="_blank">
                  <Typography textAlign="center">Cookie Policy</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (

            <Box sx={{ flexGrow: 0 }}>
              <StyledTooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
                  {/* <Avatar
                    alt={userData.user?.username?.toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                  /> */}
                  <MenuRoundedIcon sx={{ color: "#fff" }} />
                </IconButton>
              </StyledTooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate("/sign-in")}>
                  <Typography textAlign="center">Sign In</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/sign-up")}>
                  <Typography textAlign="center">Sign Up</Typography>
                </MenuItem>

                <MenuItem onClick={goToHelp}>
                  <Typography textAlign="center">How to Play</Typography>
                </MenuItem>
                <MenuItem component={Link} href={PrivacyPolicyPDF} target="_blank">
                  <Typography textAlign="center">Privacy Policy</Typography>
                </MenuItem>
                <MenuItem component={Link} href={CookiePolicyPDF} target="_blank">
                  <Typography textAlign="center">Cookie Policy</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
