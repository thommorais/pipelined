import type { WidgetTemplates } from '../templates/widget.templates'

export type ButtonRenderer = {
	renderToggleButton: (isOpen: boolean) => HTMLElement
}

export const createButtonRenderer = (templates: WidgetTemplates): ButtonRenderer => ({
	renderToggleButton: (isOpen: boolean): HTMLElement => {
		const button = templates.toggleButtonTemplate.content.cloneNode(true) as DocumentFragment
		const buttonElement = button.querySelector('.toggle-button') as HTMLButtonElement

		if (isOpen) {
			buttonElement.classList.add('open')
		}

		buttonElement.setAttribute('aria-label', isOpen ? 'Close feedback' : 'Open feedback')

		return buttonElement
	},
})
