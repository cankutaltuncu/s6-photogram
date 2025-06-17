import { HandsClappingIcon } from "@phosphor-icons/react";
/* İlgili dosyadan PostComment'i import et */

/* PostList componentı bu componenta props olarak ne gönderiyor, incele ve kodun geri kalanını buna göre düzenle. */
export default function Post(/* burada ne olmalı? */) {
  return (
    <div className="post">
      <img src="" /> {/* imageUrl */}
      <div className="post-header">
        <span className="post-owner"></span> {/* username */}
        <span>&middot;</span>
        <span className="post-date"></span> {/* timestamp */}
        {/* buttona onClick ver, burada onClap'i post'un id'sini vererek kullan. */}
        <button className="post-clap">
          <HandsClappingIcon />
          <span></span> {/* claps sayısı */}
        </button>
      </div>
      <div className="post-comments">
        {/*
          Postun comments arrayini, PostComment ve map metodu kullanarak listele.
          - key vermeyi unutma, değer olarak id'yi kullanabilirsin.
          - map metodu ve key kullanımını PostList dosyasından öğrenebilirsin.
          - PostComment'e props olarak 1 tane veri göndermen bekleniyor. Ne göndermelisin? sampleData'yı inceleyerek bulabilirsin.
        */}
      </div>
    </div>
  );
}
