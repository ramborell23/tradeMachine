import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";

// import Glide from '@glidejs/glide'
// new Glide('.glide', {
//     autoplay: 4000
//   })
  
  const NewsAPI = require('newsapi');
  const newsapi = new NewsAPI('e61cdae783b64c829b1f09b8fd0a4010');
  
//   const axios = require("axios");
  var url = 'https://newsapi.org/v2/top-headlines?' +
  'country=us&' +
  'apiKey=e61cdae783b64c829b1f09b8fd0a4010';
  
  class News extends React.Component {
      constructor() {
          super()
          this.state = {
              nbaArticles: [],
              nameSearchInput: '',
            }
        }
        
        componentDidMount() {
        // new Glide('.glide').mount()
        // axios
        newsapi.v2.sources({
            // sources: 'fox-sports, espn, bleacher-report, google-news,talksport, usa-today,the-new-york-times',
            // q: 'Sport',
            category: 'sports',
            from: '2018-05-20',
            to: '2018-05-25',
            language: 'en',
            // country: 'us'
        }).then(response => {
            console.log(response);
            /*
              {
                status: "ok",
                articles: [...]
              }
            */
        });
    }

    handleApiCheck = () => {
        const { nameSearchInput } = this.state
        newsapi.v2.everything({
            sources: 'fox-sports, espn, bleacher-report, usa-today, the-new-york-times,  associated-press, talksport',
            q: nameSearchInput,
            // category: 'Sports',
            from: '2018-05-20',
            to: '2018-05-29',
            pageSize: 20,
            language: 'en',
            // country: 'us'
        }).then(response => {
            console.log(response);
            /*
              {
                status: "ok",
                articles: [...]
              }
            */
        });
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        const { nameSearchInput } = this.state
        console.log('nameSearchInput', nameSearchInput)
        return (
            <div>
                NBA News Home
                <button
                    onClick={this.handleApiCheck}
                >
                    Api Check
                </button>
                <input
                    name='nameSearchInput'
                    onChange={this.handleInputChange}
                >
                </input>


                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                <div class="glide">
                    <div class="glide__track" data-glide-el="track">...</div>

                    <div class="glide__arrows" data-glide-el="controls">
                        {/* <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button> */}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default News