import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'

export type LayoutProps = {
	children: ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}
