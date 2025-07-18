import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";

import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";


import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../component/Catagories";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import Recipes from "../component/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.header}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 10,
        }}>

        <View className="mx-4 flex-row justify-between items-center">
          <AdjustmentsHorizontalIcon size={hp(4)} color={"gray"} />
          <Image
            source={require("../../assets/image/avatar.png")}
            style={{
              width: hp(5),
              height: hp(5),
              resizeMode: "cover",
            }}
            className="rounded-full"
          />
        </View>


        <View className="mx-4 space-y-1 mb-2">
          <View>
            <Text
              style={{
                fontSize: hp(3.5),
              }}
              className="font-bold text-neutral-800"
            >
              Fast & Delicious
            </Text>
          </View>

          <Text
            style={{
              fontSize: hp(3.5),
            }}
            className="font-extrabold text-neutral-800"
          >
            Food You <Text className="text-[#f64e32]">Love</Text>
          </Text>
        </View>


        <View className="mx-4 m-4 flex-row items-center border rounded-xl border-black p-[6px]">
          <View className="bg-white rounded-full p-2">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              color={"gray"}
              strokeWidth={3}
            />
          </View>
          <TextInput
            placeholder="Search Your Favorite Food"
            placeholderTextColor={"gray"}
            style={{
              fontSize: hp(1.7),
            }}
            className="flex-1 text-base mb-1 pl-1 tracking-widest"
          />
        </View>


        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>


        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  }
})