import React from "react";
import Modal3 from './Modal3';
// import '../Stylesheets/draftBoard.css';
// import '../Stylesheets/freeAgents.css';
import "../SASS/main.css";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
const dotenv = require('dotenv');
dotenv.load()


const axios = require("axios");
// console.log(process.env.REACT_APP_YOUTUBE_API_KEY);

class DraftBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            arrOfDraftProspects: [],
            playerVideos: [],
            draftOrder: [],
            isOpen: false,
            selectedVideo: '',
            arrOfPositions: ['', 'PG', 'SG', 'SF', 'PF', 'C'],
            freeAgentPositionSelect: '',
            youTubeKey: '',

        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3100/players/draftprospects`)
            .then(response => {
                this.setState({
                    arrOfDraftProspects: [...response.data.data],
                    youTubeKey: response.data.youTubeKey
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
            axios
            .get(`http://localhost:3100/teams/draft/draftorder`)
            .then(response => {
                this.setState({
                    draftOrder: [...response.data.data]
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });

    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            selectedVideo: ''
        });
    }
    seaechPlayerOnYT = (e) => {
        const {youTubeKey} = this.state
        let playerName = e.target.id
        console.log(playerName)
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${playerName} scouting&key=${youTubeKey}`)
            .then(response => {
                console.log(response.data.items)
                this.setState({
                    playerVideos: [...response.data.items],
                    isOpen: !this.state.isOpen
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
    }

    handleVideoChange = (e) => {
        console.log(e.target.id)
        this.setState({
            selectedVideo: e.target.id
        })
    }
    handleTypeOfFreeAgentSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        const { arrOfDraftProspects, playerVideos, selectedVideo, arrOfPositions, freeAgentPositionSelect,
            draftOrder, youTubeKey } = this.state;
        console.log(youTubeKey);

        function sortedArrOfPlayerPos(freeAgentPositionSelect, arrOfDraftProspects) {
            if (freeAgentPositionSelect === 'C') {
                let sortedArr = arrOfDraftProspects.filter(player => {
                    return player.pos === 'C'
                })
                return sortedArr
            } else if (freeAgentPositionSelect === 'PF') {
                let sortedArr = arrOfDraftProspects.filter(player => {
                    return player.pos === 'PF'
                })
                return sortedArr
            } else if (freeAgentPositionSelect === 'SF') {
                let sortedArr = arrOfDraftProspects.filter(player => {
                    return player.pos === 'SF'
                })
                return sortedArr
            } else if (freeAgentPositionSelect === 'SG') {
                let sortedArr = arrOfDraftProspects.filter(player => {
                    return player.pos === 'SG'
                })
                return sortedArr
            } else if (freeAgentPositionSelect === 'PG') {
                let sortedArr = arrOfDraftProspects.filter(player => {
                    return player.pos === 'PG'
                })
                return sortedArr
            } else if (freeAgentPositionSelect === '') {

                return arrOfDraftProspects
            }
        }
        let newArrPlay = sortedArrOfPlayerPos(freeAgentPositionSelect, arrOfDraftProspects)
        // console.log(youtubeKey)
        // console.log(process.env)
        return (
            <div>
                Basketball Today Rankings
                    <br />
                <select
                    name='freeAgentPositionSelect'
                    onChange={this.handleTypeOfFreeAgentSelect}>
                    {arrOfPositions.map((option, index) => (
                        <option
                        key={index}
                        value={option}>{option}
                        </option>
                    ))}
                </select>
                <br />
                    <div className='draft_page_container'>
                <ul>
                <div className='prospects_container'>
                    {newArrPlay.map((player, index) => (
                        <div key={index} className='prospect_label'>
                        <label >
                            #{player.rk}
                        </label>
                            {/* <br/> */}
                            {player.player}--{player.pos}<br />
                            {player.ht}--{player.wt}<br />
                            {player.school_team}--{player.year}<br />
                          {" "}
                            <button
                                id={player.player}
                                onClick={this.seaechPlayerOnYT}
                                // onClick={this.toggleModal}
                                >
                                Scout Player
                        </button>
                                <br/>
                        
                        </div>

                    ))}
                </div>
                </ul>

                <div className='draft_order_container'>
                {draftOrder.map((pick, index) =>(
                            <div key={index} className={`draft_order_label maincolor2${pick.abbreviation}`} >
                        {pick.abbreviation}----
                        {pick.draft_position}----
                        {pick.team}
                    </div>
                ))}
                </div>
                </div>
                <Modal3
                    className='prospect_yt_modal'
                    show={this.state.isOpen}
                    onClose={this.toggleModal}
                >

                    <div>
                        {selectedVideo === '' ? 'SELECT VIDEO HERE' : <iframe id="player" title='Video' type="text/html"
                            src={`http://www.youtube.com/embed/${selectedVideo}?enablejsapi=1&origin=http://example.com`}
                            frameborder="0" allowFullScreen></iframe>}
                    </div>
                    {/* <br/>
                    <br/> */}
                    <div className='prospect_yt_modal'>
                        {selectedVideo === '' ? 'SELECT VIDEO HERE' : ''}
                        {playerVideos.map(video => (
                            <div>
                                {/* {video.snippet.title}<br /> */}
                                <img className='yt_image' onClick={this.handleVideoChange} id={video.id.videoId} src={video.snippet.thumbnails.default.url} alt={video.snippet.description} />
                                {video.snippet.description}<br />
                                {video.snippet.publishedAt.slice(0, 10)}<br />
                                <br />
                                <br />

                            </div>
                        ))}

                    </div>
                    {/* {selectedVideo === '' ? <img className='modal_logo' src='https://sjcawichallenger.com/wp-content/uploads/2017/11/bball.jpg' alt='op'/> : ''  } */}
                </Modal3>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DraftBoard);
