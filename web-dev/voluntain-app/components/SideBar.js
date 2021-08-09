import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import grey from '@material-ui/core/colors/grey';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
        backgroundColor: '#003458',
        color: 'white'
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
            <ListItemText primary={`Item ${index + 1}`} />
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
    const [color, setColor]=React.useState("black");

    const handleClick = () => {
        setOpen(!open);
    };

    const checkClick=()=>{


    };

    return (
        <List 
            component="nav"
            /*subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Scratch
                </ListSubheader>
            }*/
            className={classes.root}
        >    
            <ListItem button onClick={handleClick}>
                <ListItemText primary="Lectures" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding color={color}>
                    <ListItem button className={classes.nested} onClick={() => setColor("cyan")}>
                        <ListItemText primary="Lecture1"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="Lecture2"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="Lecture3"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="Lecture4"/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="Lecture5"/>
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
