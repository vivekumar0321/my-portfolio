import SectionTitle from "./common/SectionTitle";
import data from "../data/portfolio.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { handleMouseLeave, handleMouseMove } from "../utils/general.helper";

const Testimonials = () => {
  const { testimonials } = data;

  if (!testimonials?.length) return null;

  return (
    <section className="section section-alt" id="testimonials">
      <div className="container">
        <SectionTitle
          title="Testimonials"
          subtitle="What people say about me"
        />

        <div className="testimonial-slider">
          <button className="testimonial-arrow testimonial-prev">
            <FaChevronLeft />
          </button>

          <button className="testimonial-arrow testimonial-next">
            <FaChevronRight />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            speed={700}
            spaceBetween={25}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <SwiperSlide key={idx}>
                {/* Your Original Card */}
                <div
                  className="card card-3d testimonial-card"
                  style={{ padding: "24px" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "15px",
                    }}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-image"
                    />

                    <div>
                      <h5
                        style={{
                          marginBottom: 4,
                          fontWeight: 600,
                        }}
                      >
                        {testimonial.name}
                      </h5>

                      <p
                        style={{
                          margin: 0,
                          fontSize: ".85rem",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {testimonial.company}
                      </p>

                      <small
                        style={{
                          color: "var(--color-primary)",
                        }}
                      >
                        {testimonial.position}
                      </small>
                    </div>
                  </div>

                  <p
                    className="testimonial-review"
                    style={{
                      fontStyle: "italic",
                    }}
                  >
                    "{testimonial.review}"
                  </p>

                  <div className="testimonial-stars">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
