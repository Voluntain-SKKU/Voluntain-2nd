import React from 'react'

/**
 * @usage
 *     \<LectureText 
 *       title="AAA" content="something" 
 *     \/\>
 * 
 * @param {*} props 
 */
export const LectureText = (props) =>{
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    );
};
