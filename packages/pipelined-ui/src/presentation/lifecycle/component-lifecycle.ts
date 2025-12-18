import type { WidgetStateManager } from '../../application/use-cases/widget-state.manager'
import type { WidgetRenderer } from '../../infrastructure/ui/renderers/widget.renderer'
import type { ClickHandler } from '../event-handlers/click.handler'

export type ComponentLifecycle = {
	onConnected: (storageKey: string) => () => void
	onDisconnected: () => void
}

type ComponentLifecycleConfig = {
	shadow: ShadowRoot
	renderer: WidgetRenderer
	stateManager: WidgetStateManager
	clickHandler: ClickHandler
}

export const createComponentLifecycle = ({
	shadow,
	renderer,
	stateManager,
	clickHandler,
}: ComponentLifecycleConfig): ComponentLifecycle => {
	let unsubscribe: (() => void) | undefined

	const render = (): void => {
		const state = stateManager.getState()
		shadow.innerHTML = renderer.render(state)
	}

	const attachEventListeners = (): void => {
		shadow.addEventListener('click', clickHandler)
	}

	return {
		onConnected: (storageKey: string): (() => void) => {
			stateManager.initialize(storageKey)
			unsubscribe = stateManager.subscribe(render)
			render()
			attachEventListeners()
			return () => unsubscribe?.()
		},

		onDisconnected: (): void => {
			unsubscribe?.()
		},
	}
}
