const profile = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id: id})
	  .then(user => {
	  	if (user.length) {
	  		res.json(user[0]);
	  	} else {
	  		throw err;
	  	}
	}).catch(err => {
		res.status(400).json('no such user');
	});
}

module.exports = {
	profile: profile
}