import { html, type TemplateResult } from 'lit'
import type { WidgetState } from '../../../domain/value-objects/widget-state.vo'
import { widgetStyles } from '../styles/widget.styles'
import { createButtonRenderer } from './button.renderer'
import { createPanelRenderer } from './panel.renderer'

export type WidgetRenderer = {
	render: (state: WidgetState) => TemplateResult
}

export const createWidgetRenderer = (): WidgetRenderer => {
	const buttonRenderer = createButtonRenderer()
	const panelRenderer = createPanelRenderer()

	return {
		render: (state: WidgetState): TemplateResult => html`
			<style>
				${widgetStyles}
			</style>
			${buttonRenderer.renderToggleButton(state.isOpen)}
			${state.isOpen ? panelRenderer.renderPanel(state.comments) : ''}
		`,
	}
}
