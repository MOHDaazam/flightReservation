import React, { Component } from 'react'
import './bannerImage.css'
import Banner from '../Assets/img/flightBanner1.jpg'
import Plane from '../../Header/Assets/img/airplane.svg';



class BannerImage extends Component {


    componentDidMount() {
        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span style=color:white !important; class="wrap"> ' + this.txt + '</span>';

            var that = this;
            var delta = 200 - Math.random() * 100;

            if (this.isDeleting) { delta /= 2; }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
            document.body.appendChild(css);
        };
    }


    render() {

        return (
            <div className='flightBanner ' >
                <div className='card-body card-box' >
                    <div className='d-flex justify-content-center'>
                        <img src={Plane} height='40px' width='40px' />
                    </div>
                    <h3 className='text-center' style={{fontWeight:'700',fontFamily:'Josefin Sans'}}>
                        <a href="" style={{ color: 'white !important' }} className="typewrite" data-period="2000" data-type='[ "Search lowest airfare.","We love simplicity for better user experience.", "Book domestic and international flights." ]'>
                            <span className="wrap"></span>
                        </a>
                    </h3>



                </div>
            </div>
        )
    }
}
export default BannerImage;