const express = require('express');
const mysql = require('mysql');
//create connection
const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'nodemysql'
     
});
//connect
db.connect((err)=>{
    if(err)
    {
    throw err;
    }
    console.log('mysql connected')
})
const app = express();

//createdb

app.get('/createdb', (req,res)=>{let sql = 'CREATE DATABASE nodemysql';
  db.query(sql,(err,result)=>{
      
    if(err) throw err;
    console.log(result);
    res.send('database created');   
  });
});

//create table

app.get('/createpoststable',(req,res)=>{
    let sql = 'create table posts(id int auto_increment,title varchar(255),body varchar(255),primary key (id))';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('posts table created');
    });
});

//insert data

app.get('/addpost1',(req,res)=>{
    let post = {title:'post one',body:'this is post one'};
    let sql ='insert into posts set ?';
    let query = db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post1 added');
    });
});

//insert data 2

app.get('/addpost2',(req,res)=>{
    let post = {title:'post two',body:'this is post two'};
    let sql ='insert into posts set ?';
    let query = db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post 2 added');
    });
});

//select posts

app.get('/getposts',(req,res)=>{
    let sql ='select * from nodemysql.posts';
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('data fetched');
    });
});

//select single post

app.get('/getpost/:id',(req,res)=>{
    let sql =`select * from  nodemysql.posts WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post fetched');
    });
});

//updatepost

app.get('/updatepost/:id',(req,res)=>{
    let newTitle = 'update Title';
    let sql =`update nodemysql.posts set title= '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post updated');
    });
});

//deletepost

app.get('/deletepost/:id',(req,res)=>{
    let sql =`delete from nodemysql.posts  WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post deleted');
    });
});

app.listen('3000',()=>{console.log('server started on port 3000');
});