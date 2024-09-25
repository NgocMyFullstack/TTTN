import React from "react";

export default function Footer() {
  return (
    <>
      <div>
        <section className="hdl-footer pb-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4 pt-4">
                <h3 className="widgettilte">
                  <strong>Liên hệ</strong>
                </h3>
                <ul className="footer-menu">
                  <li>
                    <a href="/">Trang chủ</a>
                  </li>
                  <li>
                    <a href="/post_page">Giới thiệu</a>
                  </li>
                  <li>
                    <a href="/product_all">Tất cả sản phẩm</a>
                  </li>
                  <li>
                    <a href="/postall">Bài viết</a>
                  </li>
                  <li>
                    <a href="/contact">Liên hệ</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 pt-4">
                <h3 className="widgettilte">
                  <strong>Thể loại</strong>
                </h3>
                <ul className="footer-menu">
                  <li>
                    <a href="/product_women">Phụ nữ</a>
                  </li>
                  <li>
                    <a href="/product_man">Đàn ông</a>
                  </li>
                  <li>
                    <a href="product_category/9">Áo sơ mi</a>
                  </li>
                  <li>
                    <a href="product_category/1">Áo khoác</a>
                  </li>
                  <li>
                    <a href="product_category/4">Áo Cardigan</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 pt-3 ">
                <h3 className="widgettilte">
                  <strong>Liên Kết</strong>
                </h3>
                <ul className="footer-menu">
                  <li>
                    <a href="/register">Đăng ký tài khỏan nếu bạn chưa có </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/">Trang facebook</a>
                  </li>
                  <li>
                    <a href="/cart">Giỏ hàng tiệt lợi</a>
                  </li>
                  {/* <li>
                    <a href="post_topic.html">So sánh</a>
                  </li>
                  <li>
                    <a href="contact.html">cookies</a>
                  </li> */}
                </ul>
              </div>
              <div className="col-md-3 pt-3">
                <h3 className="widgettilte">
                  <strong>Về chúng tôi</strong>
                </h3>
                <span>
                  Chào mừng bạn đến P.Oil STORE - nơi thăng hoa phong cách và
                  sáng tạo. Chúng tôi mang đến cho bạn trải nghiệm mua sắm độc
                  đáo với sản phẩm chất lượng và dịch vụ chăm sóc khách hàng tận
                  tâm. Khám phá thế giới thời trang của chúng tôi và hãy để
                  P.Oil STORE là địa chỉ lựa chọn của bạn!
                </span>
              </div>
              <div className="col-md-3 pt-3">
                <h3 className="widgettilte">
                  <strong>liên hệ</strong>
                </h3>
                <span>
                  Chúng tôi rất vui được liên lạc với bạn qua số điện thoại
                  0379367005. Đây là một cách nhanh chóng và tiện lợi để chia sẻ
                  thông tin, giải đáp thắc mắc hoặc đơn giản là kết nối với
                  chúng tôi. Hãy đảm bảo rằng bạn luôn có thể liên hệ để chia sẻ
                  ý kiến hoặc nhận hỗ trợ khi cần thiết. Xin chân thành cảm ơn
                  sự quan tâm của bạn!
                </span>
              </div>
              <div className="col-md-4 pt-4">
                <h3 className="widgettilte">CHÚNG TÔI LÀ AI ?</h3>
                <p className="pt-1">
                  Copyright@ 2024 Poil Shop là hệ thống bán sĩ và lẽ thời trang
                  nam, nữ, trẻ em và quần áo thể thao, mong muốn đem đến chất
                  lượng tốt nhất cho khách hàng.
                </p>
                <p className="pt-1">
                  Địa chỉ: 20/6 Đinh bộ lĩnh, P:24, Q:Bình Thạnh, TP:HCM
                </p>
                <p className="pt-1">
                  Điện thoại: 0379367005(call, zalo) - Email: Poil
                  ngocmyxi007@gmail.com
                </p>
                <h3 className="widgettilte">MẠNG XÃ HỘI</h3>
                <div className="social my-3">
                  <div className="facebook-icon">
                    <a href="https://www.facebook.com/">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </div>
                  <div className="instagram-icon">
                    <a href="https://www.instagram.com/">
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                  <div className="google-icon">
                    <a href="https://www.google.com/">
                      <i className="fab fa-google" />
                    </a>
                  </div>
                  <div className="youtube-icon">
                    <a href="https://www.youtube.com/">
                      <i className="fab fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="dhl-copyright bg-dark py-3">
          <div className="container text-center text-white">
            Thiết kế bởi: Trần Ngọc Mỹ - Phone: 0379367005
          </div>
        </section>
      </div>
    </>
  );
}
