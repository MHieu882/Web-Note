var mongoose = require('mongoose');
var express= require('express');
var app= express();
var User = require('../models/user');
var secret= require('../secrect')


const mongoconnect={
    connectDB: function () {
        switch (app.get('env')) {
            case 'development':
                mongoose.connect(secret.mongo.dev.conn, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Dev');
                });
                break;
            case 'production':
                mongoose.connect(secret.mongo.product.conn, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Product');
                });;
                break;
            default:
                throw new Error('Unknow execution environment: ' + app.get('env'));
        }
        User.find(function(err,users){
            if(users.length){
                return;
            }
            else{
                new User({
                    fullname:'admin',
                    username:'admin',
                    email: 'admin@gmail.com',//only 1 email
                    password: 'admin',//randme 6 word
                    CreateAt: Date.now(),
                    role:'admin',
                }).save(function(err){
                    if(err) throw err;
                    console.log('admin account was created')
                });
            }
        })
    }}
module.exports = mongoconnect;