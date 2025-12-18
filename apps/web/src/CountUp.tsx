import { createEffect, createSignal, type JSX, onCleanup, splitProps } from 'solid-js'

const padWithZeros = (n: number | string, width: number) => {
	const s = typeof n === 'number' ? String(n) : n
	const trimmed = s.trim()
	const isNegative = trimmed.startsWith('-')
	const sign = isNegative ? '-' : ''
	const absStr = isNegative ? trimmed.slice(1) : trimmed
	const padded = absStr.padStart(width, '0')

	return sign + padded
}

type AnimatedCountProps = JSX.HTMLAttributes<HTMLDivElement> & {
	number: number
	duration?: number
}

export const AnimatedCount = (props: AnimatedCountProps) => {
	const [local, rest] = splitProps(props, ['number', 'duration'])
	const [displayValue, setDisplayValue] = createSignal(local.number)
	let previousValue = local.number
	let rafId: number | null = null
	let startTime: number | null = null

	createEffect(() => {
		const endValue = local.number
		const duration = local.duration ?? 1800

		if (endValue === previousValue) {
			return
		}

		if (rafId !== null) {
			cancelAnimationFrame(rafId)
			rafId = null
		}

		startTime = null

		const startValue = Number.isNaN(previousValue) ? 0 : previousValue
		const difference = endValue - startValue

		const animate = (currentTime: number) => {
			if (startTime === null) {
				startTime = currentTime
			}

			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / duration, 1)

			const easeOutQuad = 1 - (1 - progress) ** 2
			const currentValue = startValue + difference * easeOutQuad

			setDisplayValue(Math.round(currentValue))

			if (progress < 1) {
				rafId = requestAnimationFrame(animate)
			} else {
				previousValue = endValue
				startTime = null
			}
		}

		rafId = requestAnimationFrame(animate)

		onCleanup(() => {
			if (rafId !== null) {
				cancelAnimationFrame(rafId)
				rafId = null
			}
		})
	})

	return <div {...rest}>{padWithZeros(displayValue(), String(local.number).length)}</div>
}
