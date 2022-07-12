module.exports={
    mutipleMongooseToObject : function (mongooses) {
        return mongooses.map(mongoose=>mongoose.toObject());
    },
    mongooseToobject: function(mongoose){
        return mongoose ? mongoose.toObject(): mongoose;
    }
};