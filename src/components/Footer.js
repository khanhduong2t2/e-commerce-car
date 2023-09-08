import React from 'react'

export default function Footer() {
    return (
        <div id="footer">
            <img width="577px" height="349px" src="https://firebasestorage.googleapis.com/v0/b/save-portfolio.appspot.com/o/portfolio%2Flogo_black.png?alt=media&token=4eb40ce4-0e42-416a-9f67-94500cd5ce50"
                className="footer-img" alt="footer_image" />
            <div className="title-text-footer">
                <p>THANK YOU</p>
                <h1>ELECTRIC CARS</h1>
            </div>
            <div className="footer-row">
                <div className="footer-left">
                    <h1>Founding Date</h1>
                    <p><i className="fa fa-clock-o"></i>Monday 11th April 2023</p>
                    <p><i className="fa fa-users"></i>Electric Cars Company</p>
                </div>
                <div className="footer-right">
                    <h1>Get In Touch</h1>
                    <p>Electric Street, Ho Chi Minh City<i className="fa fa-map-marker"></i></p>
                    <p>support@gmail.com<i className="fa fa-paper-plane"></i></p>
                    <p>+08 12345 9999<i className="fa fa-phone"></i></p>
                </div>
            </div>

            <div className="social-links">
                <i className="fa fa-facebook"></i>
                <i className="fa fa-instagram"></i>
                <i className="fa fa-twitter"></i>
                <i className="fa fa-youtube-play"></i>
                <p>Copyright - 2023 Electric</p>
            </div>
        </div>
    )
}