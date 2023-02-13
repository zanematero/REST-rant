const router = require('express').Router();

router.get('/new', (req, res) => {
	res.render('places/new')
  })  

router.get('/', (req, res) => {
	let places = [
		{
			name: 'H-Thai-ML',
			city: 'Seattle',
			state: 'WA',
			cuisines: 'Thai, Pan-Asian',
			pic: '/images/H-Thai-ML.jpg',
			photographerLink: 'https://unsplash.com/@sharp3',
			photographer: 'Steve Sharp'
		},
		{
			name: 'Coding Cat Cafe',
			city: 'Phoenix',
			state: 'AZ',
			cuisines: 'Coffee, Bakery',
			pic: '/images/Cat_Cafe.jpg',
			photographerLink: 'https://unsplash.com/@tamarushphotos',
			photographer: 'Tamara Malaniy'
		},
	];

	res.render('places/index', {places});
});

module.exports = router;

