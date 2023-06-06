import React, { useState } from 'react';

function VoteButtons() {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setDownvoted(false);
  };

  const handleDownvote = () => {
    setDownvoted(!downvoted);
    setUpvoted(false);
  };

  return (
    <div className="vote-buttons">
      <button
        className={`upvote-button ${upvoted ? 'clicked' : ''}`}
        onClick={handleUpvote}
      >
        <img className="vote-icon" src="/upvote.png" alt="Upvote" />
      </button>
      <button
        className={`downvote-button ${downvoted ? 'clicked' : ''}`}
        onClick={handleDownvote}
      >
        <img
          className="vote-icon rotated"
          src="/upvote.png"
          alt="Downvote"
        />
      </button>
    </div>


  );
}

export default VoteButtons;
