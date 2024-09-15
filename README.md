
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

| Parameter | Type        | Description                                                                                |
| :------------- | :---------- | :--------------------------------------------------------------- |
| `keyword`      | `string`    | **Required!**, some words that the character info contains |