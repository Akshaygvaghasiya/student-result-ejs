var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


var con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "student result"
})

con.connect();
///////////////////////////////////////////////////////////////////////////////
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
//////////////////////////////////////////////////////////////////////////////


app.post('/res', function (req, res) {

    var rollno = req.body.rollno;
    var name = req.body.name;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    var iq = "insert into allmarks (rollno,name,s1,s2,s3,s4,s5) values('" + rollno + "','" + name + "','" + s1 + "','" + s2 + "','" + s3 + "','" + s4 + "','" + s5 + "')";
    con.query(iq, function (error, result, field) {
        if (error) throw error;
        var total_query = "update allmarks set total = s1 + s2+s3+s4+s5";
        con.query(total_query, function (e1, r1, f1) {
            if (e1) throw e1;
        })
        res.redirect('/res');
    })
})

app.get('/res', function (req, res) {
    var se_qu = "select * from allmarks";
    con.query(se_qu, function (error, result, field) {
        if (error) throw error;
        res.render('index', { result });
    })
})


app.get('/delete/:rollno', function (req, res) {
    var rollno = req.params.rollno;
    var de_qu = "delete from allmarks where rollno ="+rollno;
    con.query(de_qu,function(error,result,field){
        if (error) throw error;
        res.redirect('/res');
    })
})

app.get('/update/:rollno', function (req, res) {
    var rollno = req.params.rollno;
    var se_qu = "select * from allmarks where rollno ="+rollno;
    
    con.query(se_qu,function(error,result,field){
        if(error) throw error;
        res.render('form',{result});
    })
})

app.post('/up', function (req, res) {
    var rollno = req.body.rollno;
    var name = req.body.name;
    var s1 = req.body.s1;
    var s2 = req.body.s2;
    var s3 = req.body.s3;
    var s4 = req.body.s4;
    var s5 = req.body.s5;
    var up_qu = "update allmarks set rollno = '"+rollno+"',name = '"+name+"',s1 = '"+s1+"',s2 = '"+s2+"',s3 = '"+s3+"',s4 = '"+s4+"',s5 = '"+s5+"'";
    con.query(up_qu,function(error,result,field){
        if(error)throw error;
        var total_query = "UPDATE allmarks SET total = s1 + s2+s3+s4+s5";
        con.query(total_query,function(e1,r1,f1){
            if(e1)throw e1;
        })
        res.redirect('/res');
    })
})

app.get('/ten',function(req,res){
    var ten = "select * from allmarks order by total desc limit 10";
    con.query(ten,function(error,result,field){
            if(error)throw error;
            res.render('index',{result});
    })
})

app.get('/five',function(req,res){
    var ten = "select * from allmarks order by total desc limit 5";
    con.query(ten,function(error,result,field){
            if(error)throw error;
            res.render('index',{result});
    })
})
app.listen(3000);