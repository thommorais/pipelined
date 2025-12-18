import SVG from 'react-inlinesvg'

// const vercelCommitHash = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
// const commitHash = vercelCommitHash ? `-${vercelCommitHash.slice(0, 7)}` : 'journ'

// const WEBAPP_URL = process.env.WEBAPP_URL
// const VERSION = process.env.JOURN_VERSION

export function IconSprites() {
	return <SVG src={'icons/sprite.svg'} />
}

export default IconSprites
