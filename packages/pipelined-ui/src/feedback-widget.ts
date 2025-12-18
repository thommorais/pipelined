export type PinnedComment = {
	id: string
	content: string
	author: string
	timestamp: number
	page: string
}

export class FeedbackWidget extends HTMLElement {
	private shadow: ShadowRoot
	private isOpen = false
	private pinnedComments: PinnedComment[] = []
	private storageKey = 'pipelined-feedback'

	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: 'open' })
	}

	connectedCallback() {
		this.storageKey = this.getAttribute('storage-key') || 'pipelined-feedback'
		this.loadComments()
		this.render()
		this.attachEventListeners()
	}

	private loadComments() {
		const stored = localStorage.getItem(this.storageKey)
		if (stored) {
			try {
				this.pinnedComments = JSON.parse(stored)
			} catch {
				// Invalid JSON, ignore
			}
		}
	}

	private saveComments() {
		localStorage.setItem(this.storageKey, JSON.stringify(this.pinnedComments))
	}

	private addComment(author: string, content: string) {
		const comment: PinnedComment = {
			id: crypto.randomUUID(),
			content,
			author,
			timestamp: Date.now(),
			page: window.location.pathname,
		}
		this.pinnedComments.push(comment)
		this.saveComments()
		this.render()
	}

	private removeComment(id: string) {
		this.pinnedComments = this.pinnedComments.filter((c) => c.id !== id)
		this.saveComments()
		this.render()
	}

	private togglePanel() {
		this.isOpen = !this.isOpen
		this.render()
	}

	private getStyles() {
		return `
			:host {
				all: initial;
				position: fixed;
				bottom: 1.5rem;
				right: 1.5rem;
				z-index: 9999;
				font-family: system-ui, -apple-system, sans-serif;
			}

			* {
				box-sizing: border-box;
			}

			.toggle-button {
				width: 3.5rem;
				height: 3.5rem;
				border-radius: 50%;
				background: #2563eb;
				color: white;
				border: none;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
				transition: all 0.2s;
			}

			.toggle-button:hover {
				background: #1d4ed8;
			}

			.toggle-button.open {
				transform: rotate(45deg);
			}

			.toggle-button:focus {
				outline: 2px solid #2563eb;
				outline-offset: 2px;
			}

			.panel {
				position: fixed;
				bottom: 6rem;
				right: 1.5rem;
				width: 24rem;
				max-width: calc(100vw - 3rem);
				max-height: calc(100vh - 8rem);
				background: white;
				border: 1px solid #e5e7eb;
				border-radius: 0.5rem;
				box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
				display: flex;
				flex-direction: column;
				overflow: hidden;
			}

			.header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 1rem;
				border-bottom: 1px solid #e5e7eb;
			}

			.header-title {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}

			.header-title h2 {
				margin: 0;
				font-size: 0.875rem;
				font-weight: 600;
				color: #111827;
			}

			.badge {
				background: #dbeafe;
				color: #1d4ed8;
				padding: 0.125rem 0.5rem;
				border-radius: 9999px;
				font-size: 0.75rem;
				font-weight: 500;
			}

			.comments-list {
				flex: 1;
				overflow-y: auto;
				padding: 1rem;
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
			}

			.empty-state {
				padding: 2rem 0;
				text-align: center;
				color: #6b7280;
				font-size: 0.875rem;
			}

			.comment {
				background: #f9fafb;
				border: 1px solid #e5e7eb;
				border-radius: 0.5rem;
				padding: 0.75rem;
			}

			.comment-header {
				display: flex;
				align-items: start;
				justify-content: space-between;
				gap: 0.5rem;
				margin-bottom: 0.5rem;
			}

			.comment-meta {
				flex: 1;
			}

			.comment-author {
				font-weight: 500;
				font-size: 0.875rem;
				color: #111827;
				margin: 0 0 0.25rem 0;
			}

			.comment-info {
				font-size: 0.75rem;
				color: #6b7280;
			}

			.remove-button {
				background: none;
				border: none;
				cursor: pointer;
				padding: 0.25rem;
				color: #9ca3af;
				border-radius: 0.25rem;
				transition: all 0.2s;
			}

			.remove-button:hover {
				background: #e5e7eb;
				color: #4b5563;
			}

			.comment-content {
				font-size: 0.875rem;
				color: #374151;
				margin: 0;
			}

			.form {
				border-top: 1px solid #e5e7eb;
				padding: 1rem;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.input,
			.textarea {
				width: 100%;
				padding: 0.5rem 0.75rem;
				border: 1px solid #d1d5db;
				border-radius: 0.375rem;
				font-size: 0.875rem;
				font-family: inherit;
			}

			.input:focus,
			.textarea:focus {
				outline: none;
				border-color: #2563eb;
				ring: 1px solid #2563eb;
			}

			.textarea {
				resize: none;
			}

			.submit-button {
				width: 100%;
				padding: 0.5rem 1rem;
				background: #2563eb;
				color: white;
				border: none;
				border-radius: 0.375rem;
				font-size: 0.875rem;
				font-weight: 500;
				cursor: pointer;
				transition: all 0.2s;
			}

			.submit-button:hover:not(:disabled) {
				background: #1d4ed8;
			}

			.submit-button:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			.icon {
				width: 1.5rem;
				height: 1.5rem;
			}

			.icon-sm {
				width: 1.25rem;
				height: 1.25rem;
			}

			.icon-xs {
				width: 1rem;
				height: 1rem;
			}
		`
	}

	private render() {
		this.shadow.innerHTML = `
			<style>${this.getStyles()}</style>

			<button class="toggle-button ${this.isOpen ? 'open' : ''}" id="toggle-btn" aria-label="${this.isOpen ? 'Close feedback' : 'Open feedback'}">
				<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd"/>
				</svg>
			</button>

			${
				this.isOpen
					? `
				<div class="panel">
					<div class="header">
						<div class="header-title">
							<svg class="icon-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2563eb">
								<path fill-rule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clip-rule="evenodd"/>
							</svg>
							<h2>Feedback & Pins</h2>
						</div>
						<span class="badge">${this.pinnedComments.length}</span>
					</div>

					<div class="comments-list">
						${
							this.pinnedComments.length === 0
								? '<div class="empty-state">No pinned comments yet. Add one below!</div>'
								: this.pinnedComments
										.map(
											(comment) => `
							<div class="comment">
								<div class="comment-header">
									<div class="comment-meta">
										<p class="comment-author">${this.escapeHtml(comment.author)}</p>
										<div class="comment-info">${this.escapeHtml(comment.page)} • ${new Date(comment.timestamp).toLocaleString()}</div>
									</div>
									<button class="remove-button" data-id="${comment.id}" aria-label="Remove comment">
										<svg class="icon-xs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
											<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
										</svg>
									</button>
								</div>
								<p class="comment-content">${this.escapeHtml(comment.content)}</p>
							</div>
						`,
										)
										.join('')
						}
					</div>

					<div class="form">
						<input type="text" class="input" id="author-input" placeholder="Your name" />
						<textarea class="textarea" id="comment-input" rows="3" placeholder="Add a pinned comment..."></textarea>
						<button class="submit-button" id="submit-btn">Pin Comment</button>
					</div>
				</div>
			`
					: ''
			}
		`
	}

	private escapeHtml(text: string): string {
		const div = document.createElement('div')
		div.textContent = text
		return div.innerHTML
	}

	private attachEventListeners() {
		this.shadow.addEventListener('click', (e) => {
			const target = e.target as HTMLElement

			if (target.id === 'toggle-btn' || target.closest('#toggle-btn')) {
				this.togglePanel()
			}

			if (target.classList.contains('remove-button') || target.closest('.remove-button')) {
				const button = target.classList.contains('remove-button') ? target : target.closest('.remove-button')
				const id = button?.getAttribute('data-id')
				if (id) {
					this.removeComment(id)
				}
			}

			if (target.id === 'submit-btn') {
				const authorInput = this.shadow.getElementById('author-input') as HTMLInputElement
				const commentInput = this.shadow.getElementById('comment-input') as HTMLTextAreaElement

				if (authorInput?.value.trim() && commentInput?.value.trim()) {
					this.addComment(authorInput.value.trim(), commentInput.value.trim())
					authorInput.value = ''
					commentInput.value = ''
				}
			}
		})
	}
}

// Register the custom element
if (!customElements.get('feedback-widget')) {
	customElements.define('feedback-widget', FeedbackWidget)
}
