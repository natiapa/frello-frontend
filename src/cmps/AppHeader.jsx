import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserModal } from './UserModal.jsx'
import { SearchBar } from './SearchBar.jsx'
import { useNavigate } from 'react-router-dom'

export function AppHeader({ bgColor, borderBottom, logoImg, logoColor }) {
    const [showUserModal, setShowUserModal] = useState(false)

    const user = useSelector(storeState => storeState.userModule.user)
    console.log('user:', user)

    return (
        <header
            className="app-header full"
            style={{
                backgroundColor: `${bgColor}`,
                borderBottom: borderBottom,
            }}>
            <section>
                <Link to="/board">
                    <span className="logo-icon-img">
                        <img src={logoImg} alt="" />
                    </span>
                    <span className="logo" style={{ color: `${logoColor}` }}>
                        Frello
                    </span>
                </Link>
            </section>
            {user && (
                <section className="header-right">
                    <div className="user">
                        {user.imgUrl && (
                            <img
                                src={user.imgUrl}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    padding: '4px',
                                }}
                            />
                        )}
                        {!user.imgUrl && (
                            <img src="https://res.cloudinary.com/dj7k9bpa3/image/upload/v1631123736/avatar-1577909_1280_v0wz9o.png" />
                        )}
                    </div>
                </section>
            )}
        </header>
    )
}
