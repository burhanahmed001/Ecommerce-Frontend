import React from 'react';
import './ScreenLoader.scss';
const ScreenLoader = () => {
    return (
        <main className='flex-center' style={{ backgroundColor: "#222", height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, zIndex: 9999 }}>
            <span className="loader"></span>
        </main>
    );
};

export default ScreenLoader;