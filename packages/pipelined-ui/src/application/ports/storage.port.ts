import type { PinnedComment } from '../../domain/entities/comment.entity'

export type StoragePort = {
	load: (key: string) => ReadonlyArray<PinnedComment>
	save: (key: string, comments: ReadonlyArray<PinnedComment>) => void
}
