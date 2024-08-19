import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserModal } from "./UserModal.jsx";

export function AppHeader() {
  const [openForm, setOpenForm] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const user = useSelector((state) => state.userModule.loggedInUser);

  function handleOpenAuth() {
    setOpenForm(!openForm);
  }

  return (
    <>
      <header className="app-header">
        <section>
          <span className="material-symbols-outlined menu">apps</span>
          <Link to={user ? "/workspace" : "/"}>
            <img
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

        {!user && (
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
        )}

        {user && (
          <section>
            <div
              style={{ backgroundColor: "orange" }}
              className="profile"
              onClick={() => setShowUserModal(!showUserModal)}
            >
              <span>{user.fullname.charAt(0).toUpperCase()}</span>
            </div>
          </section>
        )}
        {showUserModal && (
          <UserModal
            showUserModal={showUserModal}
            setShowUserModal={setShowUserModal}
          />
        )}
      </header>
    </>
  );
}
