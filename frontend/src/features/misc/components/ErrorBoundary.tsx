import { Box, Button, colors, Paper } from "@material-ui/core";
import React, { ErrorInfo, ReactNode } from "react";
import DisplayError from "./DisplayError";

type ErrorBoundaryState = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  onReload() {
    window.location.reload();
  }

  render() {
    const { error, errorInfo } = this.state;
    if (!error) return this.props.children;

    return (
      <Box
        width="100%"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box maxWidth="768px" padding={2}>
          <Box display="flex">
            <DisplayError message={error.message} flexGrow={1} />
            <Box
              component={Paper}
              marginY={1}
              marginLeft={1}
              display="flex"
              alignItems="stretch"
            >
              <Button onClick={this.onReload}>Перезагрузить</Button>
            </Box>
          </Box>
          {errorInfo && (
            <Box
              maxWidth="100%"
              component="pre"
              marginTop={1}
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                lineHeight: "1.5rem",
                color: colors.grey[800],
              }}
            >
              {errorInfo.componentStack}
            </Box>
          )}
        </Box>
      </Box>
    );
  }
}
