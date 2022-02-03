import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { SessionProvider, useSession } from "next-auth/react"
import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { NextUIProvider } from "@nextui-org/react"
import { useRouter } from "next/router"
import theme from "config/theme"
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
})

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
  auth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <NextUIProvider theme={theme}>
          {Component.auth ? (
            <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
        </NextUIProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

function Auth({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login")
    },
  })
  const isUser = !!session?.user

  if (status === "loading") {
    return <div>Loading...</div>
  }
  return children
}
export default MyApp
