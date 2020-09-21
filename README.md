# open-source-stories

### setup
1. `npm install`
2. `npx sequelize db:migrate`
3. create a file called `cfg.json`, paste the following contents into it, and edit it to your needs
```json
{
    "port": 8080,
    "host": "http://localhost:8080",
    "identificatorHost": "https://identificator.xyz",
    "secret": "someString"
}
```
4. `npm start` or `nodemon .`

### todo (i might be bothered one day)
- paging system when reading books (call them "chapters")
- favouriting system for books (call them "bookmarks")
- library (sort by newest or most bookmarked)