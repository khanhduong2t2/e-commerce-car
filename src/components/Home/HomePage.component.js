import React from 'react';
import ChatBot from '../ChatBot/ChatBot.component';
import Banner from '../Banner/Banner.component';
import ListProduct from '../Product/ListProduct.component';
// import Contact from '../Contact/Contact.component';

export default function HomePage() {
    return (
        <>
            <Banner></Banner>
            <ListProduct></ListProduct>
            <ChatBot></ChatBot>
            {/* <Contact></Contact> */}
        </>
    )
}
