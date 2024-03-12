import React, { Component } from 'react'

const NewItem=(props)=> {


 
    let { title, desc, imageUrl, newsId, author, time ,source} = props
    return (
      <div>

        <div className="card">
          <img src={imageUrl ? imageUrl : "https://cleantechnica.com/wp-content/uploads/2023/10/Tesla-Model-Y-Blue-Wrap-Top-Selling-Electric-Car-CleanTechnica-Watermark-scaled-e1696941400369.jpeg"} className="card-img-top" alt="/" />
          <div className="card-body">
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '93%', zIndex: '1'}}>
              {source}
            </span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc ? desc : "Subway will force its franchisees to sell discounted sandwiches despite many struggling to survive — and the new mandate could give added ammunition to federal regulators already looking to p…"}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(time).toUTCString()}</small></p>
            <a rel="noreferrer" href={newsId} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>

      </div>
    )
 
}

export default NewItem
