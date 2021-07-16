import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

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
}));

/**
 * Make the rows of the list.
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
 */
export const SideBar = (prop) => {
    const classes = useStyles(prop);

    return (
        <div className={classes.root}>
            <FixedSizeList height={prop.height} width={prop.width} itemSize={50} itemCount={30}>
                {renderRow}
            </FixedSizeList>
        </div>
    );
}
