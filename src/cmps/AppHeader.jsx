import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModal } from "./UserModal.jsx";
import { SearchBar } from "./SearchBar.jsx";

export function AppHeader({ bgColor, borderBottom }) {
  const [showUserModal, setShowUserModal] = useState(false);

  const user = useSelector((storeState) => storeState.userModule.user);

  return (
    <header
      className="app-header full"
      style={{ backgroundColor: bgColor, borderBottom: borderBottom }}
    >
      <section>
        <span className="material-symbols-outlined menu">apps</span>
        <Link to={user ? "/workspace" : "/"}>
          <img
            className="logo"
            style={{ width: "5em" }}
            src="https://1000logos.net/wp-content/uploads/2021/05/Trello-logo.png"
          />
        </Link>

        {user && (
          <button className="create-btn">
            <span>Create</span>
          </button>
        )}
      </section>

      {/* {!user && (
          <section>
            <button className="login-btn" onClick={handleOpenAuth}>
              <Link to={"/auth/login"}>
                <span>Login</span>
              </Link>
            </button>

            <button className="signup-btn" onClick={handleOpenAuth}>
              <Link to={"/auth/signup"}>
                <span>Get Trello for free</span>
              </Link>
            </button>
          </section>
        )} */}

      {/* {user && ( */}
      <section>
        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {/* <div>
            <input />
            <span class="material-symbols-outlined">search</span>
          </div> */}

        <SearchBar />

        <div
          style={{ backgroundColor: "orange" }}
          className="profile"
          onClick={() => setShowUserModal(!showUserModal)}
        >
          <span>U</span>
          {/* <span>{user.fullname.charAt(0).toUpperCase()}</span> */}
        </div>
      </section>
      {/* )} */}
      {showUserModal && (
        <UserModal
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
        />
      )}
    </header>
  );
}
