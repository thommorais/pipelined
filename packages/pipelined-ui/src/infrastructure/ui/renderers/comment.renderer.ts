import { html, type TemplateResult } from 'lit'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import type { PinnedComment } from '../../../domain/entities/comment.entity'
import { formatDate } from '../../utils/date.utils'
import { iconClose } from '../icons/widget.icons'

export type CommentRenderer = {
	renderComment: (comment: PinnedComment) => TemplateResult
	renderCommentsList: (comments: ReadonlyArray<PinnedComment>) => TemplateResult
}

export const createCommentRenderer = (): CommentRenderer => ({
	renderComment: (comment: PinnedComment): TemplateResult => html`
		<div class="comment">
			<div class="comment-header">
				<div class="comment-meta">
					<p class="comment-author">${comment.author}</p>
					<div class="comment-info">${comment.page} • ${formatDate(comment.timestamp)}</div>
				</div>
				<button class="remove-button" data-id="${comment.id}" aria-label="Remove comment">
					${unsafeSVG(iconClose)}
				</button>
			</div>
			<p class="comment-content">${comment.content}</p>
		</div>
	`,

	renderCommentsList: (comments: ReadonlyArray<PinnedComment>): TemplateResult => {
		const renderer = createCommentRenderer()
		return html`
			<div class="comments-list">
				${
					comments.length === 0
						? html`<div class="empty-state">No pinned comments yet. Add one below!</div>`
						: comments.map(comment => renderer.renderComment(comment))
				}
			</div>
		`
	},
})
