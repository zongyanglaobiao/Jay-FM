/**
 * 音乐列表类
 */
export class CardInfo {
	id
	cardName
	color
	textDescribe
	creator
	email
	enableDelete
	enableModify

	/**
	 * 构造函数
	 * @param id
	 * @param cardName
	 * @param color
	 * @param textDescribe
	 * @param creator
	 * @param email
	 * @param enableDelete
	 * @param enableModify
	 */
	constructor(id,cardName, color, textDescribe, creator, email, enableDelete, enableModify) {
		this.id = id
		this.cardName = cardName
		this.color = color
		this.textDescribe = textDescribe
		this.creator = creator
		this.email = email
		this.enableDelete = enableDelete
		this.enableModify = enableModify
	}
}





