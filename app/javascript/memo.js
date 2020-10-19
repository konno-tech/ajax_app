function memo() {
  // 投稿するボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンをクリックした際に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // フォームに入力されたデータを取得できるようオブジェクトを生成
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクト生成
    const XHR = new XMLHttpRequest();
    // XMLHttpRequestを初期化
    XHR.open("POST", "/posts", true);
    // レスポンスの定義（HTMLではなくjsonを指定）
    XHR.responseType = "json";
    // 入力された情報をsendメソッドを使用してサーバーサイドへ送信
    // これが成功すればデータが返却される。
    XHR.send(formData);

    // 返却されたデータを用い、HTMLのメモ部分を描画する処理の記述
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // 返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // 次回呼ばれた際に前回のデータが残ってしまうため初期化
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
        // listという要素に対して上記のHTMLを追加します。afterendを指定して、要素listの直後に挿入できます。
        list.insertAdjacentHTML("afterend", HTML);
        // メモの入力フォームに入力された文字を空で上書き
        formText.value = "";
      };
      e.preventDefault();
    });
  }
window.addEventListener("load", memo);