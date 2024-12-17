import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserProps } from "@/contexts/AuthContext";
import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: UserProps) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER_STORAGE);
    const user: UserProps = storage ? JSON.parse(storage) : {};
    return user
  }