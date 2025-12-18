import { type VariantProps, tv } from './tv'

const dividerClasses = tv({
	base: ['w-full border-t'],
	variants: {
		soft: {
			true: 'border-black/5 dark:border-white/5',
			false: 'border-black/10 dark:border-white/10',
		},
	},
})

type DividerProps = React.ComponentPropsWithRef<'hr'> & VariantProps<typeof dividerClasses>

export const Divider = ({ soft, className, ...props }: DividerProps) => {
	return <hr {...props} className={dividerClasses({ class: [className], soft })} />
}
