// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars && restaurant-data
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantsList.results })
})

// show-page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurant })
})

// search-bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantsList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})