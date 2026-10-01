export type CommentId = string

export type PinnedComment = {
	readonly id: CommentId
	readonly content: string
	readonly author: string
	readonly timestamp: number
	readonly page: string
}

export const createComment = (author: string, content: string, page: string): PinnedComment => ({
	id: crypto.randomUUID(),
	content,
	author,
	timestamp: Date.now(),
	page,
})
