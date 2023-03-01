const React = require('react')
const comment = require('../../models/comment')
const Def = require('../default')

function show (data) {
    let comments = (
      <h3 className="inactive">
        No comments yet!
      </h3>
    )
    let rating = (
      <h3 className="inactive">
        Not yet rated
      </h3>
    )
    if (data.place.comments.length) {
      let sumRatings = data.place.comments.reduce((tot, c) => {
        return tot + c.stars
      }, 0)
      let averageRating = Math.round(sumRatings / data.place.comments.length)
      let stars = ''
      for (let i = 0; i < averageRating; i++) {
        stars += 'â­ï¸'
      }
      rating = (
        <h3>
          {stars} stars
        </h3>
      )
      comments = data.place.comments.map(c => {
        return (
          <div className="border">
            <h2 className="rant">{c.rant ? 'Rant! ðŸ˜¡' : 'Rave! ðŸ˜»'}</h2>
            <h4>{c.content}</h4>
            <h3>
              <stong>- {c.author}</stong>
            </h3>
            <h4>Rating: {c.stars}</h4>
          </div>
        )
      })
    }
    return (
        <Def>
            <main>
                <div className="row">
                    <div className="col-sm-6">
                        <img src={data.place.pic} alt={data.place.name} />
                            <h3>
                                Located in {data.place.city}, {data.place.state}
                            </h3>
                    </div>
                    <div className="col-sm-6">
                      <h1>{data.place.name}</h1>
                      <h2>Rating:</h2>
                      {rating}
                        <h2>
                           Description
                        </h2>
                        <h3>
                            {data.place.showEstablished()}
                        </h3>
                        <h4>
                            Serving {data.place.cuisines}
                        </h4>
                        <a href={`/places/${data.place._id}/edit`} className="btn btn-warning"> 
                            Edit
                        </a>     
                        <form method="POST" action={`/places/${data.place._id}?_method=DELETE`}> 
                            <button type="submit" className="btn btn-danger">
                                Delete
                            </button>
                        </form>
                    </div>
                </div> 
                <hr />
                  <h2>Comments</h2>
                  <form method="POST" action={`/places/${data.place._id}/comment`}>
                      <div className="form-group row">
                        <label htmlFor="comment">Add a comment:</label>
                        <div className="row">
                        <div className="form-group col-sm-5">
							<label htmlFor="comment">Comment</label>
							<input
								id="content"
								name="content"
								className="form-control text-center"
							/>
						</div>
						<div className="form-group col-sm-5">
							<label htmlFor="author">Author</label>
							<input
								id="author"
								name="author"
								className="form-control text-center"
							/>
						</div>
						<div className="form-group col-sm-5">
							<label htmlFor="stars">Star Rating</label>
							<input
								type="number"
								min="1"
								max="5"
								id="stars"
								name="stars"
								className="form-range"
                />
						</div>
						<div className="form-group col-sm-2">
							<label
								htmlFor="rant"
								className="form-check-label"
								for="rant"
							>
								Rant?
							</label>
							<br />
							<input
								className="form-check-input"
								type="checkbox"
								id="rant"
								name="rant"
								value="yes"
							/>
						</div>
					</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      </form>
      {comments}
      </main>
    </Def>
  )
}

module.exports = show
