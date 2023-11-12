import './SidePanel.css';
import { useSelector } from 'react-redux';

function SidePanel() {
    const sessionUser = useSelector(state => state.session.user);

    let panel;
    if (!sessionUser) {
        panel = (
            <>
                <h1 id="metabook-icon">facemash</h1>
                <h2 id="metabook-desc">Connect with friends and communities using facemash</h2>
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
