import { Button, Container, Grid, useTheme } from "@nextui-org/react"
import { NextPage } from "next"
import Head from "next/head"
import { IoLogoGoogle } from "react-icons/io"
import { signIn, useSession } from "next-auth/react"

import Hero from "@/components/login/Hero"
import { useRouter } from "next/router"
const Login: NextPage = () => {
  const router = useRouter()
  const { theme } = useTheme()

  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>Loading...</div>
  }
  if (status === "authenticated") {
    router.push("/")
  }

  return (
    <>
      <Head>
        <title>Login | FitTrack</title>
      </Head>
      <div
        style={{
          backgroundColor: theme.colors.gray200.value,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Grid.Container>
          <Grid xs={12} md={6}>
            <Hero />
          </Grid>
          <Grid xs={12} md={6}>
            <Container
              css={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "unset",
                height: "50vh",
                "@md": {
                  height: "100vh",
                },
              }}
            >
              <Button
                shadow
                color="gradient"
                size={"lg"}
                icon={<IoLogoGoogle />}
                onClick={() =>
                  signIn("google", { callbackUrl: "http://localhost:3000/" })
                }
              >
                Google Sign In
              </Button>
            </Container>
          </Grid>
        </Grid.Container>
      </div>
    </>
  )
}

export default Login
