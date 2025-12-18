import clsx from 'clsx'
import { Link } from './link'

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
	return (
		<p
			data-slot='text'
			{...props}
			className={clsx(className, 'text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400')}
		/>
	)
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
	return (
		<Link
			{...props}
			className={clsx(
				className,
				'text-black underline decoration-black/50 data-hover:decoration-black dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white',
			)}
		/>
	)
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
	return <strong {...props} className={clsx(className, 'font-medium text-black dark:text-white')} />
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
	return (
		<code
			{...props}
			className={clsx(
				className,
				'rounded-sm border border-black/10 bg-black/[2.5%] px-0.5 font-medium text-black text-sm sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white',
			)}
		/>
	)
}
