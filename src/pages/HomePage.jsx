import { Link } from 'react-router-dom'
import HomeImg from '../assets/imgs/home-img.webp'
import { AppHeader } from '../cmps/AppHeader'
import { LoginSignup } from '../cmps/LoginSignup'
import { useSelector } from 'react-redux'
import { logout } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function HomePage() {
    const user = useSelector(storeState => storeState.userModule.user)
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('logout successfully')
        } catch {
            err => {
                showErrorMsg('OOPs try again')
            }
        }
    }
    return (
        <>
            <AppHeader borderBottom="1px solid #ddd" />

            <section className="home-page ">
                {user ? (
                    <section className="user">
                        <span to={`/user/${user._id}`}>
                            Hello {user.fullname}
                        </span>
                        <button className="btn" onClick={onLogout}>
                            Logout
                        </button>
                    </section>
                ) : (
                    <section className="user">
                        <LoginSignup />
                    </section>
                )}
                <section className="guest-home-page">
                    <div className="text-container">
                        <h1>
                            Trello brings all your tasks, teammates, and tools
                            together
                        </h1>
                        <p>
                            Keep everything in the same place-even if your team
                            isn’t.
                        </p>

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
    )
}
