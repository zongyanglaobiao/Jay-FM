export class CardInfo {
	cardName
	color
	textDescribe
	creator
	email
	enableDelete
	enableModify

	/**
	 * 构造函数
	 * @param cardName
	 * @param color
	 * @param textDescribe
	 * @param creator
	 * @param email
	 * @param enableDelete
	 * @param enableModify
	 */
	constructor(cardName, color, textDescribe, creator, email, enableDelete, enableModify) {
		this.cardName = cardName
		this.color = color
		this.textDescribe = textDescribe
		this.creator = creator
		this.email = email
		this.enableDelete = enableDelete
		this.enableModify = enableModify
	}
}


