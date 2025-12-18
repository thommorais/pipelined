'use client'
import type { ComponentPropsWithRef } from 'react'
import { Link } from './link'
import { type VariantProps, tv } from './tv'

const buttonClasses = tv({
	base: [
		// Base
		'relative isolate inline-flex items-center justify-center gap-x-2 rounded-sm border font-semibold text-base/6', // Sizing
		'bg-(--btn-bg) px-[calc(var(--spacing-3_5)-1px)] py-[calc(var(--spacing-1_5)-1px)] md:text-sm/6',
		// Focus
		'focus:outline focus:outline-blue-500 focus:outline-hidden focus:outline-offset-2',
		// Disabled
		'disabled:cursor-not-allowed disabled:opacity-50',
		// Icon
		'*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:hover:[--btn-icon:ButtonText]',
	],
	variants: {
		variant: {
			solid: [
				// Optical border, implemented as the button background to avoid corner artifacts
				'border-transparent bg-(--btn-border)',
				// Dark mode: border is rendered on `after` so background is set to button background
				'dark:bg-(--btn-bg)',
				// Button background, implemented as foreground layer to stack on top of pseudo-border layer
				'before:-z-10 before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)',
				// Drop shadow, applied to the inset `before` layer so it blends with the border
				'before:shadow-sm',
				// Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
				'dark:before:hidden',
				// Dark mode: Subtle white outline is applied using a border
				'dark:border-white/5',
				// Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
				'after:-z-10 after:absolute after:inset-0 after:rounded-[calc(var(--radius-lg)-1px)]',
				// Inner highlight shadow
				'after:shadow-[shadow:inset_0_1px_theme(--color-white/15%)]',
				// White overlay on hover
				'hover:not-disabled:after:bg-(--btn-hover-overlay) active:after:bg-(--btn-hover-overlay)',
				// Dark mode: `after` layer expands to cover entire button
				'dark:after:-inset-px dark:after:rounded-lg',
				// Disabled
				'disabled:after:shadow-none disabled:before:shadow-none',
			],
			outline: [
				// Base
				'border-2 border-black text-black',
				'text-black [--btn-bg:transparent] active:border-orange-700 hover:[--btn-bg:var(--bg-orange)]',
			],
			plain: [
				// Base
				'border-transparent text-black hover:bg-black/5 active:bg-black/5',
			],
		},
		color: {
			light: [
				'text-black [--btn-bg:white] [--btn-border:var(--color-black)]/10 [--btn-hover-overlay:var(--color-black)]/[2.5%] hover:[--btn-border:var(--color-black)]/15 active:[--btn-border:var(--color-black)]/15',
				'dark:text-white dark:[--btn-bg:var(--color-zinc-800)] dark:[--btn-hover-overlay:var(--color-white)]/5',
				'[--btn-icon:var(--color-zinc-500)] hover:[--btn-icon:var(--color-zinc-700)] active:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:active:[--btn-icon:var(--color-zinc-400)] dark:hover:[--btn-icon:var(--color-zinc-400)]',
			],
			dark: [
				'text-white [--btn-bg:var(--color-black)]/90 [--btn-border:var(--color-black)]/90 [--btn-hover-overlay:var(--color-white)]/10',
				'[--btn-icon:var(--color-black)] hover:[--btn-icon:var(--color-sunglow)] active:[--btn-icon:var(--color-orange-700)]',
			],
			white: [
				'text-black [--btn-bg:white] [--btn-border:var(--color-black)]/10 [--btn-hover-overlay:var(--color-black)]/[2.5%] hover:[--btn-border:var(--color-black)]/15 active:[--btn-border:var(--color-black)]/15',
				'dark:[--btn-hover-overlay:var(--color-black)]/5',
				'[--btn-icon:var(--color-zinc-400)] hover:[--btn-icon:var(--color-zinc-500)] active:[--btn-icon:var(--color-zinc-500)]',
			],
			orange: [
				'text-white [--btn-bg:var(--color-orange-500)] [--btn-border:var(--color-orange-600)]/90 [--btn-hover-overlay:var(--color-white)]/10',
				'[--btn-icon:var(--color-orange-300)] hover:[--btn-icon:var(--color-orange-200)] active:[--btn-icon:var(--color-orange-200)]',
			],
			green: [
				'text-white [--btn-bg:var(--color-green-600)] [--btn-border:var(--color-green-700)]/90 [--btn-hover-overlay:var(--color-white)]/10',
				'[--btn-icon:var(--color-white)]/60 hover:[--btn-icon:var(--color-white)]/80 active:[--btn-icon:var(--color-white)]/80',
			],
			none: [],
		},
		size: {
			large: ['*:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-6'],
		},
	},
	compoundVariants: [
		{
			variant: 'plain',
			color: 'dark',
			class: ['text-black dark:text-black'],
		},
		{
			variant: 'outline',
			color: 'dark',
			class: ['[--btn-bg:transparent]'],
		},
	],
})

type ButtonProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'> &
	ComponentPropsWithRef<'button'> &
	VariantProps<typeof buttonClasses>

export const Button = ({ color = 'none', variant, size, className, children, ...props }: ButtonProps) => {
	return 'href' in props ? (
		<Link href={props.href as string} className={buttonClasses({ color, variant, class: className })}>
			<TouchTarget>{children}</TouchTarget>
		</Link>
	) : (
		<button {...props} className={buttonClasses({ color, variant, size, class: [className, 'cursor-pointer'] })}>
			<TouchTarget>{children}</TouchTarget>
		</button>
	)
}

/**
 * Expand the hit area to at least 44×44px on touch devices
 */

type TouchTargetProps = React.ComponentPropsWithoutRef<typeof Button>

export function TouchTarget({ children }: TouchTargetProps) {
	return (
		<>
			<span
				className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] [@media(pointer:fine)]:hidden'
				aria-hidden='true'
			/>
			{children}
		</>
	)
}
