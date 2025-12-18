export const widgetStyles = `
	:host {
		all: initial;
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 9999;
		font-family: system-ui, -apple-system, sans-serif;
	}

	* {
		box-sizing: border-box;
	}

	.toggle-button {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: #2563eb;
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		transition: all 0.2s;
	}

	.toggle-button:hover {
		background: #1d4ed8;
	}

	.toggle-button.open {
		transform: rotate(45deg);
	}

	.toggle-button:focus {
		outline: 2px solid #2563eb;
		outline-offset: 2px;
	}

	.panel {
		position: fixed;
		bottom: 6rem;
		right: 1.5rem;
		width: 24rem;
		max-width: calc(100vw - 3rem);
		max-height: calc(100vh - 8rem);
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.header-title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.header-title h2 {
		margin: 0;
		font-size: 0.875rem;
		font-weight: 600;
		color: #111827;
	}

	.badge {
		background: #dbeafe;
		color: #1d4ed8;
		padding: 0.125rem 0.5rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.comments-list {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.empty-state {
		padding: 2rem 0;
		text-align: center;
		color: #6b7280;
		font-size: 0.875rem;
	}

	.comment {
		background: #f9fafb;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		padding: 0.75rem;
	}

	.comment-header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.comment-meta {
		flex: 1;
	}

	.comment-author {
		font-weight: 500;
		font-size: 0.875rem;
		color: #111827;
		margin: 0 0 0.25rem 0;
	}

	.comment-info {
		font-size: 0.75rem;
		color: #6b7280;
	}

	.remove-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: #9ca3af;
		border-radius: 0.25rem;
		transition: all 0.2s;
	}

	.remove-button:hover {
		background: #e5e7eb;
		color: #4b5563;
	}

	.comment-content {
		font-size: 0.875rem;
		color: #374151;
		margin: 0;
	}

	.form {
		border-top: 1px solid #e5e7eb;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input,
	.textarea {
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-family: inherit;
	}

	.input:focus,
	.textarea:focus {
		outline: none;
		border-color: #2563eb;
		ring: 1px solid #2563eb;
	}

	.textarea {
		resize: none;
	}

	.submit-button {
		width: 100%;
		padding: 0.5rem 1rem;
		background: #2563eb;
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.submit-button:hover:not(:disabled) {
		background: #1d4ed8;
	}

	.submit-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	.icon-sm {
		width: 1.25rem;
		height: 1.25rem;
	}

	.icon-xs {
		width: 1rem;
		height: 1rem;
	}
`
