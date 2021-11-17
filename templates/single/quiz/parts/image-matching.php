<div id="quiz-image-matching-ans-area" class="quiz-question-ans-choice-area tutor-mt-70 question-type-<?php echo $question_type; ?> <?php echo $answer_required? 'quiz-answer-required':''; ?> ">
    <div class="matching-quiz-question-desc d-flex align-items-start">
        <?php
            $rand_answers = tutor_utils()->get_answers_by_quiz_question($question->question_id, true);
            foreach ($rand_answers as $rand_answer){
        ?>
        <div class="tutor-quiz-border-box">
            <?php
                if ($question_type === 'matching'){
                    echo '<span class="text-regular-body color-text-primary">'.stripslashes($rand_answer->answer_two_gap_match).'</span>';
                }else{
                    echo '<span class="text-regular-body color-text-primary">'.stripslashes($rand_answer->answer_title).'</span>';
                }
            ?>
            <span class="ttr-humnurger-filled color-black-fill"></span>
            <input type="hidden" name="attempt[<?php echo $is_started_quiz->attempt_id; ?>][quiz_question][<?php echo $question->question_id; ?>][answers][]" value="<?php echo $rand_answer->answer_id; ?>" >
        </div>
        <?php } ?>
    </div>
    <div class="quiz-image-matching-ans d-flex align-items-start">
        <?php
            if ( is_array($answers) && count($answers) ) {
            $answer_i = 0;
                foreach ($answers as $answer){
                    $answer_i++;
        ?>
        <div class="quiz-image-box">
            <div class="quiz-image d-flex tutor-mb-15">
                <img src="<?php echo wp_get_attachment_image_url($answer->image_id, 'full') ?>" />
            </div>
            <div class="tutor-quiz-dotted-box">
                <span class="text-regular-body color-text-primary">
                    <?php _e('Drag your ans', 'tutor'); ?>
                </span>
            </div>
        </div>
        <?php } } ?>
    </div>
</div>