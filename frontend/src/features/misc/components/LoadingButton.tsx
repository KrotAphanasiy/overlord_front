import { FC } from 'react';

import { Button, ButtonProps, CircularProgress, makeStyles, Typography, Fade } from '@material-ui/core';
import classnames from 'classnames';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const useStyles = makeStyles({
  button: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
  },
});

const LoadingButton: FC<LoadingButtonProps> = ({ loading, disabled, className, children, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      disabled={disabled || loading}
      className={classnames(classes.button, className)}
      {...props}
    >
      <Fade in={!loading}>
        <Typography>
          {children}
        </Typography>
      </Fade>
      <Fade in={loading}>
        <CircularProgress size={22} className={classes.loader} />
      </Fade>
    </Button>
  );
}

export default LoadingButton;
