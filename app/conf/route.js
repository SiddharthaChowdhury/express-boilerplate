module.exports = ($,db,C) =>{
/*
*	Please define the nodes below.
*/

	$.get('/', function(req, res, next){
		C.UserController.allUsers(req, res, next, db);
	})


/*
*	 Define routes above
*/
return $;}