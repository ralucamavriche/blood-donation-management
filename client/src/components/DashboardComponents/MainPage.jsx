import React from "react";
import BreadcrumsModel from "./../shared/Breadcrum/BreadcrumsModel";

export default function MainPage() {
  return (
    <>
      <BreadcrumsModel
        options={[{ to: "/", name: "Blood Donation" }]}
        currentLink="Dashboard"
      />
      <div className="">
        <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark shadow-lg p-3 mb-5 rounded">
          <div className="col-md-6 px-0">
            <h1 className="display-4 font-italic">Blood Donation</h1>
            <p className="lead my-3">
              WE INVITE YOU TO JOIN US, AS WE KNOW THAT YOU HAVE DONE IT UNTIL
              NOW
            </p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6 ">
            <div className="row no-gutters border rounded  flex-md-row mb-4 shadow-lg p-3 mb-5 bg-white rounded">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary">
                  World Health Organization
                </strong>
                <h3 className="mb-0">Data and statistics</h3>
                <div className="mb-1 text-muted">2011</div>
                <p className="card-text mb-auto">
                Statistics show that one donated unit of whole blood can save up to 3 lives, through separation and use of its components.
                </p>
                <a
                  href="https://www.euro.who.int/en/health-topics/Health-systems/blood-safety/data-and-statistics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stretched-link"
                >
                  Continue reading
                </a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  width="200px"
                  src="https://ehma.org/wp-content/uploads/2017/07/World-Health-Organization-Logo-e1502197179952.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row no-gutters border rounded  flex-md-row mb-4 shadow-lg p-3 mb-5 bg-white rounded">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-success">
                  World Health Organization
                </strong>
                <h3 className="mb-0">Blood donation low among young people</h3>
                <div className="mb-1 text-muted">Jun 2014</div>
                <p className="mb-auto">
                  Over 70% of people aged 18–24 years in the WHO European Region
                  have never given blood
                </p>
                <a
                  href="https://www.euro.who.int/en/health-topics/Health-systems/blood-safety/news/news/2014/06/blood-donation-low-among-young-people"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="stretched-link"
                >
                  Continue reading
                </a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  width="200px"
                  src="https://ehma.org/wp-content/uploads/2017/07/World-Health-Organization-Logo-e1502197179952.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="row">
          <div className="col-md-8 blog-main">
            <h2 className="pb-4 mb-4 font-italic border-bottom">
              What to Do Before, During and After Your Donation
            </h2>

            <div className="blog-post my-4">
              <h2 className="blog-post-title " style={{ color: "#DC143C" }}>
                Additional tips before donating:
              </h2>

              <ul>
                <li>
                  Ask a friend to donate at the same time . You can support each
                  other and do twice as much good!
                </li>
                <li>
                  Have iron-rich foods, such as red meat, fish, poultry, beans,
                  spinach, iron-fortified cereals or raisins.
                </li>
                <li>
                  Get a good night's sleep the night before your donation, eat
                  healthy foods and drink extra liquids.
                </li>
                <li>Keep eating iron-rich foods. </li>
                <li>
                  If you donate frequently, be sure to take multivitamins with
                  iron to ensure you continue to replenish your iron stores
                  before your next donation.
                </li>
              </ul>
            </div>
            <div className="blog-post my-4">
              <h2 className="blog-post-title" style={{ color: "#DC143C" }}>
                Additional tips for the day of your donation:
              </h2>
              <ul>
                <li>
                  Drink an extra 16 oz. of water (or other nonalcoholic drink)
                  before your appointment.
                </li>
                <li>
                  Eat a healthy meal, avoiding fatty foods like hamburgers,
                  fries or ice cream.
                </li>
                <li>
                  Wear a shirt with sleeves that you can roll up above your
                  elbows.
                </li>
                <li>
                  Let us know if you have a preferred arm or particular vein
                  that has been used successfully in the past to draw blood.
                </li>
                <li>
                  Relax, listen to music, talk to other donors or read while you
                  donate.
                </li>
              </ul>
            </div>
            <div className="blog-post my-4">
              <h2 className="blog-post-title" style={{ color: "#DC143C" }}>
                Additional tips for after your donation:
              </h2>
              <ul>
                <li>
                  Keep the strip bandage on for the next several hours; to avoid
                  a skin rash, clean the area around the bandage with soap and
                  water.
                </li>
                <li>
                  Don’t do any heavy lifting or vigorous exercise for the rest
                  of the day.
                </li>
                <li>
                  f the needle site starts to bleed, apply pressure and raise
                  your arm straight up for 5-10 minutes or until bleeding stops.
                </li>
                <li>Keep eating iron-rich foods. </li>
                <li>
                  If you donate frequently, be sure to take multivitamins with
                  iron to ensure you continue to replenish your iron stores
                  before your next donation.
                </li>
              </ul>
            </div>
          </div>

          <aside className="col-md-4 blog-sidebar ">
            <div className="p-4 mb-3 bg-light rounded shadow-lg p-3 mb-5 bg-white rounded">
              <h4 className="font-italic">Give Blood</h4>
              <p className="mb-0">
                Donating Blood Makes a Big Difference in the Lives of Others.
              </p>
            </div>
          </aside>
        </div>
      </div>
      <footer className="blog-footer">
        {/* <p>
          <a href="#">Back to top</a>
        </p> */}
      </footer>
    </>
  );
}
