import React from 'react';
import IntroCard from './IntroCard';
export default function SectionInto() {
  return (
    <div className="skill">
      <IntroCard
        name="Linh hoạt"
        image="/img/online.png"
        description="Edulogy là nền tảng học tiếng anh trực tuyến giúp học viên có kế hoạch linh hoạt, chủ động."
      />
      <IntroCard
        name="Miễn phí"
        image="/img/money.png"
        description="Edulogy hoàn toàn miễn phí chúng tôi cam kết không thu bất kỳ loại chi phí nào từ học viên."
      />
      <IntroCard
        name="Cộng đồng"
        image="/img/member.png"
        description="Edulogy có lượng người dùng đông đảo, học viên có thể hỗ trợ lẫn nhau trên các diễn đàng."
      />
      <IntroCard
        name="Tiến độ"
        image="/img/record.png"
        description="Edulogy cung cấp chức năng ghi lại thông tin làm bài giúp kiểm tra tiến độ học của các thành viên."
      />
    </div>
  )
}