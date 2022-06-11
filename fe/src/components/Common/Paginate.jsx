export default function Paginate(props) {
  let listPage = [];
  for (let i = 0; i < props.totalPage; i++) {
    listPage[i] = i + 1;
  }
  return (
    <div className="paginate" style={{ display: props.totalPage > 1 ? "flex" : "none" }}>
      {
        listPage.map((v, i) => {
          let customClass = v === props.currentPage ? "page-index index-active" : "page-index"
          return <div onClick={() => props.handleChangePage(v)} key={i} className={customClass}>{v}</div>
        })
      }
    </div>
  )
}