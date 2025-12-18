'use client'

import { useEffect } from 'react'

export function FeedbackWidgetLoader() {
	useEffect(() => {
		// Dynamically import the web component on client side
		import('@pipelined/pipelined-ui')
	}, [])

	return <feedback-widget storage-key="pipelined-feedback" position="bottom-right" />
}
