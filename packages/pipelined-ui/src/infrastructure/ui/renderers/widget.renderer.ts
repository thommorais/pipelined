import type { WidgetState } from '../../../domain/value-objects/widget-state.vo'
import { widgetStyles } from '../styles/widget.styles'
import { createTemplates } from '../templates/widget.templates'
import { createButtonRenderer } from './button.renderer'
import { createPanelRenderer } from './panel.renderer'

export type WidgetRenderer = {
	render: (state: WidgetState) => string
}

export const createWidgetRenderer = (): WidgetRenderer => {
	const templates = createTemplates()
	const buttonRenderer = createButtonRenderer(templates)
	const panelRenderer = createPanelRenderer(templates)

	return {
		render: (state: WidgetState): string => {
			const container = document.createElement('div')

			const style = document.createElement('style')
			style.textContent = widgetStyles
			container.appendChild(style)

			const button = buttonRenderer.renderToggleButton(state.isOpen)
			container.appendChild(button)

			if (state.isOpen) {
				const panel = panelRenderer.renderPanel(state.comments)
				container.appendChild(panel)
			}

			return container.innerHTML
		},
	}
}
