import './SidePanel.css';
import { useSelector } from 'react-redux';

function SidePanel() {
    const sessionUser = useSelector(state => state.session.user);

    let panel;
    if (!sessionUser) {
        panel = (
            <>
                <h1>Metabook</h1>
                <h2>Connect with friends and communities using Metabook</h2>
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
