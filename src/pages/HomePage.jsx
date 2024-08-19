import HomeImg from "../assets/imgs/home-img.webp";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="home-page ">
      <section className="guest-home-page">
        <div className="text-container">
          <h1>Trello brings all your tasks, teammates, and tools together</h1>
          <p>Keep everything in the same place-even if your team isn’t.</p>

          <div className="demo-btn-container">
            <Link to="/workspace">
              <button>
                <span>Try demo - it's free!</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="homepage-img-container">
          <img src={HomeImg} alt="" />
        </div>
      </section>
    </section>
  );
}
