import React from 'react'
import { useCookies } from 'react-cookie'
import { Button } from 'react-bootstrap'

export default function Setting() {
    const [cookies, setCookie, removeCookie] = useCookies(['videoState', 'noCookie', 'cookieAlert']);

    // 1. videoState
    function VideoState() {
        if (cookies.videoState === undefined) {
            return <h1>UNDEF</h1>
        } else {
            return <h1>{cookies.videoState}</h1>
        }
    }

    // 2. noCookie
    function getInitialNoCookie() {
        if (cookies.noCookie === undefined) {
            return false;
        } else {
            return cookies.noCookie;
        }
    }

    const [noCookieStat, setNoCookieUseStat] = React.useState(getInitialNoCookie());

    /**
     * NOTE: delete the maxAge value for release builds.
     */
    const handleNoCookieChange = () => {
        if (noCookieStat === false) {
            // make noCookie true, and delete all other cookies.
            setNoCookieUseStat(true);
            removeCookie('videoState');
            removeCookie('cookieAlert');
            setCookie('noCookie', true, { path: '/', maxAge: 120 });
        } else {
            // make noCookie false
            setNoCookieUseStat(false);
            removeCookie('noCookie');
        }
    }

    const CurrentStat = () => {
        if (noCookieStat === false)
            return <h2>noCookie is not set.</h2>
        else
            return <h2>noCookie is set.</h2>
    }

    function getInitialCookieAlert() {
        if (cookies.cookieAlert === undefined && (cookies.noCookie === false || cookies.noCookie === undefined)) {
            return true;
        } else {
            return false;
        }
    }

    const [cookieAlertShow, setCookieAlertShow] = React.useState(getInitialCookieAlert());

    const CookieAlertStat = () => {
        if (cookieAlertShow === true) {
            return <h2>Show Cookie Alert...</h2>
        } else {
            return <h2>Stop showing cookie alert.</h2>
        }
    }

    return (
        <main>
            <h1>PRIVACY POLICY</h1>
            <h3>
                어떤어떤 이유로 무슨무슨 쿠키 값을 사용합니다. 아마 이 부분은 about 페이지로 포함시킬 듯함
            </h3>

            <Button onClick={handleNoCookieChange}>Change noCookie value</Button>

            <h5>디버깅 목적으로 표시해주는 현재 쿠키 값들: </h5>
            <div>
                <VideoState />
                <CurrentStat />
                <CookieAlertStat />
            </div>
        </main>
    );
}
