import { AsyncStorage } from "react-native";

const DEVICE_ID_KEY = "device_id_key_1";

const generateDeviceId = () => {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < 25; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

export const getDeviceId = async () => {
  let deviceId;
  deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = generateDeviceId();
  }
  await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
  return deviceId;
};
