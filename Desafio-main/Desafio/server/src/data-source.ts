import { DataSource } from "typeorm";



 const AppDataSource = new DataSource({
   database: "projeto",
   type: "mysql", 
   host: "localhost", 
   port: 3306, 
   username: "root",
   password: "1234",
   synchronize: false,
   logging: false,
   entities: ["src/entities/*.ts"],
   migrations: ["src/migrations/*.ts"],
   subscribers: [],
   maxQueryExecutionTime: 2000,
 });

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!"); 
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });

export default AppDataSource;
