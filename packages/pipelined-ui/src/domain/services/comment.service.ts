import type { CommentId } from '../entities/comment.entity'
import { createComment } from '../entities/comment.entity'
import type { WidgetState } from '../value-objects/widget-state.vo'

export type CommentService = {
	addComment: (state: WidgetState, author: string, content: string, page: string) => WidgetState
	removeComment: (state: WidgetState, id: CommentId) => WidgetState
	toggleOpen: (state: WidgetState) => WidgetState
	getCommentCount: (state: WidgetState) => number
}

export const createCommentService = (): CommentService => ({
	addComment: (state, author, content, page) => ({
		...state,
		comments: [...state.comments, createComment(author, content, page)],
	}),

	removeComment: (state, id) => ({
		...state,
		comments: state.comments.filter(c => c.id !== id),
	}),

	toggleOpen: state => ({
		...state,
		isOpen: !state.isOpen,
	}),

	getCommentCount: state => state.comments.length,
})
