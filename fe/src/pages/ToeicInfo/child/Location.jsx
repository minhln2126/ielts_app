export default function ToeicLocation(props) {
  const hcmLocations = [
    {
      name: 'Văn phòng IDP TP.HCM',
      address: '36 Mạc Đĩnh Chi, phường ĐaKao, quận 1.	'
    },
    {
      name: 'Trung tâm IELTS HCM	',
      address: '14B Cách Mạng Tháng 8, phường Bến Thành, quận 1	'
    },
    {
      name: 'YOLA – Anh Ngữ Thông Minh	',
      address: '224 Pasteur, quận 3	'
    },
    {
      name: 'IDP Nguyễn Thị Thập	',
      address: 'Số 2 Nguyễn Thị Thập, KĐT Him Lam, P. Tân Hưng, Quận 7	'
    },
    {
      name: 'Văn phòng đào tạo quốc tế- Đại học Bách Khoa OISP	',
      address: '268 Lý Thường Kiệt, quận 10 (P.306 Nhà A4)	'
    },
    {
      name: 'IELTS Fighter Warrior IELTS	',
      address: '94 đường Cộng Hòa, quận Tân Bình	'
    },
    {
      name: 'Trung tâm Anh ngữ HP Academy	',
      address: '134 Trần Mai Ninh, phường 12, quận Tân Bình	'
    },
  ];

  const hnLocations = [
    {
      name: 'Văn phòng IDP	',
      address: '30 Triệu Việt Vương, quận Hai Bà Trưng, Hà Nội'
    },
    {
      name: 'Universal	',
      address: '141 Bà Triệu, quận Hai Bà Trưng  '
    },
    {
      name: 'Trường Đại học Ngoại Thương – Khoa Đào tạo Quốc tế	',
      address: 'P1008, Tầng 10, Nhà A,91 Chùa Láng'
    },
    {
      name: 'The IELTS Workshop	',
      address: '55A Võ Văn Dũng, Đống Đa, Hà Nội'
    },
    {
      name: 'Trung tâm Anh ngữ JOLO		',
      address: 'B8, ngõ 128 Thụy Khuê, Tây Hồ, Hà Nội'
    },
    {
      name: 'Trung tâm Oxford English UK	',
      address: 'Tầng 3, 5 Số 83 Nguyễn Ngọc Vũ, Cầu Giấy,Hà Nội'
    },
    {
      name: 'The IELTS Workshop		',
      address: '70 Ngõ 203 Hoàng Quốc Việt, P. Nghĩa Đô, Cầu Giấy, Hà Nội'
    },
    {
      name: 'Universal',
      address: '	619 Nguyễn Văn Cừ, Long Biên, Hà Nội'
    }
  ];

  const dnLocations = [
    {
      name: 'Trung tâm luyện thi IELTS – IELTS Fighter	',
      address: '233 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng  '
    },{
      name: 'Trung tâm Anh ngữ AMA Đà Nẵng		',
      address: '56 Lê Đình Dương, P. Phước Ninh, Q. Hải Châu, Đà Nẵng, Đà Nẵng'
    },{
      name: 'Stairway Education		',
      address: '552/10 Trưng Nữ Vương, P. Hoa Thuan Tay, Hai Chau, Da Nang      '
    },{
      name: 'Trung tâm Anh Ngữ Academy (Academy English Center)		',
      address: '104/9 Lê Đình Lý, Vĩnh Trung, Thanh Khê, Đà Nẵng '
    },{
      name: 'Trung tâm tiếng anh Liên Hiệp (UEC Vietnam)		',
      address: '302 Nguyễn Văn Linh, quận Thanh Khê, TP.Đà Nẵng  '
    }
  ];
  return (
    <div className="toeic-location" style={{ display: props.display }}>
      <h2 id="toeic-location">Thi IELTS ở đâu ?</h2>
      <h3 id="toeic-loc-hcm">Tại TP. Hồ Chí Minh</h3>
      <ol>
        {hcmLocations.map((location, index) => {
          return (
            <li key={index}>
              <b>{location.name}</b>
              <span>{location.address}</span>
            </li>
          );
        })}
      </ol>

      <h3 id="toeic-loc-hn">Tại Hà Nội</h3>
      <ol>
        {hnLocations.map((location, index) => {
          return (
            <li key={index}>
              <b>{location.name}</b>
              <span>{location.address}</span>
            </li>
          );
        })}
      </ol>

      <h3 id="toeic-loc-dn">Tại Đà Nẵng</h3>
      <ol>
        {dnLocations.map((location, index) => {
          return (
            <li key={index}>
              <b>{location.name}</b>
              <span>{location.address}</span>
            </li>
          );
        })}
      </ol>
    </div>
  )
}