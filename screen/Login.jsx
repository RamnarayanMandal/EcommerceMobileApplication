import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link } from "@react-navigation/native";
import * as SMS from 'expo-sms';
import logo from "../assets/logo.webp"; // Ensure the logo path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Perform validation checks
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Placeholder for actual login logic
    const loginSuccessful = true; // Replace this with real login logic

    if (loginSuccessful) {
      // Sending success SMS
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          ['1234567890'], // Replace with a valid phone number
          `Login successful for ${email}.`
        );
        if (result === 'sent') {
          Alert.alert("Success", `Logged in as ${email}`);
        } else {
          Alert.alert("Warning", "Logged in but SMS sending failed or was cancelled.");
        }
      } else {
        Alert.alert("Warning", "Logged in but SMS service is not available on this device.");
      }
    } else {
      Alert.alert("Error", "Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: "https://i.insider.com/5ebaeedee3c3fb22cf13fd47" }}
        style={styles.logo}
      />

      <Text style={styles.text}>Login to your Account</Text>
      <View style={styles.mainContainer}>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.inputField}
            placeholder="*******"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPasswordLink}>
          Forgot Password?
        </Text>
        <Link to="/SingnUp" style={styles.signUpLink}>
          Don't have an account? Sign Up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 150,
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  mainContainer: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 40,
  },
  inputFieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    color: "#333333",
  },
  button: {
    width: "75%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    paddingVertical: 10,
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  forgotPasswordLink: {
    fontSize: 16,
    marginTop: 20,
    color: "#666666",
    textAlign: "center",
  },
  signUpLink: {
    fontSize: 16,
    marginTop: 20,
    color: "#666666",
    textAlign: "center",
  },
});
