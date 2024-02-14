import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {getRandomColor, getRandomId, isArrayBlank, isEmail, isNullOrUndefined, isStrBlank} from "../../lib/common/util";
import {Button, Checkbox, ColorPicker, Flex, Form, Input, Modal, Space, Switch, Tag, Tooltip, Upload,} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {deleteSongList, querySongList, saveOrModifySongList, songListInfoParam} from "../../api/song-list-controller";
import {AlertContext} from "../../container/Pages/Home/Home";
import {createAlertMsg, ERROR, httpStatus, SUCCESS} from "../PromptBox/PromptBox";
import {isSuccess} from "../../http/httpRequest";
import {UploadOutlined} from "@ant-design/icons";
import {deleteSong, DISABLE, saveSong, songInfoParam} from "../../api/song-controller";
import {parseFileName} from "../../lib/songUtils";
import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {serviceInit} from "../MusicPlayer/MusicPlayer";


const ListForm = memo(({showButton,showColorSelect,item,getForm,setComponentType})=>{
	const setAlert = useContext(AlertContext)
	const [colorPickerDisable, setColorPickerDisable] = useState(true)

	//解构信息用于修改表单 modify form
	const {name,color,creator,email,enableDelete,textDescribe,enableModify} = item

	//submit form
	const onFinish = async (fromData) => {
		const  {name,color,creator,textDescribe,email,enableColorPicker,enableDelete,enableModify} = fromData
		let str = null
		//是否使用自定义颜色
		if(enableColorPicker){
			str = `${color.metaColor.r},${color.metaColor.g},${color.metaColor.b}`
		}else {
			str = `${getRandomColor()},${getRandomColor()},${getRandomColor()}`
		}


		const card =  songListInfoParam(null,name,str,textDescribe,creator,email,enableDelete ? 1 : 0,enableModify ? 1 : 0)
		const resp = await saveOrModifySongList([card])
		setAlert(httpStatus(resp))

		if (isSuccess(resp.code)) {
			//刷新
			setComponentType(initValue)
		}
	}

	return (
		<Form
			preserve={false}
			disabled={isNullOrUndefined(enableModify) ? false : enableModify === DISABLE}
			ref={getForm}
			labelCol={{
				span: 4,
			}}
			labelAlign='left'
			wrapperCol={{
				span: 14,
			}}
			layout="horizontal"
			style={{
				height:'80%',
				width:'80%',
			}}
			onFinish={onFinish}
		>
			<Form.Item initialValue={isNullOrUndefined(name) ? null : name}   name="name" label="列表名" rules={[
				{
					required: true,
					message: '卡片名不能为空',
				},
			]}>
				<Input />
			</Form.Item>
			<Form.Item initialValue={isNullOrUndefined(creator) ? null : creator}    name="creator" label="创建者" rules={[
				{
					required: true,
					message: '流传你的名字',
				},
			]}>
				<Input />
			</Form.Item>
			<Form.Item initialValue={isNullOrUndefined(email) ? null : email}  name="email" label="邮箱" rules={[
				{
					required: true,
					message: '邮箱不能为空',
				},
			]}>
				<Input   />
			</Form.Item>
			{/*Item can automatically use the submit function only  if there is had name*/}
			<Form.Item initialValue={isNullOrUndefined(textDescribe) ? null : textDescribe} label="描述" name="textDescribe">
				<Input  />
			</Form.Item>
			<Form.Item label="能否删除/修改"  tooltip='默认任何人都可以删除/修改' >
				<Space>
					<Tooltip title="删除">
						<Form.Item name='enableDelete' valuePropName='checked' initialValue={isNullOrUndefined(enableDelete) ? true : enableDelete === DISABLE}>
							<Switch className='ml-2' defaultChecked />
						</Form.Item>
					</Tooltip>
					<Tooltip title="修改">
						<Form.Item name='enableModify' valuePropName='checked' initialValue={isNullOrUndefined(enableModify) ? true : enableModify === DISABLE}>
							<Switch className='ml-2' defaultChecked />
						</Form.Item>
					</Tooltip>
				</Space>
			</Form.Item>
			<Form.Item  label="颜色选择"  tooltip='不选默认随机颜色' >
				<Space>
					{/*cancel colorPicker disable*/}
					{
						showColorSelect ?
							<Form.Item name='enableColorPicker' initialValue={false} valuePropName='checked'>
								<Switch className='ml-2'  onChange={(checked, event)=>setColorPickerDisable(!checked)}/>
							</Form.Item>
							:
							null
					}
					<Form.Item name='color'>
						<ColorPicker className='ml-2' disabled={isNullOrUndefined(color) ? colorPickerDisable : enableModify === DISABLE}  />
					</Form.Item>
				</Space>
			</Form.Item>
			{
				showButton ?
					<Form.Item>
						<Button htmlType="submit"  type="primary"  className='bg-[#1677ff]' >添加</Button>
					</Form.Item>
					:
					null
			}
		</Form>
	)
})

/**
 * 增加列表组件
 * @type {React.NamedExoticComponent<object>}
 */
const CardAddForm = memo(({setComponentType})=>{
	return (
		<div className="card-from-container">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<ListForm showButton={true} item={{}} showColorSelect={true} setComponentType={setComponentType}/>
		</div>
	)
})


/**
 * 提示卡片组件
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
					<strong>歌曲管理：</strong>创建音乐合集可以作为播放列表
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
 * 专辑列表组件
 * @type {React.NamedExoticComponent<object>}
 */
const SongCardUI = memo(({setComponentType,type})=>{
	const songList = useSelector(state => state.songList);
	function selectMenu(targetType,obj) {
		setComponentType(val =>{
			const  {type} = val
			if (type === targetType) {
				return  {type:TIP_UI}
			}
			return  {type:targetType,obj:obj}
		})
	}

    return (
        <div className="cards">
			{/*增加列表按钮*/}
			<div key={`${getRandomId()}`}
				 onClick={()=>{selectMenu(CARD_ADD_FORM_UI,{setComponentType})}}
				 className='card ' style={{backgroundColor:`rgb(4,197,255)`}}>
				<svg   t="1699545937854" className="card-plus-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="200" height="200">
					<path fill="#fff" d="  M902.343 570.936h-331.78v331.833c0 32.337-26.226 58.537-58.564 58.537-32.337 0-58.563-26.2-58.563-58.537V570.936H121.654c-32.364 0-58.564-26.2-58.564-58.538 0-32.325 26.203-58.537 58.564-58.537h331.78V122.028c0-32.325 26.226-58.537 58.563-58.537 32.338 0 58.564 26.213 58.564 58.537v331.834h331.78c32.364 0 58.565 26.211 58.565 58.535-0.001 32.337-26.2 58.536-58.565 58.536z"  p-id="2315"></path>
				</svg>
			</div>
           {
			   //点击列表进入歌曲详情
			   songList &&
			   songList.map((item)=>{
				   const split = item.color.split(',');
				   return (
					   <div key={`${getRandomId()}`}
							onClick={()=>{setComponentType({type:CARD_DETAILS_UI,obj:{item,setComponentType}})}}
							className='card ' style={{backgroundColor:`rgb(${split[0]},${split[1]},${split[2]})`}}>
						   <p className="tip">{item.name}</p>
						   <p className="second-text">{item.textDescribe}</p>
					   </div>
				   )
			   })
		   }
		</div>
	)
})

/**
 * 歌曲列表详细信息组件
 * @type {React.NamedExoticComponent<{readonly info?: *}>}
 */

//播放相关的设置
const playSettings = [
	{text:'顺序播放',id:0,nextId:1},
	{text:'随机播放',id:1,nextId:2},
	{text:'循环播放',id:2,nextId:3},
	{text:'重复播放',id:3,nextId:0},
]



const PLAY_SETTING = "PLAY_SETTING";

//默认是顺序播放
localStorage.setItem(PLAY_SETTING,playSettings[0].text);

const CardInfoUI = memo(({item,setComponentType})=>{
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [loading, setLoading] = useState(false)
	const setAlert = useContext(AlertContext)
	const [songs, setSongs] = useState([])

	//解构信息
	const {name,color,textDescribe,id,enableModify,enableDelete} = item
	let form = useRef();

	//查询歌单列表
	const querySongs = async (lsId) => {
		const resp = await querySongList(lsId);
		if (isSuccess(resp.code)) {
			setSongs([...resp.data])
		}
	}

	useEffect(() => {
		//渲染
		querySongs(id)
	}, [id]);

	//必须有耗时操作，否则无法触发state
	const handleOk = async () => {
		//不允许修改
		if (enableModify === DISABLE) {
			setAlert(createAlertMsg(ERROR, '作者已设置不允许修改'))
			return
		}

		//查看颜色是否替换
		let _color = color
		if (!isNullOrUndefined(form.getFieldsValue().color)) {
			const {r,g,b} = form.getFieldsValue().color.metaColor
			_color = `${r},${g},${b}`
		}

		//加载动画
		setConfirmLoading(true);
		const dto = {...form.getFieldsValue(),color:_color,id}
		dto['enableDelete'] = enableDelete ? 1 : 0
		dto['enableModify'] = enableModify ? 1 : 0
		console.log('dto',dto)
		const resp = await saveOrModifySongList([dto])
		const {code} = resp

		//请求成功则更新音乐列表
		if (isSuccess(code)) {
			setComponentType(initValue)
		}
		//关闭加载动画和弹窗
		setOpen(false);
		setConfirmLoading(false);

		//弹窗提示
		setAlert(httpStatus(resp))
	};

	//删除音乐列表
	const handleDelete = () => {
		if (enableDelete === DISABLE) {
			setAlert(createAlertMsg(ERROR, '作者已设置不允许删除'))
			return
		}

		//提示框
		Modal.error({
			title: '注意',
			content: '你确定删除音乐列表吗?',
			async onOk() {
				setLoading(true)
				const resp = await deleteSongList([id])
				setAlert(httpStatus(resp))
				setLoading(false)
				setOpen(false)
				//不管成功是否都会回到首页
				setComponentType(initValue)
			}
		});
	}

	//取消弹窗
	const handleCancel = (e) => {
		setOpen(false)
		//阻止事件冒泡
		e.stopPropagation()
	}

	const changeText = (e) => {
		//比较取值
		const  setting = playSettings.filter(item => item.text === e.currentTarget.innerText)[0]

		//存储
		const current = playSettings[setting.nextId]
		localStorage.setItem(PLAY_SETTING,current.text);

		e.currentTarget.innerText = current.text
		//每次切换都需要把这个重排序
	    setSongs([...songs.reverse()])
	}

	//拖拽传感器
	const dhdSensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		})
	)

	//拖拽组件触发函数
	function dragEndEvent({active,over}) {
		if (active.id === over.id) {
			return
		}

		const  getSongById = (id)=> {
			for (let song of songs) {
				if (song.id === id) {
					return songs[songs.indexOf(song)]
				}
			}
		}

		const activeIndex = getSongById(active.id)
		const overIndex = getSongById(over.id)
		setSongs(val=> {
			const arr = []
			for (let valElement of val) {
				//todo 优化查找速度
				if (valElement.id === activeIndex.id) {
					arr.push(overIndex)
				}else if (valElement.id === overIndex.id){
					arr.push(activeIndex)
				}else {
					arr.push(valElement)
				}
			}
			return arr
		})
	}

	let colors = null
	try {
		colors = color.split(',')
	} catch (e) {
		colors = [getRandomColor(),getRandomColor(),getRandomColor()]
	}

	return (
		<div className='w-[70rem] h-[40rem] rounded-2xl bg-white shadow-[0_0_10px_rgba(0,0,0,0.25)] flex flex-col relative'>
			{/*卡片头部样式部分*/}
			<div className="w-full rounded-t-2xl text-center flex-col layout-center hover:shadow-[0_0_10px_rgba(0,0,0,0.25)] "
				 style={{
					 backgroundColor:`rgb(${colors[0]},${colors[1]},${colors[2]})`,
				 }}
				 onClick={()=> {
					 setOpen(true)
				 }}>
				<Modal
					title="列表编辑"
					open={open}
					confirmLoading={confirmLoading}
					onCancel={handleCancel}
					onOk={handleOk}
					destroyOnClose={true}
					cancelText='取消'
					okText='提交'
					footer={(_, { OkBtn, CancelBtn })=>(
						<>
							<Button loading={loading} danger onClick={handleDelete}>删除音乐列表</Button>
							<CancelBtn />
							<OkBtn />
						</>
					)}
				>
					<div>
						<ListForm showButton={false} item={item} getForm={(e)=>{form = e}} showColorSelect={false}/>
					</div>
				</Modal>
				<div className='mt-2 mb-2'>
					<p className='text-xl text-overflow'>{name}</p>
					<p className='text-overflow'>{textDescribe}</p>
				</div>
			</div>
			{/*歌曲列表部分*/}
			<div className='overflow-scroll overflow-x-hidden grow rounded-b-2xl remove_the_scroll '>
				<DndContext
					sensors={dhdSensors}
					onDragEnd={dragEndEvent} >
					<SortableContext
						strategy={verticalListSortingStrategy}
						items={songs.map(it => it.id)} >
						{
							songs.map((value, index) => {
								return (
									<SortableItem key={getRandomId()} querySongs={querySongs} listId={id}  id={value.id} song={value} sortIndex={index + 1}/>
								)
							})
						}
					</SortableContext>
				</DndContext>
			</div>
			{/*歌曲功能部分*/}
			<div className='bg-amber-200 absolute bottom-0 w-full h-[4rem] rounded-b-2xl'
				 style={{
					 backgroundColor:`rgb(${colors[0]},${colors[1]},${colors[2]})`
				 }}>
				{
					//偷懒采用匿名函数,目的区分hook
					(()=>{
						const [loading, setLoading] = useState(false)
						const [_open, _setOpen] = useState(false)
						const [fileList, setFileList] = useState([])
						const uploaderRef = useRef();
						const emailRef = useRef();
						const isDeleteRef = useRef();

						return <Flex gap='middle' vertical={false} className='w-full h-full' align='center' justify='center'>
							<Button style={{
								backgroundColor:'transparent'
							}} onClick={changeText}>{localStorage.getItem(PLAY_SETTING)}</Button>
							<Button style={{backgroundColor:'transparent'}}
									onClick={()=>{_setOpen(true)}}
									>
								<svg t="1703433684592" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" width="20" height="20"><path d="M903.864364 956.704314 120.695385 956.704314c-14.145162 0-25.612331-11.466146-25.612331-25.611308L95.083054 759.529583c0-14.145162 11.467169-25.611308 25.612331-25.611308s25.611308 11.466146 25.611308 25.611308l0 145.952116 731.946364 0L878.253056 759.529583c0-14.145162 11.466146-25.611308 25.611308-25.611308s25.611308 11.466146 25.611308 25.611308l0 171.563424C929.476695 945.238169 918.010549 956.704314 903.864364 956.704314z" p-id="2393"></path><path d="M288.712029 334.744947c-6.703679 0-13.399171-2.615571-18.423605-7.817036-9.827833-10.17371-9.547447-26.387997 0.627287-36.21583l224.799906-217.151715c9.92607-9.587356 25.663496-9.587356 35.588543 0l224.801952 217.151715c10.17371 9.827833 10.455119 26.041096 0.626263 36.214806-9.827833 10.17371-26.041096 10.455119-36.214806 0.627287L513.508865 127.591957 306.502208 327.554174C301.532009 332.35655 295.116903 334.744947 288.712029 334.744947z" p-id="2394"></path><path d="M513.508865 785.14089c-14.145162 0-25.611308-11.466146-25.611308-25.611308L487.897557 91.981924c0-14.145162 11.466146-25.611308 25.611308-25.611308s25.611308 11.467169 25.611308 25.611308l0 667.547659C539.121196 773.674745 527.65505 785.14089 513.508865 785.14089z" p-id="2395"></path></svg>
							</Button>
							<Button style={{backgroundColor:'transparent'}} onClick={()=>{setComponentType(initValue)}}>
								回到首页
							</Button>
							<Modal
								title="上传歌曲"
								open={_open}
								confirmLoading={loading}
								onCancel={(e)=>{
									setFileList([])
									_setOpen(false)
									//阻止事件冒泡
									e.stopPropagation()
								}}
								onOk={async ()=>{
									const emailVal =  emailRef.current.input.value
									const uploaderVal =  uploaderRef.current.input.value
									const isDelete = isDeleteRef.current.input.checked

									const check =  isStrBlank(emailVal) || isStrBlank(uploaderVal) ||  isArrayBlank(fileList)
									if (check) {
										setAlert(createAlertMsg(ERROR, '邮箱、上传者和歌曲文件不能为空'))
										return
									}

									if (!isEmail(emailVal)){
										setAlert(createAlertMsg(ERROR,'邮箱格式不正确'))
										return
									}

									//上传歌曲
									setLoading(true)

									try {
										for (let file of fileList) {
											const {singer, songName} = parseFileName(file.name)
											const param = songInfoParam(null,singer, songName, uploaderVal, emailVal,id,isDelete ? 1 : 0);
											const resp = await  saveSong(file,param)
											if (!isSuccess(resp.code)) {
												setAlert(httpStatus(resp))
												return
											}
										}
									} catch (e) {
										setAlert(createAlertMsg(ERROR, e.message))
										return
									}finally {
										setLoading(false)
									}

									setAlert(createAlertMsg(SUCCESS, '上传成功'))
									setLoading(false)
									_setOpen(false)
									setFileList([])
									//请求重新渲染
									querySongs(id)
								}}
								destroyOnClose={true}
								cancelText='取消上传'
								okText='确认上传'
							>
								<div>
									<Space
										direction="vertical"
										size="middle"
										style={{
											display: 'flex',
										}}
									>
										<Tag color='green'>所有上传文件规范：[ 歌曲名_歌手 ]！！支持多个文件上传</Tag>
										<Input ref={uploaderRef} placeholder='上传者'/>
										<Input ref={emailRef}  placeholder='邮箱'/>
										<Space>
											是否允许被删除<Checkbox  ref={isDeleteRef}/>
										</Space>
										<Upload
											name="personfile"
											fileList={fileList}
											onChange={(info)=>{setFileList([...info.fileList])}}
											//阻止默认上传事件
											beforeUpload={(file, FileList)=>{return false}}
											multiple={true}
										>
											<Button icon={<UploadOutlined/>}>Upload</Button>
										</Upload>
									</Space>
								</div>
							</Modal>
						</Flex>
					})()
				}
			</div>
		</div>
	)
})

const SortableItem = memo(({id,song,sortIndex,querySongs,listId}) => {
	const {setNodeRef,listeners,transform,transition,isDragging } =  useSortable({id})
	const setAlert = useContext(AlertContext)

	// 定义一个处理点击事件的函数
	const handleClick = async  () => {
		const resp =  await deleteSong(id)
		console.log('resp',resp)
		if (!isSuccess(resp.code)) {
			setAlert(httpStatus(resp))
		} else {
			//刷新列表
			querySongs(listId)
		}
	}

	//计算确定是否为X轴
	const getCoordinate = (coordinate,isX) =>{
		if (isX) {
			return coordinate?.x === undefined ? 0 : coordinate?.x
		}else {
			return coordinate?.y === undefined ? 0 : coordinate?.y
		}
	}

	const styles = {
		transform: `translate3d(${getCoordinate(transform,true)}px, ${getCoordinate(transform,false)}px, 0)`
	}

	return (
		<p   ref={setNodeRef}  {...listeners} style={styles}
			className={'w-full flex  '.concat(sortIndex % 2 === 0 ? ' bg-yellow-200' : ' bg-blue-400')}>
			<span className='w-full text-center'>{sortIndex}</span>
			<span className='w-full text-center'>{song.songName}</span>
			<span className='w-full text-center'>{song.singer}</span>
			<span className='w-full text-center'><Button onClick={handleClick}>删除</Button></span>
		</p>
	)

})

const CARD_DETAILS_UI = "CardInfoUI";
const CARD_ADD_FORM_UI = "CARD_ADD_FORM_UI";
const TIP_UI = "TIP_UI";

/**
 * 获取对应类型的组件
 * @param type 类型
 * @param obj 携带的信息
 * @returns {JSX.Element}
 */
function getComponent(type,obj = {}) {
	switch (type) {
		case CARD_ADD_FORM_UI:{
			const {setComponentType} = obj
			return (
				<div className='folder-container-card-from'>
					<CardAddForm setComponentType={setComponentType}/>
				</div>
			)
		}
		case TIP_UI:{
			return (
				<div className='folder-container-tip'>
					<TipUI/>
				</div>
			)
		}
		case CARD_DETAILS_UI :{
			const {item,setComponentType} = obj
			return (
				<div className='w-full h-full mr-40 layout-center'>
					<CardInfoUI item={item} setComponentType={setComponentType}/>
				</div>
			)
		}
		default : {
			return  <></>
		}
	}
}

/**
 * 导出组件
 * @returns {JSX.Element}
 * @constructor
 */
const initValue= {type:TIP_UI,obj:{}}

export default  function SongManagementUI() {
	const [data, setComponentType] = useState(initValue)
	var dispatch = useDispatch();
	const {type,obj} = data

	useEffect(() => {
		serviceInit(dispatch)
	}, [type]);

	//修改颜色
	return (
		<div className='folder-container'>
			{
				getComponent(type,obj)
			}
			<div className='folder-container-song-card-box'>
				<SongCardUI setComponentType={setComponentType} type={type}/>
			</div>
		</div>
	)
}

