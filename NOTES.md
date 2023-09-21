
啟動 MySQL Container

```
docker run --name program135-mysql -e MYSQL_ROOT_PASSWORD=program135 -p 3306:3306 -d mysql
```

初次啟動，建立 `program` 資料並，並匯入 MySQL 資料

```
mysql -u root -h 127.0.0.1 -p -e "CREATE DATABASE program;"
mysql -u root -h 127.0.0.1 -p program < program.sql
```
