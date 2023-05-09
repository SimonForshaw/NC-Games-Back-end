# To Get Started

1. Clone the repository.
2. Install the dependencies you need by running **npm install**.
   (followed by)
   • **npm install supertest**
   • **npm install express**
   • **npm install pg**
   • **npm install jest-sorted**
3. Right click under "EXPLORER" and selected "New File" and create two new .env files .env.development and .env.test
4. within these newly created files input PGDATABASE=nc_games into .env.development
5. input PGDATABASE=nc_games_test into .env.test
6. Create the tables required by running **npm run setup-dbs** to initialise the Database tables.
7. Seed the database by running **npm run seed**

