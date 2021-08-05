import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import styles from '../styles/Home.module.css'

/**
 * @usage
 * \<LectureCards title="TITLE" content={"CONTENT \nCONTENT2"} \/\>
 * 
 * @note
 * To make a newline in content, insert \n.
 */
export const LectureCards = (props) => {
    return (
        <div className={styles.content}>
            <h2 className={styles.contenttitle}>Courses</h2>
            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" color="textPrimary" gutterBottom>{props.title}</Typography>
                    <Typography variant="h6" color="textSecondary">
                        {props.content.split('\n').map((line) => {
                            return <>{line}<br /></>
                        })}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
