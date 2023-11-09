import {connect} from "react-redux";
import {memo, useCallback, useState} from "react";
import {getRandomId} from "../../utils/util";
import {Button} from "antd";

function FolderUI() {
    const [isShowTip, setIsShowTip] = useState(true)

	//创建缓存函数
	const setTip = useCallback(() => {
		setIsShowTip(!isShowTip);
	}, [isShowTip]);

    //修改颜色
    return (
        <div className='folder-container'>
            {
                isShowTip ?
                <div className='folder-container-tip'>
                    <TipUI/>
                </div>
                :
                <div className='folder-container-song-list'>
					<Button>
						＋1
					</Button>
                </div>
            }
            <div className='folder-container-song-card-box'>
                <SongCardUI setTip={setTip}/>
            </div>
        </div>
    )
}

/**
 * 提示卡片的UI
 * @type {React.NamedExoticComponent<object>}
 */
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
const SongCardUI = memo(({setTip})=>{

	//确认添加一个crad
	const addCard = () => {

	}

    return (
        <div className="cards">
			<div key={`${getRandomId()}`} onClick={setTip} className='card ' style={{backgroundColor:`rgb(4,197,255)`}}>
				<svg   t="1699545937854" className="card-plus-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="200" height="200">
					<path fill="#fff" d="  M902.343 570.936h-331.78v331.833c0 32.337-26.226 58.537-58.564 58.537-32.337 0-58.563-26.2-58.563-58.537V570.936H121.654c-32.364 0-58.564-26.2-58.564-58.538 0-32.325 26.203-58.537 58.564-58.537h331.78V122.028c0-32.325 26.226-58.537 58.563-58.537 32.338 0 58.564 26.213 58.564 58.537v331.834h331.78c32.364 0 58.565 26.211 58.565 58.535-0.001 32.337-26.2 58.536-58.565 58.536z"  p-id="2315"></path>
				</svg>
			</div>
           {/* {
                ((number)=>{
                    const divArr = []
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
            }*/}
        </div>
    )
})

const Folder = connect(state=>({}),{})(FolderUI);

export default Folder;
