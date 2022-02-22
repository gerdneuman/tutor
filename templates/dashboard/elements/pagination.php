<?php
/**
 * Global Pagination Template for Backend Pages
 *
 * @package Pagination
 * @since v2.0.0
 */

// Pagination.
$paged    = $data['paged'];
$per_page = $data['per_page'];
$big      = 999999999;


if(isset($data['layout']) && $data['layout']['type']=='prev_next') {
	$current_url = tutor()->current_url;
	
	echo '<nav '.(isset($data['ajax']) ? ' data-tutor_pagination_ajax="'.esc_attr( json_encode($data['ajax']) ).'" ' : '').'>';
		
		if($paged>1) {
			echo '<a class="tutor-btn tutor-btn-secondary page-numbers tutor-mr-5" href="'.add_query_arg( array('current_page' => $paged-1), $current_url ).'">'.
					(empty($data['layout']['prev_text']) ? __('Previous', 'tutor') : $data['layout']['prev_text'])
				.'</a>';
		}

		echo '<a class="tutor-btn tutor-btn-tertiary tutor-is-outline page-numbers tutor-mr-5" href="'.add_query_arg( array('current_page' => $paged+1), $current_url ).'">'.
					(empty($data['layout']['next_text']) ? __('Next', 'tutor') : $data['layout']['next_text'])
				.'</a>';
	echo '</nav>';

	return;
}

if ( isset( $data['total_items'] ) && $data['total_items'] ) : ?>
	<nav class="tutor-ui-pagination tutor-mt-40" <?php echo isset($data['ajax']) ? ' data-tutor_pagination_ajax="'.esc_attr( json_encode($data['ajax']) ).'" ' : ''; ?>>
		<div classs="tutor-pagination-hints">
			<div class="text-regular-caption tutor-color-text-subsued">
			<?php esc_html_e( 'Page', 'tutor' ); ?> 
			<span class="tutor-text-medium-caption tutor-color-text-primary">
				<?php echo esc_html( $data['paged'] ); ?>
			</span>
			<?php esc_html_e( 'of', 'tutor' ); ?> 
			<span class="tutor-text-medium-caption tutor-color-text-primary">
				<?php echo esc_html( ceil( $data['total_items'] / $data['per_page'] ) ); ?>
			</span>
			</div>
		</div>
		<ul class="tutor-pagination-numbers">
			<?php
				echo paginate_links(
					array(
						'format'    => '?current_page=%#%',
						'current'   => $paged,
						'total'     => ceil( $data['total_items'] / $per_page ),
						'prev_text' => '<span class="tutor-icon-angle-left-filled"></span>',
						'next_text' => '<span class="tutor-icon-angle-right-filled"></span>',
					)
				);
			?>
		</ul>
	</nav>
<?php endif; ?>
