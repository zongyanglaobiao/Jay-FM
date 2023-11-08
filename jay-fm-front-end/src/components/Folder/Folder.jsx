import {App} from "antd";
import {connect} from "react-redux";
import {memo, useState} from "react";
import {getRandomColor, getRandomId, numberToEnglish} from "../../utils/util";

function FolderUI() {
    const [isShowTip, setIsShowTip] = useState(true)

    //修改颜色
    return (
        <div className='folder-container'>
            {
                isShowTip ?
                <div className='folder-container-tip'>
                    <TipUI></TipUI>
                </div>
                :
                <div className='folder-container-song-list'>

                </div>
            }
            <div className='folder-container-song-card-box'>
                <SongCardUI/>
            </div>
        </div>
    )
}

const TipUI = memo(()=>{
    return (
        <>
            <div key={getRandomId()} className="tip-card">
                <p className="tip-heading">
                    功能介绍
                </p>
                <p>
                    <strong>文件夹：</strong>创建音乐合集可以作为播放列表
                    <br/>
                    <strong>图片：</strong>分享风景
                    <br/>
                    <strong>用户历史：</strong>用于记录访问者
                    <br/>
                    <strong>主页：</strong>听歌
                </p>
            </div>
            <div key={getRandomId()} className="tip-card">
                <p className="tip-heading">
                    作者信息
                </p>
                <p>
                    <strong>姓名：</strong>X
                    <br/>
                    <strong>签名：</strong>the life key is freedom
                </p>
            </div>
            <div key={getRandomId()} className="tip-card">
                <p className="tip-heading">
                    后续
                </p>
                <p>
                    <strong>关于未来：</strong>如果反响不错，将持续打磨
                    <br/>
                    <strong>体验：</strong>如果你有什么好的想法或者对Jay-FM有什么意见皆可向aksisnotx@gmail.com邮箱发送邮件
                </p>
            </div>
        </>
    )
})

/**
 * 专辑列表
 * @type {React.NamedExoticComponent<object>}
 */
const SongCardUI = memo(()=>{
    return (
        <div className="cards">
            {
                ((number)=>{
                    const divArr = []
                    //初始化第一张唱片
                    divArr.push(
                        <div key={`${getRandomId()}`} className='card ' style={{backgroundColor:`rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()})`}}>
                            <p className="tip">Jay</p>
                            <p className="second-text">周杰伦</p>
                        </div>
                    )
                    for (let i = 0; i < number; i++) {
                        divArr.push(
                            <div key={`${getRandomId()}`} className='card ' style={{backgroundColor:`rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()})`}}>
                                <p className="tip">Click Me</p>
                                <p className="second-text">Lorem Ipsum</p>
                            </div>
                        )
                    }
                    return divArr
                })(9)
            }
        </div>
    )
})

const Folder = connect(state=>({}),{})(FolderUI);

export default Folder;