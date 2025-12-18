import type { WidgetTemplates } from '../templates/widget.templates'

export type FormRenderer = {
	renderForm: () => HTMLElement
}

export const createFormRenderer = (templates: WidgetTemplates): FormRenderer => ({
	renderForm: (): HTMLElement => {
		const form = templates.formTemplate.content.cloneNode(true) as DocumentFragment
		return form.querySelector('.form') as HTMLElement
	},
})
