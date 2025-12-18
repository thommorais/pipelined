import { createWidgetStateManager } from '../application/use-cases/widget-state.manager'
import { createLocalStorageAdapter } from '../infrastructure/adapters/local-storage.adapter'
import { createWidgetRenderer } from '../infrastructure/ui/renderers/widget.renderer'
import { createClickHandler } from './event-handlers/click.handler'
import { createSubmitHandler } from './event-handlers/submit.handler'
import { createComponentLifecycle } from './lifecycle/component-lifecycle'

export const createFeedbackWidget = () => {
	return class FeedbackWidget extends HTMLElement {
		private shadow: ShadowRoot
		private lifecycle: ReturnType<typeof createComponentLifecycle>
		private cleanup?: () => void

		constructor() {
			super()
			this.shadow = this.attachShadow({ mode: 'open' })

			const storage = createLocalStorageAdapter()
			const stateManager = createWidgetStateManager({ storage })
			const renderer = createWidgetRenderer()
			const submitHandler = createSubmitHandler(stateManager)
			const clickHandler = createClickHandler({ stateManager, shadow: this.shadow, submitHandler })

			this.lifecycle = createComponentLifecycle({
				shadow: this.shadow,
				renderer,
				stateManager,
				clickHandler,
			})
		}

		connectedCallback(): void {
			const storageKey = this.getAttribute('storage-key') || 'pipelined-feedback'
			this.cleanup = this.lifecycle.onConnected(storageKey)
		}

		disconnectedCallback(): void {
			this.cleanup?.()
			this.lifecycle.onDisconnected()
		}
	}
}

export const FeedbackWidget = createFeedbackWidget()

if (!customElements.get('feedback-widget')) {
	customElements.define('feedback-widget', FeedbackWidget)
}
