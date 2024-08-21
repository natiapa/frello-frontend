import { Link } from "react-router-dom";
import HomeImg from "../assets/imgs/home-img.webp";
import { AppHeader } from "../cmps/AppHeader";

export function HomePage() {
  return (
    <>
      <AppHeader borderBottom="1px solid #ddd" />

      <section className="home-page ">
        <section className="guest-home-page">
          <div className="text-container">
            <h1>Trello brings all your tasks, teammates, and tools together</h1>
            <p>Keep everything in the same place-even if your team isn’t.</p>

            <div className="demo-btn-container">
              <Link to="board">
                <button>Try demo - it's free!</button>
              </Link>
            </div>
          </div>
          <div className="homepage-img-container">
            <img src={HomeImg} alt="" />
          </div>
        </section>
      </section>
    </>
  );
}
