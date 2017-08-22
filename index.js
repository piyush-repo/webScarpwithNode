'use strict';
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape',function(req,res){
 var url = 'http://www.imdb.com/title/tt1229340/' ;

 request(url,function(error,response,html){
 	if(!error){
 	   console.log(html);
       var $ = cheerio.load(html);
       var title , release , rating ; 
       var data ={
       	title:'',
       	release:'',
       	rating:''
       }

       $('.header').filter(function(){
          var dataset = $(this);
          console.log(dataset);
          title = dataset.children().first().text();
          release = dataset.children().last().children().text();
          data.title = title;
          data.release = release;
       });

       $('.star-box-giga-star').filter(function(){
          var dataset = $(this);

          rating = dataset.text();
          data.rating = rating;
       });
 	}
 	res.status(200).json(data);
 });
 });

app.listen('8000');

console.log('Application running on port 8000');

exports = module.exports = app;