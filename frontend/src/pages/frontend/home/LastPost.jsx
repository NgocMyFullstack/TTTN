import React, { useEffect, useState } from "react";
import PostService from "../../../services/PostService";
import { urlImage } from "../../../config";
export default function Post() {
  const [post, setPost] = useState([]);
  const [post1, setPost1] = useState([]);
  const [load, setLoad] = useState(true);
  //
  useEffect(() => {
    (async () => {
      const result = await PostService.postnew();
      setPost(result.postnhat);
      setPost1(result.postsau);
      setLoad(false);
    })();
  }, [load]);

  return (
    <section
      className="hdl-lastpost bg-main mt-3 py-4"
      style={{ backgroundColor: "#566573 " }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h3>BÀI VIẾT MỚI</h3>
            <div className="row">
              {post &&
                post.map((brand, index) => {
                  return (
                    <div className="col-md-6">
                      <a href="post_detail.html">
                        <img
                          className="img-fluid"
                          src={urlImage + "post/" + brand.image}
                        />
                      </a>
                      <h3 className="post-title fs-4 py-2">
                        <a href="post_detail.html">{brand.title}</a>
                      </h3>
                      <p> {brand.detail}</p>
                    </div>
                  );
                })}

              <div className="col-md-6">
                {post1 &&
                  post1.map((post1, index) => {
                    return (
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <a href="post_detail.html">
                            <img
                              className="img-fluid"
                              src={urlImage + "post/" + post1.image}
                            />
                          </a>
                        </div>
                        <div className="col-md-8">
                          <h3 className="post-title fs-5">
                            <a href="post_detail.html">{post1.title}</a>
                          </h3>
                          <p>{post1.detail}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-md-3">FACEBOOK</div>
        </div>
      </div>
    </section>
  );
}
