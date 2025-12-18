import type { PinnedComment } from '../../../domain/entities/comment.entity'
import { formatDate } from '../../utils/date.utils'
import type { WidgetTemplates } from '../templates/widget.templates'

export type CommentRenderer = {
	renderComment: (comment: PinnedComment) => HTMLElement
	renderCommentsList: (comments: ReadonlyArray<PinnedComment>) => HTMLElement
}

export const createCommentRenderer = (templates: WidgetTemplates): CommentRenderer => ({
	renderComment: (comment: PinnedComment): HTMLElement => {
		const commentNode = templates.commentTemplate.content.cloneNode(true) as DocumentFragment
		const commentElement = commentNode.querySelector('.comment') as HTMLElement

		const author = commentNode.querySelector('[data-author]') as HTMLElement
		const info = commentNode.querySelector('[data-info]') as HTMLElement
		const content = commentNode.querySelector('[data-content]') as HTMLElement
		const removeButton = commentNode.querySelector('.remove-button') as HTMLElement

		author.textContent = comment.author
		info.textContent = `${comment.page} • ${formatDate(comment.timestamp)}`
		content.textContent = comment.content
		removeButton.setAttribute('data-id', comment.id)

		return commentElement
	},

	renderCommentsList: (comments: ReadonlyArray<PinnedComment>): HTMLElement => {
		const listNode = templates.commentsListTemplate.content.cloneNode(true) as DocumentFragment
		const listElement = listNode.querySelector('[data-comments]') as HTMLElement

		if (comments.length === 0) {
			const emptyState = templates.emptyStateTemplate.content.cloneNode(true)
			listElement.appendChild(emptyState)
		} else {
			for (const comment of comments) {
				const commentElement = createCommentRenderer(templates).renderComment(comment)
				listElement.appendChild(commentElement)
			}
		}

		return listElement
	},
})
