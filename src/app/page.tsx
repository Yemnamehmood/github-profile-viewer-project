'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

const HomePage = () => {
  const [username, setUsername] = useState('YemnaMehmood'); // Pre-fill with your GitHub username
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Add your GitHub API key here (replace with your actual token)
  const GITHUB_API_KEY = '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'; // Replace with your token

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username) return;

      setLoading(true);
      setError(''); // Reset error message

      try {
        // Create headers object and add Authorization with token
        const headers: Record<string, string> = {
          Authorization: `Bearer ${GITHUB_API_KEY}`,
          Accept: 'application/vnd.github.v3+json',
        };

        // Fetch user profile data
        const profileResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!profileResponse.ok) {
          throw new Error("User not found");
        }
        const profileData = await profileResponse.json();
        setUserData(profileData);

        // Fetch user repositories data
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, { headers });
        if (!reposResponse.ok) {
          throw new Error("Could not fetch repositories");
        }
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserData(null);
        setRepos([]);

        // Handle error appropriately
        if (error instanceof Error) {
          setError(error.message); // Set error message
        } else {
          setError("An unknown error occurred"); // Fallback for unknown errors
        }
      } finally {
        setLoading(false);
      }
    };

    // Trigger data fetch if a username is present
    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  const handleSearch = () => {
    if (username.trim()) {
      setUsername(username.trim()); // Avoid whitespace issues
    }
  };

  return (
    <>
      <Head>
        <title>GitHub Profile Viewer</title>
      </Head>
      <div className="container">
        <h1>GitHub Profile Viewer</h1>

        {/* Input for GitHub username */}
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

        {/* Display Profile and Repositories */}
        {userData && (
          <div className="profile-container">
            <h2>{userData.name || 'No name available'}</h2>
            <p>{userData.bio || 'No bio available'}</p>
            <p>{userData.location || 'No location available'}</p>

            <h3>Repositories:</h3>
            <ul>
              {repos.length > 0 ? (
                repos.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </li>
                ))
              ) : (
                <p>No repositories found.</p>
              )}
            </ul>
          </div>
        )}

        {/* Footer */}
        <footer>
          &copy; {new Date().getFullYear()} GitHub profile viewer by Yemna Mehmood
        </footer>
      </div>
    </>
  );
};

export default HomePage;
