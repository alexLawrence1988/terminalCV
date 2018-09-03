var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/views/index.html'));    
});

app.get('/currentEmployment', function(req, res){
    
    res.send(
        `Current Employment:

            Company: Lead Forensics,
            JobTitle: Developer,
            Date: 06/12/2016 - Present,
            Detail: 
                    Full stack development on the company's main product "Lead Forenscis".
                    
                    Focusing on the development of new product features using the latest microservice 
                    architectures and cloud service implementations.
                    
                    This includes:

                    •	Development of high availability applications using node.js with Javascript ES6+, 
                        Vue.js and express framework for serving apps.
                    •	Use of the in memory database 'Redis' for delivering lightning fast, scalable apps.
                    •	Set up of new service clusters using Amazon Web Services.
                    •	Comprehensive SQL Server use, including procedure, triggers, functions and so on.`
            
    )
    
});

app.get('/previousEmployment', function(req, res){
    res.send(`Previous Employment:
        
                Company: Lead Forensics,
                JobTitle: SQL Analyst/Dev,
                Date: 05/12/2016 - 05/12/2017,
                Detail:
                        2nd/3rd Line software support for both the internal CRM system as 
                        well as the business lead generation software
                        
                        Heavy emphasis on SQL/T-SQL: 
            
                        •	SQL server creation and maintenance in SQL Server
                        •	Heavy data manipulation to support and fix software issues/flaws
                        •	Database replication, backups and general maintenance 
                        •	Ad-hoc data extraction via custom SQL reports
                        •	Complex stored Procedure creation/alteration/optimization
                        •	SQL Job scheduling for automated system procedures
                        •	Data warehousing via linked server data migration`)
});

app.get('/stack', function(req, res){
    res.send(
`----------------------------------------------------------------------------------------------------------------
languages:                                                    frameworks:

            C#                      Javascript            |             .NET(Core, 4+, ASP)         Node.js
            ECMAScript(ES6+)        PYTHON                |             Vue.js                      Express.js
            APEX                    SOQL                  |             React.js            
                                                          |
----------------------------------------------------------------------------------------------------------------
architectures:                                                other:
                                                          |         
            MVC                     MVVM                  |             Redis                       Git/TFS
            Microservices                                 |             Linux                       Docker
                `)
});

app.listen(8500, () => {
    console.log('cv listening on port 8500');
});