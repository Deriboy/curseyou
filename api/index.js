var express = require('express');
var app = express();

const httpRequest = require('https');

function curseapi(endpoint, params, res) {
    const options = {
        method: 'GET',
    };

    var url = endpoint;
    var pre = "?"
    for( const [name,value] of Object.entries(params)) {
        url += pre;
        pre = "&";
        url += (name + "=");
        url += value; 
    };
    //console.log("url: " + url);
    const request = httpRequest.request(url, options, (response) => {
        let responseData = '';
      
        response.on('data', dataChunk => {
          responseData += dataChunk;
        });
        response.on('end', () => {
          let data = JSON.parse(responseData);
         // console.log(data);
          res.send(data);
        });
      });
      
      request.on('error', error => {
          console.error(error)
      });
      request.end();
}

app.get("/search", function(req,res) {
    var params = {
        categoryId: '0',
        gameId: '432',
        sectionId: '6',
        sort: '0',
        index: req.query.index || '0',
        pageSize: req.query.pageSize || '5',
        searchFilter: req.query.searchFilter || "",
    };
    curseapi('https://addons-ecs.forgesvc.net/api/v2/addon/search',params, res);
});

app.get("/mod",function(req,res) {
    var params = {
    };
    curseapi('https://addons-ecs.forgesvc.net/api/v2/addon/' + req.query.addonID,params, res);
});

app.get("/getfiles", function(req,res) {
    var params = {
    };
    curseapi('https://addons-ecs.forgesvc.net/api/v2/addon/' + req.query.addonID +'/files',params, res);
});

module.exports = {
    path: "/api/",
    handler: app
};