declare namespace JSX {
	interface IntrinsicElements {
		'feedback-widget': {
			'storage-key'?: string
			position?: string
		}
	}
}

declare global {
	namespace React {
		namespace JSX {
			interface IntrinsicElements {
				'feedback-widget': {
					'storage-key'?: string
					position?: string
				}
			}
		}
	}
}

export {}
