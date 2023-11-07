import {App, ColorPicker} from "antd";
import {connect} from "react-redux";
import {memo, useState} from "react";
import {getRandomOf255} from "../../utils/util";

function FolderUI() {
    //修改颜色
    return (
        <div className='folder-container'>
            <div className='folder-container-song-list'>

            </div>
            <div className='folder-container-song-card-box'>
                <SongCardUI/>
            </div>
        </div>
    )
}

const SongCardUI = memo(()=>{
    const { message } = App.useApp();
    const [value, setValue] = useState('#1677ff');

    return (
        <div className='folder-container-song-card'>
            <div className="cards">
                {
                    ((number)=>{
                        const divArr = []
                        for (let i = 0; i < number; i++) {
                            divArr.push(
                                <div className='card ' style={{backgroundColor:`rgb(${getRandomOf255()},${getRandomOf255()},${getRandomOf255()})`}}>
                                    <p className="tip">Hover Me</p>
                                    <p className="second-text">Lorem Ipsum</p>
                                </div>
                            )
                        }
                        return divArr
                    })(10)
                }
            </div>
        </div>
    )
})


const Folder = connect(state=>({}),{})(FolderUI);

export default Folder;