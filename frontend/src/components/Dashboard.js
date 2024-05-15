import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dash1 from "../assets/dashboard1.png";
import dash2 from "../assets/dashboard2.jpg";
import dash3 from "../assets/dashboard3.jpg";
import dash4 from "../assets/dashboard4.jpg";

//Dashboard functional component
const Dashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Change image every 10 seconds
  };
//Render dahsboard component
  return (
    <div className='container w-50  my-2 rounded border'>
      <Slider {...settings}>
        <div className='h-100 w-100'>
          <img src={dash1} alt='Image 1' className='h-100 w-100' />
        </div>
        <div className='h-100 w-100'>
          <img src={dash2} alt='Image 2' className='h-100 w-100' />
        </div>
        <div className='h-100 w-100'>
          <img src={dash3} alt='Image 3' className='h-100 w-100' />
        </div>
        <div className='h-100 w-100'>
          <img src={dash4} alt='Image 4' className='h-100 w-100' />
        </div>
      </Slider>
    </div>
  );
};

//Export Dashboard component
export default Dashboard;
