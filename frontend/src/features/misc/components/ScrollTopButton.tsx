import { useTheme, Fab } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Zoom } from "@material-ui/core";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";

export default function ScrollTopButton() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.pageYOffset > 300);
    document.addEventListener("scroll", toggleVisibility);
    return () => document.removeEventListener("scroll", toggleVisibility);
  }, []);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      in={visible}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${visible ? transitionDuration.exit : 0}ms`,
      }}
      unmountOnExit
    >
      <Fab
        color="primary"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        style={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
        }}
      >
        <UpIcon />
      </Fab>
    </Zoom>
  );
}
