import { html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import type { WidgetStateManager } from '../application/use-cases/widget-state.manager'
import { createWidgetStateManager } from '../application/use-cases/widget-state.manager'
import type { WidgetState } from '../domain/value-objects/widget-state.vo'
import { createLocalStorageAdapter } from '../infrastructure/adapters/local-storage.adapter'
import { createWidgetRenderer } from '../infrastructure/ui/renderers/widget.renderer'
import type { ClickHandler } from './event-handlers/click.handler'
import { createClickHandler } from './event-handlers/click.handler'
import type { SubmitHandler } from './event-handlers/submit.handler'
import { createSubmitHandler } from './event-handlers/submit.handler'
import { createComponentLifecycle } from './lifecycle/component-lifecycle'

export class FeedbackWidget extends LitElement {
	@property({ type: String, attribute: 'storage-key' })
	storageKey = 'pipelined-feedback'

	@state()
	private widgetState?: WidgetState

	private stateManager: WidgetStateManager
	private lifecycle: ReturnType<typeof createComponentLifecycle>
	private renderer = createWidgetRenderer()
	private clickHandler?: ClickHandler
	private submitHandler?: SubmitHandler

	constructor() {
		super()

		const storage = createLocalStorageAdapter()
		this.stateManager = createWidgetStateManager({ storage })
		this.lifecycle = createComponentLifecycle({ stateManager: this.stateManager })
	}

	connectedCallback(): void {
		super.connectedCallback()
		const storageKey = this.getAttribute('storage-key') || this.storageKey || 'pipelined-feedback'
		this.storageKey = storageKey
		this.lifecycle.initialize(storageKey, state => {
			this.widgetState = state
			this.requestUpdate()
		})
		this.widgetState = this.stateManager.getState()
		this.requestUpdate()
	}

	disconnectedCallback(): void {
		super.disconnectedCallback()
		this.lifecycle.cleanup()
	}

	protected firstUpdated(): void {
		this.submitHandler = createSubmitHandler(this.stateManager)
		this.clickHandler = createClickHandler({
			stateManager: this.stateManager,
			shadow: this.renderRoot as ShadowRoot,
			submitHandler: this.submitHandler,
		})
	}

	private handleClick = (event: Event) => {
		this.clickHandler?.(event)
	}

	protected render() {
		if (!this.widgetState) return html``

		return html`
			<div @click=${this.handleClick}>${this.renderer.render(this.widgetState)}</div>
		`
	}
}

if (!customElements.get('feedback-widget')) {
	customElements.define('feedback-widget', FeedbackWidget)
}
