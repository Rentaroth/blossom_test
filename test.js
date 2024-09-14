// const getRandomIds = () => {
//   return Math.floor(Math.random() * 826);
// };

// const test = async () => {
//   let chars = "";
//   for (let i = 0; i < 15; i++) {
//     let id = getRandomIds();
//     if (i !== 14) {
//       chars = chars + `${id},`;
//     } else {
//       chars = chars + id;
//       console.log(chars);
//     }
//   }
//   const newCharacters = await fetch(
//     `https://rickandmortyapi.com/api/character/${chars}`
//   );
//   const response = await newCharacters.json();

//   const date = new Date();
//   response.forEach((element) => {
//     console.log(`INSERT INTO Characters ('name', 'status', 'species', 'type', 'gender', 'origin', 'createdAt', 'updatedAt') VALUES ('${element.name}', '${element.status}', '${element.species}', '${element.type}', '${element.gender}', '${element.origin.name}', '${date}', '${date}');`);
//   });
//   // console.log(response);
// }

// test()

console.log(new Date());