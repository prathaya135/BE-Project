import React, { useEffect, useState } from 'react';
import './style.css';

const StarRating = ({ rating, setRating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? 'filled' : ''}`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('accuracy');
  const [importance, setImportance] = useState('medium');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('token'); // Corrected this line
        const response = await fetch('http://localhost:3002/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.log('Data not fetched:', error.message); // Log the error message
      }
    };
    getData();
  }, []);

  // console.log("pratha",userData);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for comment
    if (!comment.trim()) {
      setSubmissionStatus('Please provide a comment.');
      return;
    }

    const data = {
      email: userData.email, 
      rating,
      comment,
      category,
      importance,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/feedback', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus('Feedback Submitted Successfully');
      } else {
        setSubmissionStatus('Feedback Not Submitted');
      }
    } catch (error) {
      setSubmissionStatus('An error occurred. Please try again later.');
    }

    // Reset form
    setRating(0);
    setComment('');
    setCategory('accuracy');
    setImportance('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form my-2">
      <h2 style={{ textAlign: "center" }}>Feedback and Rating</h2>

      {submissionStatus && (
        <div className="alert alert-info" style={{ textAlign: "center" }}>
          {submissionStatus}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="rating" style={{ fontWeight: "bold" }}>Rate the accuracy:</label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="form-group">
        <label htmlFor="category" style={{ fontWeight: "bold" }}>Feedback Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="accuracy">Accuracy</option>
          <option value="clarity">Clarity</option>
          <option value="helpfulness">Helpfulness</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="importance" style={{ fontWeight: "bold" }}>Importance:</label>
        <select
          id="importance"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="comment" style={{ fontWeight: "bold" }}>Comments:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Provide your feedback here..."
          rows="4"
          required
        />
      </div>
      <button type="submit" className='btnfeed'>Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
