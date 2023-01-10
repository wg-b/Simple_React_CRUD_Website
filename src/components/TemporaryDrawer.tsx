import React, { useState, useEffect } from "react";
import { Box, Drawer, Button, IconButton, Link } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrivacyPolicyPDF from "assets/pdf/UK_Privacy_Policy.pdf";
import CookiePolicyPDF from "assets/pdf/UK_Cookie_Policy_PDF.pdf";

export default function TemporaryDrawer() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  useEffect(() => {
    setDrawerOpen(true);
  }, []);

  return (
    <div>
      <Drawer anchor="bottom" open={drawerOpen}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py="12px"
          px="16px"
        >
          <Box>
            <Button
              variant="text"
              component={Link}
              href={PrivacyPolicyPDF}
              target="_blank"
              rel="noreferrer"
              sx={{ mr: "16px" }}
            >
              Privacy Policy
            </Button>
            <Button
              variant="text"
              href={CookiePolicyPDF}
              target="_blank"
              rel="noreferrer"
            >
              Cookie Policy
            </Button>
          </Box>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Drawer>
    </div>
  );
}
