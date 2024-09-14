import { sequelize } from "./service";
const cron = require("node-cron");

const getRandomIds = () => {
  /*This obtains random number from 1 to 826 to be used as character id in the request*/
  return Math.floor(Math.random() * 826);
};
const cronTask = async () => {
  /*Generate a repetitive function that executes periodically*/
  cron.schedule("* */12 * * *", async () => {
    let chars = "";
    /*
    Obtain 15 id's and store them in a string to insert in url
    Example: 125,12,45,86,45,345,752,162...
    */
    for (let i = 0; i < 15; i++) {
      let id = getRandomIds();
      if (i !== 14) {
        chars = chars + `${id},`;
      } else {
        chars = chars + id;
        console.log(chars);
      }
    }
    /*
    Characters request, note that the string full of id's is inserted at the end
    Information arrives as elements in an array, then each element is going to be inserted in database.
    */
    const newCharacters = await fetch(
      `https://rickandmortyapi.com/api/character/${chars}`
    );
    const response = await newCharacters.json();
      
    /*Delete old information in database*/
    sequelize.query("DELETE FROM Characters;");
    /*Generate timestamp compatible field to be inserted in database*/
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    /*
    Database insertion of each component.
    This is ok due to the information size, large amount of data requires different technologies to insert in databases. ORM's are not for this purpose.
    */
    response.forEach((element: any) => {
      sequelize.query(
        `INSERT INTO Characters (name, status, species, type, gender, origin, createdAt, updatedAt) VALUES ("${element.name}", "${element.status}", "${element.species}", "${element.type}", "${element.gender}", "${element.origin.name}", "${date}", "${date}");`
      );
    });

    /*Indicates Cron Job has been started*/
    console.log('[server]: Crontask initiated!')
  },{
    scheduled: true,
    timezone: "America/Bogota",
  });
}

export { cronTask }

