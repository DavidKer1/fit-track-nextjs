import { Card, Container, Text } from "@nextui-org/react"
import Image from "next/image"
import React from "react"
import styles from "@/styles/Filters.module.css"
const Hero = () => {
  return (
    <Card
      bordered="false"
      css={{
        borderRadius: "unset",
        height: "50vh",
        "@md": {
          height: "100vh",
        },
        backgroundColor: "black",
      }}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image
        src={"/static/anastase-maragos-FP7cfYPPUKM-unsplash.jpg"}
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles["opacity-90"] + " " + styles["blur-2"]}
      />

      <Text
        h1
        css={{
          textGradient: "45deg, $purple400 -20%, $pink500 100%",
          position: "relative",
          alignSelf: "center",
        }}
        size={70}
        weight="bold"
      >
        FitTrack
      </Text>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          color: "white",
          fontSize: 10,
        }}
      >
        Photo by{" "}
        <a href="https://unsplash.com/@visualsbyroyalz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Anastase Maragos
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/fitness?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </div>
    </Card>
  )
}

export default Hero
