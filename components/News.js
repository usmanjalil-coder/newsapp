import React, { useEffect, useState } from 'react'
import NewItem from './NewItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // articles = []

  const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
  }
  const updateNews = async () => {
    props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=138454750f9942ab96e58f3ccd554fbb&page=${page}&pageSize=${props.pageSize}`
    props.setProgress(70)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)

  }
  useEffect(() => {
  document.title = `${capitalize(props.category)} - Headlines`;
    updateNews()
  }, [])

 
  const handlePrevClick = async () => {
    // console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=138454750f9942ab96e58f3ccd554fbb&page=${page - 1}&pageSize=${props.pageSize}`
    // setLoading(true)
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // setPage(page-1)
    // setArticles(parsedData.articles)
    // setLoading(false)
    setPage(page-1)
   updateNews()
  }
  const handleNextClick = async () => {
    // console.log("Next")
    // if (page + 1 > Math.ceil(totalResults / props.pageSize)) { }
    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=138454750f9942ab96e58f3ccd554fbb&page=${page + 1}&pageSize=${props.pageSize}`
    //   this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //  setPage(page+1)
    // setArticles(parsedData.articles)
    // setLoading(false)
    // }
    setPage(page+1)
    updateNews()
  }
  const fetchMoreData = async () => {
  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=138454750f9942ab96e58f3ccd554fbb&page=${page+ 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)

  };



  return (
    <>
      <h2 className='text-center' style={{marginTop: '70px',marginBottom: '20px'}}>NewsMonkey - {capitalize(props.category)} Headlines</h2>
      {loading && <Loading />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className='container'>
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewItem title={element.title} desc={element.description} imageUrl={element.urlToImage} newsId={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
        </div>
      </InfiniteScroll>

    </>
  )

}

News.defaultProps = {
  country: 'in',
  category: 'science',
  pageSize: 20
}
News.propType = {
  country: PropTypes.string
}

export default News
