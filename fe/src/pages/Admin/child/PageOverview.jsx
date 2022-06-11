import InfoCard from "./PageInfoCard"
export default function ReportView(props) {
  return (
    <div className="report-view">
      <InfoCard
        icon="far fa-id-card"
        title="Người dùng"
        number={props.users}
        color="rgb(189, 124, 113)"
      />
      <InfoCard
        icon="far fa-file-alt"
        title="Đề thi"
        number={props.tests}
        color="rgb(77, 189, 133)"
      />
      <InfoCard
        icon="fas fa-tasks"
        title="Câu hỏi"
        number={props.questions}
        color="rgb(77, 185, 189)"
      />
      <InfoCard
        icon="far fa-comments"
        title="Bài viết"
        number={props.posts}
        color="rgb(206, 207, 113)"
      />
    </div>
  )
}