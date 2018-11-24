var express    = require('express'),
	app        = express(),
	router     = express.Router(),
	bodyParser = require('body-parser'),

	mongoose   = require('mongoose'),
	Schema     = mongoose.Schema,
	Times      = require('./model/times');

app.use(bodyParser.urlencoded({ extended: false }));

/* NoSQL */
mongoose.connect('mongodb://localhost/futebol', { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('Erro ao conectar ao mongodb: ' + err);
	}
});

/* Router */
router.get('/', function (req, res) {
	res.send('API Futebol');
});

router
	.route('/times')
	.post(function(req, res) {
		var times = new Times();
		times.nome = req.body.nome;

		times.save((err) => {
			if(err) {
				res.send(err);
			}

			res.json({
				message: 'Time cadastrado com sucesso!'
			});
		});
	})
	.get(function(req, res) {
		Times.find((err, data) => {
			res.json( data );
		});
	});

router.route('/time/:id')
.get((req, res) => {
	Times.findById(req.params.id, (err, data) => {
		if(err) {
			res.send(err);
		}

		res.json(data);
	});
})
.put(function(req, res) {
	Times.findById(req.params.id, (err, data) => {
		if(err) {
			res.send(err);
		}

		data.nome = req.body.nome;
		data.save((err) => {
			if(err) {
				res.send(err);
			}

			res.json({
				message: 'Time atualizado com sucesso!'
			});
		});
	});
})
.delete(function(req, res) {
	Times.remove({ _id: req.params.id }, (err, data) => {
		if(err) {
			res.send(err);
		}

		res.json({
			message: 'Time removido com sucesso!'
		});
	});
});

app.use('/api', router);

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});