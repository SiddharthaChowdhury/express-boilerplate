// UserController.js

module.exports = {
    allUsers: function(req, res, next, db){
        db.Users.find({}, function(err, data){
			if(err) return res.json(err);
			res.status(200);
			return res.json(data);
		})
	},
	index: function(req, res, next){
		return res.render("index", {host: req.protocol+'://'+req.headers.host || req.get('host'), section: "library"});
	}
}