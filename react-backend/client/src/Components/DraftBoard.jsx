import React from "react";
import Player from "./player";
import { Route, Link, Switch } from "react-router-dom";
import Modal3 from './Modal3';
import { Draggable } from '@shopify/draggable';
import '../Stylesheets/draftBoard.css';
import '../Stylesheets/freeAgents.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import freeAgentsFunctions from '../Functions/freeAgentsFunctions'

// import { Droppable } from '@shopify/draggable';
// import Youtube from './youtube';

const youtubeKey = 'AIzaSyAThL2zpWuPbvEElHGU1OJ4Y4wlUm3xVOQ'
const axios = require("axios");
// const droppable = new Droppable(document.querySelectorAll('ul'), {
//     draggable: 'li',
//     dropzone: '#dropzone'
// });

const draggable = new Draggable(document.querySelectorAll('ul'), {
    draggable: 'li'
});

// droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
// droppable.on('droppable:returned', () => console.log('droppable:returned'));
draggable.on('drag:start', () => console.log('drag:start'));
draggable.on('drag:move', () => console.log('drag:move'));
draggable.on('drag:stop', () => console.log('drag:stop'));

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

        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3100/players/draftprospects`)
            .then(response => {
                console.log(response.data.data)
                this.setState({
                    arrOfDraftProspects: [...response.data.data]
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
            axios
            .get(`http://localhost:3100/teams/draft/draftorder`)
            .then(response => {
                console.log(response.data.data)
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
        let playerName = e.target.id
        console.log(playerName)
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${playerName} scouting&key=${youtubeKey}`)
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
        const { } = this.state
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        const { arrOfDraftProspects, playerVideos, selectedVideo, arrOfPositions, freeAgentPositionSelect,
            draftOrder } = this.state;
        console.log(draftOrder)
        let newArrOfFreeAgents = freeAgentsFunctions.filterFreeAgentsByPosition(freeAgentPositionSelect, arrOfDraftProspects)
        // console.log(playerVideos)
        console.log(freeAgentPositionSelect)

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
        console.log(newArrPlay)
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
                    {newArrPlay.map(player => (
                        <div className='prospect_label'>
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
                {draftOrder.map(pick =>(
                    <div  className={`draft_order_label maincolor2${pick.abbreviation}`} >
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
                        {selectedVideo === '' ? 'SELECT VIDEO HERE' : <iframe id="player" type="text/html"
                            src={`http://www.youtube.com/embed/${selectedVideo}?enablejsapi=1&origin=http://example.com`}
                            frameborder="0"></iframe>}
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
