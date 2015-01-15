$(function() {

	/**
	 * 标识是否正在展示
	 * @name started
	 * @type {boolean}
	 */
	var started = false;
	/**
	 * 跳转到展示页面
	 */
	activeShow();

	/**
	 * 发送编辑幻灯片的post请求
	 */
	activeModify();

	/**
	 * 发送删除幻灯片的AJAX GET请求
	 */
	activeDelete();

	/**
	 * 新建一个幻灯片的AJAX POST请求
	 */
	$('.createBtn').click(createNewSlide);

});