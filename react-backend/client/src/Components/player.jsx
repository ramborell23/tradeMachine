import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import '../Stylesheets/table.css';
import '../Stylesheets/playerPage.css';
import { Route, Link, Switch } from "react-router-dom";
import moneyFunctions from './moneyFunctions'


const styles = {
  container: {
    height: "10em"
  },
  img: {
    height: "90%"
  }
};

const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  }
}]
const columns = [{
  Header: 'Points',
  id: 'points', // Required because our accessor is not a string
  accessor: d => d.stats.PtsPerGame['#text']// Custom value accessors!

}, {
  Header: 'Assists',
  id: 'assits', // Required because our accessor is not a string
  accessor: d => d.stats.AstPerGame['#text']// Custom value accessors!
},
{
  id: 'rebounds', // Required because our accessor is not a string
  Header: 'Rebounds',
  accessor: d => d.stats.RebPerGame['#text']// Custom value accessors!
},
{
  id: 'fgpct', // Required because our accessor is not a string
  Header: 'FG%',
  accessor: d => d.stats.FgPct['#text']// Custom value accessors!
},
{
  id: '3pct', // Required because our accessor is not a string
  Header: '3Pt FG%',
  accessor: d => d.stats.Fg3PtPct['#text']// Custom value accessors!
},
{
  id: 'ftpct', // Required because our accessor is not a string
  Header: 'Ft%',
  accessor: d => d.stats.FtPct['#text']// Custom value accessors!
},
{
  id: 'blkpg', // Required because our accessor is not a string
  Header: 'Blocks',
  accessor: d => d.stats.BlkPerGame['#text']// Custom value accessors!
},
{
  id: 'stlpg', // Required because our accessor is not a string
  Header: 'Steals',
  accessor: d => d.stats.StlPerGame['#text']// Custom value accessors!
},
{
  id: 'stlpg', // Required because our accessor is not a string
  Header: 'Turnovers',
  accessor: d => d.stats.TovPerGame['#text']// Custom value accessors!
},
]
let ip = 'friend.name'
// let ii = 'd.stats.PtsPerGame['#text']'

const Player = ({ playerInformation, playerStats, articles }) => (
  <div style={styles.container}>
    {/* <Link to='/freeagents'> <button > Back </button></Link> */}
    <h2 className='player_page_name'>{playerInformation.player}</h2><br />
    <div className={`photo_contract_container maincolor2${playerInformation.tm}`}>
      <img className='player_page_photo' src={playerInformation.photo} alt='' />
      <div>
        {playerInformation.tm}<br />
        {playerInformation.position}<br />
        {playerInformation._2017_18 === null ? '' : <label>17-18 Salary:{' '}{moneyFunctions.moneyFormatter2(playerInformation._2017_18)}<br /></label>}
        {playerInformation._2018_19 === null ? '' : <label>18-19 Salary:{' '}{moneyFunctions.moneyFormatter2(playerInformation._2018_19)}<br /></label>}
        {playerInformation.option_ === null ? '' : <label>Type Of Option:{' '}{playerInformation.option_}<br /></label>}
        {playerInformation.option_year === null ? '' : <label>Option Year:{' '}{playerInformation.option_year}<br /></label>}
      </div>
    </div>
    <br />
    {/* <br/> */}
    <div className='tableDiv'>
      <ReactTable
        className='reactTable'
        data={playerStats}
        columns={columns}
        showPagination={false}
        minRows={1}
        loadingText={'Loading...'}
      // pageSizeOptions={'5'}
      />
      <br />
    </div>
    <br />

    <Link to='/freeagents'> <button className='free_back_button'> Back </button></Link>


    <br />
    <br />
    <br />
    {/* <div className='home_news_container'>
      {articles.map(article => (
        <div className='home_news_item'>
          <h2 className='home_news_headline'><a href={article.url} target="_blank">{article.title}</a></h2>
          <img className='home_article_image' src={article.urlToImage} alt='article picture' />
          <br />
          <label className='home_article_author'>
            <br />
            {article.author}
            <br />
          </label>
          <br />
          <div className='home_news_description'>
            {article.description}
          </div>
          <br />
          {article.source.name}
        </div>
      ))}
    </div> */}
    {/* {playerInformation.tm}<br/> */}
    {/* {imageURL ? <img style={styles.img} alt="" src={imageURL} /> : "loading..."} */}
  </div>
);

export default Player;
