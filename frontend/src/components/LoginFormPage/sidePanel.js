import './SidePanel.css';
import { useSelector } from 'react-redux';

function SidePanel() {
    const sessionUser = useSelector(state => state.session.user);

    let panel;
    if (!sessionUser) {
        panel = (
            <>
                <h1 id="metabook-icon">facebook</h1>
                <h2 id="metabook-desc">Connect with friends and the world around you with facebook</h2>
            </>
        )
    } 

    return (
        <>
            <div id="side-panel">
                {panel}
            </div>
        </>
    )
}

export default SidePanel;
