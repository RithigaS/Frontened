import React, { useEffect, useState } from 'react';
import HeadMain from '../Header';

const MyBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedBlog, setUpdatedBlog] = useState({ title: "", content: "", category: "", externalLink: "" });
  const [searchCategory, setSearchCategory] = useState("");
  const [newComments, setNewComments] = useState({});
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/blogs');
      const data = await response.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Handle Blog Deletion
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:4000/delete-blog/${id}`, { method: "DELETE" });

      if (response.ok) {
        fetchBlogs(); // Fetch blogs again instead of manually updating state
      } else {
        console.error("Failed to delete blog");
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  }

  const handleEditClick = (blog) => {
    setEditingBlog(blog._id);
    setUpdatedBlog({ title: blog.title, content: blog.content, category: blog.category, externalLink: blog.externalLink });
  };

  const handleUpdate = async () => {
    if (!editingBlog) return;
    try {
      await fetch(`http://localhost:4000/update-blog/${editingBlog}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  const handleCommentSubmit = async (blogId) => {
    const newComment = newComments[blogId];
    if (!newComment) return;
    try {
      const response = await fetch(`http://localhost:4000/blogs/comment/${blogId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      if (response.ok) {
        setNewComments({ ...newComments, [blogId]: '' }); // Clear the comment input
        fetchBlogs(); // Fetch blogs to update the comments list
        alert("Comment added successfully!"); // Show success message
      } else {
        setCommentError("Failed to add comment.");
      }
    } catch (error) {
      setCommentError('Error submitting comment.');
      console.error('Error submitting comment:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    searchCategory === "" || blog.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div>
      <HeadMain />
      <div className="blog-header">
        <h2>My Blogs</h2>
        <input
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="my-blogs">
        {filteredBlogs.length > 0 ? (
          <ul>
            {filteredBlogs.map((blog) => (
              <li key={blog._id}>
                {editingBlog === blog._id ? (
                  <>
                    <input type="text" value={updatedBlog.title} onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })} />
                    <textarea value={updatedBlog.content} onChange={(e) => setUpdatedBlog({ ...updatedBlog, content: e.target.value })} />
                    <input type="text" value={updatedBlog.category} onChange={(e) => setUpdatedBlog({ ...updatedBlog, category: e.target.value })} />
                    <input type="text" placeholder="External Link" value={updatedBlog.externalLink} onChange={(e) => setUpdatedBlog({ ...updatedBlog, externalLink: e.target.value })} />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingBlog(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <p><em>{blog.category}</em></p>
                    <p>Author: {blog.author}</p>
                    <p>Posted on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                    {blog.externalLink && (
                      <p>
                        <strong>Read more:</strong>{" "}
                        <a href={blog.externalLink} target="_blank" rel="noopener noreferrer" style={{ color: "darkblue", textDecoration: "none" }}>
                          Click here
                        </a>
                      </p>
                    )}
                    <button onClick={() => handleEditClick(blog)}>Edit</button>
                    <button onClick={() => handleDelete(blog._id)}>Delete</button>
                    <div>
                      <h4>Comments</h4>
                      <ul>
                        {blog.comments && blog.comments.length > 0 ? (
                          blog.comments.map((comment, index) => (
                            <li key={index}>{comment.content}</li>
                          ))
                        ) : (
                          <p>No comments yet</p>
                        )}
                      </ul>
                      <textarea
                        value={newComments[blog._id] || ''}
                        onChange={(e) => setNewComments({ ...newComments, [blog._id]: e.target.value })}
                        placeholder="Add a comment"
                      />
                      <button onClick={() => handleCommentSubmit(blog._id)}>Post Comment</button>
                      {commentError && <p style={{ color: 'red' }}>{commentError}</p>}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs found for this category</p>
        )}
      </div>
    </div>
  );
};

export default MyBlogPage;
