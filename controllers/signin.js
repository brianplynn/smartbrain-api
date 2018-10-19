const signIn = (resq, res, db, bcrypt) =>  {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json("improper form submit");
	}
	db.select('email', 'hash')
	.from('login')
	.where('email', '=', email)
	.then(user => {
		isValid = bcrypt.compareSync(password, user[0].hash);
		if (isValid) {
			return db.select('*').from('users')
			  .where('email', '=', email)
			  .then(user => {
			  	res.json(user);
			  })
			  .catch(err => {
			  	res.status(400).json('wrong credentials');
			  })
		}
		res.status(400).json('wrong credentials');	
	})
	.catch(err => {
	 	res.status(400).json('wrong credentials');
	})
}

module.exports = {
	signIn: signIn
}