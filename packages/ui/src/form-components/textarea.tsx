import { forwardRef } from 'react'
import { tv } from '../tv'

const controlClasses = tv({
	base: [
		'relative block w-full',
		'border border-black/10 data-hover:border-black/20',
		'has-data-disabled:opacity-50 has-data-disabled:before:bg-black/5 has-data-disabled:before:shadow-none',
		'has-data-invalid:before:shadow-red-500/10',
		'*:data-[slot=icon]:text-zinc-500',
	],
})

const textareaClasses = tv({
	base: [
		'relative block w-full appearance-none rounded-sm px-[calc(calc(var(--spacing)*3.5)-1px)] py-[calc(calc(var(--spacing)*2.5)-1px)] sm:px-[calc(calc(var(--spacing)*3)-1px)] sm:py-[calc(calc(var(--spacing)*5)-1px)]',
		'focus:outline-none',
		'data-[invalid]:data-[hover]:border-red-500 data-[invalid]:border-red-500',
	],
})

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
	resizable?: boolean
}

export const Textarea = forwardRef(function Textarea(
	{ className, resizable = true, ...props }: TextareaProps,
	ref: React.ForwardedRef<HTMLTextAreaElement>,
) {
	return (
		<span data-slot='control' className={controlClasses({ class: className })}>
			<textarea
				ref={ref}
				{...props}
				data-disabled={props.disabled}
				data-invalid={props['aria-invalid']}
				className={textareaClasses({ class: resizable ? 'resize-y' : 'resize-none' })}
			/>
		</span>
	)
})
