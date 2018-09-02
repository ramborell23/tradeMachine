import React from "react";
import { CsvToHtmlTable } from "react-csv-to-table";
import playerStats from "./nbaplayersstats.csv";
import { Route, Switch } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PlayerStats from "./nbaStats.jsx";
const axios = require("axios");

const styles = {
  container: {
    height: "10em"
  },
  img: {
    height: "90%"
  }
};

const columns = [
  {
    id: "player", // Required because our accessor is not a string
    Header: "Player",
    // Pivot: false, // Custom value accessors!
    accessor: d => d.player // Custom value accessors!
  },
  {
    id: "position", // Required because our accessor is not a string
    Header: "Player",
    accessor: d => d.pos // Custom value accessors!
  },
  {
    id: "age", // Required because our accessor is not a string
    Header: "Age",
    accessor: d => d.age // Custom value accessors!
  },
  {
    id: "tm", // Required because our accessor is not a string
    Header: "Team",
    accessor: d => d.tm // Custom value accessors!
  },
  {
    id: "games", // Required because our accessor is not a string
    Header: "Games",
    accessor: d => d.g // Custom value accessors!
  },
  {
    id: "gamesStarted", // Required because our accessor is not a string
    Header: "GS",
    accessor: d => d.gs // Custom value accessors!
  },
  {
    id: "minutes", // Required because our accessor is not a string
    Header: "Minutes",
    accessor: d => d.mp // Custom value accessors!
  },
  {
    id: "fg", // Required because our accessor is not a string
    Header: "FG",
    accessor: d => d.fg // Custom value accessors!
  },
  {
    id: "fga", // Required because our accessor is not a string
    Header: "FGA",
    accessor: d => d.fga // Custom value accessors!
  },
  {
    id: "fgp", // Required because our accessor is not a string
    Header: "FG%",
    accessor: d => d["FG%"] // Custom value accessors!
  },
  {
    id: "3p", // Required because our accessor is not a string
    Header: "3P",
    accessor: d => d["3P"] // Custom value accessors!
  },
  {
    id: "3pa", // Required because our accessor is not a string
    Header: "3PA",
    accessor: d => d["3PA"] // Custom value accessors!
  },
  {
    id: "3p%", // Required because our accessor is not a string
    Header: "3P%",
    accessor: d => d["3P%"] // Custom value accessors!
  },
  {
    id: "2p", // Required because our accessor is not a string
    Header: "2P",
    accessor: d => d["2P"] // Custom value accessors!
  },
  {
    id: "2pa", // Required because our accessor is not a string
    Header: "2PA",
    accessor: d => d["2PA"] // Custom value accessors!
  },
  {
    id: "2p%", // Required because our accessor is not a string
    Header: "2P%",
    accessor: d => d["2P%"] // Custom value accessors!
  },
  {
    id: "efg%", // Required because our accessor is not a string
    Header: "eFG%",
    accessor: d => d["eFG%"] // Custom value accessors!
  },
  {
    id: "ft", // Required because our accessor is not a string
    Header: "Ft%",
    accessor: d => d.ft // Custom value accessors!
  },
  {
    id: "fta", // Required because our accessor is not a string
    Header: "FTA",
    accessor: d => d.fta // Custom value accessors!
  },
  {
    id: "ft%", // Required because our accessor is not a string
    Header: "FT%",
    accessor: d => d["FT%"] // Custom value accessors!
  },
  {
    id: "orb", // Required because our accessor is not a string
    Header: "ORB",
    accessor: d => d.orb // Custom value accessors!
  },
  {
    id: "drb", // Required because our accessor is not a string
    Header: "DRB",
    accessor: d => d.drb // Custom value accessors!
  },
  {
    id: "trb", // Required because our accessor is not a string
    Header: "TRB",
    accessor: d => d.trb // Custom value accessors!
  },
  {
    id: "ast", // Required because our accessor is not a string
    Header: "AST",
    accessor: d => d.ast // Custom value accessors!
  },
  {
    id: "stl", // Required because our accessor is not a string
    Header: "STL",
    accessor: d => d.stl // Custom value accessors!
  },
  {
    id: "blk", // Required because our accessor is not a string
    Header: "BLK",
    accessor: d => d.blk // Custom value accessors!
  },
  {
    id: "tov", // Required because our accessor is not a string
    Header: "TOV",
    accessor: d => d.tov // Custom value accessors!
  },
  {
    id: "pf", // Required because our accessor is not a string
    Header: "PF",
    accessor: d => d.orb // Custom value accessors!
  },
  {
    id: "ps/g", // Required because our accessor is not a string
    Header: "PS/G",
    accessor: d => d["PS/G"] // Custom value accessors!
  }
];

class Stats extends React.Component {
    constructor() {
        super()
        this.state = {
            playerstats: [{
                rk:1,
                pos: "lebron ",
                age: "31",
                tm: "LAL",
                g: "",
                gs: "",
                mp: "",
                fg: "",
                fga: "",
                ["fg%"]: "",
                ["3P"]: "",
                ["3PA"]: "",
                ["3P%"]: "",
                ["2P"]: "",
                ["2PA"]: "",
                ["2PA%"]: "",
                ["eFG%"]: "",
                ["FT%"]: "",
                ["FTA"]: "",
                ["FT%"]: "",
                orb: "",
                drb: "",
                trb: "",
                ast: "",
                stl: "",
                blk: "",
                tov: "",
                pf: "",
                ["PS/G"]: "",
            }]
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:3100/stats/players`)
            .then(response => {
                console.log(response.data.data)
                this.setState({
                    playerstats: response.data.data,
                });
            })
            .catch(err => {
                console.log("error fetching team");
                console.log(err);
            });
    }

    renderPlayerStats = () => {
        const { playerstats } = this.state
        console.log("PlayerStats ===>", playerstats);
        return <div>
            <PlayerStats 
                playerStats={[]} 
            />
          </div>;
    }

    render() {
        const {playerstats} = this.state
        return <div>
            <Switch>
              <Route path="/" render={()=>
            <div>
                        <ReactTable 
                        className="reactTable"
                            className='reactTable'
                            columns={columns}
                            data={playerstats}
                            minRows={1}
                            loadingText={'Loading...'}

                        // pageSizeOptions={'5'}
                        />
            </div>
            } />
              <Route exact path="/freeagents/:player" render={this.renderDogWithBreed} />
            </Switch>
          </div>;
    }
}

export default Stats;