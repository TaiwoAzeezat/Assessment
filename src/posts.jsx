import React, { useEffect, useState } from "react";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch posts
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));

        // Fetch users
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));

        // Fetch comments
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json())
            .then((data) => setComments(data));
    }, []);

    return (
        <div>
            {posts.map((post) => {
                const user = users.find((u) => u.id === post.userId);
                const postComments = comments.filter((c) => c.postId === post.id);

                return (
                    <div key={post.id}>
                        <p>User: {user ? user.name : "Loading..."}</p>

                        <h3>{post.title}</h3>
                        <p>{post.body}</p>

                        <h4>Comments:</h4>
                        {postComments.map((comment) => (
                            <p key={comment.id}>{comment.body}</p>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default Posts;