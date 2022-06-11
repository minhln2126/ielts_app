export default function TestsTable(props) {
  return (
    <div className="table-view" style={{ height: "454px" }}>
      <h3>Danh sách test</h3>
      <div className="header">
        <div className="name">
          Tên test
        </div>
        <div className="level">
          Loại
        </div>
        <div className="number-questions">
          Số section
        </div>
        <div className="time">
          Thời gian
        </div>
        <div className="action">
          Tùy chỉnh
        </div>
      </div>
      <div className="data-row-container">
        {
          props.tests.map((v, i) => {
            return (
              <div className="data-row" key={i}>
                <div className="name">
                  {v.name}
                </div>
                <div className="level">
                  {v.type === "reading" ? "Reading" : "Listening"}
                </div>
                <div className="number-questions">
                  {v.sections.length}
                </div>
                <div className="time">
                  {v.time}
                </div>
                <div className="action">
                  <button onClick={() => props.onDelete(v)} className="delete-btn">
                    <i className="far fa-trash-alt"></i>
                  </button>
                  <button onClick={() => props.onEdit(v)} className="edit-btn">
                    <i className="far fa-edit"></i>
                  </button>
                </div>
              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}