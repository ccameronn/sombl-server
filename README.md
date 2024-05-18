# Instock-BackEnd

## Running the backend

Run express server

```
npm run start
```

Run express server with the watch flag

```
npm run dev
```

## Setting up your local database

1. Connect to mysql server in your terminal, enter your password when prompted

```
mysql -u root -p
```

2. Create a database called "instockDatabase"

```
CREATE DATABASE instockDatabase;
```

3. Show databases and confirm "instockDatabase" has been created

```
SHOW DATABASES;
```

4. Clone the backend repository if you haven't already

```
git clone git@github.com:DavideSchirru17/Instock-BackEnd.git
```

5. Navigate to backend repository

```
cd Instock-BackEnd
```

6. Navigate to the develop branch

```
git checkout develop
```

7. Install node modules

```
npm install
```

8. Make a copy of the .env-sample file and call it .env

```
cp .env-sample .env
```

9. Substitute the example password with your mysql password (you would have used this password in step 1)

10. Run the migrations (this creates the tables)

```
npm run db:migrate
```

11. Run the seeds (this populates the newly created tables with seed data)

```
npm run db:seed
```

12. Confirm your tables data have been created successfully by using a SQL client such as MySQL Workbench or Sequel Ace to connect to your database and view the tables and data
