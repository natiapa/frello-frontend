import { Link } from "react-router-dom";
import HomeImg from "../assets/imgs/home-img.webp";
import { AppHeader } from "../cmps/AppHeader";
import { LoginSignup } from "../cmps/LoginSignup";
import { useSelector } from "react-redux";
import { logout } from "../store/actions/user.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useState } from "react";

export function HomePage() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [isLogin, setIsLogin] = useState(false);
  async function onLogout() {
    try {
      await logout();
      showSuccessMsg("logout successfully");
    } catch {
      (err) => {
        showErrorMsg("OOPs try again");
      };
    }
  }

  function onLogin() {
    setIsLogin(true);
  }
  return (
    <>
      {/* <AppHeader borderBottom="1px solid #ddd" /> */}

      <div className="home-page-header">
        <a>
          <span className="logo-icon-img">
            <img
              src="https://cdn.icon-icons.com/icons2/2699/PNG/512/trello_logo_icon_167765.png"
              alt=""
            />
          </span>
          <span className="logo">Frello</span>
        </a>
        {!isLogin && !user && (
          <button className="login-btn" onClick={onLogin}>
            Log in
          </button>
        )}
        {isLogin && <LoginSignup setIsLogin={setIsLogin} />}
        {user && (
          // <section className="user">
          <>
            {/* <span to={`/user/${user._id}`}>
                            Hello {user.fullname}
                        </span> */}
            <button className="login-btn" onClick={onLogout}>
              Logout
            </button>
          </>
          // </section>
        )}
      </div>

      {!isLogin && (
        <section className="home-page ">
          <section className="guest-home-page">
            <div className="text-container">
              <h1>
                Trello brings all your tasks, teammates, and tools together
              </h1>
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
      )}
    </>
  );
}
