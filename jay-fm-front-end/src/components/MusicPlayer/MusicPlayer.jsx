import {connect} from "react-redux";

/**
 * 播放器
 * @constructor
 */
function MusicPlayerUI() {
    return (
        <div>
            <h1>播放器</h1>
        </div>
    )
}

const MusicPlayer = connect(state => ({}),{})(MusicPlayerUI)

export default MusicPlayer
