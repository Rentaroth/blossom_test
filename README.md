
# Rick&Morty technical test web app for Blossom.net

This is a web app developed in 3 days as requested by the technical test. It presents the solutions for the requirements sended.

It consists in Backend and Frontend implementation, frontend in javascript and backend in typescript.

Backend implements connection to MySQL databases and migrations with Sequelize, connection with Redis for caching queries, and cron tasks and graphql for endpoints request and query management.

Frontend implements React 18, React router dom 6, react-redux for state management. The project facilitor is Vite.js, for css Tailwindcss with postcss and autoprefixer.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend

#### Database MySQL

`MYSQL_DATABASE`

`MYSQL_USER`

`MYSQL_PASSWORD`

#### Redis
`REDIS_USER`

`REDIS_PASSWORD`

`REDIS_PORT`

`REDIS_HOST`

`REDIS_DATABASES`

### Frontend

`VITE_BAKCEND_URL`

## API Reference

#### Get all characters
```http
  POST /characters
```
```
body: {
    getCharacters(order:"${order}") {
        id
        name
    }
}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `order`   | `string` | Values could be "ASC" or "DESC"   |


#### Filter characters
```
body: {
	getCharactersFiltered(${parameter}:"${value}" ${parameter}:"${value}"...) {
		id
		name
	}
}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | Paarameter to filter with         |
| `status`  | `string` | Paarameter to filter with         |
| `species` | `string` | Paarameter to filter with         |
| `type`    | `string` | Paarameter to filter with         |
| `gender`  | `string` | Paarameter to filter with         |
| `favorite`| `Boolean`| Paarameter to filter with         |
| `origin`  | `string` | Paarameter to filter with         |

#### Make a character favorite
```
body: mutation {
	favoriteOne(id:${id}) {
		id
		name
		favorite
	}	
}
```
| Parameter | Type        | Description                                    |
| :-------- | :---------- | :--------------------------------------------- |
| `id`      | `string`    | **Required!**, to know the character to modify |

#### Make a character unfavorite
```
body: mutation {
	unfavoriteOne(id:${id}) {
		id
		name
		favorite
	}	
}
```
| Parameter | Type        | Description                                    |
| :-------- | :---------- | :--------------------------------------------- |
| `id`      | `string`    | **Required!**, to know the character to modify |

#### Searh character by kewords

```
body: {
	searchQuery(keyword: "${keyword}") {
		id
		name
		species
		image
		favorite
	}
}
```

| Parameter | Type        | Description                                                           |
| :------------- | :---------- | :--------------------------------------------------------------- |
| `keyword`      | `string`    | **Required!**, some words that the character info contains       |

## Start the app

The app only need databases in MySQL and Redis to be avaliable, .env files in each project base directory.
The env variable **VITE_BACKEND_URL** should be exactly this value `http://localhost:3000/` if Backend is running locally, the `/` at the end of the url is mandatory.
There is a **PM2** configuration file in the base of the GitHub project, the project should be initiated installing **PM2** globally:

`npm install -g pm2`

Then:

`pm2 start pm2.config.json`

or:

`pm2 start ${path_to_config.json}`

And that's all!

Greetings!
