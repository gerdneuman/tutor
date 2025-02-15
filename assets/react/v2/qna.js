import { get_response_message } from "../helper/response";

window.jQuery(document).ready($=>{
    const {__} = wp.i18n;

    // Change view as mode at frontend dashboard
    $('.tutor-dashboard-qna-vew-as input[type="checkbox"]').prop('disabled', false);
    $(document).on('change', '.tutor-dashboard-qna-vew-as input[type="checkbox"]', function() {
        var is_instructor = $(this).prop('checked');

        $(this).prop('disabled', true);
        window.location.replace($(this).data(is_instructor ? 'as_instructor_url' : 'as_student_url'));
    });

    // Change badge
    $(document).on('click', '.tutor-qna-badges-wrapper [data-action]', function(e){
        e.preventDefault();
        var $that = $(this);
        let row = $(this).closest('tr');
        let qna_action = $(this).data('action');
        let question_id = $(this).closest('[data-question_id]').data('question_id');
        let button = $(this);
        let context = button.closest('[data-qna_context]').data('qna_context');

        $.ajax({
            url: _tutorobject.ajaxurl,
            type: 'POST',
            data: {
                question_id,
                qna_action,
                context,
                action: 'tutor_qna_single_action'
            },
            beforeSend:() => {
                $that.find('i').addClass('tutor-loading-spinner');
            },
            success: resp=>{
                if(!resp.success) {
                    tutor_toast('Error!', get_response_message(resp), 'error');
                    return;
                }

                const {new_value} = resp.data;

                // Toggle class if togglable defined
                if(button.data('state-class-0')) {

                    // Get toggle class
                    var remove_class = button.data( new_value==1 ? 'state-class-0' : 'state-class-1' );
                    var add_class = button.data( new_value==1 ? 'state-class-1' : 'state-class-0' );

                    var class_element = button.data('state-class-selector') ? button.find(button.data('state-class-selector')) : button;
                    class_element.removeClass(remove_class).addClass(add_class);
                    // Toggle active class
                    class_element[new_value==1 ? 'addClass' : 'removeClass']('active');
                }

                // Toggle text if togglable text defined
                if(button.data('state-text-0')) {

                    // Get toggle text
                    var new_text = button.data( new_value==1 ? 'state-text-1' : 'state-text-0' );

                    var text_element = button.data('state-text-selector') ? button.find(button.data('state-text-selector')) : button;
                    text_element.text(new_text);
                }

                // Update read unread
                if (qna_action == 'archived') {
                    location.reload();
                }
                if(qna_action=='read') {
                    let method = new_value==0 ? 'removeClass' : 'addClass';
                    row.find('.tutor-qna-question-col')[method]('is-read');
                }
            },
            complete:()=>{
                $that.find('i').removeClass('tutor-loading-spinner');
            }
        });
    });

    $(document).on('click', '#sideabr-qna-tab-content .tutor-qa-new a.sidebar-ask-new-qna-btn', function(e) {
        $('.tutor-quesanswer-askquestion').addClass('tutor-quesanswer-askquestion-expand');
        $('#sideabr-qna-tab-content').css({
            'height' : 'calc(100% - 140px)'
        });
    })

    $(document).on('click', '#sideabr-qna-tab-content .tutor-qa-new .sidebar-ask-new-qna-cancel-btn', function(e) {
        $('.tutor-quesanswer-askquestion').removeClass('tutor-quesanswer-askquestion-expand');
        $('#sideabr-qna-tab-content').css({
            'height' : 'calc(100% - 60px)'
        });
    })

    // Save/update question/reply
    $(document).on('click', '.tutor-qa-reply button, .tutor-qa-new button.sidebar-ask-new-qna-submit-btn', function(){
        let button      = $(this);
        let form        = button.closest('[data-question_id]');

        let question_id = button.closest('[data-question_id]').data('question_id');
        let course_id   = button.closest('[data-course_id]').data('course_id');
        let context     = button.closest('[data-context]').data('context');
        let answer      = form.find('textarea').val();
        let back_url    = $(this).data('back_url');

        const btnInnerHtml = button.html().trim();
        const { width : btnWidth, height : btnHeight } = button.get(0).getBoundingClientRect();
        const btnStyles =  {width: `${btnWidth}px`, height: `${btnHeight}px`};

        $.ajax({
            url: _tutorobject.ajaxurl,
            type: 'POST',
            data: {
                course_id,
                question_id,
                context,
                answer,
                back_url,
                action: 'tutor_qna_create_update'
            },
            beforeSend: () =>{
                // button.addClass('tutor-updating-message');
                button.css(btnStyles);
                button.html(`<div class="tutor-loading-spinner" style="--size: 20px"></div>`);
            },
            success: resp => {
                if(!resp.success) {
                    tutor_toast('Error!', get_response_message(resp), 'error');
                    return;
                }

                // Append content
                if(question_id) {
                    $('.tutor-qna-single-question').filter('[data-question_id="'+question_id+'"]').replaceWith(resp.data.html);
                } else {
                    $('.tutor-empty-state-wrapper').remove();
                    $('.tutor-qna-single-question').eq(0).before(resp.data.html);
                }
                //on successful reply make the textarea empty
                if ($("#sideabr-qna-tab-content .tutor-quesanswer-askquestion textarea")) {
                    $("#sideabr-qna-tab-content .tutor-quesanswer-askquestion textarea").val('');
                }
                if ($(".tutor-quesanswer-askquestion textarea")) {
                    $(".tutor-quesanswer-askquestion textarea").val('');
                }
            },
            complete: () =>{
                button.html(btnInnerHtml)
                // $('.tutor-qna-single-wrapper').find('.tutor-qa-reply').hide();
            }
        })
    });

    $(document).on('click', '.tutor-toggle-reply span', function(){
        $(this).closest('.tutor-qna-chat').nextAll().toggle();
        $(this).closest('.tutor-qna-single-wrapper').find('.tutor-qa-reply').toggle();
    });
});