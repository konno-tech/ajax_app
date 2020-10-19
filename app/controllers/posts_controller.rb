class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end
  def create
    # 以下の2行はデータ形式でのレスポンスではなくHTML形式のレスポンス。
    # 非同期通信は画面のリロードを行わずに行われるため、これに合わせた処理に修正。
    # Post.create(content: params[:content])
    # redirect_to action: :index
    # 未読の情報を保存
    post = Post.create(content: params[:content], checked: false)
    # レスポンスをjsonに変更
    render json:{ post: post }
  end
  def checked
    post = Post.find(params[:id])
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    item = Post.find(params[:id])
    render json: { post: item }
  end

end