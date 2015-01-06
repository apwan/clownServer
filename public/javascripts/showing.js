$(function() {

	var UserShowObj = {};

	// JQuery 获取前端组件
	var $window = $(window);
	// 结束展示按钮
	var $endShowBtn = $('.endShowBtn');
	// 开始展示按钮
	var $startShowBtn = $('.startShowBtn');
	// 输入slideId
	var $slideIdInput = $('.slideIdInput');
	// 展示区域
	var $showArea = $('.slides');

	/**
	 * 开始一个展示
	 */
	$startShowBtn.click() {
		var slideId = $slideIdInput.val();
		$.post('/ajax/slide-show', {
			slideId: slideId,
			command: 'start'
		}, function (data) {
			if (data.success == 0) {
				// 展示错误信息
				alert(data.errStr);
			}
			else {
				UserShowObj.presId = data.presId;
				// 设置内容
				showArea.html(data.contents);
				$('.presIdText').html(data.presId);
				// 初始化reveal
				Reveal.initialize(
        			{
          				controls: true,
          				progress: true,
          				history: true,
          				center: true,
          				slideNumber: true,

          				theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
          				transition: Reveal.getQueryHash().transition || 'default' 
        		});
        		//调用sendChangeState
				Reveal.addEventListener('slidechanged', sendChangeState);
				Reveal.addEventListener('overviewshown', sendChangeState);
				Reveal.addEventListener('overviewhidden', sendChangeState);
			}
		});
	};

	/**
	 * 结束展示
	 * @name endShow
	 * @function
	 */
	$endShowBtn.click(function() {
		$.post('/ajax/slide-show/', {
			'command': 'end',
			'presId': UserShowObj.presId,
		});
	});


	function sendChangeState() {
		console.log('hi');
		var params = {
			'showId': UserShowObj.presId,
			'state': Reveal.getState(),
			'passwd': UserShowObj.passwd
		};
		$.post('/ajax/slide-change/', params);
	};

});