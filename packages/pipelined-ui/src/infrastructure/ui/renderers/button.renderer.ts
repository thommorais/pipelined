import { html, type TemplateResult } from 'lit'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { iconPlus } from '../icons/widget.icons'

export type ButtonRenderer = {
	renderToggleButton: (isOpen: boolean) => TemplateResult
}

export const createButtonRenderer = (): ButtonRenderer => ({
	renderToggleButton: (isOpen: boolean): TemplateResult => html`
		<button
			class="toggle-button ${isOpen ? 'open' : ''}"
			id="toggle-btn"
			aria-label="${isOpen ? 'Close feedback' : 'Open feedback'}"
		>
			${unsafeSVG(iconPlus)}
		</button>
	`,
})
