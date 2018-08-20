import React from 'react';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e61cdae783b64c829b1f09b8fd0a4010');

class News extends React.Component {
    constructor() {
        super()
        this.state = {
            nbaArticles: [],
            nameSearchInput: '',
        }
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