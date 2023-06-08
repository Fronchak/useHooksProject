import PostType from "../../types/PostType"
import PostCard from "../PostCard"

type Props = {
  posts: Array<PostType>
}

const PostsContainer = ({ posts }: Props) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      { posts.map((post) => (
        <div className="col" key={post.id}>
          <PostCard
            post={post}
            img="https://via.placeholder.com/600/1ee8a4"
          />
        </div>
      )) }
    </div>
  );
}

export default PostsContainer;
