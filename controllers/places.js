const router = require('express').Router()
const db = require('../models')
  
  router.get('/', (req, res) => {
	db.Place.find()
	.then((places) => {
		res.render('places/index', { places })
	})
	  .catch(err => {
		console.log(err)
		res.render('error')
	  })
  })

  router.get('/new', (req, res) => {
	res.render('places/new')
  })  

  router.get('/:id', (req, res) => {
    db.Place.findById(req.params.id)
    .populate('comments')
    .then(place => {
        console.log(place.comments)
        res.render('places/show', { place })
    })
    .catch(err => {
        console.log('err', err)
        res.render('error')
    })
})

  /* router.get('/:id/edit', (req, res) => {
	let id = Number(req.params.id)
	if (isNaN(id)) {
		res.render('error')
	}
	else if (!places[id]) {
		res.render('error')
	}
	else {
	  res.render('places/edit', { place: places[id] })
	}
  })   */

  router.get('/:id/edit', (req, res) => {
	db.Place.findById()
	.then((places) => {
		res.render('places/edit', { places })
	})
	  .catch(err => {
		console.log(err)
		res.render('error')
	  })
  })

  router.post('/:id/comment', (req, res) => {
    console.log(req.body)
    db.Place.findById(req.params.id)
    .then(place => {
        db.Comment.create(req.body)
        .then(comment => {
            place.comments.push(comment.id)
            place.save()
            .then(() => {
                res.redirect(`/places/${req.params.id}`)
            })
        })
        .catch(err => {
            res.render('error')
        })
    })
    .catch(err => {
        res.render('error')
    })
})

router.post('/', (req, res) => {
    db.Place.create(req.body)
    .then(() => {
        res.redirect('/places')
    })
    .catch(err => {
        if (err && err.name == 'ValidationError') {
			let message = 'Validation Error: '
			for (var field in err.errors) {
				message += `${field} was ${err.errors[field].value}. `
				message += `${err.errors[field].message}`
			}
			console.log('Validation error message', message)
			res.render('places/new', { message })
		}
		else {
			res.render('error')
		}
    })
})

router.put('/:id', (req, res) => {
	db.Place.findByIdAndUpdate({_id: req.params.id},req.body)
	.then(updatedPlace => {
		console.log(updatedPlace)
		res.status(303).redirect("/places")
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	  });
  });
  
router.delete('/:id', (req, res) => {
	db.Place.findByIdAndDelete(req.params.id)
	.then(deletedPlace => {
		res.status(303).redirect("/places")
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	  });
	})

router.post('/:id/rant', (req, res) => {
	res.send('GET /places/id/rant stub')
})

router.delete('/:id/rant/:rantId', (req, res) => {
	res.send('GET /places/:id/rant/:rantId stub')
})


module.exports = router;

