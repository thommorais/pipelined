import type { PinnedComment } from '../../../domain/entities/comment.entity'
import type { WidgetTemplates } from '../templates/widget.templates'
import { createCommentRenderer } from './comment.renderer'
import { createFormRenderer } from './form.renderer'
import { createHeaderRenderer } from './header.renderer'

export type PanelRenderer = {
	renderPanel: (comments: ReadonlyArray<PinnedComment>) => HTMLElement
}

export const createPanelRenderer = (templates: WidgetTemplates): PanelRenderer => {
	const headerRenderer = createHeaderRenderer(templates)
	const commentRenderer = createCommentRenderer(templates)
	const formRenderer = createFormRenderer(templates)

	return {
		renderPanel: (comments: ReadonlyArray<PinnedComment>): HTMLElement => {
			const panel = templates.panelTemplate.content.cloneNode(true) as DocumentFragment
			const panelElement = panel.querySelector('.panel') as HTMLElement

			const headerSlot = panel.querySelector('[data-header]') as HTMLElement
			const commentsSlot = panel.querySelector('[data-comments-list]') as HTMLElement
			const formSlot = panel.querySelector('[data-form]') as HTMLElement

			headerSlot.replaceWith(headerRenderer.renderHeader(comments.length))
			commentsSlot.replaceWith(commentRenderer.renderCommentsList(comments))
			formSlot.replaceWith(formRenderer.renderForm())

			return panelElement
		},
	}
}
