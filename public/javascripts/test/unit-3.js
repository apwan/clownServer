var sample_slidesId = '54af3cf1bcc7de9b2902ffcd';
var sample_usrId = 'Guest';
asyncTest("async1", 1, function() {
    $.post('/ajax/slide-show', {
            slideId: sample_slidesId,
            command: 'start'
        }, function (result) {
            deepEqual(result.success, 1);
            start();
        });
})
