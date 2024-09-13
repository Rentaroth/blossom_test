import { app } from "./server";
import { sequelize, testConnection } from "./src/db/service";

app.listen(3000, ():void => {
  console.log("[server]: Listening on port 3000");
  testConnection(sequelize);
});
