import {NavLink} from "react-router-dom";
import {createReactReduxContainer} from "../../utils/reduxUtil";
import {isNullOrUndefined} from "../../utils/util";
import {changeThemeAction} from "../../redux/actions";

function  NavIconUI({changTheme,theme}) {
	const initTheme = {
		currentTheme:'light',
		isDark:false
	}
	const  {currentTheme,isDark} = isNullOrUndefined(theme) ? initTheme : theme
	//切换图标
    const switchIcon = () => {
		changTheme(!isDark)
	}
    //返回字体颜色
    const changeColor = isDark => {
        if (isDark) {
            return  {color:'#ccc'}
        }
        return {};
    }

    return (
        <div className='side-nav-icon-container'>
            <div className='side-nav-icon-box'>
                <NavLink to='/folder' className='side-bar-nav-link'>
                    <div className='side-nav-icon-box-common'>
                        <svg t="1698910636976" className="side-bar-nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11890" width="200" height="200">
                            <path fill="#000000" d="M864 192h-384a128 128 0 0 0-128-128h-192a128 128 0 0 0-128 128v640a128 128 0 0 0 128 128h704a128 128 0 0 0 128-128V320a128 128 0 0 0-128-128z m64 640a64 64 0 0 1-64 64h-704a64 64 0 0 1-64-64V384h832v448z m-832-512V192a64 64 0 0 1 64-64h192a64 64 0 0 1 64 64v64h448a64 64 0 0 1 64 64h-832z"  p-id="11891"></path>
                        </svg>
                        <span style={changeColor(isDark)}>歌曲管理</span>
                    </div>
                </NavLink>
                <NavLink to='/images' className='side-bar-nav-link'>
                    <div className='side-nav-icon-box-common'>
                        <svg t="1698910490936" className="side-bar-nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6034" width="200" height="200">
                            <path fill="#000000" d="M150.976 623.010133L321.152 450.730667c30.336-30.72 79.752533-31.287467 110.792533-1.28L857.6 857.429333a9.975467 9.975467 0 0 0 17.066667-7.022933V167.185067a17.066667 17.066667 0 0 0-17.066667-17.066667H168.042667a17.066667 17.066667 0 0 0-17.066667 17.066667v455.825066z m0 91.076267v143.338667a17.066667 17.066667 0 0 0 17.066667 17.066666l594.816 0.149334a7.394133 7.394133 0 0 0 5.141333-12.714667l-380.544-366.464a14.7712 14.7712 0 0 0-20.778667 0.238933l-215.701333 218.385067zM170.666667 85.333333h682.666666c47.1296 0 85.333333 38.203733 85.333334 85.333334v682.666666c0 47.1296-38.203733 85.333333-85.333334 85.333334H170.666667c-47.1296 0-85.333333-38.203733-85.333334-85.333334V170.666667c0-47.1296 38.203733-85.333333 85.333334-85.333334z m533.333333 298.666667c-35.345067 0-64-28.654933-64-64 0-35.345067 28.654933-64 64-64 35.345067 0 64 28.654933 64 64 0 35.345067-28.654933 64-64 64z"  p-id="6035"></path></svg>
                        <span style={changeColor(isDark)}>图片</span>
                    </div>
                </NavLink>
               <NavLink to='/user/history' className='side-bar-nav-link'>
                   <div className='side-nav-icon-box-common'>
                       <svg t="1698910427871" className="side-bar-nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3316" width="200" height="200">
                           <path fill="#000000" d="M725.333333 938.666667c-25.6 0-42.666667-17.066667-42.666666-42.666667v-85.333333c0-72.533333-55.466667-128-128-128H213.333333c-72.533333 0-128 55.466667-128 128v85.333333c0 25.6-17.066667 42.666667-42.666666 42.666667s-42.666667-17.066667-42.666667-42.666667v-85.333333c0-119.466667 93.866667-213.333333 213.333333-213.333334h341.333334c119.466667 0 213.333333 93.866667 213.333333 213.333334v85.333333c0 25.6-17.066667 42.666667-42.666667 42.666667zM384 512c-119.466667 0-213.333333-93.866667-213.333333-213.333333s93.866667-213.333333 213.333333-213.333334 213.333333 93.866667 213.333333 213.333334-93.866667 213.333333-213.333333 213.333333z m0-341.333333C311.466667 170.666667 256 226.133333 256 298.666667s55.466667 128 128 128 128-55.466667 128-128-55.466667-128-128-128zM981.333333 938.666667c-25.6 0-42.666667-17.066667-42.666666-42.666667v-85.333333c0-59.733333-38.4-110.933333-98.133334-123.733334-21.333333-4.266667-34.133333-29.866667-29.866666-51.2 4.266667-21.333333 29.866667-34.133333 51.2-29.866666 93.866667 25.6 157.866667 110.933333 157.866666 209.066666v85.333334c4.266667 21.333333-12.8 38.4-38.4 38.4zM682.666667 507.733333c-17.066667 0-34.133333-12.8-42.666667-29.866666-8.533333-21.333333 8.533333-46.933333 29.866667-51.2 46.933333-12.8 81.066667-51.2 93.866666-93.866667 17.066667-68.266667-25.6-140.8-93.866666-157.866667-21.333333-4.266667-38.4-29.866667-29.866667-51.2 4.266667-21.333333 29.866667-38.4 51.2-29.866666 110.933333 25.6 183.466667 145.066667 153.6 260.266666-21.333333 76.8-81.066667 132.266667-153.6 153.6H682.666667z" p-id="3317"></path></svg>
                       <span style={changeColor(isDark)}>用户历史</span>
                   </div>
               </NavLink>
               <NavLink to='/' className='side-bar-nav-link'>
                  <div className='side-nav-icon-box-common'>
                      <svg t="1699366875744" className="side-bar-nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10207" width="200" height="200">
                          <path fill="#000000" d="M963.161377 382.975415c-0.01842-8.944719-3.936659-17.438161-10.729365-23.25668L614.274338 70.112847c-11.608386-9.939373-28.756951-9.829879-40.2364 0.257873l-329.494363 289.605887c-6.631024 5.828752-10.432607 14.230096-10.432607 23.058159l0 418.240593c0 16.954137 13.744026 30.699186 30.699186 30.699186 16.954137 0 30.699186-13.745049 30.699186-30.699186L295.509341 396.925125 594.565461 134.072555l307.225173 263.114536 0.99363 504.114402-775.666098 0L127.118166 319.134411c0-16.95516-13.745049-30.699186-30.699186-30.699186s-30.699186 13.744026-30.699186 30.699186l0 583.858608c0 15.948227 6.210445 30.94171 17.48728 42.218544 11.276834 11.277858 26.270317 17.488303 42.218544 17.488303l779.054265 0c32.92283 0 59.706847-26.784016 59.706847-59.767222L963.161377 382.975415z" p-id="10208"></path>
                          <path fill="#000000" d="M95.437629 217.304188c36.391838 0 65.999157 29.607318 65.999157 65.998133 0 16.954137 13.745049 30.699186 30.699186 30.699186s30.699186-13.745049 30.699186-30.699186c0-70.246901-57.150628-127.396505-127.397528-127.396505-16.954137 0-30.699186 13.745049-30.699186 30.699186S78.483492 217.304188 95.437629 217.304188z" p-id="10209"></path>
                          <path fill="#000000" d="M132.699278 121.455189c63.051011 0 114.347305 51.296293 114.347305 114.347305 0 16.954137 13.745049 30.699186 30.699186 30.699186s30.699186-13.745049 30.699186-30.699186c0-96.907097-78.838579-175.745676-175.745676-175.745676-16.954137 0-30.699186 13.745049-30.699186 30.699186S115.744117 121.455189 132.699278 121.455189z" p-id="10210"></path><path d="M511.336898 609.064686l0-102.33062c0-16.954137-13.745049-30.699186-30.699186-30.699186-16.954137 0-30.699186 13.745049-30.699186 30.699186l0 102.33062c0 16.954137 13.745049 30.699186 30.699186 30.699186C497.592872 639.763872 511.336898 626.018823 511.336898 609.064686z" p-id="10211"></path>
                          <path fill="#000000" d="M737.847771 609.064686l0-102.33062c0-16.954137-13.745049-30.699186-30.699186-30.699186s-30.699186 13.745049-30.699186 30.699186l0 102.33062c0 16.954137 13.745049 30.699186 30.699186 30.699186S737.847771 626.018823 737.847771 609.064686z" p-id="10212"></path></svg>
                      <span style={changeColor(isDark)}>主页</span>
                  </div>
               </NavLink>
            </div>
            <div className='side-bar-nav-last-icon'>
                <div className='side-bar-nav-circle' style={{border:isDark ? '1px solid #ccc':' 1px solid #0c0c0c'}} onClick={switchIcon}>
                    {
                        isDark ?
                            <svg t="1698937839424" className="side-bar-nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4559" width="200" height="200"><path d="M513.123 795.991c-76.156 0-147.753-29.658-201.603-83.508-53.849-53.849-83.504-125.444-83.504-201.596 0-76.153 29.657-147.749 83.504-201.598 53.85-53.851 125.446-83.508 201.603-83.508 76.147 0 147.742 29.658 201.593 83.508 53.853 53.852 83.511 125.447 83.511 201.598s-29.659 147.747-83.511 201.597c-53.852 53.85-125.445 83.507-201.593 83.507zM513.123 272.352c-131.529 0-238.534 107.007-238.534 238.535s107.006 238.533 238.534 238.533 238.533-107.005 238.533-238.533c0-131.529-107.006-238.535-238.533-238.535z" fill="#CCCCCC" p-id="4560"></path><path d="M513.123 149.007c-12.861 0-23.285-10.426-23.285-23.285v-91.359c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.358c0 12.862-10.426 23.286-23.285 23.286z" fill="#CCCCCC" p-id="4561"></path><path d="M513.123 1010.674c-12.861 0-23.285-10.426-23.285-23.285v-91.346c0-12.861 10.426-23.285 23.285-23.285s23.285 10.426 23.285 23.285v91.346c0 12.861-10.426 23.285-23.285 23.285z" fill="#CCCCCC" p-id="4562"></path><path d="M240.764 261.825c-5.959 0-11.919-2.274-16.466-6.821l-64.592-64.591c-9.094-9.093-9.094-23.838 0-32.931 9.093-9.094 23.838-9.094 32.931 0l64.593 64.592c9.094 9.093 9.094 23.838 0 32.931-4.546 4.545-10.507 6.82-16.467 6.82z" fill="#CCCCCC" p-id="4563"></path><path d="M850.050 871.111c-5.958 0-11.919-2.272-16.467-6.82l-64.593-64.593c-9.093-9.094-9.093-23.839 0-32.932 9.094-9.094 23.839-9.094 32.932 0l64.593 64.593c9.093 9.094 9.093 23.839 0 32.932-4.546 4.545-10.507 6.82-16.466 6.82z" fill="#CCCCCC" p-id="4564"></path><path d="M36.59 534.183c-12.861 0.001-23.286-10.423-23.289-23.283-0.001-12.861 10.423-23.286 23.283-23.289l91.348-0.011c12.861-0.001 23.286 10.423 23.289 23.283 0.001 12.861-10.423 23.286-23.283 23.289l-91.348 0.011z" fill="#CCCCCC" p-id="4565"></path><path d="M989.613 534.173h-91.346c-12.861 0-23.285-10.426-23.285-23.285s10.426-23.285 23.285-23.285h91.346c12.861 0 23.285 10.426 23.285 23.285s-10.426 23.285-23.285 23.285z" fill="#CCCCCC" p-id="4566"></path><path d="M176.173 871.122c-5.959 0-11.919-2.272-16.466-6.82-9.094-9.094-9.094-23.839 0-32.932l64.593-64.593c9.094-9.094 23.838-9.094 32.931 0s9.094 23.839 0 32.932l-64.593 64.593c-4.546 4.546-10.506 6.82-16.466 6.82z" fill="#CCCCCC" p-id="4567"></path><path d="M785.457 261.825c-5.959 0-11.918-2.272-16.467-6.821-9.094-9.094-9.093-23.838 0.001-32.931l64.593-64.592c9.094-9.093 23.838-9.094 32.931 0s9.093 23.838-0.001 32.931l-64.593 64.592c-4.545 4.546-10.506 6.821-16.465 6.821z" fill="#CCCCCC" p-id="4568"></path></svg>
                            :
                           <svg t="1698895234298" className="side-bar-nav-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3311" width="200" height="200"><path d="M439.04383639 224.33271976a289.43717504 289.43717504 0 0 0-89.06329676 39.44690807c-27.5075319 18.12412161-51.158867 39.64960558-70.96389486 64.57645191-19.79019562 24.92684633-35.31880082 53.25011237-46.62042137 84.97474006C221.10449032 445.05050411 215.45368042 478.01109252 215.45368042 512c0 40.16870887 7.81621301 78.48347702 23.45358166 115.04318192 15.64725682 36.67341315 36.77228986 68.19039996 63.2910532 94.76354538 26.53359488 26.56820206 58.11485196 47.57952611 94.69927585 63.23667111 36.59431134 15.65714501 75.00301286 23.48324474 115.16183354 23.48324475 33.97407594 0 66.85061917-5.56182137 98.62468557-16.89310498 31.76417894-11.32633953 60.10227581-26.77584294 85.01429133-46.65502781 24.87740834-19.77536407 46.43255539-43.46625042 64.57150781-70.96389488a290.15403174 290.15403174 0 0 0 39.43701989-88.98913905c-8.3056532 0.72180079-17.71378249 1.13213991-28.0958481 1.1321392-45.21637032 0-88.35138342-8.85936294-129.45942212-26.46932463-41.1327577-17.71872658-76.62459295-41.50848964-106.44089858-71.27535655C505.84007277 458.54719011 482.10963587 423.01086095 464.42057238 381.91765379 446.7562286 340.81455917 437.94135957 297.65977044 437.94135957 252.4483442c0-10.40184195 0.39550758-19.77536407 1.15685891-28.01674772l-0.049438-0.09887672zM512.02976157 141.21192041c8.32542811 0 16.51242896 0.31146168 24.6054972 0.92944167-16.4036648 35.32374419-24.60549719 72.09603405-24.60549719 110.30698212 0 35.12104668 6.84227598 68.69961578 20.58121076 100.83458258 13.70927096 32.03114601 32.15474243 59.63261126 55.35124448 82.80933769 23.16683898 23.17178306 50.76830423 41.60736635 82.82416923 55.30674985 32.02125855 13.69938351 65.654209 20.60098567 100.78514387 20.60098568 38.23072298 0 75.03267594-8.24138293 110.35147675-24.62032874 0.59326099 8.14250622 0.86517214 16.28006837 0.86517213 24.62032874 0 33.57856837-4.43956893 66.43533597-13.29893256 98.46648269-8.90880166 32.03114601-21.28817928 61.69419283-37.24195443 88.78149743-15.92411206 27.19112615-35.31880082 52.11797247-58.09013296 74.87941716-22.77627549 22.76144395-47.74267309 42.12152555-74.87447306 58.09013223-27.15157487 15.96366261-56.75529553 28.32326532-88.78644152 37.28644905A368.16784419 368.16784419 0 0 1 512.00009921 882.78807959a368.20739474 368.20739474 0 0 1-98.48625832-13.28904439c-32.03609009-8.95824037-61.6249792-21.31784236-88.79138561-37.28150569-27.12685589-15.96860669-52.08336529-35.32868827-74.89919206-58.09013223-22.7515565-22.76144395-42.13635709-47.68829101-58.05058169-74.87941715-15.96366261-27.0922487-28.34304097-56.75529553-37.2518426-88.78149744A367.9354836 367.9354836 0 0 1 141.21201889 512c0-33.57856837 4.4494571-66.43533597 13.30882004-98.46648269 8.90880166-32.03114601 21.28817928-61.69419283 37.25184259-88.78149744 15.91916798-27.19112615 35.29902519-52.11797247 58.0505817-74.87941715 22.81582676-22.86526476 47.77233617-42.22534634 74.89919206-58.09013223C351.89380578 175.81880789 381.4826949 163.36032846 413.51878498 154.50096479A368.20739474 368.20739474 0 0 1 512.00009921 141.21192041h0.02966236z" p-id="3312"></path></svg>
                    }
                </div>
            </div>
        </div>
    )
}

export const SideBarNavIcon = createReactReduxContainer(state=>({theme:state.theme}),(dispatch)=>({changTheme:dataObj => dispatch(changeThemeAction(dataObj))}),NavIconUI)

