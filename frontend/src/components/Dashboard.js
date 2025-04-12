import React, { useState, useEffect, useCallback } from 'react';
import Layout from './Layout';

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isMuted, setIsMuted] = useState(false);

    // Define theme-aware colors outside component to prevent recreation
    const themeColors = {
        accent: '#A29BFE',
        accentSecondary: '#8B84FE',
        buttonBg: '#6C63FF',
        buttonText: '#FFFFFF',
        background: '#1E2A47',
        containerBg: '#2A3655',
        textPrimary: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        textTertiary: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
    };

    // Memoize fetchUserData to prevent unnecessary recreations
    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/data/', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err.message || 'Failed to load user data');
            if (err.response?.status === 401) {  // Fixed error status check
                window.location.href = '/';
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
        
        // Cleanup function
        return () => {
            if (audio) {
                audio.pause();
                audio.src = '';
                setAudio(null);  // Clean up audio state
            }
        };
    }, [fetchUserData]);  // Added fetchUserData to dependencies

    const handlePlayPreview = useCallback(async (previewUrl, trackId) => {
        if (!previewUrl) {
            console.log('No preview URL available for this track');
            return;
        }

        try {
            if (currentlyPlaying === trackId && audio) {
                if (audio.paused) {
                    await audio.play();
                } else {
                    audio.pause();
                }
            } else {
                if (audio) {
                    audio.pause();
                    audio.src = '';
                }
                
                const newAudio = new Audio(previewUrl);
                newAudio.volume = isMuted ? 0 : 1;
                setAudio(newAudio);
                setCurrentlyPlaying(trackId);
                
                await newAudio.play();
                
                newAudio.onended = () => {
                    setCurrentlyPlaying(null);
                };
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            // Reset states on error
            setCurrentlyPlaying(null);
            setAudio(null);
        }
    }, [audio, currentlyPlaying, isMuted]);

    const toggleMute = useCallback(() => {
        if (audio) {
            audio.volume = isMuted ? 1 : 0;
        }
        setIsMuted(prev => !prev);
    }, [audio, isMuted]);

    const handleRefreshData = useCallback(async () => {
        try {
            setRefreshing(true);
            const response = await fetch('http://localhost:8000/api/user/refresh-spotify/', {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to refresh data');
            }
            await fetchUserData();
        } catch (err) {
            console.error('Error refreshing data:', err);
            setError(err.message || 'Failed to refresh data');
        } finally {
            setRefreshing(false);
        }
    }, [fetchUserData]);

    // Create keyframe animation for spinner
    const spinKeyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    // Add style tag for keyframes
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.textContent = spinKeyframes;
        document.head.appendChild(styleSheet);
        return () => styleSheet.remove();
    }, []);

    return (
        <Layout>
            <div style={{ 
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '10px',
                boxSizing: 'border-box'
            }}>
                <section
                    style={{
                        backgroundColor: themeColors.containerBg,
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "'Quicksand', sans-serif",
                            fontSize: '2rem',
                            fontWeight: '600',
                            letterSpacing: '-0.02em',
                            color: themeColors.accent,
                            marginTop: 0,
                        }}
                    >
                        Medication Alerts
                    </h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {[
                            {
                                id: 1,
                                name: 'Oxycodone',
                                alert: '5 left, refill soon'
                            },
                            {
                                id: 2,
                                name: 'Albuterol',
                                alert: 'Will expire in 2 weeks'
                            },
                            {
                                id: 3,
                                name: 'Tylenol',
                                alert: 'Alert: tylenol may interact with with oxycodone. Please consult your doctor.'
                            }
                        ].map((med, index) => (
                            <li
                                key={med.id}
                                style={{
                                    marginBottom: '15px',
                                    borderBottom: `1px solid ${themeColors.borderColor}`,
                                    paddingBottom: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <strong
                                    style={{
                                        color: themeColors.accentSecondary,
                                        marginRight: '15px',
                                        fontSize: '20px',
                                    }}
                                >
                                    #{index + 1}
                                </strong>
                                <div>
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            color: themeColors.textPrimary,
                                        }}
                                    >
                                        {med.name}
                                    </div>
                                    <div style={{ fontSize: '14px', color: themeColors.textSecondary }}>
                                        {med.alert}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </Layout>
    );
}