import { html, type TemplateResult } from 'lit'
import type { PinnedComment } from '../../../domain/entities/comment.entity'
import { createCommentRenderer } from './comment.renderer'
import { createFormRenderer } from './form.renderer'
import { createHeaderRenderer } from './header.renderer'

export type PanelRenderer = {
	renderPanel: (comments: ReadonlyArray<PinnedComment>) => TemplateResult
}

export const createPanelRenderer = (): PanelRenderer => {
	const headerRenderer = createHeaderRenderer()
	const commentRenderer = createCommentRenderer()
	const formRenderer = createFormRenderer()

	return {
		renderPanel: (comments: ReadonlyArray<PinnedComment>): TemplateResult => html`
			<div class="panel">
				${headerRenderer.renderHeader(comments.length)} ${commentRenderer.renderCommentsList(comments)}
				${formRenderer.renderForm()}
			</div>
		`,
	}
}
