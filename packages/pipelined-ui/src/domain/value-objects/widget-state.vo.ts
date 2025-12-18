import type { PinnedComment } from '../entities/comment.entity'

export type WidgetState = {
	readonly isOpen: boolean
	readonly comments: ReadonlyArray<PinnedComment>
}

export const createInitialState = (): WidgetState => ({
	isOpen: false,
	comments: [],
})

export const createStateWithComments = (comments: ReadonlyArray<PinnedComment>): WidgetState => ({
	isOpen: false,
	comments,
})
