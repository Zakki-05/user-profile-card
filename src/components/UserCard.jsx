import React, { useState } from 'react';

const UserCard = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Toggle bio expansion
  const toggleBio = () => setIsExpanded(!isExpanded);

  // Toggle following state
  const toggleFollow = () => setIsFollowing(!isFollowing);

  return (
    <div className="user-card-wrapper">
      <div className="user-card">
        <div className="card-header" style={{ backgroundImage: `url(${user.cover})` }}>
          <div className="header-overlay"></div>
          <div className="header-top">
            <span className="category-badge">DEVELOPER</span>
            <button className="heart-btn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l9.72-9.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="avatar-container">
          <div className="avatar-glow"></div>
          <img src={user.avatar} alt={user.name} className="avatar" />
          {user.verified && (
            <span className="verified-badge-main" title="Verified Professional">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </span>
          )}
          <span className={`status-badge status-${user.status}`}></span>
        </div>

        <div className="user-info">
          <h2 className="user-name">{user.name}</h2>
          <p className="user-role">{user.role}</p>
          
          <div className="location-info">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{user.location}</span>
          </div>

          <p className={`user-bio ${isExpanded ? 'expanded' : ''}`}>
            {user.bio}
          </p>
          
          <button className="read-more-btn" onClick={toggleBio}>
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>

          <div className="user-skills">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
            {user.skills.length > 3 && (
              <span className="skill-tag overflow">+{user.skills.length - 3}</span>
            )}
          </div>

          <div className="user-stats-horizontal">
            <div className="stat-block">
              <span className="stat-num">{user.stats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">{user.connections}</span>
              <span className="stat-label">Following</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">{user.stats.projects}</span>
              <span className="stat-label">Posts</span>
            </div>
          </div>

          <div className="social-links-outlined">
            {['github', 'linkedin', 'twitter', 'instagram'].map((platform) => (
              <a key={platform} href="#" className="social-icon-circle" title={platform}>
                <span className="social-initial">{platform[0].toUpperCase()}</span>
              </a>
            ))}
          </div>

          <div className="card-actions">
            <button 
              className={`btn btn-follow-gradient ${isFollowing ? 'following' : ''}`} 
              onClick={toggleFollow}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button className="btn btn-message-ghost">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
