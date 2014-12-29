$(function() {
	// JQuery 获取前端组件
	var $forwardBtn = $('.forwardBtn');
	var $backwardBtn = $('.backwardBtn');
	var $upwardBtn = $('.upwardBtn');
	var $downwardBtn = $('.downwardBtn');
	var $overviewBtn = $('.overviewBtn');
	var $endShowBtn = $('.endShowBtn');

	// 数据
	var nowState = null;
	var jsonUrl = null;
	var showId = null;

	function sendChangeState(newState) {
		var params = {
			'showId': showId,
			'passwd': passwd,
			'state': newState
		};
		$.post('/slide-change/', params, function(data, status) {
			// 展示改变后的slides
		});
	};

	// 设置newState,并调用sendChangeState
	$forwardBtn.click(function() {

	});

	$backwardBtn.click(function() {

	});

	$upwardBtn.click(function() {

	});

	$downwardBtn.click(function() {

	});

	$overviewBtn.click(function() {

	});

	/**
	 * 结束展示
	 * @name endShow
	 * @function
	 */
	$endShowBtn.click(function() {
		var params = {
			'command': 'end',
			'showId': showId,
			'passwd': passwd
		};
		post('/slide-show/', params);
	});
});