function Footer() {
  return (
    <div className="footer"
      style={{
        background: "url('/img/footer-bg.jpg')"
      }}
      id="footer"
    >
      <div className=" footer__contact footer__link">
        <h4 className="icon">
          <i className="fas fa-phone-alt" />0357857086
        </h4>
        <h4 className="icon">
          <i className="far fa-envelope"></i>info@edulogy.com
        </h4>
      </div>
      <div className="footer__link footer-test-combo">
        <h4 className="link-title">
          Bộ Đề
        </h4>
        <div className="line" style={{ width: "3em" }}></div>
        <a href="/kiem-tra/ets" className="link">
          <i className="fas fa-angle-double-right"></i>ETS Toeic
        </a>
        <a href="/kiem-tra/longman" className="link">
          <i className="fas fa-angle-double-right"></i>Longman Toeic
        </a>
        <a href="/kiem-tra/economy" className="link">
          <i className="fas fa-angle-double-right"></i>Economy Toeic
        </a>
      </div>
      <div className="footer__link footer-test-link">
        <h4 className="link-title">
          Kiểm Tra
        </h4>
        <div className="line" style={{ width: "3em" }}></div>
        <a href="/kiem-tra/part-I" className="link">
          <i className="fas fa-angle-double-right"></i>Part I: Hình ảnh
        </a>
        <a href="/kiem-tra/part-II" className="link">
          <i className="fas fa-angle-double-right"></i>Part II: Hội thoại
        </a>
        <a href="/kiem-tra/part-V" className="link">
          <i className="fas fa-angle-double-right"></i>Part V: Câu không hoàn chỉnh
        </a>
      </div>
      <div className="footer__link">
        <button className="footer-button">
          Đánh giá
        </button>
        <div
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "1em",
            marginBottom: "1em"
          }}>
          Or visit us at</div>
        <button className="visit-btn">
          <i className="fab fa-facebook-f"></i>
        </button>
        <button className="visit-btn">
          <i className="fab fa-twitter"></i>
        </button>
      </div>
    </div>
  )
}
export { Footer }