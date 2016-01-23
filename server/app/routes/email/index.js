var router = require('express').Router();
var mandrill = require('mandrill-api/mandrill');
var mandrillKey = require("../../../env/development.js").MANDRILL.key;
var mandrill_client = new mandrill.Mandrill(mandrillKey);
// var fs = require('fs');
module.exports = router;

// var notification = fs.readFileSync("notification.html", "utf8");
// var late = fs.readFileSync("late.html", "utf8");

router.post('/', function (req, res) {

    console.log(req.body)
    // var fromEmail = 'wonmipark@gmail.com';
    // var fromName = 'timely';
    // var toEmail = 'wonmipark@gmail.com';
    // var toName = 'Wonmi';
    // var replyTo = 'wonmipark@gmail.com';

    // console.log('THIS IS THE MANDRILL REQ.BODY', req.body);
    
    // var message = {
    //     "html": "<p>Unknown Error Message</p><p>" + req.body.message + "</p><p>Error Code:" + req.body.data.code + "</p>",
    //     "text": req.body.data,
    //     "subject": "Unknown Error Message",
    //     "from_email": fromEmail,
    //     "from_name": fromName,
    //     "to": [{
    //     "email": toEmail,
    //     "name": toName,
    //     "type": "to"
    //     }],
    //     "headers": {
    //     "Reply-To": replyTo
    //     }
    // }

    // var async = false;
    
    // mandrill_client.messages
    // .send({ "message": message, "async": async }, function(result) {
    //     console.log(result);
    //     res.json(result);
    // }, function(e) {
    //     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // });
    
});

function sendEmail (to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": []    
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({
        "message": message, 
        "async": async, 
        "ip_pool": ip_pool
    }, function (result) {
        console.log(result)       
    }, function (e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
}