/* Post componentından buraya neleri props olarak gönderdin? Onları burada kullan. */
export default function PostComment(/* kodlar buraya */) {
  /* yorum sahibinin adı ve yorumu props'tan kullanılmalı */

  return (
    <p className="post-comment">
      <span>john doe</span> {/* comment.username */}
      <span className="sep">&middot;</span>
      Loremasd ipsum dolor {/* comment.text */}
    </p>
  );
}
