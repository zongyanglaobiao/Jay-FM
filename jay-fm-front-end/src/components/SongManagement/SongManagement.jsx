import {memo, useContext, useEffect, useRef, useState} from "react";
import {getRandomColor, getRandomId, isNullOrUndefined} from "../../lib/common/util";
import {Button, ColorPicker, Form, Input, Modal, Space, Switch, Tooltip,} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {addSongList, getAllCardThunk, modifySongList} from "../../redux/thunk";
import {CardInfo} from "../../constant/constant";
import {AlertContext} from "../../container/Pages/Home/Home";
import {createAlertMsg, ERROR, httpStatus} from "../PopUp/PopUp";
import {isSuccess} from "../../http/httpRequest";


const ListForm = memo(({showButton,showColorSelect,item,getForm})=>{
	const dispatch = useDispatch()
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

		const card =  new CardInfo(cardName,str,textDescribe,creator,email,enableDelete,enableModify)
		await addSongList(card)
		//添加卡片
		dispatch(getAllCardThunk())
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
const CardAddForm = memo(()=>{
	return (
		<div className="card-from-container playing">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<ListForm showButton={true} item={{}} showColorSelect={true}/>
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
const SongCardUI = memo(({setComponentType})=>{
	const dispatch = useDispatch();
	const cardArray = useSelector(state => state.cardArray);

	useEffect(() => {
		init()
	}, []);

	//初始化函数
	function  init() {
	  dispatch(getAllCardThunk())
	}

    return (
        <div className="cards">
			{/*增加列表按钮*/}
			<div key={`${getRandomId()}`} onClick={()=>{setComponentType(val =>{
				const  {type} = val
				if (type === CARD_ADD_FORM_UI) {
					return  {type:TIP_UI}
				}
				return  {type:CARD_ADD_FORM_UI}
			})}} className='card ' style={{backgroundColor:`rgb(4,197,255)`}}>
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
					   <div key={`${getRandomId()}`} onClick={()=>{setComponentType(()=>{
						   return {type:CARD_DETAILS_UI,obj:item}
					   })}}  className='card ' style={{backgroundColor:`rgb(${split[0]},${split[1]},${split[2]})`}}>
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
const CardInfoUI = memo(({item})=>{
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false)
	const setAlert = useContext(AlertContext)
	//解构信息
	const {cardName,color,textDescribe,id,enableModify} = item
	let form = useRef();

	useEffect(() => {
		console.log('111111')
		console.log('update',open)
	});


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
			dispatch(getAllCardThunk())
		}
		//关闭加载动画和弹窗
		setOpen(false);
		setConfirmLoading(false);

		//弹窗提示
		setAlert(httpStatus(resp))
	};



	const handleCancel = (e) => {
		setOpen(false)
		//阻止事件冒泡
		e.stopPropagation()
	}

	let colors = null
	try {
		colors = color.split(',')
	} catch (e) {
		colors = ['234','14','123']
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
							<Button loading={loading} danger >删除音乐列表</Button>
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
			{/*歌曲部分列表*/}
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
					todo 排序
					todo 上传文件
					todo 删除
				*/}
			</div>
		</div>
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
		case CARD_DETAILS_UI:{
			return (
				<div className='w-full h-full mr-40 layout-center'>
					<CardInfoUI item={obj}/>
				</div>
			)
		}
		case CARD_ADD_FORM_UI:{
			return (
				<div className='folder-container-card-from'>
					<CardAddForm/>
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
export default  function SongManagementUI() {
	const initValue= {type:TIP_UI,obj:{}}
	const [data, setComponentType] = useState(initValue)
	const {type,obj} = data

	//修改颜色
	return (
		<div className='folder-container'>
			{
				getComponent(type,obj)
			}
			<div className='folder-container-song-card-box'>
				<SongCardUI setComponentType={setComponentType} />
			</div>
		</div>
	)
}

