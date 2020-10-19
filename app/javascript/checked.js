function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function(post) {
    // addEventListenerが重複して追加されることを回避する。一秒の間にtrueもfalseも連続で行われないよう。
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // クリックイベントに関する記載
    post.addEventListener("click", () => {
      // ここにクリックした時に行う「何らかの処理」を記述していく
      // 何らかの処理とは、ルーティングで生成された「/posts/:id」というエンドポイントへのリクエスト処理のことです。
      // index.html.erbに記載したdata-idの値を取得する記述
      const postId = post.getAttribute("data-id");
      // checked.js(このファイル)でXMLHttpRequestを使用できるようオブジェクトを作成する
      const XHR = new XMLHttpRequest();
      // openメソッドでリクエストの詳細を設定
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスとして欲しい情報の設定。今回はjson形式で取得する設定。
      XHR.responseType = "json";
      // 最後に、設定した情報をサーバーサイドへ送信するsendメソッドを使用する
      XHR.send();
      // レスポンスなどの受信が成功した時に呼び出されるイベントハンドラー
      XHR.onload = () => {
        // レスポンスのステータスコードが200(処理の成功)以外だった場合、アラートを表示する。
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        // レスポンスされてきたJSONにアクセス
        const item = XHR.response.post;
        // 既読であればHTMLに定義した属性data-checkの属性値にtrueをセットする。未読の場合はdata-checkごと削除する。
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// ページにアクセスした時に発火
//window.addEventListener("load", check);
// 一秒に一度発火
setInterval(check, 1000);