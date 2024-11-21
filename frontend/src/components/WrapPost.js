import React, { useState } from 'react';
import { createWrap } from '../utils/api';

function WrapPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createWrap({ title, description, isPublic });
        if (response) {
            alert('Wrap posted successfully!');
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <label>
                Public:
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                />
            </label>
            <button type="submit">Post Wrap</button>
        </form>
    );
}

export default WrapPost;
