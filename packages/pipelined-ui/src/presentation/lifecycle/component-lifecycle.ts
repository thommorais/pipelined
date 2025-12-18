import type { WidgetStateManager } from '../../application/use-cases/widget-state.manager'
import type { WidgetState } from '../../domain/value-objects/widget-state.vo'

export type ComponentLifecycle = {
	initialize: (storageKey: string, onStateChange: (state: WidgetState) => void) => void
	cleanup: () => void
}

type ComponentLifecycleConfig = {
	stateManager: WidgetStateManager
}

export const createComponentLifecycle = ({ stateManager }: ComponentLifecycleConfig): ComponentLifecycle => {
	let unsubscribe: (() => void) | undefined

	return {
		initialize: (storageKey: string, onStateChange: (state: WidgetState) => void): void => {
			stateManager.initialize(storageKey)
			unsubscribe = stateManager.subscribe(onStateChange)
		},

		cleanup: (): void => {
			unsubscribe?.()
		},
	}
}
