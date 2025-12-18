import type { WidgetTemplates } from '../templates/widget.templates'

export type HeaderRenderer = {
	renderHeader: (count: number) => HTMLElement
}

export const createHeaderRenderer = (templates: WidgetTemplates): HeaderRenderer => ({
	renderHeader: (count: number): HTMLElement => {
		const header = templates.headerTemplate.content.cloneNode(true) as DocumentFragment
		const headerElement = header.querySelector('.header') as HTMLElement
		const badge = header.querySelector('[data-count]') as HTMLElement

		badge.textContent = count.toString()

		return headerElement
	},
})
