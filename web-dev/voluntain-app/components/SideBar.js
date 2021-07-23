import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import ListSubheader from '@material-ui/core/ListSubheader';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
/**import { List } from 'react-bootstrap/lib/Media';*/

import List from '@material-ui/core/List';

/**
 * Style the background of sidebar.
 * 
 * @Properties
 * - width: Background is colored by the ratio specified here. e.g. '100%'
 * - height: Background is colored by the height specified here. e.g. 1000
 * - maxWidth: Background is colored by the width specified here.
 * - backgroundColor
 */
const useStyles = makeStyles((prop) => ({
    root: {
        width: '100%',
        height: prop.height,
        maxWidth: prop.width,
        backgroundColor: '#ECE6CC',
    },
    nested:{
        paddingLeft: prop.spacing(4),
    }
}));

/**
 * Make the rows of the list.
 * If you want to change the contents of the sidebar, modify this.
 */
function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemText primary={`Lecture ${index + 1}`} />
        </ListItem>
    );
}

renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
};

/**
 * @Properties
 * - height
 * - width
 * - itemSize
 * - itemCount
 * 
 * @Usage
 * \<SideBar height={0} width={0} \/\>
 * 
 * @Note
 * SideBar is automatically hidden when page size is below 'sm'.
 * See also https://material-ui.com/customization/breakpoints/#withwidth.
 */
export const SideBar = (prop) => {
    const classes = useStyles(prop);
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        /**
         * <div className={classes.root}>
            <FixedSizeList height={prop.height} width={prop.width} itemSize={50} itemCount={15}>
                {renderRow}
            </FixedSizeList>
        </div>
         */
        
        <List 
            component="nav"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Scratch
                </ListSubheader>
            }
            className={classes.root}
        >
            

            {/* <ListItem button>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts"/>
            </ListItem> */}
            
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Lecture1"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Lecture2"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Lecture3"/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
