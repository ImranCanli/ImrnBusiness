import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  //@ts-ignore
  return <Redirect href={'/home'}/>
}
