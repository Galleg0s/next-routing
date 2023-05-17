import classes from "./comment-list.module.css";

function CommentList({ comments = [] }) {
  if (comments.length === 0) {
    return null;
  }
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => {
        return (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
