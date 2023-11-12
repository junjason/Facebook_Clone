import './Footer.css';
import { useSelector } from 'react-redux';

function Footer() {
    const sessionUser = useSelector(state => state.session.user);
    let footer;
    if (!sessionUser) {
        footer = (
            <div id="footer">
                <div id="links">
                    <a href="https://github.com/junjason/" target="_blank">Github</a>
                    <a href="https://www.linkedin.com/in/jason-jun-0a7576237/" target="_blank">LinkedIn</a>
                </div>
                <hr></hr>
                <div id="tech-stack">
                    <div>Ruby Rails JavaScript React/Redux HTML CSS/SASS Express.js Node.js Java C++ PostgreSQL MongoDB </div> 
                </div>
                <span>Jason Jun &copy; 2023</span>
            </div>
        )
    }

    return (
        <>
            {footer}
        </>
    );
}

export default Footer;
