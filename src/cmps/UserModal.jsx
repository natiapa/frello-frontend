import { Link } from "react-router-dom";
import { login, logout, signup } from "../store/actions/user.actions.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function UserModal({ showUserModal, setShowUserModal }) {
  async function onLogout() {
    setShowUserModal(!showUserModal);
    try {
      await logout();
      // showSuccessMsg(`See ya`);
    } catch (error) {
      showErrorMsg("There was a problem");
    }
  }
  return (
    <div className="pop-up-modal">
      {/* <section className="user-details">
        <img
          src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
          alt=""
        />

        <section>
          <span>user name</span>
          <span>user email</span>
        </section>
      </section> */}

      <section className="links">
        <ul>
          <li>
            <Link>
              <span>Setting</span>
            </Link>
          </li>
          <li onClick={onLogout}>
            <Link>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
