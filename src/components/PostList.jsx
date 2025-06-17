/* Bu dosyada değişiklik yapma */
import Post from "./Post";

export default function PostList(props) {
  const { items, clapAction } = props;
  return (
    <main>
      {items.map((postData) => (
        <Post key={postData.id} item={postData} onClap={clapAction} />
      ))}
    </main>
  );
}
/* Bu dosyada değişiklik yapma */
