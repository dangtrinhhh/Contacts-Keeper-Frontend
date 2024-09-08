import React from 'react';
import { Carousel } from 'antd';
import background1 from '../img/bg-1.jpg'
import background2 from '../img/bg-2.jpg'
import background3 from '../img/bg-3.jpg'
import background4 from '../img/bg-4.jpg'

const contentStyle1 = {
    height: '500px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#fff',
    backgroundImage: `url(${background1})`,
    fontSize: '2rem',
    textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
};

const contentStyle2 = {
    ...contentStyle1,
    backgroundImage: `url(${background2})`,
};

const contentStyle3 = {
    ...contentStyle1,
    backgroundImage: `url(${background3})`,
};

const contentStyle4 = {
    ...contentStyle1,
    backgroundImage: `url(${background4})`,
};

const App = () => (
    <Carousel autoplay>
        <div>
            <h1 className='carousel-bg-1' style={contentStyle1}>Your Contacts, Anytime, Anywhere.</h1>
        </div>
        <div>
            <h1 className='carousel-bg-2' style={contentStyle2}>Stay Connected, Stay Organized!</h1>
        </div>
        <div>
            <h1 className='carousel-bg-3' style={contentStyle3}>Simplify Your Contact Management.</h1>
        </div>
        <div>
            <h1 className='carousel-bg-4' style={contentStyle4}>Never Lose a Contact Again!</h1>
        </div>
    </Carousel>
);
export default App;