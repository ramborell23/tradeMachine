import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
// import Glide from '@glidejs/glide'
import Slider from "react-slick";
import '../Stylesheets/slider.css';
import '../Stylesheets/home.css';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e61cdae783b64c829b1f09b8fd0a4010');

// new Glide('.glide').mount()

var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
};

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            articles: [{ title: 'Home', source:{} }]
        }
    }

    componentDidMount() {
        newsapi.v2.everything({
            sources: 'fox-sports,espn,bleacher-report,usa-today,the-new-york-times,abc-news,associated-press,talksport',
            q: 'NBA',
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


    render() {
        const { articles } = this.state
        console.log('MY ARTICLES', articles)
        console.log('MY ARTICLES', articles[0])
        articles.map(article => {
            console.log('MY ARTICLES', article)

        })
        return (
            <div>
                Home
            {/* <Slider {...settings}> */}
                {/* <div className='slide_item'>
                        <h3>{}</h3>
                    </div>
                    <div className='slide_item'>
                        <h3>2</h3>
                    </div>
                    <div className='slide_item'>
                        <h3>3</h3>
                    </div>
                    <div className='slide_item'>
                        <h3>4</h3>
                    </div>
                    <div className='slide_item'>
                        <h3>5</h3>
                    </div>
                    <div className='slide_item'>
                        <h3>6</h3>
                    </div> */}
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

                {/* <div className='main_freeAgents_container'>
                    
                    {articles.map((option, index) => (
                        <label className='freeagent_player' >
                            <img className='freeagent_pic' src={option.photo} alt='player photo' />
                            <h3>{option.player}</h3>{' '}
                            {option.position}{' '}
                            Last Team {' '}: {' '}{option.tm}{' '}
                        </label>
                    ))}
               
            </div> */}

                {/* </Slider> */}

            </div>
        )
    }
}
export default Home