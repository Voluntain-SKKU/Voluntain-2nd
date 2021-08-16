import Head from 'next/head'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import styles from '../styles/Home.module.css'

import { MainBanner } from '../components/MainBanner'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { url } from '../config/next.config' //url 가져오기


/**
 * 개인정보 정책 페이지입니다.
 */
export default function Setting( { titles } ) {
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

    /**
     * 사용자가 쿠키를 비활성화할 경우, noCookie를 true로 하고
     * 나머지 쿠키를 지웁니다.
     * 
     * noCookie와 noAnalytics 쿠키는 지우지 않습니다.
     */
    const handleNoCookieChange = () => {
        if (noCookieStat === false) {
            setNoCookieUseStat(true);
            removeCookie('courseId');
            removeCookie('lectureId');
            removeCookie('videoEnd');
            removeCookie('cookieAlert');
            removeCookie('isLastLecture');
            setCookie('noCookie', true, { path: '/', maxAge: 31536000 });
            handleCloseDialog();
        } else {
            setNoCookieUseStat(false);
            removeCookie('noCookie');
        }
    }

    const CookieSwitcher = () => {
        if (noCookieStat === false) {
            return (
                <div className={styles.about}>
                    <p className={styles.aboutfont}>All cookies are now being collected.</p>
                    <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
                        Disable and remove all cookies
                    </Button>
                </div>
            );
        } else {
            return (
                <div className={styles.about}>
                    <p className={styles.aboutfont}>Some of cookies are not being collected.</p>
                    <Button variant="contained" color="primary" onClick={handleNoCookieChange}>
                        Enable cookies
                    </Button>
                </div>
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
                <div className={styles.about}>
                    <p className={styles.aboutfont}>All statistical information is being collected.</p>
                    <Button variant="contained" color="secondary" onClick={handleAnalyticsChange}>
                        Disable analytics
                    </Button>
                </div>
            );
        } else {
            return (
                <div className={styles.about}>
                    <p className={styles.aboutfont}>No statistical information is collected.</p>
                    <Button variant="contained" color="primary" onClick={handleAnalyticsChange}>
                        Enable analytics
                    </Button>
                </div>
            );
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Privacy Policy - Voluntain</title>
            </Head>
            <div className="Head">
                <MainBanner />
            </div>
            <main>
                <div>
                    <Paper className={styles.about}>
                        <Grid container spacing={2}>
                        <Grid item xs={6} sm container>
                            <CookieSwitcher />
                            <Dialog open={openDialog} onClose={handleCloseDialog}>
                                <DialogTitle>{"Disable cookies?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        If you disable cookies, we will not be able to record the last lecture that you watched and guide you quickly in the main screen! Continue anyway?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>NO</Button>
                                    <Button onClick={handleNoCookieChange}>YES</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        <Grid item xs={6} sm container>
                            <AnalyticsSwitcher />
                        </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    01. WHAT INFORMATION DO WE COLLECT?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont2}>
                                    Personal information you disclose to us
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    In Short: We collect personal information that you provide to us.
                                </p>
                                <p className={styles.aboutfont}>
                                    We collect personal information that you voluntarily provide to us when you
                                    express an interest in obtaining information about us or our products and Services,
                                    when you participate in activities on the Website (such as by posting messages in
                                    our online forums or entering competitions, contests or giveaways) or otherwise
                                    when you contact us.
                                </p>
                                <p className={styles.aboutfont}>
                                    The personal information that we collect depends on the context of your
                                    interactions with us and the Website, the choices you make and the products and
                                    features you use. 
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    The personal information we collect may include the following:
                                </p>
                                <p className={styles.aboutfont}>
                                    Personal Information Provided by You. We collect video watching history; and other similar information.
                                </p>
                                <p className={styles.aboutfont}>
                                    Social Media Login Data. We may provide you with the option to register with us
                                    using your existing social media account details, like your Facebook, Twitter or
                                    other social media account. If you choose to register in this way, we will collect the
                                    information described in the section called "HOW DO WE HANDLE YOUR
                                    SOCIAL LOGINS?" below.
                                </p>
                                <p className={styles.aboutfont}>
                                    All personal information that you provide to us must be true, complete and
                                    accurate, and you must notify us of any changes to such personal information.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont2}>
                                    Information automatically collected
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    In Short: Some information — such as your Internet Protocol (IP) address and/or
                                    browser and device characteristics — is collected automatically when you visit our
                                    Website.                                
                                </p>
                                <p className={styles.aboutfont}>
                                    We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or
                                    contact information) but may include device and usage information, such as your
                                    IP address, browser and device characteristics, operating system, language
                                    preferences, referring URLs, device name, country, location, information about
                                    how and when you use our Website and other technical information. This
                                    information is primarily needed to maintain the security and operation of our
                                    Website, and for our internal analytics and reporting purposes.
                                </p>
                                <p className={styles.aboutfont}>
                                    Like many businesses, we also collect information through cookies and similar technologies.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont2}>
                                    The information we collect includes:
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Log and Usage Data. Log and usage data is service-related, diagnostic,
                                usage and performance information our servers automatically collect when
                                you access or use our Website and which we record in log files. Depending
                                on how you interact with us, this log data may include your IP address,
                                device information, browser type and settings and information about your
                                activity in the Website (such as the date/time stamps associated with your
                                usage, pages and files viewed, searches and other actions you take such
                                as which features you use), device event information (such as system
                                activity, error reports (sometimes called 'crash dumps') and hardware
                                settings).
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Device Data. We collect device data such as information about your
                                computer, phone, tablet or other device you use to access the Website.
                                Depending on the device used, this device data may include information
                                such as your IP address (or proxy server), device and application
                                identification numbers, location, browser type, hardware model Internet
                                service provider and/or mobile carrier, operating system and system
                                configuration information.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Location Data. We collect location data such as information about your
                                device's location, which can be either precise or imprecise. How much
                                information we collect depends on the type and settings of the device you
                                use to access the Website. For example, we may use GPS and other
                                technologies to collect geolocation data that tells us your current location
                                (based on your IP address). You can opt out of allowing us to collect this
                                information either by refusing access to the information or by disabling your
                                Location setting on your device. Note however, if you choose to opt out, you
                                may not be able to use certain aspects of the Services.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    02. HOW DO WE USE YOUR INFORMATION?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: We process your information for purposes based on legitimate business
interests, the fulfillment of our contract with you, compliance with our legal
obligations, and/or your consent.
                                </p>
                                <p className={styles.aboutfont}>
                                We use personal information collected via our Website for a variety of business
purposes described below. We process your personal information for these
purposes in reliance on our legitimate business interests, in order to enter into or
perform a contract with you, with your consent, and/or for compliance with our
legal obligations. We indicate the specific processing grounds we rely on next to
each purpose listed below.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    We use the information we collect or receive:
                                </p>
                                <p className={styles.aboutfont}>
                                    Personal Information Provided by You. We collect video watching history; and other similar information.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ To send administrative information to you. We may use your personal
information to send you product, service and new feature information and/or
information about changes to our terms, conditions, and policies.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ To protect our Services. We may use your information as part of our
efforts to keep our Website safe and secure (for example, for fraud
monitoring and prevention).
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ To enforce our terms, conditions and policies for business purposes,
to comply with legal and regulatory requirements or in connection
with our contract.                               
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ To respond to legal requests and prevent harm. If we receive a
subpoena or other legal request, we may need to inspect the data we hold
to determine how to respond.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Fulfill and manage your orders. We may use your information to fulfill and
manage your orders, payments, returns, and exchanges made through the
Website.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Administer prize draws and competitions. We may use your information
to administer prize draws and competitions when you elect to participate in
our competitions.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ To deliver and facilitate delivery of services to the user. We may use
your information to provide you with the requested service.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ To respond to user inquiries/offer support to users. We may use your
information to respond to your inquiries and solve any potential issues you
might have with the use of our Services.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    03. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    In Short: We only share information with your consent, to comply with laws, to
provide you with services, to protect your rights, or to fulfill business obligations.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    We may process or share your data that we hold based on the following legal basis:
                                </p>
                                <p className={styles.aboutfont} >
                                ▶ Consent: We may process your data if you have given us specific consent
to use your personal information for a specific purpose.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Legitimate Interests: We may process your data when it is reasonably
necessary to achieve our legitimate business interests.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Performance of a Contract: Where we have entered into a contract with
you, we may process your personal information to fulfill the terms of our contract.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Legal Obligations: We may disclose your information where we are legally
required to do so in order to comply with applicable law, governmental
requests, a judicial proceeding, court order, or legal process, such as in
response to a court order or a subpoena (including in response to public
authorities to meet national security or law enforcement requirements).
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Vital Interests: We may disclose your information where we believe it is
necessary to investigate, prevent, or take action regarding potential
violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in
litigation in which we are involved.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont} >
                                    More specifically, we may need to process your data or share your personal
information in the following situations:
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Business Transfers. We may share or transfer your information in
connection with, or during negotiations of, any merger, sale of company
assets, financing, or acquisition of all or a portion of our business to another company.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Vendors, Consultants and Other Third-Party Service Providers. We
may share your data with third-party vendors, service providers, contractors
or agents who perform services for us or on our behalf and require access
to such information to do that work. Examples include: payment processing,
data analysis, email delivery, hosting services, customer service and
marketing efforts. We may allow selected third parties to use tracking
technology on the Website, which will enable them to collect data on our
behalf about how you interact with our Website over time. This information
may be used to, among other things, analyze and track data, determine the
popularity of certain content, pages or features, and better understand
online activity. Unless described in this notice, we do not share, sell, rent or
trade any of your information with third parties for their promotional
purposes. We have contracts in place with our data processors, which are
designed to help safeguard your personal information. This means that they
cannot do anything with your personal information unless we have
instructed them to do it. They will also not share your personal information
with any organization apart from us. They also commit to protect the data
they hold on our behalf and to retain it for the period we instruct.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Other Users. When you share personal information or otherwise interact
with public areas of the Website, such personal information may be viewed
by all users and may be publicly made available outside the Website in
perpetuity. If you interact with other users of our Website and register for our
Website through a social network (such as Facebook), your contacts on the
social network will see your name, profile photo, and descriptions of your
activity. Similarly, other users will be able to view descriptions of your
activity, communicate with you within our Website, and view your profile.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    04. WHO WILL YOUR INFORMATION BE SHARED WITH?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    In Short: We only share information with the following categories of third parties.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                We only share and disclose your information with the following categories of third
                                parties. If we have processed your data based on your consent and you wish to
                                revoke your consent, please contact us using the contact details provided in the
                                section below titled "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?".
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Data Analytics Services
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Social Networks
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    05. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: We may use cookies and other tracking technologies to collect and store your information.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                We may use cookies and similar tracking technologies (like web beacons and
                                pixels) to access or store information. Specific information about how we use such
                                technologies and how you can refuse certain cookies is set out in our Cookie
                                Notice.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    06. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: If you choose to register or log in to our services using a social media account, we may have access to certain information about you.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                Our Website offers you the ability to register and login using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media
provider. The profile information we receive may vary depending on the social
media provider concerned, but will often include your name, email address, friends
list, profile picture as well as other information you choose to make public on such
social media platform.
                                </p>
                                <p className={styles.aboutfont}>
                                We will use the information we receive only for the purposes that are described in
this privacy notice or that are otherwise made clear to you on the relevant
Website. Please note that we do not control, and are not responsible for, other
uses of your personal information by your third-party social media provider. We
recommend that you review their privacy notice to understand how they collect,
use and share your personal information, and how you can set your privacy
preferences on their sites and apps.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    07. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: We are not responsible for the safety of any information that you share with third-party providers who advertise, but are not affiliated with, our Website.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                The Website may contain advertisements from third parties that are not affiliated
with us and which may link to other websites, online services or mobile
applications. We cannot guarantee the safety and privacy of data you provide to
any third parties. Any data collected by third parties is not covered by this privacy
notice. We are not responsible for the content or privacy and security practices
and policies of any third parties, including other websites, services or applications
that may be linked to or from the Website. You should review the policies of such
third parties and contact them directly to respond to your questions.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    08. HOW LONG DO WE KEEP YOUR INFORMATION?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                We will only keep your personal information for as long as it is necessary for the
purposes set out in this privacy notice, unless a longer retention period is required
or permitted by law (such as tax, accounting or other legal requirements). No
purpose in this notice will require us keeping your personal information for longer
than 1 year.
                                </p>
                                <p className={styles.aboutfont}>
                                When we have no ongoing legitimate business need to process your personal
information, we will either delete or anonymize such information, or, if this is not
possible (for example, because your personal information has been stored in
backup archives), then we will securely store your personal information and isolate
it from any further processing until deletion is possible.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    09. DO WE COLLECT INFORMATION FROM MINORS?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: We do not knowingly collect data from or market to children under 18 years of age.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                We do not knowingly solicit data from or market to children under 18 years of age.
By using the Website, you represent that you are at least 18 or that you are the
parent or guardian of such a minor and consent to such minor dependent’s use of
the Website. If we learn that personal information from users less than 18 years of
age has been collected, we will deactivate the account and take reasonable
measures to promptly delete such data from our records. If you become aware of
any data we may have collected from children under age 18, please contact us at
skku.voluntain@gmail.com.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    10. WHAT ARE YOUR PRIVACY RIGHTS?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                    In Short: In some regions, such as the European Economic Area (EEA) and
United Kingdom (UK), you have rights that allow you greater access to and control
over your personal information. You may review, change, or terminate your
account at any time.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In some regions (like the EEA and UK), you have certain rights under applicable
data protection laws. These may include the right (i) to request access and obtain
a copy of your personal information, (ii) to request rectification or erasure; (iii) to
restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the
processing of your personal information. To make such a request, please use the
contact details provided below. We will consider and act upon any request in
accordance with applicable data protection laws.
                                </p>
                                <p className={styles.aboutfont}>
                                If we are relying on your consent to process your personal information, you have
the right to withdraw your consent at any time. Please note however that this will
not affect the lawfulness of the processing before its withdrawal, nor will it affect
the processing of your personal information conducted in reliance on lawful
processing grounds other than consent.
                                </p>
                                <p className={styles.aboutfont}>
                                If you are a resident in the EEA or UK and you believe we are unlawfully
processing your personal information, you also have the right to complain to your
local data protection supervisory authority. You can find their contact details here:
https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
                                </p>
                                <p className={styles.aboutfont}>
                                If you are a resident in Switzerland, the contact details for the data protection
authorities are available here: https://www.edoeb.admin.ch/edoeb/en/home.html.
                                </p>
                                <p className={styles.aboutfont}>
                                ▶ Cookies and similar technologies: Most Web browsers are set to accept
cookies by default. If you prefer, you can usually choose to set your browser to
remove cookies and to reject cookies. If you choose to remove cookies or reject
cookies, this could affect certain features or services of our Website. To opt-out of
interest-based advertising by advertisers on our Website visit
http://www.aboutads.info/choices/.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    11. CONTROLS FOR DO-NOT-TRACK FEATURES
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                Most web browsers and some mobile operating systems and mobile applications
include a Do-Not-Track ("DNT") feature or setting you can activate to signal your
privacy preference not to have data about your online browsing activities
monitored and collected. At this stage no uniform technology standard for
recognizing and implementing DNT signals has been finalized. As such, we do not
currently respond to DNT browser signals or any other mechanism that
automatically communicates your choice not to be tracked online. If a standard for
online tracking is adopted that we must follow in the future, we will inform you
about that practice in a revised version of this privacy notice.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    12. DO WE MAKE UPDATES TO THIS NOTICE?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                We may update this privacy notice from time to time. The updated version will be
indicated by an updated "Revised" date and the updated version will be effective
as soon as it is accessible. If we make material changes to this privacy notice, we
may notify you either by prominently posting a notice of such changes or by
directly sending you a notification. We encourage you to review this privacy notice
frequently to be informed of how we are protecting your information.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                If you have questions or comments about this notice, you may email us at skku.voluntain@gmail.com or by post to:
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                Voluntain
                                </p>
                                <p className={styles.aboutfont}>
                                2066, Seobu-ro, Jangan-gu, Suwon-si, Gyeonggi-do
                                </p>
                                <p className={styles.aboutfont}>
                                Sungkyunkwan University
                                </p>
                                <p className={styles.aboutfont}>
                                __________ 16419
                                </p>
                                <p className={styles.aboutfont}>
                                South Korea
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={styles.about}>
                        <Grid item xs={12} sm container>
                            <Grid item xs>
                                <p className={styles.aboutfont2}>
                                    15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                Based on the applicable laws of your country, you may have the right to request
access to the personal information we collect from you, change that information, or
delete it in some circumstances. To request to review, update, or delete your
personal information, please visit: voluntain.skku.ac.kr/setting.
                                </p>
                                <br></br>
                                <p className={styles.aboutfont}>
                                This privacy policy was created using Termly’s Privacy Policy Generator.
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </main>
        </div>
        
    );
}

export const getStaticProps = async () => {

    // 이거 courses에서 뽑아오고 싶은데??
    const data0 = await fetch(`${url}/courses/title`);
    const titles = await data0.json();
  
    return {
      props: {  titles },
      revalidate: 1,//몇 초로 할지?
    };
  };
