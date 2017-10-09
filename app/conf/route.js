module.exports = ($) =>{
/*
	Please define the nodes below.
*/

	$.get('/', function(req, res){
		return res.status(403).send('<p>Status: 403 - Forbidden!</p>')
	})


/*
	Routes defined above
*/
return $;}