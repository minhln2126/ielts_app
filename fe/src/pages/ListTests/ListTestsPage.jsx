import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { constants as c } from "../../constants";
import { testActions } from "../../actions/testActions";
import queryString from "query-string";
import Loading from "../../components/Common/Loading";
import TestCard from "../../components/Cards/TestCard";
import Paginate from "../../components/Common/Paginate";
function ListTestsPage(props) {
  const dispatch = useDispatch();

  const tests = useSelector(state => state.test.tests);
  let status = useSelector(state => state.test.status);
  let totalPage = useSelector(state => state.test.totalPage);

  const [type, setType] = useState(
    queryString.parse(props.location.search).type
      ? queryString.parse(props.location.search).type
      : ""
  );
  const [query, setQuery] = useState({ ...queryString.parse(props.location.search), page: 1, pagesize: 10 });

  function handleChangeType(t) {
    if (query.type === t) {
      return;
    }
    setType(t);
    setQuery({ ...query, type: t, page: 1 });
    dispatch({ type: "CHANGE_TEST_PAGE" });
  }

  function handleChangePage(page) {
    if (query.page === page) {
      return;
    }
    setQuery({ ...query, page: page });
    dispatch({ type: "CHANGE_TEST_PAGE" });
  }

  useEffect(() => {
    document.title = "Danh sách đề thi";
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    if (status === c.LOADING)
      dispatch(testActions.getTest(query));
  }, [query])
  return (
    <React.Fragment>
      <div className="list-test-page container">
        {
          status === c.LOADING ? <Loading />
            :
            <React.Fragment>
              <div>
                <div className="row">
                  <span>DANH SÁCH ĐỀ THI</span>
                  <div className="flex">
                    <button
                      className={type === "" ? "active" : ""}
                      onClick={() => handleChangeType("")}>
                      Toàn bộ
                    </button>
                    <button
                      className={type === "reading" ? "active" : ""}
                      onClick={() => handleChangeType("reading")}>
                      Reading
                    </button>
                    <button
                      className={type === "listening" ? "active" : ""}
                      onClick={() => handleChangeType("listening")}>
                      Listening
                    </button>
                  </div>
                </div>
                <div className="list-tests">
                  {
                    tests.map((v, i) =>
                      <TestCard
                        key={i}
                        id={v._id}
                        {...v}
                      />)
                  }
                </div>
              </div>
              <Paginate
                totalPage={totalPage}
                handleChangePage={handleChangePage}
                currentPage={query.page}
              />
            </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

export { ListTestsPage }