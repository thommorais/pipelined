import type { StoragePort } from '../../application/ports/storage.port'
import type { PinnedComment } from '../../domain/entities/comment.entity'

export const createLocalStorageAdapter = (): StoragePort => ({
	load: (key: string): ReadonlyArray<PinnedComment> => {
		try {
			const stored = localStorage.getItem(key)
			if (!stored) return []

			const parsed = JSON.parse(stored)
			return Array.isArray(parsed) ? parsed : []
		} catch (error) {
			console.error('Failed to load comments from localStorage:', error)
			return []
		}
	},

	save: (key: string, comments: ReadonlyArray<PinnedComment>): void => {
		try {
			localStorage.setItem(key, JSON.stringify(comments))
		} catch (error) {
			console.error('Failed to save comments to localStorage:', error)
		}
	},
})
