---
title: 数据库操作练习
datetime: '2025-03-02 10:14:56'
permalink: /mark/8edb4f
order: 1
category: 笔记
tags:
  - 数据库
---


## 操作命令
##### 1.连接数据库(psql -h host -p port -d dbname -U user -W)
```bash
$ psql -h localhost -p 5432 -U postgres -W
```
##### 2.创建数据库
```bash
postgres=# CREATE DATABASE testdbname;
CREATE DATABASE
```
##### 3.查看数据库列表（\l 或者 \l+ 显示更多信息）
``` bash
postgres=# \l+     
                                                                    数据库列表
    名称    |  拥有者  | 字元编码 |            校对规则            |             Ctype              | ICU Locale | Locale Provider |       存取权限
------------+----------+----------+--------------------------------+--------------------------------+------------+-----------------+-----------------------
 postgres   | postgres | UTF8     | Chinese (Simplified)_China.936 | Chinese (Simplified)_China.936 |            | libc            |
 sakila     | postgres | UTF8     | Chinese (Simplified)_China.936 | Chinese (Simplified)_China.936 |            | libc            |
 template0  | postgres | UTF8     | Chinese (Simplified)_China.936 | Chinese (Simplified)_China.936 |            | libc            | =c/postgres          +
            |          |          |                                |                                |            |                 | postgres=CTc/postgres
 template1  | postgres | UTF8     | Chinese (Simplified)_China.936 | Chinese (Simplified)_China.936 |            | libc            | =c/postgres          +
            |          |          |                                |                                |            |                 | postgres=CTc/postgres
 testdb     | postgres | UTF8     | Chinese (Simplified)_China.936 | Chinese (Simplified)_China.936 |            | libc            |
 testdbname | postgres | UTF8     | Chinese (Simplified)_China.936 | Chinese (Simplified)_China.936 |            | libc            |
(6 行记录)  
```
##### 4.连接到数据库 （\c db_name）
```bash
postgres=# \c testdb
口令:
您现在已经连接到数据库 "testdb",用户 "postgres".
```
##### 5.显示表（\dt 或者\dt+）
```bash
testdb=# \dt+
                                  关联列表
 架构模式 |   名称   |  类型  |  拥有者  | 持续的 | 访问方法 | 大小  | 描述
----------+----------+--------+----------+--------+----------+-------+------
 public   | category | 数据表 | postgres | 永久的 | heap     | 16 kB |
(1 行记录)
```
##### 6.显示表结构（\d table_name）
```bash
testdb=# \d category
                                  数据表 "public.category"
   栏位    |       类型        | 校对规则 |  可空的  |                 预设
-----------+-------------------+----------+----------+--------------------------------------
 id        | integer           |          | not null | nextval('category_id_seq'::regclass)
 name      | character varying |          | not null |
 parent_id | integer           |          |          |
索引：
    "category_pkey" PRIMARY KEY, btree (id)
外部键(FK)限制：
    "fk_category" FOREIGN KEY (parent_id) REFERENCES category(id)
由引用：
    TABLE "category" CONSTRAINT "fk_category" FOREIGN KEY (parent_id) REFERENCES category(id)
```
##### 7.查询表数据（select * from table_name;）
```bash
testdb=# select * from category;
 id |       name       | parent_id
----+------------------+-----------
  1 | ROOT             |
  2 | Baby             |         1
  3 | Home And Kitchen |         1
  4 | Baby Care        |         2
  5 | Feeding          |         2
  6 | Gifts            |         2
  7 | Safety           |         2
  8 | Bedding          |         3
  9 | Bath             |         3
 10 | Furniture        |         3
 11 | Grooming         |         4
 12 | Hair Care        |         4
 13 | Baby Foods       |         5
 14 | Food Mills       |         5
 15 | Solid Feeding    |         5
 16 | Bed Pillows      |         8
 17 | Bed Skirts       |         8
(17 行记录)
表操作
```

##### 创建数据库表
```sql
create table if not exists users(
	user_id integer not null primary key,
	name varchar(50) not null,
	age integer ,
	created_at timestamp not null
)
```
##### 删除表
```sql
drop table if exists users;  
-- 修改表 
--添加列
alter table if exists users
	add if not exists first_name varchar(50) not null; 
--删除列
alter table if exists users
drop if exists first_name
,
add if not exists last_name varchar(50) not null  
--重命名列名
alter table if exists new_users 
rename name to user_name  
--修改表名
alter table if exists users
	rename to new_users;
```





#### 索引
##### 查看执行计划
```sql
EXPLAIN
select * from address a 
where  a.postal_code = '30695'

--QUERY PLAN                                                |
------------------------------------------------------------+
--Seq Scan on address a  (cost=0.00..13.54 rows=1 width=163)|
--  Filter: ((postal_code)::text = '30695'::text)           |  
-- 添加索引
create  index on address (postal_code);

EXPLAIN
select * from address a 
where  a.postal_code = '30695'
--QUERY PLAN                                              
----------------------------------------------------------
--Index Scan using address_postal_code_idx on address a  (
--  Index Cond: ((postal_code)::text = '30695'::text)       
-- 查看索引
--sakila=# \d address
--                                            数据表 "public.address"
--    栏位     |            类型             | 校对规则 |  可空的  |                    预设
---------------+-----------------------------+----------+----------+---------------------------------------------
-- address_id  | integer                     |          | not null | nextval('address_address_id_seq'::regclass)
-- address     | character varying(50)       |          | not null |
-- address2    | character varying(50)       |          |          |
-- district    | character varying(20)       |          | not null |
-- city_id     | integer                     |          | not null |
-- postal_code | character varying(10)       |          |          |
-- phone       | character varying(20)       |          | not null |
-- last_update | timestamp without time zone |          | not null | now()
--索引：
--    "address_pkey" PRIMARY KEY, btree (address_id)
--    "address_postal_code_idx" btree (postal_code)
--    "idx_fk_city_id" btree (city_id)
--外部键(FK)限制：
--    "address_city_id_fkey" FOREIGN KEY (city_id) REFERENCES city(city_id) ON UPDATE CASCADE ON DELETE RESTRICT
--由引用：
--id) REFERENCES address(address_id) ON UPDATE CASCADE ON DELETE RESTRICT
--触发器：  
-- 删除索引 address_postal_code_idx 索引

drop index address_postal_code_idx;

--sakila=# \d address
--                                            数据表 "public.address"
--    栏位     |            类型             | 校对规则 |  可空的  |                    预设
---------------+-----------------------------+----------+----------+---------------------------------------------
-- address_id  | integer                     |          | not null | nextval('address_address_id_seq'::regclass)
-- address     | character varying(50)       |          | not null |
-- address2    | character varying(50)       |          |          |
-- district    | character varying(20)       |          | not null |
-- city_id     | integer                     |          | not null |
-- postal_code | character varying(10)       |          |          |
-- phone       | character varying(20)       |          | not null |
-- last_update | timestamp without time zone |          | not null | now()
--索引：
--    "address_pkey" PRIMARY KEY, btree (address_id)
--    "idx_fk_city_id" btree (city_id)
--外部键(FK)限制：
--    "address_city_id_fkey" FOREIGN KEY (city_id) REFERENCES city(city_id) ON UPDATE CASCADE ON DELETE RESTRICT
--由引用：
--    TABLE "customer" CONSTRAINT "customer_address_id_fkey" FOREIGN KEY (address_id) REFERENCES address(address_id) ON UPDATE CASCADE ON DELETE RESTRICT
--    TABLE "staff" CONSTRAINT "staff_address_id_fkey" FOREIGN KEY (address_id) REFERENCES address(address_id) ON UPDATE CASCADE ON DELETE RESTRICT
--    TABLE "store" CONSTRAINT "store_address_id_fkey" FOREIGN KEY (address_id) REFERENCES address(address_id) ON UPDATE CASCADE ON DELETE RESTRICT
--触发器：
--    last_updated BEFORE UPDATE ON address FOR EACH ROW EXECUTE FUNCTION last_updated()   
-- 多列索引 create index on table_name(a,b,c) 定义多列索引时, 应该始终考虑业务上下文以确定哪些列经常用于查找，并在定义索引时将这些列放在列列表的开头

CREATE INDEX ON customer (last_name, first_name);  
-- 查询时使用索引
EXPLAIN
SELECT * FROM customer
WHERE last_name = 'A'
AND first_name = 'B';
--QUERY PLAN                                                                            
----------------------------------------------------------------------------------------
--Index Scan using customer_last_name_first_name_idx on customer  (cost=0.28..8.29 rows=
--  Index Cond: (((last_name)::text = 'A'::text) AND ((first_name)::text = 'B'::text))
  
EXPLAIN
SELECT * FROM customer
WHERE last_name = 'A'
--QUERY PLAN                                               
-----------------------------------------------------------
--Index Scan using customer_last_name_first_name_idx on cus
--  Index Cond: ((last_name)::text = 'A'::text)   


-- 查询时不使用索引
EXPLAIN
SELECT * FROM customer
WHERE first_name = 'B';
--QUERY PLAN                                              |
----------------------------------------------------------+
--Seq Scan on customer  (cost=0.00..16.49 rows=1 width=74)|
--  Filter: ((first_name)::text = 'B'::text)              |  
-- 唯一索引
CREATE UNIQUE INDEX index_name ON table_name(column_name, [...]);
--1、只有索引类型为 B-Tree 的索引可以声明为唯一索引
--2、如果一个列被定义为唯一索引，那么该列不能存储具有相同的值。
--3、如果两列或更多列被定义为唯一索引，则这些列中的组合值不能重复。
--4、当您为表定义主键或唯一约束时，PostgreSQL 会自动创建相应的 UNIQUE 索引。  
-- 部分索引
create index on customer(last_name)
where  last_name = 'A'   
-- 重建索引 reindex [(verbose)] { index| table | schema | database } name

reindex (VERBOSE)  table address;

reindex (VERBOSE)  database sakila;
```















