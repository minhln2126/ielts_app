import MainView from "./child/MainView"
import SubView from "./child/SubView"
function PostPage(props) {
  return (
    <div className="container post-page">
      <MainView id={props.match.params.id} />
      <SubView />
    </div>
  )
}
export { PostPage }