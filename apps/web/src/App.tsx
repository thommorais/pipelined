import { createSignal, createUniqueId, type JSX } from 'solid-js'
import './App.css'
import { AnimatedCount } from './CountUp'

function App() {
	const [count, setCount] = createSignal(0)

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = event => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const query = formData.get('number')
		setCount(Number(query))
	}

	const inputId = createUniqueId()

	return (
		<div class='min-h-screen bg-black text-white'>
			{/* Main Content */}
			<main class='mx-auto w-dvw max-w-7xl px-6 pt-32'>
				{/* Counter Display Card */}
				<div class='mx-auto mb-8 max-w-3xl'>
					<div class='rounded-2xl border border-white/10 from-white/5 to-white/0 p-12 backdrop-blur-sm'>
						<div class='mb-8 text-center'>
							<AnimatedCount
								number={count()}
								duration={200}
								class='flex justify-between gap-10 font-bold text-2xl tabular-nums tracking-tight'
							/>
						</div>

						{/* Input Control */}
						<form class='mx-auto max-w-md' onSubmit={onSubmit}>
							<input
								id={inputId}
								name='number'
								type='text'
								class='block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-lg text-white transition-colors placeholder:text-gray-600 hover:bg-white/[0.07] focus:border-white/20 focus:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/10'
								placeholder='0'
							/>
						</form>
					</div>
				</div>
			</main>
		</div>
	)
}

export default App
