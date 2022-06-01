import { Box, Grid, Paper, TextField, Button } from "@material-ui/core";

export default function LoginForm() {
  return (
    <Box component={Paper} paddingX={1.5} paddingY={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Логин" fullWidth variant="outlined" required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Пароль"
            fullWidth
            variant="outlined"
            type="password"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="primary">
            Продолжить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
