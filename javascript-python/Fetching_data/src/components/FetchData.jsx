import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css';
import sun from '../assets/sun.png';

function FetchData() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(3); 
    const [loadingMore, setLoadingMore] = useState(false);
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLoadMore = () => {
        setLoadingMore(true); 
        setTimeout(() => {
            setDisplayCount(prevCount => prevCount + 3);
            setLoadingMore(false); 
        }, 1000); 
    };

    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme); 
    };

    return (
        <div style={{textAlign:'center',marginLeft:'50%',marginTop:'10%'}}>
        <div className={`container ${darkTheme ? 'dark-theme' : 'light-theme'}` } >
            <img src={sun} width={80} height={80} onClick={toggleTheme} className='cursor-pointer rounded-lg center-img' alt="Sun" /> {/* Centered sun image */}
            {loading && <div className="loader ml-44"></div>}
            {error && <p>Error: {error}</p>}
            <ul>
                {Array.isArray(users.products) && users.products.slice(0, displayCount).map((data, index) => (
                    <React.Fragment key={index}>
                        <div className='mydiv'>
                            <li>{data.title}</li>
                            <p>{data.description}</p>
                            <img src={data.thumbnail} alt={data.title} style={{ display: 'block', margin: '0 auto', borderRadius:'20px' }} />
                            <br />
                        </div>
                    </React.Fragment>
                ))}
            </ul>
            {users.products && users.products.length > displayCount && (
                <button onClick={handleLoadMore} disabled={loadingMore} className='text-white'>
                    {loadingMore ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
        </div>
    );
}
export default FetchData;