'use client'
import { useState } from 'react';

const GitHubProfileViewer = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError(''); // Clear previous errors
    setProfile(null);
    setRepos([]);

    if (!username) {
      setError('Please enter a GitHub username');
      return;
    }

    try {
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
        throw new Error('User not found');
      }
      const profileData = await profileResponse.json();
      setProfile(profileData);

      const reposResponse = await fetch(profileData.repos_url);
      const reposData = await reposResponse.json();
      setRepos(reposData);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>GitHub Profile Viewer</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {profile && (
        <div className="profile-container">
          <h2>{profile.name || profile.login}</h2>
          <p>Bio: {profile.bio || 'No bio available'}</p>
          <p>Followers: {profile.followers}</p>
          <p>Following: {profile.following}</p>
          <p>Public Repos: {profile.public_repos}</p>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
            View Profile on GitHub
          </a>
        </div>
      )}

      {repos.length > 0 && (
        <div className="repositories-container">
          <h3>Repositories:</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                <p>{repo.description || 'No description'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubProfileViewer;
