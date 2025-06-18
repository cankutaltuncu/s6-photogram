import { HandsClappingIcon } from "@phosphor-icons/react";
/* İlgili dosyadan PostComment'i import et */
import PostComment from "./PostComment";

/* PostList componentı bu componenta props olarak ne gönderiyor, incele ve kodun geri kalanını buna göre düzenle. */
export default function Post({ item, onClap }) {
  const { imageUrl, username, timestamp, claps, comments, id } = item;
  return (
    <div className="post">
      <img src={imageUrl} /> {/* imageUrl */}
      <div className="post-header">
        <span className="post-owner">{username}</span> {/* username */}
        <span>&middot;</span>
        <span className="post-date">{timestamp}</span> {/* timestamp */}
        {/* buttona onClick ver, burada onClap'i post'un id'sini vererek kullan. */}
        <button className="post-clap" onClick={() => onClap(id)}>
          <HandsClappingIcon />
          <span>{claps || 0}</span> {/* claps sayısı */}
        </button>
      </div>
      <div className="post-comments">
        {/*
          Postun comments arrayini, PostComment ve map metodu kullanarak listele.
          - key vermeyi unutma, değer olarak id'yi kullanabilirsin.
          - map metodu ve key kullanımını PostList dosyasından öğrenebilirsin.
          - PostComment'e props olarak 1 tane veri göndermen bekleniyor. Ne göndermelisin? sampleData'yı inceleyerek bulabilirsin.
        */}
        {comments &&
          comments.map((comment) => (
            <PostComment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}
