<!--create announcements modal-->
<div class="tutor-modal-wrap tutor-announcements-modal-wrap tutor-accouncement-create-modal">
    <div class="tutor-modal-content tutor-announcement-modal-content">
        <div class="modal-header">
            <div class="modal-title">
                <h1><?php _e('Create New Announcement', 'tutor'); ?></h1>
            </div>
            <div class="tutor-announcements-modal-close-wrap">
                <a href="#" class="tutor-announcement-close-btn">
                    <i class="tutor-icon-line-cross"></i>
                </a>
            </div>
        </div>
        <div class="modal-container">
            <form action="" class="tutor-announcements-form">
                <?php tutor_nonce_field(); ?>
                <div class="tutor-form-group">
                    <label>
                        <?php _e('Select Course', 'tutor'); ?>
                    </label>
                    <select class="ignore-nice-select" name="tutor_announcement_course" id="">
                        <?php if ($courses) : ?>
                            <?php foreach ($courses as $course) : ?>
                                <option value="<?php echo esc_attr($course->ID) ?>">
                                    <?php echo $course->post_title; ?>
                                </option>
                            <?php endforeach; ?>
                        <?php else : ?>
                            <option value=""><?php _e('No course found', 'tutor'); ?></option>
                        <?php endif; ?>
                    </select>
                </div>
                <div class="tutor-form-group">
                    <label>
                        <?php _e('Announcement Title', 'tutor'); ?>
                    </label>
                    <input type="text" name="tutor_annoument_title" value="" placeholder="<?php _e('Announcement title', 'tutor'); ?>">
                </div>
                <div class="tutor-form-group">
                    <label for="tutor_announcement_course">
                        <?php _e('Summary', 'tutor'); ?>
                    </label>
                    <textarea rows="6" type="text" name="tutor_annoument_summary" value="" placeholder="<?php _e('Summary...', 'tutor'); ?>"></textarea>
                </div>
                <?php if ($notify_checked) : ?>
                    <div class="tutor-form-group">
                        <label for="notify_student_create">
                            <input type="checkbox" name="tutor_notify_students" id="notify_student_create" checked>
                            <?php _e('Notify to all students of this course.', 'tutor'); ?>

                        </label>
                    </div>
                <?php endif; ?>
                <div class="tutor-form-group">
                    <div class="tutor-announcements-create-alert"></div>
                </div>
                <div class="modal-footer">
                    <div class="tutor-announcement-modal-footer-buttons">
                        <button class="tutor-btn"><?php _e('Publish', 'tutor') ?></button>
                        <button type="button" class="quiz-modal-tab-navigation-btn  quiz-modal-btn-cancel tutor-announcement-close-btn tutor-announcement-cancel-btn"><?php _e('Cancel', 'tutor') ?></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!--create announcements modal end-->