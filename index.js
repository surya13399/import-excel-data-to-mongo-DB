'use strict';
const excelToJson = require('convert-excel-to-json');

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";



const excelData = excelToJson({
    sourceFile: 'customers.xlsx',
    sheets:[{
		
        name: 'Customers',
		
		
		header:{
            rows: 1
        },
		
        columnToKey: {
        	A: '_id',
    		B: 'name',
			C: 'address',
			D: 'age'
        }
    }]
});


console.log(excelData);


MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;
  
  var dbo = db.db("customers");
  
  dbo.collection("customers").insertMany(excelData.Customers, (err, res) => {
	if (err) throw err;
	
	db.close();
  });
});



// MONGO ATLAS URL : "mongodb://localhost:27017/"

