import React from "react";

var YouTube = React.createClass({
    render: function() {
      var videoSrc = "https://www.youtube.com/embed/" + 
          this.props.video + "?autoplay=" + 
          this.props.autoplay + "&rel=" + 
          this.props.rel + "&modestbranding=" +
          this.props.modest;
      return (
        <div className="container">
          <iframe className="player" type="text/html" width="100%" height="100%"
    src={videoSrc}
    frameborder="0"/>
        </div>
      );
    }
  });

  export default  YouTube