import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Input } from "react-native-elements";
import { useSignInMutation } from "../store/apis/authApi";
import { useSignUpMutation } from "../store/apis/authApi";
import { setToken, setUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";

const AuthForm = ({
  headerText,
  subHeaderText,
  submitButtonText,
  onAlternativePress,
  alternativeText,
  isSignUp = false,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { isLoading: signInLoading, error: signInError }] =
    useSignInMutation();
  const [signUp, { isLoading: signUpLoading, error: signUpError }] =
    useSignUpMutation();

  const errorMessage = isSignUp ? signUpError?.data : signInError?.data?.error;

  const handleSubmit = async () => {
    const userData = { email, password };

    try {
      if (isSignUp) {
        // SignUp işlemi
        console.log(isSignUp);
        const response = await signUp(userData).unwrap();
        dispatch(setToken(response.token));
        dispatch(setUser({ username: email, password: password}));
        navigation.navigate("MainTabs");
      } else {
        // SignIn işlemi
        const response = await signIn(userData).unwrap();
        dispatch(setToken(response.token));
        dispatch(setUser({ username: email, password: password}));

        navigation.navigate("MainTabs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{headerText}</Text>
        <Text style={styles.subHeaderText}>{subHeaderText}</Text>
      </View>

      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
            color: "#666",
            size: 20,
          }}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            color: "#666",
            size: 20,
          }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={signInLoading || signUpLoading}
        >
          <Text style={styles.buttonText}>{submitButtonText}</Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={onAlternativePress}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>{alternativeText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 0,
  },
  input: {
    paddingLeft: 10,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FE2266",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
  },
  linkContainer: {
    alignItems: "center",
  },
  linkText: {
    color: "#FE2266",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});

export default AuthForm;
