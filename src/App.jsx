/* React kütüphanesinden useState'i import et */
import React, { useState } from "react";

/* İlgili dosyadan sampleData'yı import et */
import sampleData from "./sampleData";

/* İlgili dosyadan PostList'i import et */
import PostList from "./components/PostList";

import "./App.css";

function App() {
  /* Bir state oluştur, sampleData bu state'in başlangıç değeri olmalı  */
  const [items, setItems] = useState(sampleData);

  function handleClap(postId) {
    /*
      state oluşturduktan sonra:
      - alttaki kodda place ve setPlace'i kendi verdiğin isimlerle değiştir
      - kodu yorumdan çıkar
    */

    const copyState = [...items];
    const clappedItem = copyState.filter((item) => item.id === postId)[0];
    clappedItem.claps = clappedItem.claps + 1;
    setItems(copyState);
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>photogram.</h1>
      </div>
      {/*
        State içinde saklanan veriyi, PostList ve map metodu kullanarak listele.
        - key vermeyi unutma, değer olarak id'yi kullanabilirsin.
        - map metodu ve key kullanımını PostList dosyasından öğrenebilirsin.
      */}

      <div className="post-list-container">
        <PostList items={items} clapAction={handleClap} />
      </div>

      {/*
        PostList componentı kullanıma hazır. Kodunu incele ve gerekli props'ları gönder.
      */}
    </div>
  );
}

export default App;
