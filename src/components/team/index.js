import React, { Component, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import team1 from "../../images/team/img-1.jpg";
import team2 from "../../images/team/img-2.jpg";
import team3 from "../../images/team/img-3.jpg";
import team4 from "../../images/team/img-4.jpg";

class TeamSection extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     employee: [],
  //   };
  // }

  // componentDidMount() {
  //   this.getTeamList();
  // }

  // UserList() {
  //   $.getJSON('https://randomuser.me/api/')
  //     .then(({ results }) => this.setState({ person: results }));
  // }

  // async getTeamList() {
  //   let URL = 'https://run.mocky.io/v3/d1345f97-947a-4f10-97b8-e92aa38f646d'
  //   let response = await fetch(URL);
  //   // let result = await response.json();
  //   let result = await response.json().then((results) => {
  //     console.log('result ', results);
  //     this.setState({employee: results});
  //   });
  // }

  render() {
    // const { employee } = this.state;
    const ClickHandler = () => {
      window.scrollTo(10, 0);
    };

    var settings = {
      dots: false,
      arrows: true,
      speed: 1200,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      fade: false,

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };

    const Teams = [
      {
        tImg: team1,
        title: "Vishnu",
        des: "Ceo Beximo",
      },
      {
        tImg: team2,
        title: "Mukul",
        des: "Marketing Manager",
      },
      {
        tImg: team2,
        title: "Virender",
        des: "Manager",
      },
      {
        tImg: team2,
        title: "Ankit",
        des: "Marketing Manager",
      },
    ];
    const Teams2 = [
      {
        tImg: team1,
        title: "Vishnu",
        designation: "CEO",
        des: "Ceo Beximo",
      },
      {
        tImg: team2,
        title: "Mukul",
        des: "Marketing Manager",
      },
      {
        tImg: team2,
        title: "Virender",
        des: "Manager",
      },
      {
        tImg: team2,
        title: "Ankit",
        des: "Marketing Manager",
      },
    ];

    return (
      <section className="team-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-title">
                <h2>
                  Our <span>Gallery</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry has been the industry's standard
                  consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-xs-12">
              <div className="team-grids team-slider owl-carousel">
                <Slider {...settings}>
                  {Teams2.map((team, tms) => (
                    <div className="grid">
                      <div className="img-holder">
                        <img src={team.tImg} alt="" />
                      </div>
                      <div className="details">
                        <h4>{team.title}</h4>
                        {/* <p>{team.des}</p> */}
                        {/* <ul>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-facebook"></i></Link></li>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-twitter-alt"></i></Link></li>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-linkedin"></i></Link></li>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-instagram"></i></Link></li>
                                                </ul> */}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="container section-padding">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-title">
                <h2>
                  {" "}
                  Our <span>Happy Cutomers</span>
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry has been the industry's standard
                  consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-xs-12">
              <div className="team-grids team-slider owl-carousel">
                <Slider {...settings}>
                  {Teams.map((team, tms) => (
                    <div className="grid">
                      <div className="img-holder">
                        <img src={team.tImg} alt="" />
                      </div>
                      <div className="details">
                        <h4>{team.title}</h4>
                        <p>{team.des}</p>
                        {/* <ul>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-facebook"></i></Link></li>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-twitter-alt"></i></Link></li>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-linkedin"></i></Link></li>
                                                    <li><Link onClick={ClickHandler} to="/about"><i className="ti-instagram"></i></Link></li>
                                                </ul> */}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TeamSection;
