const router = require('express').Router()
const db = require('../models')
const places = require('../models/places.js')
  
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
        res.render('error404')
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
            res.render('error404')
        })
    })
    .catch(err => {
        res.render('error404')
    })
})

  router.post('/', (req, res) => {
	db.Place.create(req.body)
	.then(() => {
		res.redirect('/places')
	})
	.catch(err => {
		console.log('err', err)
		res.render('error')
	})
  })
  
  
  router.put('/:id', (req, res) => {
	let id = Number(req.params.id)
	if (isNaN(id)) {
		res.render('error')
	}
	else if (!places[id]) {
		res.render('error')
	}
	else {
		if (!req.body.pic) {
			req.body.pic = 'http://placekitten.com/400/400'
		}
		if (!req.body.city) {
			req.body.city = 'Anytown'
		}
		if (!req.body.state) {
			req.body.state = 'USA'
		}
  		places[id] = req.body
		res.redirect(`/places/${id}`)
	}
  })  
  
  router.delete('/:id', (req, res) => {
	let id = Number(req.params.id)
	if (isNaN(id)) {
	  res.render('error')
	}
	else if (!places[id]) {
	  res.render('error')
	}
	else {
	  places.splice(id, 1)
	  res.redirect('/places')
	}
  })  

module.exports = router;

