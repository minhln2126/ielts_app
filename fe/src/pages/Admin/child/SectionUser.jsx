import { useState } from "react";
import { showStatus } from "../../../helper";
import UpdateUserForm from "./FormUpdateUser";
import AddUserForm from "./FormAddUser";
export default function UserSection(props) {
  const [currentForm, setCurrentForm] = useState("none");
  const [selectedUser, setSelectedUser] = useState({});
  const forms = {
    "none": <></>,
    "update":
      <UpdateUserForm
        onClose={handleCloseForm}
        user={{ ...selectedUser }}
      />
  }
  function handleCloseForm(e) {
    e.preventDefault();
    setCurrentForm("none");
  }
  function handleShowEdit(user) {
    setCurrentForm("update");
    setSelectedUser(user);
  }
  return (
    <div className="admin-section">
      <div className="form-view">
        <AddUserForm />
      </div>
      <div className="table-view">
        <h3>Danh sách người dùng</h3>
        <div className="header">
          <div className="user-name">
            Tên
          </div>
          <div className="email">
            Email
          </div>
          <div className="type">
            Loại
          </div>
          <div className="score">
            Năng động
          </div>
          <div className="badge">
            Huy hiệu
          </div>
          <div className="action">
            Tùy chỉnh
          </div>
        </div>
        <div className="data-row-container">
          {
            props.users.map((v, i) => {
              return (
                <div className="data-row" key={i}>
                  <div className="user-name">
                    {v.name}
                  </div>
                  <div className="email">
                    {v.email}
                  </div>
                  <div className="type">
                    {v.role === "admin" ? "Quản trị" : "Học Viên"}
                  </div>
                  <div className="score">
                    {v.score}
                  </div>
                  <div className="badge-d">
                    {v.badge}
                  </div>
                  <div className="action">
                    <button onClick={() => handleShowEdit(v)} className="edit-btn">
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
      {
        forms[currentForm]
      }
    </div>
  )
}