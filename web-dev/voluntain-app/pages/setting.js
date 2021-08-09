import Head from 'next/head'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import styles from '../styles/Home.module.css'

/**
 * @see
 * https://www.cookiebot.com/en/cookie-policy/
 */
export default function Setting() {
    const [cookies, setCookie, removeCookie] = useCookies(['courseId', 'lectureId', 'videoEnd', 'noCookie', 'noAnalytics', 'cookieAlert']);

    function getInitialNoCookie() {
        if (cookies.noCookie === undefined) {
            return false;
        } else {
            return cookies.noCookie;
        }
    }

    const [noCookieStat, setNoCookieUseStat] = React.useState(getInitialNoCookie());
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleNoCookieChange = () => {
        if (noCookieStat === false) {
            // make noCookie true, and delete all other cookies.
            setNoCookieUseStat(true);
            removeCookie('courseId');
            removeCookie('lectureId');
            removeCookie('videoEnd');
            removeCookie('cookieAlert');
            setCookie('noCookie', true, { path: '/', maxAge: 31536000 });
            handleCloseDialog();
        } else {
            // make noCookie false
            setNoCookieUseStat(false);
            removeCookie('noCookie');
        }
    }

    const CookieSwitcher = () => {
        if (noCookieStat === false) {
            return (
                <>
                    <h5>All cookies are now being collected.</h5>
                    <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
                        Disable and remove all cookies
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <h5>Some of cookies are not being collected.</h5>
                    <Button variant="contained" color="primary" onClick={handleNoCookieChange}>
                        Enable cookies
                    </Button>
                </>
            );
        }
    }

    function getInitialNoAnalytics() {
        if (cookies.noAnalytics === undefined) {
            return false;
        } else {
            return cookies.Analytics;
        }
    }

    const [noAnalytics, setNoAnalytics] = React.useState(getInitialNoAnalytics());

    const handleAnalyticsChange = () => {
        if (noAnalytics === false) {
            // Turn on analytics
            setNoAnalytics(true);
            setCookie('noAnalytics', true, { path: '/', maxAge: 31536000 });
        } else {
            // Turn off analytics
            setNoAnalytics(false);
            removeCookie('noAnalytics');
        }
    }

    const AnalyticsSwitcher = () => {
        if (cookies.noAnalytics === undefined || cookies.noAnalytics === false) {
            return (
                <>
                    <h5>All statistical information is being collected.</h5>
                    <Button variant="contained" color="secondary" onClick={handleAnalyticsChange}>
                        Disable analytics
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <h5>No statistical information is collected.</h5>
                    <Button variant="contained" color="primary" onClick={handleAnalyticsChange}>
                        Enable analytics
                    </Button>
                </>
            );
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Privacy Policy - Voluntain</title>
            </Head>
            <main>
                <h1>PRIVACY POLICY</h1>
                <ul>
                <h3>What types of cookies are set? What data they track?</h3>
                    <p><ol>
                        <li>The title of the last video you watched,</li>
                        <li>whether you have finished the video,</li>
                        <li>and whether you consent to cookies that are being collected.</li>
                    </ol></p>

                    <h3>How long they persist on your my browser?</h3>
                    <p>1 and 2 remains for a year from the last day you watched any lecture video, <br />
                        and 3 remains permanently unless you remove your cookies.</p>

                    <h3>Why are these cookies tracked?</h3>
                    <p>These cookies help you explore more comfortably when using this website.<br />
                        Specifically, on the main page, it helps you go to the lecture you want to watch
                        on your next visit at once depending on the last lecture you watched.</p>

                    <h3>Where is the data sent? Is it shared with third parties?</h3>
                    <p>For now, the cookies are not shared anywhere and only exists within your browser, <br />
                        but this may change when Disqus is added in the future. </p>

                    <h3>How can I reject cookies?</h3>
                    <p>To reject collecting cookies, please click the button below. <br />
                        By doing that, we will remove all cookies remaining, and no longer collect any cookies. <br />
                        However, even if you opt out of the collection of cookies,
                        those essential for operation might still be collected (3. whether you consent to cookies that are being collected). </p>
                </ul>
                <CookieSwitcher />
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{"Disable cookies?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            If you disable cookies, we will not be able to record the last lecture
                            that you watched and guide you quickly in the main screen! <br />
                            Continue anyway?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>NO</Button>
                        <Button onClick={handleNoCookieChange}>YES</Button>
                    </DialogActions>
                </Dialog>
                <AnalyticsSwitcher />
            </main>
        </div>
    );
}
