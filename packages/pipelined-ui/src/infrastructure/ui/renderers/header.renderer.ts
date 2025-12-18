import { html, type TemplateResult } from 'lit'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { iconChat } from '../icons/widget.icons'

export type HeaderRenderer = {
	renderHeader: (count: number) => TemplateResult
}

export const createHeaderRenderer = (): HeaderRenderer => ({
	renderHeader: (count: number): TemplateResult => html`
		<div class="header">
			<div class="header-title">
				${unsafeSVG(iconChat)}
				<h2>Feedback & Pins</h2>
			</div>
			<span class="badge">${count}</span>
		</div>
	`,
})
