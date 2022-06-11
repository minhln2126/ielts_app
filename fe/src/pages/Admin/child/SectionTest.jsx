import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { testActions } from "../../../actions/testActions";
import { appActions } from "../../../actions/appActions";
import { constants as c } from "../../../constants";
import UpdateTestForm from "./FormUpdateTest";
import AddTestForm from "./FormAddTest";
import TestsTable from "./TableTests";
import ConfirmForm from "./FormConfirm";
export default function TestSection(props) {
  const dispatch = useDispatch();
  const [selectedTest, setSelectedTest] = useState({});
  const [currentForm, setCurrentForm] = useState("none");
  const forms = {
    "none": <></>,
    "confirm":
      <ConfirmForm
        msg="Xác nhận xóa test đã chọn?"
        onCancel={handleCloseForm}
        onConfirm={handleConfirmDelete}
      />,
    "update":
      <UpdateTestForm
        test={{ ...selectedTest }}
        onClose={handleCloseForm}
      />
  }
  function handleCloseForm(e) {
    e.preventDefault();
    setCurrentForm("none");
  }
  function handleDelete(test) {
    setSelectedTest(test);
    setCurrentForm("confirm");
  }
  function handleConfirmDelete() {
    setCurrentForm("none")
    dispatch(appActions.changePopup(c.MESSAGE_POPUP, "", { status: c.LOADING }))
    dispatch(testActions.deleteTest(selectedTest._id));
  }
  function handleShowEdit(test) {
    setSelectedTest({ ...test });
    setCurrentForm("update");
  }
  useEffect(() => { }, [])
  return (
    <div className="admin-section">
      <div className="form-view">
        <AddTestForm />
      </div>
      <TestsTable
        tests={props.tests}
        onDelete={handleDelete}
        onEdit={handleShowEdit}
      />
      {
        forms[currentForm]
      }
    </div>
  )
}