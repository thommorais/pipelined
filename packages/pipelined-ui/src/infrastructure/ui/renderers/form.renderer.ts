import { html, type TemplateResult } from 'lit'

export type FormRenderer = {
	renderForm: () => TemplateResult
}

export const createFormRenderer = (): FormRenderer => ({
	renderForm: (): TemplateResult => html`
		<div class="form">
			<input type="text" class="input" id="author-input" placeholder="Your name" />
			<textarea class="textarea" id="comment-input" rows="3" placeholder="Add a pinned comment..."></textarea>
			<button class="submit-button" id="submit-btn">Pin Comment</button>
		</div>
	`,
})
