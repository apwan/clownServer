$(function() {

	var UserShowObj = {};

	// JQuery 获取前端组件
	var $window = $(window);

	// 输入slideId
	var $slideIdInput = $('.slideIdInput');
	// 展示区域
	var $showArea = $('.slides');

	/**
	 * 标识是否正在展示
	 * @name started
	 * @type {boolean}
	 */
	var started = false;

	/**
	 * 开始一个展示
	 */
	$('.startShowBtn').click(function () {
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
				started = true;
				UserShowObj.presId = data.presId;
				// 设置内容
				$showArea.prepend(data.contents);
				$('.presIdText').html(data.presId);
				// 初始化reveal
				Reveal.initialize(
        			{
          				controls: true,
          				progress: true,
          				history: false,
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
	});

	/**
	 * 结束展示
	 * @name endShow
	 * @function
	 */
	$('endShowBtn').click(function() {
		$.post('/ajax/slide-show/', {
			'command': 'end',
			'presId': UserShowObj.presId,
		});
		started = false;
	});


	function sendChangeState() {
		console.log('hi');
		var params = {
			'presId': UserShowObj.presId,
			'newState': JSON.stringify(Reveal.getState()),
		};
		$.post('/ajax/slide-change/', params);
	};

	// 退出前询问
	$window.on('beforeunload', function() {
		if (started) 
			return "你正在进行展示";
	});

	$window.unload(function() {
		if (started) {
			$.post('/ajax/slide-show', {
				'command': 'end',
				'presId': UserShowObj.presId,
			});
		}
	});
});