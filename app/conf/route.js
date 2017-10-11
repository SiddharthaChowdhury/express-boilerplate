module.exports = ($,_) =>{
/*
*	Please define the nodes below.
*/

	$.get('/', function(req, res){
		_.Users.find({}, function(err, data){
			if(err) return res.json(err);
			res.status(200);
			return res.json(data);
		})
		
		// return res.json({msg:"Hi buddy!"})
		// return res.status(403).send('<p>Status: 403 - Forbidden!</p>')
	})


/*
*	 Define routes above
*/
return $;}