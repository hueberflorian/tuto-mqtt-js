/*
* MQTT Tutorial in Java Script Copyright © 2020 HUEBER Florian
*/

// TO COMPLETE:-----------------------------

let id = 'blabla';
let pwd ='blabla';
let topic = 'blabla';

//------------------------------------------

// Variables to put in JSON
let angle = -34;
let order = "catch";

// Declaration of the object in order to stringify it to JSON
let obj_rotation = {angle: angle, order: order};

// Stringify the object to JSON
let obj_rotation_JSON_to_send = JSON.stringify(obj_rotation);

// Show the object before and after stringify on the console
console.log("Obj to stringify:");
console.log(obj_rotation);
console.log(" ");
console.log("Obj JSON:");
console.log(obj_rotation_JSON_to_send);

// Connection
let mqtt = require('mqtt');
let client  = mqtt.connect({host: 'foundation.lyon.ece.licot.fr', port: 2019, username: id, password: pwd}, );

// Publish
client.on('connect', function () {
    client.subscribe(topic, function (err) {
        if (!err) {
            client.publish(topic, obj_rotation_JSON_to_send)
        }
    })
})

// Receive
client.on('message', function (topic, message) {
    // message is Buffer
    let a = message.toString();

    // Show buffer received and converted to string
    console.log(" ");
    console.log("MQTT Message received is buffer:");
    console.log(message);
    console.log(" ");
    console.log("MQTT Message received is converted to string:");
    console.log(a);

    // Function to parse JSON and recover data
    const obj = JSON.parse(message);

    //Show parsed element
    console.log(" ");
    console.log("Message is parsed in JSON to recover data:");
    console.log(obj.order);
    console.log(obj.angle);

    // Verify that the data recover is a real int
    console.log(" ");
    console.log("Verify that the data recovered is a real int add 2 to the third data:");
    console.log(obj.angle + 2);

    client.end();
})

