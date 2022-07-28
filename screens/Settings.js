import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import * as Linking from "expo-linking"

const Settings = () => {
  const [data, setData] = useState(null)
  async function getInitialURL() {
    const initialURL = await Linking.getInitialURL()

    if (initialURL) setData(Linking.parse(initialURL))
  }

  const handleDeepLink = (event) => {
    let urlData = Linking.parse(event.url)
    setData(urlData)
  }

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink)
    if (!data) {
      getInitialURL()
    }
  }, [])

  return (
    <View>
      <Text>path: {data?.path}</Text>
      <Text>schema: {data?.scheme}</Text>
      <Text>id: {data?.queryParams?.id}</Text>
    </View>
  )
}

export default Settings
