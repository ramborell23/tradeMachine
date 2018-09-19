import React from "react";
// import '../Stylesheets/teamPage.css';
// import '../Stylesheets/playerPage.css';
import "../SASS/main.css";
import ScrollUpButton from "react-scroll-up-button";
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('e61cdae783b64c829b1f09b8fd0a4010');

const axios = require("axios");

class PlayerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            teamSelect:'',
            teamInfo:[{
                abbreviation:''
            }],
            teamNews:[],
            teams : ['',
                'Atlanta Hawks',
                'Boston Celtics',
                'Brooklyn Nets',
                'Charlotte Hornets',
                'Chicago Bulls',
                'Cleveland Cavaliers',
                'Dallas Mavericks',
                'Denver Nuggets',
                'Detroit Pistons',
                'Golden State Warriors',
                'Houston Rockets',
                'Indiana Pacers',
                'Los Angeles Clippers',
                'Los Angeles Lakers',
                'Memphis Grizzlies',
                'Miami Heat',
                'Milwaukee Bucks',
                'Minnesota Timberwolves',
                'New Orleans Pelicans',
                'New York Knicks',
                'Oklahoma City Thunder',
                'Orlando Magic',
                'Philadelphia 76ers',
                'Phoenix Suns',
                'Portland Trail Blazers',
                'Sacramento Kings',
                'San Antonio Spurs',
                'Toronto Raptors',
                'Utah Jazz',
                'Washington Wizards',
            ]


        };
    }
 

  
    handleTeamSelect = (e)=>{
        const {teamSelect} = this.state
        axios
        .get(`http://localhost:3100/teams/team/${teamSelect}`)
        .then(response => {
            this.setState({
                teamInfo: [response.data.data[0]]
            });
        })
        .catch(err => {
            console.log("error fetching team");
            console.log(err);
        });
        newsapi.v2.everything({
            // sources: 'fox-sports,espn,bleacher-report,usa-today,the-new-york-times,associated-press,talksport',
            q: `${teamSelect} AND (NBA OR team) NOT (handball OR pbs OR gothic OR housing OR comic OR CFL OR bogey OR NFL OR soccer OR NHL) NOT U.S. Open `,
            // category: 'Sports',
            // from: '2018-06-16',
            // to: '2018-05-26',
            pageSize: 100,
            language: 'en',
            sortBy: 'publishedAt',
            // country: 'us'
        }).then(response => {
            this.setState({
                 teamNews : [...response.articles]
            })
            console.log(this.state.teamNews)
        });
    }
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {teams, teamInfo, teamNews, } = this.state;
        console.log('teamSelect', teamInfo)
        return (
            <div className={`maincolor3${this.state.teamInfo[0].abbreviation}`}>
                  <ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
                    <svg  className="scroll_arrow"  viewBox="0 0 32 32" >
                        <path className="path1" d="M27.414 12.586l-10-10c-0.781-0.781-2.047-0.781-2.828 0l-10 10c-0.781 0.781-0.781 2.047 0 2.828s2.047 0.781 2.828 0l6.586-6.586v19.172c0 1.105 0.895 2 2 2s2-0.895 2-2v-19.172l6.586 6.586c0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586c0.781-0.781 0.781-2.047 0-2.828z"></path>
                    </svg>
                        
                </ScrollUpButton>
               
            <div className='team_page_select'>
            {teamInfo.length === 0 ?  'Select a Team ➛  ' : ''}
               <select
                    className=''
                    name='teamSelect'
                    onChange={this.handleInput}
                    >
                    {teams.map((option, index) => (
                        <option
                        key={index}
                        value={option}>{option}
                        </option>
                    ))}
                </select>
                <button
                onClick={this.handleTeamSelect}>
                Get News on Team
                </button>
                </div>
                <div className=''>
                    {teamInfo.map((team, index) =>(
                        teamInfo.length === 0 ? '' : <label key={index}  className=''>
                            <img className='side_nav_pic' src={team.teamlogo} alt=''/>
                            {/* <br/>
                            <br/>
                            {team.team}
                            <br/>
                            Overall Record<br/>
                            {team.overall}
                            <br/>
                           Home Record<br/>
                            {team.home}
                            <br/>
                           Road Record<br/>
                            {team.road} */}
                        </label>
                    ))}
                </div>
                <br/>
                <br/>
                <div className={`home_news_container`}>
                    {teamNews.map(article => (
                        <div className='home_news_item'>
                            <h2 className='home_news_headline'><a href={article.url} target="_blank">{article.title}</a></h2>
                            <div>
                            <img className='home_article_image' src={article.urlToImage} alt='article' />
                            </div>
                            <div className='home_news_description'>
                                {article.description}
                            </div>
                            <br />
                            <label className= 'article_credit'>
                            {article.source.name} -- 
                                {' '}<label className='home_article_author'>
                                {article.author}
                                <br />
                                {article.publishedAt.slice(0,10)}
                            </label>
                            </label>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default PlayerPage;
