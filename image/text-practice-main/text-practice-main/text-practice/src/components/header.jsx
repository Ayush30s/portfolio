
function Header() {
    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                <a href="/" style={styles.link}>Home</a>
                <a href="/employee-list" style={styles.link}>Employee List</a>
            </nav>
            <div style={styles.userInfo}>
                <span>Hukum Gupta</span>
                <a href="/logout" style={styles.link}>Logout</a>
            </div>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f0f4fa', // Adjust color as needed
        borderBottom: '1px solid #ccc'
    },
    nav: {
        display: 'flex',
        gap: '15px'
    },
    link: {
        color: '#007bff', // Link color
        textDecoration: 'none'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    }
};

export default Header;
