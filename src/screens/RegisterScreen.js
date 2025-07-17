import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function RegisterScreen() {
    const animation = useRef(null);
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1 justify-center items-center px-6"
                >

                    <View>
                        <LottieView
                            autoPlay
                            ref={animation}
                            style={{
                                width: wp(40),
                                height: hp(40),
                            }}
                            source={require("../../assets/lottie/food-logo.json")}
                        />
                    </View>


                    <Text className="text-neutral-700 font-bold" style={{ fontSize: hp(4), marginTop: hp(2) }}>
                        Create Account
                    </Text>

                    <Text className="text-neutral-500 mb-6" style={{ fontSize: hp(2) }}>
                        Sign up to get started
                    </Text>


                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#aaa"
                        className="w-full border border-gray-300 rounded-xl p-4 mb-4 text-base"
                    />


                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        className="w-full border border-gray-300 rounded-xl p-4 mb-4 text-base"
                        keyboardType="email-address"
                    />


                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        className="w-full border border-gray-300 rounded-xl p-4 mb-6 text-base"
                        secureTextEntry
                    />


                    <TouchableOpacity
                        className="w-full bg-[#f64e32] p-4 rounded-xl mb-4"
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text className="text-white text-center font-semibold text-lg">Register</Text>
                    </TouchableOpacity>


                    <View className="flex-row justify-center">
                        <Text className="text-neutral-500">Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text className="text-[#f64e32] font-semibold">Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}
