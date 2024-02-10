import app, { init } from "@/app";

const port = +process.env.PORT || 4000;

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`✅ Server is listening on port ${port}.`);
  });
});
