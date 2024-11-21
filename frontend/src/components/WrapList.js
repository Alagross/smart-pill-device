import React, { useEffect, useState } from 'react';
import { listWraps } from '../utils/api';

function WrapList({ filter }) {
    const [wraps, setWraps] = useState([]);

    useEffect(() => {
        async function fetchWraps() {
            const response = await listWraps(filter);
            setWraps(response);
        }
        fetchWraps();
    }, [filter]);

    return (
        <div>
            <h2>Spotify Wraps</h2>
            <ul>
                {wraps.map((wrap) => (
                    <li key={wrap.id}>
                        <h3>{wrap.title}</h3>
                        <p>{wrap.description}</p>
                        <p>Author: {wrap.author}</p>
                        <p>Likes: {wrap.likes_count}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WrapList;
