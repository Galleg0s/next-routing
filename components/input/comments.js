import { useState, useEffect, useContext } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const { eventId } = props;

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);

      notificationCtx.showNotification({
        title: "Sending...",
        message: "Loading comments to an event.",
        status: "pending",
      });

      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(`Something went wrong: ${data.message}`);
            });
          }
        })
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);

          notificationCtx.showNotification({
            title: "Success!",
            message: "Successfully loaded comments to an event.",
            status: "success",
          });
        })
        .catch((error) => {
          setIsLoading(false);

          notificationCtx.showNotification({
            title: "Error!",
            message: `Failed to load comments: ${error.message}`,
            status: "error",
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    setIsLoading(true);

    notificationCtx.showNotification({
      title: "Sending...",
      message: "Adding a comment to an event.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(`Something went wrong: ${data.message}`);
          });
        }
      })
      .then((data) => {
        setIsLoading(false);

        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully added a comment to an event.",
          status: "success",
        });
      })
      .catch((error) => {
        setIsLoading(false);
        notificationCtx.showNotification({
          title: "Error!",
          message: `Failed to add a comment to an event: ${error.message}`,
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"}
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loading && <p>Loading comments...</p>}
      {showComments && !loading && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
