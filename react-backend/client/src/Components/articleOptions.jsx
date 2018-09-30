import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";



/**
 * Example of nested menus within an IconMenu.
 */

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 80,
    height: 80
  },

  color: {
    color: 'red'
  }
};

const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiMenuItem: {
      MuiAvatar: {
        // Name of the rule
        root: {
          // Some CSS
          width: 180,
          height: 80,
          color:'red'
        }
      }
    }
  }
});

function ArticleOptions(props) {
  const { classes } = props;
  // console.log(classes.bigAvatar)
  return (
    <MuiThemeProvider theme={theme}>

      <div className={classes.row}>
        <Avatar
          alt="Remy Sharp"
          src="http://resurrectionmusclecars.com/wp-content/uploads/2018/04/facebook-logo-png-transparent-background.png"
        // className={classes.avatar}
        />
        <Avatar
          alt="Adelle Charles"
          src="http://resurrectionmusclecars.com/wp-content/uploads/2018/04/facebook-logo-png-transparent-background.png"
          className={classes.bigAvatar}
        />

        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem
            primaryText="Like"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem primaryText="Cut" />,
              <MenuItem primaryText="Copy" />,
              <Divider />,
              <MenuItem primaryText="Paste" />
            ]}
          />

          <MenuItem
            primaryText="Share"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem
                primaryText="Twitter"
                leftIcon={
                  <Avatar
                    alt="Twitter"
                    src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png"
                  // className={classes.color}

                  />
                }
              />,
            
              <MenuItem
                primaryText="Instagram"
                leftIcon={
                  <Avatar
                    className="menuItemImage"
                    alt="Instagram"
                    src="http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png"
                 
                  />
                }
              />,
              <MenuItem
                primaryText="Facebook"
                selected={true}
                leftIcon={
                  <Avatar
                    alt="Adelle Charles"
                    src="http://resurrectionmusclecars.com/wp-content/uploads/2018/04/facebook-logo-png-transparent-background.png"
                  // className={classes.bigAvatar}
                  />
                }
              />
            ]}
          />

          <Divider />
          <MenuItem value="Del" primaryText="Save Article" />
        </IconMenu>
      </div>
    </MuiThemeProvider>
  );
}

ArticleOptions.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default ArticleOptions;
export default withStyles(styles)(ArticleOptions);
