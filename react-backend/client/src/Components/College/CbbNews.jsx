import React, { Component } from "react";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("2c4a28a57b254bdaac2f7affd9544da1");
const moment = require("moment");
moment().format();


class CbbNews extends React.Component{
    constructor(){
        super()
        this.state={
            cbbArticles: [{ title: 'Home', source: {} }],
        }
    }

    componentDidMount(){
        newsapi.v2
          .everything({ // sources:
            //   "fox-sports, espn, bleacher-report, usa-today, the-new-york-times,  associated-press, talksport"
            //   ,
              q: "ncaa basketball(mens OR player AND game ) NOT(football OR baseball OR WNBA OR hockey)",
            sortBy: "publishedAt", 
            pageSize: 100, 
            language: "en" 
        })
          // country: 'us'
          .then(response => {
            this.setState({ cbbArticles: response.articles });
            console.log("cbbArticles", this.state.cbbArticles);
            /*
              {
                status: "ok",
                articles: [...] 
              }
            */
          });
    }

    render(){
        const {cbbArticles} = this.state 
        return(
            <div>
                <div className='home_news_container'>
                    {cbbArticles.map((article, index) => (
                        <div key={index} className='home_news_item'>
                            <h2 className='home_news_headline'><a href={article.url} target="_blank">{article.title}</a></h2>
                            <div>
                                <img className='home_article_image' src={article.urlToImage} alt='article' />
                            </div>
                            <div className='home_news_description'>
                                {article.description}
                            </div>
                            <br />
                            <label className='article_credit'>
                                {article.source.name} --
                                {' '}<label className='home_article_author'>
                                    {article.author}
                                    <br />
                                </label>
                            </label>
                            <label className="article_credit">
                                <label className="home_article_author">
                                    <br />
                                    {moment(article.publishedAt).fromNow()}
                                    <br />
                                </label>
                            </label>
                        </div>
                    ))}
                </div>
            
            </div>
        )
    }

}

export default CbbNews;