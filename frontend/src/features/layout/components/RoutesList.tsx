import {
  ListItem,
  ListItemIcon,
  colors,
  ListItemText,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { Link } from "features/router";
import { useRouteMatch } from "react-router-dom";
import { MenuRoute } from "../types";

const useStyles = makeStyles((theme) => ({
  listItem: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
    },
  },
}));

type RoutesListProps = {
  routes: MenuRoute[];
};

export default function RoutesList({ routes }: RoutesListProps) {
  const theme = useTheme();
  const { url } = useRouteMatch();
  const classes = useStyles();

  return (
    <>
      {routes.map(({ name, path, icon }) => (
        <ListItem
          button
          key={name}
          component={Link}
          to={path}
          className={classes.listItem}
        >
          <ListItemIcon
            style={{
              color: url.startsWith(path)
                ? theme.palette.primary.main
                : colors.grey[500],
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              style: {
                color: url.startsWith(path)
                  ? theme.palette.primary.main
                  : colors.grey[500],
              },
            }}
            primary={name}
          />
        </ListItem>
      ))}
    </>
  );
}
