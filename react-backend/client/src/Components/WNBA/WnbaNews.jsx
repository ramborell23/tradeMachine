import React from 'react';
import ScrollUpButton from "react-scroll-up-button";

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('2c4a28a57b254bdaac2f7affd9544da1');
const moment = require("moment");
moment().format();


class WnbaNews extends React.Component {
    constructor() {
        super()
        this.state = {
            articles: [{ title: 'Home', source: {} }, { title: 'Home', source: {} }, { title: 'Home', source: {} }, { title: 'Home', source: {} }, { title: 'Home', source: {} }, { title: 'Home', source: {} }, { title: 'Home', source: {} }]
        }
    }

    componentDidMount() {
        newsapi.v2.everything({
            // sources: 'fox-sports,espn,bleacher-report,usa-today,the-new-york-times,associated-press,talksport',
            q: '(WNBA team OR WNBA player OR WNBA offseason OR WNBA season ) NOT (handball OR hockey OR bogeys OR CFL OR MLB OR football OR inning OR network OR DL )',
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

        });
    }


    render() {
        const { articles } = this.state
        console.log('MY ARTICLES', articles)
        console.log('MY ARTICLES', articles[0])


        return <div>
            <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
                <svg className="scroll_arrow" viewBox="0 0 32 32">
                    <path className="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z" />
                </svg>
                {/* <i class="fas fa-arrow-up"></i> */}
            </ScrollUpButton>

            <label className="sidenav">
                <svg className="scroll_arrow" viewBox="0 0 32 32">
                    <path className="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z" />
                </svg>
            </label>
            <div className="home_news_container">
                {articles.map((article, index) => (
                    <div key={index} className="home_news_item">
                        <h2 className="home_news_headline">
                            <a href={article.url} target="_blank">
                                {article.title}
                            </a>
                        </h2>
                        <div>
                            <img
                                className="home_article_image"
                                src={article.urlToImage}
                                alt="article"
                            />
                        </div>
                        <div className="home_news_description">
                            {article.description}
                        </div>
                        <br />
                        <label className="article_credit">
                            {article.source.name} --{" "}
                            <label className="home_article_author">
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
        </div>;
    }
}
export default WnbaNews;