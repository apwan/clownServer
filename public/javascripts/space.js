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
	function activeShow() {
		$('.showBtn').click(function() {
			console.log($(this).parent().attr('aria-label'));
			var slideId = $(this).parent().attr('aria-label');
			var params = {
				'slideId': slideId,
				'command': 'start',
			};
			post('/pres/slide-show/', params);
		});
	}
	activeShow();

	/**
	 * 发送编辑幻灯片的post请求
	 */
	function activeModify() {
		$('.modifyBtn').click(function() {
			console.log($(this).parent().attr('aria-label'));
			var slideId = $(this).parent().attr('aria-label');
			window.open('/ajax/modify?slideId='+slideId);
		});
	}
	activeModify();

	/**
	 * 发送删除幻灯片的AJAX GET请求
	 */
	function activeDelete() {
		$('.deleteBtn').click(function() {
			var listItem = $(this).parent().parent();
			var slideId = $(this).parent().attr('aria-label');
			console.log(slideId);		
			$.get('/ajax/delete', {
				'slideId': slideId
			}, function(data) {
				data = JSON.parse(data);
				if (data.success == 0) {
					// 展示错误信息
					alert('删除幻灯片失败');
				}
				else {
					// 删除这个列表项
					listItem.remove();
				}
			});
		});
	}
	activeDelete();

	/**
	 * 新建一个幻灯片的AJAX POST请求
	 */
	$('.createBtn').click(function() {
		var newSlideName = $('.newSlideName').val();
		if (newSlideName) {
			$.post('/ajax/add', {
				name: newSlideName
			}, function(data) {
				data = JSON.parse(data);
				console.log(data);
				if (data.success == 0) {
					alert('新建幻灯片失败');
				}
				else {

					console.log(newSlideName);
					console.log(data.name);
					console.log(data._id);
					$('.createNew').before('<div class="li list-group-item">' + 
							'<h3>' + newSlideName + '</h3>' +
							'<div  class="btn-toolbar pull-right" role="toolbar" aria-label='+data._id+
							'><button type="button" class="btn btn-default showBtn"> 展示</button>'+
							'<button type="button" class="btn btn-default modifyBtn"> 修改</button>'+
							'<button type="button" class="btn btn-default deleteBtn"> 删除</button></btn-toolbar></li>');
					activeDelete();
					activeModify();
					activeShow();
				}
			});
		}
	});
});