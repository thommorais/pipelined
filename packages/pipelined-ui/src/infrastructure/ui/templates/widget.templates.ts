import { iconChat, iconClose, iconPlus } from '../icons/widget.icons'

export const createTemplates = () => {
	const toggleButtonTemplate = document.createElement('template')
	toggleButtonTemplate.innerHTML = `
		<button class="toggle-button" id="toggle-btn" aria-label="Toggle feedback">
			${iconPlus}
		</button>
	`

	const headerTemplate = document.createElement('template')
	headerTemplate.innerHTML = `
		<div class="header">
			<div class="header-title">
				${iconChat}
				<h2>Feedback & Pins</h2>
			</div>
			<span class="badge" data-count></span>
		</div>
	`

	const commentTemplate = document.createElement('template')
	commentTemplate.innerHTML = `
		<div class="comment">
			<div class="comment-header">
				<div class="comment-meta">
					<p class="comment-author" data-author></p>
					<div class="comment-info" data-info></div>
				</div>
				<button class="remove-button" data-id="" aria-label="Remove comment">
					${iconClose}
				</button>
			</div>
			<p class="comment-content" data-content></p>
		</div>
	`

	const emptyStateTemplate = document.createElement('template')
	emptyStateTemplate.innerHTML = `
		<div class="empty-state">No pinned comments yet. Add one below!</div>
	`

	const commentsListTemplate = document.createElement('template')
	commentsListTemplate.innerHTML = `
		<div class="comments-list" data-comments></div>
	`

	const formTemplate = document.createElement('template')
	formTemplate.innerHTML = `
		<div class="form">
			<input type="text" class="input" id="author-input" placeholder="Your name" />
			<textarea class="textarea" id="comment-input" rows="3" placeholder="Add a pinned comment..."></textarea>
			<button class="submit-button" id="submit-btn">Pin Comment</button>
		</div>
	`

	const panelTemplate = document.createElement('template')
	panelTemplate.innerHTML = `
		<div class="panel">
			<div data-header></div>
			<div data-comments-list></div>
			<div data-form></div>
		</div>
	`

	return {
		toggleButtonTemplate,
		headerTemplate,
		commentTemplate,
		emptyStateTemplate,
		commentsListTemplate,
		formTemplate,
		panelTemplate,
	}
}

export type WidgetTemplates = ReturnType<typeof createTemplates>
