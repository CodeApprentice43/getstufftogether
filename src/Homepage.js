import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false); // Overlay visibility state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch the recently played tracks from the backend
    fetch('https://se-dev.cse.buffalo.edu/CSE442/2024-Fall/nafismor/CompleteHomepage/php/getRecentlyPlayedTracks.php', {
      method: 'GET',
      credentials: 'include', // Ensure session cookies are included
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.items) {
        setRecentlyPlayed(data.items);
        localStorage.setItem('recentlyPlayed', JSON.stringify(data.items)); // Store locally for caching
      }
    })
    .catch(err => console.error('Error fetching recently played tracks:', err));
  }, []);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.leftHeader}>
          <h1 style={styles.title}>Your Library</h1>
        </div>
        <div style={styles.rightHeader}>
          <button style={styles.iconButton}>🔍</button>
          <button style={styles.iconButton} onClick={() => navigate('/settings')}>👤</button>
          <button style={styles.iconButton} onClick={toggleOverlay}>📤</button>
        </div>
      </div>

      <h2 style={styles.subtitle}>Recently Played Playlists</h2>

      <div style={styles.playlistContainer}>
        {recentlyPlayed && recentlyPlayed.length > 0 ? (
          recentlyPlayed.map(item => (
            <div key={item.track.id} style={styles.playlistCard}>
              <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <img src={item.track.album.images[0].url} alt={item.track.name} style={styles.playlistImage} />
                <p style={styles.trackTitle}>{item.track.name}</p>
                <p style={styles.artistName}>{item.track.artists.map(artist => artist.name).join(', ')}</p>
              </a>
            </div>
          ))
        ) : (
          <p>No recently played tracks found.</p>
        )}
      </div>

      {/* Conditionally render the overlay */}
      {showOverlay && (
        <div style={styles.overlay}>
          <div style={styles.overlayContent}>
            <h2>Share this playlist</h2>
            <input type="text" value="tbd.com/share" readOnly style={styles.linkInput} />
            <button onClick={() => navigator.clipboard.writeText("tbd.com/share")}>
              Copy Link
            </button>
            <button onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#DAF7A6',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  rightHeader: {
    display: 'flex',
    gap: '10px',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
  },
  subtitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  playlistContainer: {
    display: 'flex',
    overflowX: 'scroll',
    gap: '20px',
    padding: '10px 0',
    marginTop: '20px',
  },
  playlistCard: {
    flex: '0 0 auto',
    width: '200px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
  playlistImage: {
    width: '100%',
    borderRadius: '10px',
  },
  trackTitle: {
    marginTop: '10px',
    fontWeight: 'bold',
  },
  artistName: {
    color: 'gray',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  linkInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default HomePage;
