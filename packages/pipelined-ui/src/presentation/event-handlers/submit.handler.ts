import type { WidgetStateManager } from '../../application/use-cases/widget-state.manager'

export type SubmitHandler = (shadow: ShadowRoot) => void

export const createSubmitHandler =
	(stateManager: WidgetStateManager): SubmitHandler =>
	(shadow: ShadowRoot): void => {
		const authorInput = shadow.getElementById('author-input') as HTMLInputElement | null
		const commentInput = shadow.getElementById('comment-input') as HTMLTextAreaElement | null

		const author = authorInput?.value.trim()
		const content = commentInput?.value.trim()

		if (author && content) {
			stateManager.addComment(author, content)

			if (authorInput) authorInput.value = ''
			if (commentInput) commentInput.value = ''
		}
	}
