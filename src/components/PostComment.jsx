/* Post componentından buraya neleri props olarak gönderdin? Onları burada kullan. */
export default function PostComment({ comment }) {
  /* yorum sahibinin adı ve yorumu props'tan kullanılmalı */
  const { owner, text } = comment;

  return (
    <p className="post-comment">
      <span>john doe</span> {comment.username}
      <span className="sep">&middot;</span>
      Loremasd ipsum dolor {comment.text}
    </p>
  );
}
