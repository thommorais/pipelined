import { html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import type { WidgetStateManager } from '../application/use-cases/widget-state.manager'
import { createWidgetStateManager } from '../application/use-cases/widget-state.manager'
import type { WidgetState } from '../domain/value-objects/widget-state.vo'
import { createLocalStorageAdapter } from '../infrastructure/adapters/local-storage.adapter'
import { iconChat, iconClose, iconPlus } from '../infrastructure/ui/icons/widget.icons'
import { widgetStyles } from '../infrastructure/ui/styles/widget.styles'
import { formatDate } from '../infrastructure/utils/date.utils'
import { createComponentLifecycle } from './lifecycle/component-lifecycle'

export class FeedbackWidget extends LitElement {
	@property({ type: String, attribute: 'storage-key' })
	storageKey = 'pipelined-feedback'

	@state()
	private widgetState?: WidgetState

	private stateManager: WidgetStateManager
	private lifecycle: ReturnType<typeof createComponentLifecycle>

	constructor() {
		super()

		const storage = createLocalStorageAdapter()
		this.stateManager = createWidgetStateManager({ storage })
		this.lifecycle = createComponentLifecycle({ stateManager: this.stateManager })
	}

	connectedCallback(): void {
		super.connectedCallback()
		this.lifecycle.initialize(this.storageKey, state => {
			this.widgetState = state
		})
		this.widgetState = this.stateManager.getState()
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		this.lifecycle.cleanup()
	}

	private handleToggle = () => {
		this.stateManager.toggleOpen()
	}

	private handleRemove = (id: string) => {
		this.stateManager.removeComment(id)
	}

	private handleSubmit = () => {
		const authorInput = this.shadowRoot?.getElementById('author-input') as HTMLInputElement | null
		const commentInput = this.shadowRoot?.getElementById('comment-input') as HTMLTextAreaElement | null

		const author = authorInput?.value.trim()
		const content = commentInput?.value.trim()

		if (author && content) {
			this.stateManager.addComment(author, content)
			if (authorInput) authorInput.value = ''
			if (commentInput) commentInput.value = ''
		}
	}

	protected render() {
		if (!this.widgetState) return html``

		const { isOpen, comments } = this.widgetState

		return html`
			<style>
				${widgetStyles}
			</style>
			<button
				class="toggle-button ${isOpen ? 'open' : ''}"
				id="toggle-btn"
				aria-label="${isOpen ? 'Close feedback' : 'Open feedback'}"
				@click=${this.handleToggle}
			>
				${unsafeSVG(iconPlus)}
			</button>
			${
				isOpen
					? html`
						<div class="panel">
							<div class="header">
								<div class="header-title">${unsafeSVG(iconChat)} <h2>Feedback & Pins</h2></div>
								<span class="badge">${comments.length}</span>
							</div>
							<div class="comments-list">
								${
									comments.length === 0
										? html`<div class="empty-state">No pinned comments yet. Add one below!</div>`
										: comments.map(
												comment => html`
												<div class="comment">
													<div class="comment-header">
														<div class="comment-meta">
															<p class="comment-author">${comment.author}</p>
															<div class="comment-info">${comment.page} • ${formatDate(comment.timestamp)}</div>
														</div>
														<button
															class="remove-button"
															data-id="${comment.id}"
															aria-label="Remove comment"
															@click=${() => this.handleRemove(comment.id)}
														>
															${unsafeSVG(iconClose)}
														</button>
													</div>
													<p class="comment-content">${comment.content}</p>
												</div>
											`,
											)
								}
							</div>
							<div class="form">
								<input type="text" class="input" id="author-input" placeholder="Your name" />
								<textarea
									class="textarea"
									id="comment-input"
									rows="3"
									placeholder="Add a pinned comment..."
								></textarea>
								<button class="submit-button" id="submit-btn" @click=${this.handleSubmit}>Pin Comment</button>
							</div>
						</div>
					`
					: ''
			}
		`
	}
}

if (!customElements.get('feedback-widget')) {
	customElements.define('feedback-widget', FeedbackWidget)
}
