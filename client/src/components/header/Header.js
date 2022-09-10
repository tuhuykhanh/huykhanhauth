import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './header.scss'
import axios from "axios";

function Header() {

    const auth = useSelector(state => state.infoUser)
    const { user, isLogged } = auth
    const handleLogout =async e =>{
            try {   
                await axios.get('/account/logout')
                localStorage.removeItem('firstLogin')
                window.location.href = '/';
                
            } catch (error) {
                    window.location.href = '/';
            }
    }
    const userInfo = e => {
        return (
            <div className="infouser">
                <div className="image">
                    <img src={user.avatar} alt="img" />
                </div>
                <div className="name">
                    <p>{user.username}</p>
                </div>
                <ul className="boxdowninfo">
                    <Link 
                    className="childrenboxdown" 
                    to='/'
                    onClick={handleLogout}
                    ><li>log out</li></Link>
                </ul>
            </div>
        )
    }
    return (
        <div className="container-header">
            <header className="header">

                <div className="logo">
                    <Link to='/'> <i className="fa-brands fa-reddit"></i></Link>
                </div>
                <div>
                    <Link className="router" to='/test'> test </Link>   
                </div>
                <nav className="navbar">
                    {isLogged
                        ? <Link to='/'>
                            {userInfo()}
                        </Link>
                        : <Link className="router" to='/login'> login </Link>}
                </nav>

            </header>
        </div>
    )
}
export default Header