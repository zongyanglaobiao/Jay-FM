import {connect} from "react-redux";
import {memo, useEffect, useState} from "react";

/**
 * 播放器
 * @constructor
 */
function MusicPlayerUI() {
    const [isPlay, setIsPlay] = useState(false)
    const [isShowLyrics, setIsShowLyrics] = useState(false)

    //是否展示歌词
    const setLyrics = () => {
        setIsShowLyrics(!isShowLyrics)
    }

    //是否播放
    const setPlay = () => {
        setIsPlay(!isPlay)
    }

    return (
        <div className='music-player-container'>
            <SongLyricsUI isShowLyrics={isShowLyrics}/>
            <div className='music-player'>
                <div className='music-player-outer-ring '>
                    <div className='music-player-common'>
                        <img src={require('../../img/jay.jpg')} alt="jay" className='music-player-common'/>
                    </div>
                </div>
                <div className='music-player-song-info'>
                    <h3>反方向的钟</h3>
                    <h5>周杰伦</h5>
                </div>
                <div className='music-player-box'>
                    <svg    style={{transform: 'rotate(180deg)'}} t="1699195161909" className="music-player-play-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1748" width="200" height="200">
                        <path d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z" p-id="1749"></path>
                    </svg>
                    {
                        isPlay ?
                            <svg onClick={setPlay} t="1699195121351" className="music-player-play-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1596" width="200" height="200">
                                <path d="M121.3 680.4m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#242424" p-id="1597"></path>
                                <path d="M266.5 855.6m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#242424" p-id="1598"></path>
                                <path d="M512 35.6C252.8 35.6 42.6 245.7 42.6 505c0 69 14.9 134.6 41.7 193.6l74.2-35.4c-21.7-48.3-33.7-101.8-33.7-158.2 0-213.8 173.3-387.2 387.2-387.2S899.2 291.1 899.2 505 725.8 892.1 512 892.1c-81.9 0-157.9-25.4-220.4-68.8l-51.2 57.2c1.5 0.7 2.5 2.1 2.5 3.6s0.3 3.2-1.2 3.9c76.7 54.5 169.2 86.2 270.4 86.2 259.2 0 469.4-210.1 469.4-469.4S771.2 35.6 512 35.6z" fill="#242424" p-id="1599"></path>
                                <path d="M419.9 329.1c22.6 0 41 18.3 41 41v261.7c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41V370.1c0-22.6 18.4-41 41-41zM610.9 329.1c22.6 0 41 18.3 41 41v261.7c0 22.6-18.3 41-41 41-22.6 0-41-18.3-41-41V370.1c0-22.6 18.4-41 41-41z" fill="#242424" p-id="1600"></path>
                            </svg>
                            :
                            <svg onClick={setPlay} t="1699195095701" className="music-player-play-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1449" width="200" height="200">
                                <path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#242424" p-id="1450"></path>
                                <path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z" fill="#242424" p-id="1451"></path>
                                <path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z" fill="#242424" p-id="1452"></path>
                            </svg>
                    }
                    <svg t="1699195161909" className="music-player-play-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1748" width="200" height="200"><path d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z" p-id="1749"></path></svg>

                </div>
            </div>
            <div className='music-player-nav'>
                <MusicPlayerNavUI isShowLyrics={isShowLyrics} setLyrics={setLyrics}/>
            </div>
        </div>
    )
}

/**
 * 列表，使用组件缓存
 * @type {React.NamedExoticComponent<{readonly isShowLyrics?: *}>}
 */
const SongLyricsUI = memo(({isShowLyrics}) => {
    return (
        <div className='music-player-lyrics' style={{display: isShowLyrics ? '' : 'none'}}>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>迷迷蒙蒙 你给的梦</p>
            <p>痛不知轻重 泪水鲜红 全面放纵</p>
        </div>
    )
})

/**
 * 歌曲列表，使用组件缓存
 * @type {React.NamedExoticComponent<{readonly isShowPopUp?: *}>}
 */
const PopUpUI = memo(({isShowPopUp})=>{
    useEffect(()=>{
        console.log('PopUpUI is render')})

    return (
        <>
            <div className="main" style={{display:isShowPopUp?'':'none'}}>
                <div className="currentplaying">
                    <svg height="50px" width="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="spotify"><radialGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" r="43.888" cy="572.064" cx="33.34" id="ipdIa4~cOclR8yt_ClW93a"><stop stopColor="#f4e9c3" offset="0"></stop><stop stopColor="#f8eecd" offset=".219"></stop><stop stopColor="#fdf4dc" offset=".644"></stop><stop stopColor="#fff6e1" offset="1"></stop></radialGradient><path d="M51.03,37.34c0.16,0.98,1.08,1.66,2.08,1.66h5.39c2.63,0,4.75,2.28,4.48,4.96	C62.74,46.3,60.64,48,58.29,48H49c-1.22,0-2.18,1.08-1.97,2.34c0.16,0.98,1.08,1.66,2.08,1.66h8.39c1.24,0,2.37,0.5,3.18,1.32	C61.5,54.13,62,55.26,62,56.5c0,2.49-2.01,4.5-4.5,4.5h-49c-1.52,0-2.9-0.62-3.89-1.61C3.62,58.4,3,57.02,3,55.5	C3,52.46,5.46,50,8.5,50H14c1.22,0,2.18-1.08,1.97-2.34C15.81,46.68,14.89,44,13.89,44H5.5c-2.63,0-4.75-2.28-4.48-4.96	C1.26,36.7,3.36,35,5.71,35H8c1.71,0,3.09-1.43,3-3.16C10.91,30.22,9.45,29,7.83,29H4.5c-2.63,0-4.75-2.28-4.48-4.96	C0.26,21.7,2.37,20,4.71,20H20c0.83,0,1.58-0.34,2.12-0.88C22.66,18.58,23,17.83,23,17c0-1.66-1.34-3-3-3h-1.18	c-0.62-0.09-1.43,0-2.32,0h-9c-1.52,0-2.9-0.62-3.89-1.61S2,10.02,2,8.5C2,5.46,4.46,3,7.5,3h49c3.21,0,5.8,2.79,5.47,6.06	C61.68,11.92,60.11,14,57.24,14H52c-2.76,0-5,2.24-5,5c0,1.38,0.56,2.63,1.46,3.54C49.37,23.44,50.62,24,52,24h6.5	c3.21,0,5.8,2.79,5.47,6.06C63.68,32.92,61.11,35,58.24,35H53C51.78,35,50.82,36.08,51.03,37.34z" fill="url(#ipdIa4~cOclR8yt_ClW93a)"></path><linearGradient gradientUnits="userSpaceOnUse" gradientTransform="translate(0 -534)" y2="590.253" y1="530.096" x2="32" x1="32" id="ipdIa4~cOclR8yt_ClW93b"><stop stopColor="#42d778" offset="0"></stop><stop stopColor="#3dca76" offset=".428"></stop><stop stopColor="#34b171" offset="1"></stop></linearGradient><path d="M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57	c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z" fill="url(#ipdIa4~cOclR8yt_ClW93b)"></path><path d="M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105	c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462	c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655	c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364	c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18	c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279	c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876	c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096	c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192	c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193	C49.357,29.961,48.442,30.876,47.165,30.876z" fill="#fff"></path></svg>
                    <p className="heading">Currently Playing</p>
                </div>
                <div className="loader">
                    <div className="song">
                        <p className="name">Time in a Bottle</p>
                        <p className="artist">Jim Corce</p>
                    </div>
                    <div className="albumcover"></div>
                    <div className="loading">
                        <div className="load"></div>
                        <div className="load"></div>
                        <div className="load"></div>
                        <div className="load"></div>
                    </div>
                </div>
                <div className="loader">
                    <div className="song">
                        <p className="name">My Way</p>
                        <p className="artist">Frank Sinatra</p>
                    </div>
                    <div className="albumcover"></div>
                    <div className="play"></div>
                </div>
                <div className="loader">
                    <div className="song">
                        <p className="name">Lemon Tree</p>
                        <p className="artist">Fools Garden</p>
                    </div>
                    <div className="albumcover"></div>
                    <div className="play"></div>
                </div>
            </div>
        </>
    )
})

/**
 * 播放器侧边栏UI，使用组件缓存
 * @constructor
 */
const MusicPlayerNavUI = memo(({isShowLyrics,setLyrics})=>{
    const [isLike, setIsLike] = useState(false)
    const [isShowPopUp, setIsShow] = useState(false)
    //打开/关闭弹窗
    const openOrClosePopUp = () => {
        setIsShow(!isShowPopUp)
    }

    //是否给歌曲爱心
    const setLike = () => {
        setIsLike(!isLike)
    }

    return (
        <div className='music-player-nav-container'>
            {
                isLike ?
                    <svg onClick={setLike} t="1699199793924" className='music-player-nav-container-star music-player-nav-container-common'   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4458" width="200" height="200">
                        <path d="M729.068827 119.55798c-94.686523 0-176.905082 48.314379-217.069851 118.640074-40.163745-70.325695-122.382305-118.640074-217.044268-118.640074-143.767358 0-229.665727 123.660414-229.665727 243.219417 0 283.128359 415.870616 527.841803 433.576883 538.126031 4.062526 2.363837 8.584516 3.538593 13.132088 3.538593 4.547573 0 9.070586-1.174756 13.132088-3.538593 17.706267-10.283204 433.576883-254.997672 433.576883-538.126031C958.708971 243.218394 872.811626 119.55798 729.068827 119.55798z" fill="#ff0303" p-id="4459"></path>
                    </svg>
                    :
                    <svg onClick={setLike} t="1699199753205" className='music-player-nav-container-star music-player-nav-container-common'  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3180" width="200" height="200">
                        <path d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z" fill="#ccc" p-id="3181"></path>
                    </svg>
            }
            <svg t="1699360349459" className='music-player-nav-container-refresh music-player-nav-container-common' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="200" height="200">
                <path d="M911.402 607.602c-21.244-4.25-46.738 8.498-50.987 29.742-42.49 174.208-195.452 293.179-373.909 293.179-212.448 0-386.655-174.208-386.655-386.656s174.207-386.655 386.655-386.655c97.726 0 195.453 38.24 263.436 106.224H571.485c-21.244 0-42.49 16.996-42.49 42.49 0 21.244 16.997 42.489 42.49 42.489h263.436c21.245 0 42.49-16.996 42.49-42.49V42.49C877.41 21.245 860.415 0 834.92 0c-21.245 0-42.49 16.996-42.49 42.49v148.713c-84.979-76.481-195.452-118.97-310.174-118.97-259.186 0-471.635 212.447-471.635 471.634s212.449 471.635 471.635 471.635c216.697 0 403.652-148.714 458.888-356.913 4.25-21.245-8.498-42.49-29.743-50.987z" fill="#ccc" p-id="2315"></path>
            </svg>
            {
                isShowPopUp ?
                    <svg  onClick={openOrClosePopUp}   t="1699361746235" className="music-player-nav-container-star music-player-nav-container-common" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="200" height="200"><path d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h426.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z" fill="#000000" p-id="2325"></path></svg>
                    :
                    <svg  onClick={openOrClosePopUp}   t="1699361746235" className="music-player-nav-container-star music-player-nav-container-common" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="200" height="200"><path d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h426.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z" fill="#ccc" p-id="2325"></path></svg>
            }
            <PopUpUI isShowPopUp={isShowPopUp}/>
            {
                isShowLyrics ?
                    <svg fill='#000000' onClick={setLyrics} t="1699365309064" className="music-player-nav-container-refresh music-player-nav-container-common" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9228" width="200" height="200"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="9229"></path></svg>
                    :
                    <svg fill='#ccc' onClick={setLyrics} t="1699365309064" className="music-player-nav-container-refresh music-player-nav-container-common" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9228" width="200" height="200"><path d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z" p-id="9229"></path></svg>
            }
        </div>
    )
})

const MusicPlayer = connect(state => ({}),{})(MusicPlayerUI)

export default MusicPlayer