import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPlane,
  FaTwitter,
} from "react-icons/fa";

import "./footerStyle.css";

const Footer = () => {
  return (
    <footer class="bg-white">
      <div class="container py-5">
        <div class="row py-4">
          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <img src="img/logo.png" alt="" width="180" class="mb-3" />
            <p class="font-italic text-muted">
              NyroBoard is a online whitboard that helps you and your
              team,students to collaborate in real time.
            </p>
            <ul class="list-inline mt-4">
              <li class="list-inline-item ">
                <a
                  href="/"
                  target="_blank"
                  title="twitter"
                  className="text-muted"
                >
                  <FaTwitter />
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  href="/"
                  target="_blank"
                  title="facebook"
                  className="text-muted"
                >
                  <FaFacebook />
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  href="/"
                  target="_blank"
                  title="instagram"
                  className="text-muted"
                >
                  <FaInstagram />
                </a>
              </li>
              <li class="list-inline-item">
                <a
                  href="/"
                  target="_blank"
                  title="linkedin"
                  className="text-muted"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Product</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Product Overview
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Templates
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Security
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Integration
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Solution</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Teamwork Collaboration
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Educaation
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Strategic Planning
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Brainstroming & Ideation
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Company</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <a href="/" class="text-muted">
                  About Us
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Contact Us
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Careers
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Legal</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Privacy Policy
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Terms & Conditions
                </a>
              </li>
              <li class="mb-2">
                <a href="/" class="text-muted">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-light py-4">
        <div class="container text-center">
          <p class="text-muted mb-0 py-2">
            © 2021 NyroBoard All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
