import React, {memo, useContext, useEffect, useRef, useState} from "react";
import {getRandomColor, getRandomId, isNullOrUndefined} from "../../lib/common/util";
import {Button, ColorPicker, Flex, Form, Input, Modal, Space, Switch, Tag, Tooltip, Upload,} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {addSongList, deleteSongList, getAllCardThunk, modifySongList} from "../../redux/thunk";
import {CardInfo} from "../../constant/constant";
import {AlertContext} from "../../container/Pages/Home/Home";
import {createAlertMsg, ERROR, httpStatus} from "../PromptBox/PromptBox";
import {isSuccess} from "../../http/httpRequest";
import {UploadOutlined} from "@ant-design/icons";


const ListForm = memo(({showButton,showColorSelect,item,getForm,setComponentType})=>{
	const setAlert = useContext(AlertContext)
	const [colorPickerDisable, setColorPickerDisable] = useState(true)

	//解构信息用于修改表单 modify form
	const {cardName,color,creator,email,enableDelete,textDescribe,enableModify} = item

	//submit form
	const onFinish = async (fromData) => {
		const  {cardName,color,creator,textDescribe,email,enableColorPicker,enableDelete,enableModify} = fromData
		let str = null
		//是否使用自定义颜色
		if(enableColorPicker){
			str = `${color.metaColor.r},${color.metaColor.g},${color.metaColor.b}`
		}else {
			str = `${getRandomColor()},${getRandomColor()},${getRandomColor()}`
		}

		const card =  new CardInfo(null,cardName,str,textDescribe,creator,email,enableDelete,enableModify)
		const resp = await addSongList(card)
		setAlert(httpStatus(resp))

		if (isSuccess(resp.code)) {
			//刷新
			setComponentType(initValue)
		}
	}

	return (
		<Form
			preserve={false}
			disabled={isNullOrUndefined(enableModify) ? false : !enableModify}
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
			<Form.Item initialValue={isNullOrUndefined(cardName) ? null : cardName}   name="cardName" label="列表名" rules={[
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
						<Form.Item name='enableDelete' valuePropName='checked' initialValue={isNullOrUndefined(enableDelete) ? true : enableDelete}>
							<Switch className='ml-2' defaultChecked />
						</Form.Item>
					</Tooltip>
					<Tooltip title="修改">
						<Form.Item name='enableModify' valuePropName='checked' initialValue={isNullOrUndefined(enableModify) ? true : enableModify}>
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
						<ColorPicker className='ml-2' disabled={isNullOrUndefined(color) ? colorPickerDisable : !enableModify}  />
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
		<div className="card-from-container playing">
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
	const dispatch = useDispatch();
	const cardArray = useSelector(state => state.cardArray);

	useEffect(() => {
		loadList()
	},[type]);

	//初始化函数
	function  loadList() {
	  dispatch(getAllCardThunk())
	}

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
			   cardArray &&
			   cardArray.map((item)=>{
				   const split = item.color.split(',');
				   return (
					   <div key={`${getRandomId()}`}
							onClick={()=>{selectMenu(CARD_DETAILS_UI,{item,setComponentType})}}
							className='card ' style={{backgroundColor:`rgb(${split[0]},${split[1]},${split[2]})`}}>
						   <p className="tip">{item.cardName}</p>
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
	{text:'顺序播放',color:'geekblue',next:1},
	{text:'随机播放',color:'green',id:2},
	{text:'循环播放',color:'cyan',id:3},
	{text:'重复播放',color:'magenta',id:4}]



const PLAY_SETTING = "PLAY_SETTING";

//存储信息
localStorage.setItem(PLAY_SETTING,JSON.stringify(playSettings[0]));

const CardInfoUI = memo(({item,setComponentType})=>{
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [loading, setLoading] = useState(false)
	const setAlert = useContext(AlertContext)

	//解构信息
	const {cardName,color,textDescribe,id,enableModify,enableDelete} = item
	let form = useRef();

	//必须有耗时操作，否则无法触发state
	const handleOk = async () => {
		//不允许修改
		if (!enableModify) {
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
		const resp = await modifySongList({...form.getFieldsValue(),color:_color,id})
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
		if (!enableDelete) {
			setAlert(createAlertMsg(ERROR, '作者已设置不允许删除'))
			return
		}

		//提示框
		Modal.error({
			title: '注意',
			content: '你确定删除音乐列表吗?',
			async onOk() {
				setLoading(true)
				const resp = await deleteSongList({id})
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
		// e.currentTarget.innerText =
        console.log(JSON.parse(localStorage.getItem(PLAY_SETTING)))
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
					<p className='text-xl text-overflow'>{cardName}</p>
					<p className='text-overflow'>{textDescribe}</p>
				</div>
			</div>
			{/*歌曲列表部分*/}
			<div className='overflow-scroll overflow-x-hidden grow rounded-b-2xl remove_the_scroll '>
				{
					(()=>{
						const  arr =[]
						for (let i = 0; i < 30; i++) {
							arr.push(
								<p key={getRandomId()} className= {'w-full flex '.concat(i % 2 === 0 ? 'bg-yellow-200' : 'bg-blue-400')}>
									<span className='w-full text-center'>{i + 1}</span>
									<span className='w-full text-center'>晴天</span>
									<span className='w-full text-center'>周杰伦</span>
									<span className='w-full text-center'><Button>删除</Button></span>
								</p>
							)
						}
						return arr
					})()
				}
			</div>
			{/*歌曲功能部分*/}
			<div className='bg-amber-200 absolute bottom-0 w-full h-[4rem] rounded-b-2xl'
				 style={{
					 backgroundColor:`rgb(${colors[0]},${colors[1]},${colors[2]})`
				 }}>
				{/*
					todo 上传文件(新建页面)
					todo  按钮切换
				*/}
				{
					//偷懒采用匿名函数,目的区分hook
					(()=>{
						const [loading, setLoading] = useState(false)
						const [_open, _setOpen] = useState(false)
						const [fileList, setFileList] = useState([])
						const uploaderRef = useRef();
						const emailRef = useRef();

						const handleChange = (info) => {
							let newFileList = [...info.fileList];

							// 2. Read from response and show file link
							newFileList = newFileList.map((file) => {
								if (file.response) {
									// Component will show file.url as link
									file.url = file.response.url;
								}
								return file;
							});
							setFileList(newFileList);
						};

						return <Flex gap='middle' vertical={false} className='w-full h-full' align='center' justify='center'>
							<Button style={{
								backgroundColor:'transparent'
							}} onClick={changeText}>{JSON.parse(localStorage.getItem(PLAY_SETTING)).text}</Button>
							<Button style={{backgroundColor:'transparent'}}
									onClick={()=>{_setOpen(true)}}
									>
								<svg t="1703433684592" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" width="20" height="20"><path d="M903.864364 956.704314 120.695385 956.704314c-14.145162 0-25.612331-11.466146-25.612331-25.611308L95.083054 759.529583c0-14.145162 11.467169-25.611308 25.612331-25.611308s25.611308 11.466146 25.611308 25.611308l0 145.952116 731.946364 0L878.253056 759.529583c0-14.145162 11.466146-25.611308 25.611308-25.611308s25.611308 11.466146 25.611308 25.611308l0 171.563424C929.476695 945.238169 918.010549 956.704314 903.864364 956.704314z" p-id="2393"></path><path d="M288.712029 334.744947c-6.703679 0-13.399171-2.615571-18.423605-7.817036-9.827833-10.17371-9.547447-26.387997 0.627287-36.21583l224.799906-217.151715c9.92607-9.587356 25.663496-9.587356 35.588543 0l224.801952 217.151715c10.17371 9.827833 10.455119 26.041096 0.626263 36.214806-9.827833 10.17371-26.041096 10.455119-36.214806 0.627287L513.508865 127.591957 306.502208 327.554174C301.532009 332.35655 295.116903 334.744947 288.712029 334.744947z" p-id="2394"></path><path d="M513.508865 785.14089c-14.145162 0-25.611308-11.466146-25.611308-25.611308L487.897557 91.981924c0-14.145162 11.466146-25.611308 25.611308-25.611308s25.611308 11.467169 25.611308 25.611308l0 667.547659C539.121196 773.674745 527.65505 785.14089 513.508865 785.14089z" p-id="2395"></path></svg>
							</Button>
							<Modal
								title="上传歌曲"
								open={_open}
								confirmLoading={loading}
								onCancel={(e)=>{
									_setOpen(false)
									//阻止事件冒泡
									e.stopPropagation()
								}}
								onOk={()=>{
									//todo 上传
									setLoading(true)
									console.log('filesRef',filesRef.current)
									console.log('emailRef',emailRef.current)
									console.log('uploaderRef',uploaderRef.current)
									setTimeout(()=>{
										setLoading(true)
										_setOpen(false)
									},3000)
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
										<Tag color='green'>所有上传文件规范：“歌曲名_歌手”！！支持多个文件上传</Tag>
										<Input ref={uploaderRef} placeholder='上传者'/>
										<Input ref={emailRef} placeholder='邮箱'/>
										<Upload
											name="personfile"
											fileList={fileList}
											onChange={handleChange}
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

const FileUploadUI = memo(({setComponentType})=>{
	return (
		<div>
			文件上传页面
		</div>
	)
})

const CARD_DETAILS_UI = "CardInfoUI";
const CARD_ADD_FORM_UI = "CARD_ADD_FORM_UI";
const TIP_UI = "TIP_UI";
const FIlE_UPLOAD_UI = "FIlE_UPLOAD";

/**
 * 获取对应类型的组件
 * @param type 类型
 * @param obj 携带的信息
 * @returns {JSX.Element}
 */
function getComponent(type,obj = {}) {
	switch (type) {
		case CARD_DETAILS_UI:{
			const {item,setComponentType} = obj
			return (
				<div className='w-full h-full mr-40 layout-center'>
					<CardInfoUI item={item} setComponentType={setComponentType}/>
				</div>
			)
		}
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
		case FIlE_UPLOAD_UI:{
			const {setComponentType} = obj
			//todo 单独写一个页面上传文件
			return  (
				<div className='w-full h-full mr-40 layout-center border-1 border-solid border-amber-400'>
					<FileUploadUI setComponentType={setComponentType}/>
				</div>
			)
		}
		default :{
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
	const {type,obj} = data

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

