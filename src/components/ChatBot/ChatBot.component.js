import React, { Component } from 'react';

class ChatBot extends Component {
    componentDidMount() {
        if (!window.kommunicate) {
            (function (d, m) {
                var kommunicateSettings =
                    { "appId": "56fc3e2cde71361ec6ca1f12a4a42715", "popupWidget": true, "automaticChatOpenOnNavigation": true };
                var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
                s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
                var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
                window.kommunicate = m; m._globals = kommunicateSettings;
            })(document, window.kommunicate || {});
        }
    }

    render() {
        return (
            <></>
        );
    }
}

export default ChatBot;