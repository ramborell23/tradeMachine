import React from "react";
import Player from "./player";
// import "../SASS/main.css";
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e61cdae783b64c829b1f09b8fd0a4010');

const axios = require("axios");

class PlayerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            playerInformation: [{
                team:{
                    City:'',
                    Name:'',
                }
            }],
            playerStats: [{
                stats:{
                    PtsPerGame:'',
                    AstPerGame:'',
                    RebPerGame:'',
                    FgPct:'',
                    Fg3PtPct:'',
                    FtPct:'',
                    BlkPerGame:'',
                    StlPerGame:'',
                    TovPerGame:'',
                }}],
                
            articles: [{ title: 'Home', source: {} }]

        };
    }
    
    getPlayer = () => {
        let username = 'rell23'
        let password = 'Great22!'
        const { player } = this.props;
        let config = {
            headers: { "Authorization": "Basic " + btoa(username + ":" + password) }
        };
        let playerName = player.replace(/[^a-zA-Z ]/g, "")
        playerName = playerName.split(' ').join('-').toLowerCase()
        console.log(playerName)
        console.log('Our player Page check ', player)
        axios
            .get(`http://localhost:3100/players/freeAgents/${[player]}`)
            .then(response => {
                console.log('response.data.data[0]', response.data.data[0])
                this.setState({
                    playerInformation: response.data.data[0]
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
        axios
            .get(`https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?player=${playerName}`, config)
            .then(response => {
                // console.log('Response', response.data)
                this.setState({
                    playerStats: [response.data.cumulativeplayerstats.playerstatsentry[0]],
                });
                console.log(this.state.playerStats)
            })
            .catch(err => {
                console.log("error fetching stats");
                console.log(err);
            });
    };

    componentDidMount() {
        const { player } = this.props;
        console.log(player)
        this.getPlayer();
        newsapi.v2.everything({
            // sources: 'fox-sports,espn,bleacher-report,usa-today,the-new-york-times,associated-press,talksport',
            q: `+${player} AND (NBA OR basketball) NOT (NFL)`,
            // category: 'Sports',
            // from: '2018-05-28',
            // to: '2018-05-26',
            pageSize: 10,
            language: 'en',
            sortBy: 'publishedAt',
            // country: 'us'
        }).then(response => {
            this.setState({
                articles: [...response.articles]
            })
            console.log(this.state.articles)
           
           
        });
    }

    render() {
        const { playerInformation, playerStats, articles } = this.state;
        // console.log('playerInformation', playerInformation)
        // console.log('playerStats', playerStats)
        // const { playerInformation } = this.props;
        return (
            <div>
                {/* <h2>PLAYER HOME </h2> */}
                <Player
                    playerInformation={playerInformation}
                    playerStats={playerStats} 
                    articles={articles} 
                    />
                    
            </div>
        );
    }
}

export default PlayerPage;
