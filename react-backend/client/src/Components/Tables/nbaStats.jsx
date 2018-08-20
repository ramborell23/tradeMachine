import React ,{Component} from 'react'
// const puppeteer = require("puppeteer");
const axios = require("axios");


class NbaStats extends React.Component{
    constructor(){
        super()
        this.state={
            stats :[]
        }
    }


    componentDidMount(){
       
        axios
            .get(`http://localhost:3100/stats`)
            .then(response => {
                this.setState({
                  stats: response.data
                });
            })
            .catch(err => {
                console.log("error fetching stats");
                console.log(err);
            });
    }

    render(){
        const { stats} = this.state

        console.log('Our chrck',stats)
        return(
            <div>
            Stats check the console
            </div>
        )
    }
}
export default NbaStats;
