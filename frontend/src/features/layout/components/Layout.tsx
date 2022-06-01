import { Breadcrumbs, Container, makeStyles } from "@material-ui/core";
import { Link } from "features/router";
import { menuRoutes } from "routes";
import { ReactChild } from "react";
import useBreadcrumbs, { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import Navigation from "./Navigation";
import { MenuRoute } from "../types";

type LayoutProps = {
  children?: ReactChild | ReactChild[];
  title?: string;
  routes?: MenuRoute[];
  additionalRoutes?: MenuRoute[];
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
  },
}));

const breadcrumbsRoutes: BreadcrumbsRoute[] = [
  {
    path: '/',
    breadcrumb: 'Главная',
  },
  {
    path: '/cameras',
    breadcrumb: 'Детекторы',
  },
  {
    path: '/cameras/create',
    breadcrumb: 'Создать',
  },
  {
    path: '/cameras/:id/edit',
    breadcrumb: 'Редактировать',
  },
  {
    path: '/stations',
    breadcrumb: 'Станции',
  },
  {
    path: '/stations/create',
    breadcrumb: 'Создать',
  },
  {
    path: '/stations/:id/edit',
    breadcrumb: 'Редактировать',
  },
  {
    path: '/events',
    breadcrumb: 'Снимки',
  },
  {
    path: '/visits',
    breadcrumb: 'Визиты',
  },
];

export default function Layout(props: LayoutProps) {
  const {
    children,
    title = "ALPR-UI",
    routes = menuRoutes,
    additionalRoutes,
  } = props;
  const breadcrumbs = useBreadcrumbs(breadcrumbsRoutes);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation
        title={title}
        routes={routes}
        additionalRoutes={additionalRoutes}
      />
      <Container className={classes.content}>
        <div className={classes.toolbar} />
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map(({ match, breadcrumb, key }) => (
            <Link key={match.url} to={match.url}>
              {breadcrumb}
            </Link>
          ))}
        </Breadcrumbs>
        {children}
      </Container>
    </div>
  );
}
