import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from "@material-ui/core/Avatar";

/**
 * Example of nested menus within an IconMenu.
 */

function ArticleOptions(props) {
  const { classes } = props;
  return (
    <div className={''}>
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
                //   className={classes.bigAvatar}
                  sizes={70}
                  alt="Twitter"
                  src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png"
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
              leftIcon={
                <Avatar
                  className="menuItemImage"
                  alt="Facebook"
                  src="http://resurrectionmusclecars.com/wp-content/uploads/2018/04/facebook-logo-png-transparent-background.png"
                />
              }
            />
          ]}
        />
        <Divider />

        <MenuItem
          primaryText="Download"
          leftIcon={
            <Avatar
              alt="Remy Sharp"
              src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png"
            />
          }
        />
        <Divider />
        <MenuItem value="Del" primaryText="Comment" />
      </IconMenu>
    </div>
  );
}


export default ArticleOptions;
