/**
 * JuiceController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/juice"

module.exports = {

  /**
   * `JuiceController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('create', {success:{message: "Record created successfully"}});
        })
  },

  /**
   * `JuiceController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {juices: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the record"}});
    });
  },

  /**
   * `JuiceController.update()`
   */
  update: function (req, res) {
    
    if(req.method != "POST"){
      
      client.get(endpoint, function (data, response) {
        return res.view('update', {juices: data});
      }).on('error', function (err) {
        return res.view('update', {error: { message: "There was an error getting the record"}});
      });

    }else{
      var args = {
        data: req.body,
          headers: { "Content-Type": "application/json" }
      };
         
      client.put(endpoint, args, function (data, response) {
        // return res.view('create', {success: { message: "Record added successfully"}});
        if(response.statusCode != "201"){
          return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
        }
          return res.view('update', {success:{message: "Record updated successfully"}});
      })
    }        
  },


  /**
   * `JuiceController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

