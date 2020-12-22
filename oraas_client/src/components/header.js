import '../App.css';

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <h3 className="navbar-brand">3 Maskeliler</h3>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/classes">Class List</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/myimages">My Image</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;