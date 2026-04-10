import { useState } from 'react'
import './App.css'


const initialPost = {
  id: 1,
  title: "Getting Started with React",
  content: "This is the first post",
  author: "Piper Law",
  date: "March 20, 2026",
  likes: 0
}

function App() {
  const [post, setPost] = useState({ ...initialPost, isLiked: false })
  const [comments, setComments] = useState([])
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked
    }))
  }
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      id: Date.now(),
      author: commentName || 'Anonymous',
      text: commentText || 'No comment',
      date: new Date().toLocaleDateString()
    }
    setComments([newComment, ...comments])
    setCommentName('')
    setCommentText('')
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>My React Blog</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <div className="blog-section">
          <h2 className="section-title">Latest Post</h2>
          <div className="post-card">
            <div className="post-header">
              <h2 className="post-title">{post.title}</h2>
              <span className="post-date">{post.date}</span>
            </div>
            
            <p className="post-content">{post.content}</p>
            
            <div className="post-footer">
              <div className="post-author">
                <span className="author-label">By:</span>
                <span className="author-name">{post.author}</span>
              </div>
              
              <button 
                className={`like-button ${post.isLiked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                ❤️ {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
              </button>
            </div>
          </div>
        </div>
        <div className="comments-section">
          <div className="comment-box">
            <h3>Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name (optional)"
                />
              </div>
              
              <div className="form-group">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Type your comment here!"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Post Comment
              </button>
            </form>
          </div>
          <div className="comment-list">
            <h3>Comments ({comments.length})</h3>
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first!</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.author}</strong>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p>{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>©2026 React Blog All rights reserved</p>
      </footer>
    </div>
  )
}

export default App