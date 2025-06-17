/* React kütüphanesinden useState'i import et */
/* İlgili dosyadan sampleData'yı import et */
/* İlgili dosyadan PostList'i import et */
import "./App.css";

function App() {
  /* Bir state oluştur, sampleData bu state'in başlangıç değeri olmalı  */

  function handleClap(postId) {
    /*
      state oluşturduktan sonra:
      - alttaki kodda place ve setPlace'i kendi verdiğin isimlerle değiştir
      - kodu yorumdan çıkar
    */
    /*
      const copyState = [...place];
      const clappedItem = copyState.filter((item) => item.id === postId)[0];
      clappedItem.claps = clappedItem.claps + 1;
      setPlace(copyState);
    */
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

      {/*
        PostList componentı kullanıma hazır. Kodunu incele ve gerekli props'ları gönder.
      */}
    </div>
  );
}

export default App;
