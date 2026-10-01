import type { WidgetStateManager } from '../../application/use-cases/widget-state.manager'
import type { SubmitHandler } from './submit.handler'

export type ClickHandler = (event: Event) => void

type ClickHandlerConfig = {
	stateManager: WidgetStateManager
	shadow: ShadowRoot
	submitHandler: SubmitHandler
}

export const createClickHandler =
	({ stateManager, shadow, submitHandler }: ClickHandlerConfig): ClickHandler =>
	(event: Event): void => {
		const target = event.target as HTMLElement

		if (target.id === 'toggle-btn' || target.closest('#toggle-btn')) {
			stateManager.toggleOpen()
			return
		}

		const removeBtn = target.classList.contains('remove-button') ? target : target.closest('.remove-button')
		if (removeBtn) {
			const id = removeBtn.getAttribute('data-id')
			if (id) {
				stateManager.removeComment(id)
			}
			return
		}

		if (target.id === 'submit-btn') {
			submitHandler(shadow)
		}
	}
