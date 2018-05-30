import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e61cdae783b64c829b1f09b8fd0a4010');

class Draft extends React.Component {
    constructor(){
        super()
        this.state = {
            articles: [{ title: 'Home', source:{} }]
        }
    }

    componentDidMount() {
        newsapi.v2.everything({
            sources: 'fox-sports, espn, bleacher-report, usa-today, the-new-york-times, abc-news, associated-press, talksport',
            q: 'NBA draft',
            // category: 'Sports',
            // from: '2018-05-28',
            // to: '2018-05-26',
            pageSize: 100,
            language: 'en',
            sortBy: 'publishedAt',
            // country: 'us'
        }).then(response => {
            this.setState({
                articles: [...response.articles]
            })
            console.log(response);
            /*
              {
                status: "ok",
                articles: [...]
              }
            */
        });
    }


    render(){
        return(
            <div>
                Draft Home

                <br/>
                <br/>
                
                <div className='home_news_container'>
                    {this.state.articles.map(article => (
                        <div className='home_news_item'>
                        <h2 className='home_news_headline'><a href={article.url} target="_blank">{article.title}</a></h2>
                        <img className='home_article_image' src={article.urlToImage} alt ='article picture'/>
                        <br/>
                        <label className='home_article_author'>
                        {article.author}
                        </label>
                        <div className='home_news_description'>
                        {article.description}
                        </div>
                        <br/>
                        {article.source.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Draft