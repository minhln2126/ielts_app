import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { constants as c } from "../../../constants";
import { postActions as a } from "../../../actions/postActions";
import Loading from "./Loading";
import TrendingPost from "./TrendingPost";
export default function SubView(props) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.hot);
  useEffect(() => {
    if (posts.status === c.LOADING)
      dispatch(a.getTrendingPosts());
  }, [])
  return (
    <div className="sub-view">
      <div className="show_flex">
        <button><i className="fas fa-bookmark"></i></button>
        <h4>Bài viết nổi bật</h4>
      </div>
      {
        posts.status === c.LOADING
          ? <Loading />
          :
          <>
            {
              posts.data.map((v) => <TrendingPost key={v._id} {...v} />)
            }
          </>
      }
    </div>
  )
}