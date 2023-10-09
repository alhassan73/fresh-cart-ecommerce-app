import React from "react";
import googleBadge from "../../Assets/google-play-badge.svg";
import appleBadge from "../../Assets/app-store-badge.svg";
import amazonBadge from "../../Assets/amazon-pay-icon.svg";
import paypalBadge from "../../Assets/paypal-icon.svg";
import americaneBadge from "../../Assets/american-express.png";
import masterBadge from "../../Assets/mastercard.svg";
export default function Footer() {
  return (
    <>
      <div className="container-fluid p-5 bg-body-secondary  bottom-0">
        <div>
          <h3>Get The Fresh Cart App</h3>
          <p className="text-body-tertiary">
            We will send you a link, Open it on your phone to download the app
          </p>
          <div className="row g-3 pb-4">
            <div className="col-md-10">
              <input
                type="email"
                className="form-control"
                placeholder="Email .."
              />
            </div>
            <div className="col-md-2">
              <button className="btn bg-green-light w-100">Share App Link </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 py-1 border border-bottom border-top border-0 border-2">
            <div className="d-flex justify-content-center align-items-center  flex-wrap gap-3">
              <h5>Payment Partners</h5>
              <img src={amazonBadge} alt="apple-badge" width={80} />
              <img src={americaneBadge} alt="google-badge" width={80} />
              <img src={masterBadge} alt="apple-badge" width={80} />
              <img src={paypalBadge} alt="google-badge" width={80} />
            </div>
            <div className="d-flex justify-content-center align-items-center  flex-wrap gap-2">
              <span>Get Deliveries with FreshCart</span>
              <div className="d-flex gap-2">
                <img src={appleBadge} alt="apple-badge" width={150} />
                <img src={googleBadge} alt="google-badge" width={150} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
