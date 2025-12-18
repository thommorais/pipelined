import * as Headless from '@headlessui/react'
import type React from 'react'
import { tv } from './tv'

const switchGroupClasses = tv({
	base: [
		'space-y-3 **:data-[slot=label]:font-normal',
		'has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium',
	],
})

const switchFieldClasses = tv({
	base: [
		'grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]',
		'*:data-[slot=control]:col-start-2 *:data-[slot=control]:self-center',
		'*:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1 *:data-[slot=label]:justify-self-start',
		'*:data-[slot=description]:col-start-1 *:data-[slot=description]:row-start-2',
		'has-data-[slot=description]:**:data-[slot=label]:font-medium',
	],
})

const colors = {
	dark: [
		'[--switch-bg-ring:var(--color-black)]/90 [--switch-bg:var(--color-black)]/90',
		'[--switch-ring:var(--color-black)]/90 [--switch-shadow:var(--color-black)]/10 [--switch:white]',
	],
	white: [
		'[--switch-bg-ring:var(--color-black)]/15 [--switch-bg:white]',
		'[--switch-shadow:var(--color-black)]/10 [--switch-ring:transparent] [--switch:var(--color-black)]',
	],
	red: [
		'[--switch-bg-ring:var(--color-red-700)]/90 [--switch-bg:var(--color-red-600)]',
		'[--switch:white] [--switch-ring:var(--color-red-700)]/90 [--switch-shadow:var(--color-red-900)]/20',
	],
	orange: [
		'[--switch-bg-ring:var(--color-orange-600)]/90 [--switch-bg:var(--color-orange-500)]',
		'[--switch:white] [--switch-ring:var(--color-orange-600)]/90 [--switch-shadow:var(--color-orange-900)]/20',
	],
	amber: [
		'[--switch-bg-ring:var(--color-amber-500)]/80 [--switch-bg:var(--color-amber-400)]',
		'[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:var(--color-amber-950)]',
	],
	yellow: [
		'[--switch-bg-ring:var(--color-yellow-400)]/80 [--switch-bg:var(--color-yellow-300)]',
		'[--switch-ring:transparent] [--switch-shadow:transparent] [--switch:var(--color-yellow-950)]',
	],
	green: [
		'[--switch-bg-ring:var(--color-green-700)]/90 [--switch-bg:var(--color-green-600)]',
		'[--switch:white] [--switch-ring:var(--color-green-700)]/90 [--switch-shadow:var(--color-green-900)]/20',
	],
	blue: [
		'[--switch-bg-ring:var(--color-blue-700)]/90 [--switch-bg:var(--color-blue-600)]',
		'[--switch:white] [--switch-ring:var(--color-blue-700)]/90 [--switch-shadow:var(--color-blue-900)]/20',
	],
	none: [],
}

type Color = keyof typeof colors

const switchClasses = tv({
	base: [
		'group relative isolate inline-flex h-6 w-10 cursor-default p-[3px] sm:h-5 sm:w-8',
		'transition duration-0 ease-in-out data-changing:duration-200',
		'forced-colors:outline forced-colors:[--switch-bg:Highlight]',
		'data-checked:bg-(--switch-bg) data-checked:ring-(--switch-bg-ring)',
		'focus:outline-hidden data-focus:outline data-focus:outline-blue-500 data-focus:outline-offset-2',
		'data-hover:data-checked:ring-(--switch-bg-ring) data-hover:ring-black/15',
	],
	variants: {
		color: {
			dark: colors.dark,
			white: colors.white,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			yellow: colors.yellow,
			green: colors.green,
			blue: colors.blue,
			none: colors.none,
		},
	},
})

const switchThumbClasses = tv({
	base: [
		'pointer-events-none relative inline-block size-[1.125rem] sm:size-3.5',
		'translate-x-0 transition duration-200 ease-move',
		'border border-transparent',
		'bg-white',
		'group-data-checked:bg-(--switch) group-data-checked:shadow-(--switch-shadow) group-data-checked:ring-(--switch-ring)',
		'group-data-checked:translate-x-4 sm:group-data-checked:translate-x-full',
		'group-data-checked:group-data-disabled:bg-white group-data-checked:group-data-disabled:ring-black/5',
	],
})

export function SwitchGroup({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	return <div data-slot='control' {...props} className={switchGroupClasses({ class: className })} />
}

export function SwitchField({
	className,
	...props
}: { className?: string } & Omit<Headless.FieldProps, 'as' | 'className'>) {
	return <Headless.Field data-slot='field' {...props} className={switchFieldClasses({ class: className })} />
}

export function Switch({
	color = 'none',
	className,
	...props
}: {
	color?: Color
	className?: string
} & Omit<Headless.SwitchProps, 'as' | 'className' | 'children'>) {
	return (
		<Headless.Switch data-slot='control' {...props} className={switchClasses({ color, class: className })}>
			<span aria-hidden='true' className={switchThumbClasses()} />
		</Headless.Switch>
	)
}
