const React = require('react')
const Def = require('./default')

function home () {
    return (
      <Def>
        <main>
          <h1>HOME</h1>
            <div>
              <img src="/images/food.jpg" width="600" height="400" alt="Food on toast" />
              <div>
                Photo by <a href="https://unsplash.com/@ellaolsson">Ella Olsson</a> on <a href="https://unsplash.com/">Unsplash</a>
              </div>
            </div>
          <a href="/places">
            <button className="btn-primary">Places Page</button>
          </a>
        </main>
    </Def>
  )
}
  
module.exports = home
