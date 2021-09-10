import { useEffect, useState } from "react";
const Header = () => {
    const [name, setName] = useState('');
    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) {
            try {
                setName(JSON.parse(user).name);
            } catch(e) {

            }
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('user');
    };

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <h6 className="navbar-brand">{name}</h6>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-0">
                        <button className="btn btn-danger my-2 my-sm-0" onClick={logout}>Logout</button>
                    </form>
                </div>
            </nav>
        </>
    )
};
export default Header;    