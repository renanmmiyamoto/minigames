import { QueryProvider } from '@/providers/query-provider'

export default function GuessSongLayout({ children }: { children: React.ReactNode }) {
	return <QueryProvider>{children}</QueryProvider>
}
