import type { CommentId } from '../../domain/entities/comment.entity'
import { createCommentService } from '../../domain/services/comment.service'
import type { WidgetState } from '../../domain/value-objects/widget-state.vo'
import { createStateWithComments } from '../../domain/value-objects/widget-state.vo'
import type { StoragePort } from '../ports/storage.port'

export type StateChangeListener = (state: WidgetState) => void

export type WidgetStateManager = {
	getState: () => WidgetState
	initialize: (storageKey: string) => void
	toggleOpen: () => void
	addComment: (author: string, content: string) => void
	removeComment: (id: CommentId) => void
	subscribe: (listener: StateChangeListener) => () => void
}

type WidgetStateManagerConfig = {
	storage: StoragePort
}

export const createWidgetStateManager = ({ storage }: WidgetStateManagerConfig): WidgetStateManager => {
	const commentService = createCommentService()
	let state: WidgetState = createStateWithComments([])
	let storageKey = 'pipelined-feedback'
	const listeners = new Set<StateChangeListener>()

	const notifyListeners = (): void => {
		for (const listener of listeners) {
			listener(state)
		}
	}

	const updateState = (newState: WidgetState): void => {
		state = newState
		storage.save(storageKey, newState.comments)
		notifyListeners()
	}

	return {
		getState: () => state,

		initialize: (key: string): void => {
			storageKey = key
			const comments = storage.load(storageKey)
			state = createStateWithComments(comments)
			notifyListeners()
		},

		toggleOpen: (): void => {
			updateState(commentService.toggleOpen(state))
		},

		addComment: (author: string, content: string): void => {
			const page = window.location.pathname
			updateState(commentService.addComment(state, author, content, page))
		},

		removeComment: (id: CommentId): void => {
			updateState(commentService.removeComment(state, id))
		},

		subscribe: (listener: StateChangeListener): (() => void) => {
			listeners.add(listener)
			return () => listeners.delete(listener)
		},
	}
}
