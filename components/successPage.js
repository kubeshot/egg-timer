import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";
import i18n from '../i18nConfig';
import { WebView } from 'react-native-webview';
import ShareButton from "./shareButton";

const SuccessPage = ({ route }) => {
  const navigation = useNavigation();
  const { title = "", heading = "" } = route?.params || {};
  const [pageTitle, setPageTitle] = useState(title);
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false);
  const [webUrl, setWebUrl] = useState(null);
  const [shareUrl,setShareUrl] = useState(null);

  // Language mapping for egg types
const eggTypeMapping = {
// French to English mappings

    "Œufs cuits durs": "Hard Boiled Eggs",
    "Œufs pochés": "Poached Eggs",
    "Œufs à la coque": "Soft Boiled Eggs",
    "Œufs à la coque parfaits": "Perfect Soft Boiled Eggs",
    "Œufs marinés style ramen": "Ramen Eggs",
    "Œufs à la coque cuits à la perfection avec mouillettes de pain grillé": "Perfect Soft Boiled Eggs with Toast Soldiers",
    "Bol de riz au pesto et œufs mollets": "Pesto Rice Bowl Topped With Soft Boiled Eggs",
    "Tartelettes aux champignons et œufs à la coque": "Mushroom Tartlets with Soft Boiled Eggs",
    "Bol automnal de farro accompagné d’un œuf mollet": "Autumn Farro Bowl with Soft Boiled Egg",
    "Bol de salade méditerranéenne": "Mediterranean Salad Bowl",
    "Nouilles ramen santé": "Healthy Ramen Bowls",
    "Œufs cuits durs parfaits": "Perfect Hard Boiled Eggs",
    "Œufs marinés rosés":"Pink Pickled Eggs",
    "Œufs marinés parfaits": "Perfect Pickled Eggs",
    "Œufs farcis parfaits": "Perfect Devilled Eggs",
    "Salade niçoise": "Niçoise Salad",
    "Sandwich à la salade aux œufs au cari sur pain du sabbat": "Curried Egg Salad Sandwich on Challah Bread",
    "Œufs au four à l’écossaise": "Baked Scotch Eggs",
    "Sandwich ouvert aux œufs et au fromage fondant": "Sunrise Egg Salad Melt",
    "Œufs pochés parfaits": "Perfect Poached Eggs",
    "Fèves au lard sur pain grillé avec épinards et œufs pochés": "Baked Beans on Toast with Spinach and Poached Eggs",
    "Spätzles aux champignons avec œuf poché": "Mushroom Spaetzle with Poached Egg",
    "Œufs pochés aux asperges et à la vinaigrette au bacon": "Poached Egg, Asparagus, and Bacon Vinaigrette",
    "Pizza au pesto avec œufs pochés": "Pesto Pizza with Poached Eggs",
    "Riz épicé à l’indienne avec œufs pochés": "Indian Spiced Rice with Poached Eggs",
    "Légumes grillés accompagnés d’œufs pochés et de féta": "Roasted Mediterranean Veggies with Poached Eggs and Feta",
    "Œufs BLT à la bénédictine": "BLT Eggs Benedict",
// English mappings (identity mapping)

    "Soft Boiled Eggs": "Soft Boiled Eggs",
    "Hard Boiled Eggs": "Hard Boiled Eggs",
    "Poached Eggs": "Poached Eggs",
    "Perfect Soft Boiled Eggs": "Perfect Soft Boiled Eggs",
    "Ramen Eggs": "Ramen Eggs",
    "Perfect Soft Boiled Eggs with Toast Soldiers": "Perfect Soft Boiled Eggs with Toast Soldiers",
    "Pesto Rice Bowl Topped With Soft Boiled Eggs": "Pesto Rice Bowl Topped With Soft Boiled Eggs",
    "Mushroom Tartlets with Soft Boiled Eggs": "Mushroom Tartlets with Soft Boiled Eggs",
    "Autumn Farro Bowl with Soft Boiled Egg": "Autumn Farro Bowl with Soft Boiled Egg",
    "Mediterranean Salad Bowl": "Mediterranean Salad Bowl",
    "Healthy Ramen Bowls": "Healthy Ramen Bowls",
    "Perfect Hard Boiled Eggs": "Perfect Hard Boiled Eggs",
    "Pink Pickled Eggs": "Pink Pickled Eggs",
    "Perfect Pickled Eggs": "Perfect Pickled Eggs",
    "Perfect Devilled Eggs": "Perfect Devilled Eggs",
    "Niçoise Salad": "Niçoise Salad",
    "Curried Egg Salad Sandwich on Challah Bread": "Curried Egg Salad Sandwich on Challah Bread",
    "Baked Scotch Eggs": "Baked Scotch Eggs",
    "Sunrise Egg Salad Melt": "Sunrise Egg Salad Melt",
    "Perfect Poached Eggs": "Perfect Poached Eggs",
    "Baked Beans on Toast with Spinach and Poached Eggs": "Baked Beans on Toast with Spinach and Poached Eggs",
    "Mushroom Spaetzle with Poached Egg": "Mushroom Spaetzle with Poached Egg",
    "Poached Egg, Asparagus, and Bacon Vinaigrette": "Poached Egg, Asparagus, and Bacon Vinaigrette",
    "Pesto Pizza with Poached Eggs": "Pesto Pizza with Poached Eggs",
    "Indian Spiced Rice with Poached Eggs": "Indian Spiced Rice with Poached Eggs",
    "Roasted Mediterranean Veggies with Poached Eggs and Feta": "Roasted Mediterranean Veggies with Poached Eggs and Feta",
    "BLT Eggs Benedict": "BLT Eggs Benedict"
};
  useEffect(() => {
    if (route?.params?.title) {
      setPageTitle(route.params.title);
    }
  }, [route?.params]);

  // Get English key for accessing resources
  const getEnglishKey = (heading) => {
    // First, check if the heading is already in English
    if (Object.values(eggTypeMapping).includes(heading)) {
      return heading;
    }
    
    // If the heading is in French, find its English translation
    for (const [frenchKey, englishKey] of Object.entries(eggTypeMapping)) {
      if (frenchKey === heading) {
        return englishKey;
      }
    }
    
    // If no translation is found, return the original heading
    return heading;
  };
  // Helper function to get recipe ideas
  const getRecipeIdeas = (eggType) => {
    // Ensure we get the correct language, defaulting to 'en'
    const lang = i18n.locale === 'fr' ? 'fr' : 'en';
    
    // Get the English key for the egg type
    const englishKey = getEnglishKey(eggType);
    
    if (!recipeIdeas[englishKey]?.[lang]) {
      console.warn(`No recipe ideas found for egg type: ${eggType} in language: ${lang}`);
      // Fallback to English if no language-specific recipes are found
      return recipeIdeas[englishKey]['en'] || [];
    }
    return recipeIdeas[englishKey][lang];
  };
  // Helper function to get main image
  const getMainImage = (eggType) => {
    const englishKey = getEnglishKey(eggType);
    if (!mainImages[englishKey]) {
      console.warn(`No main image found for egg type: ${eggType}`);
      return require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg");
    }
    return mainImages[englishKey];
  };

  // Helper function to get explore more URL
  const getExploreMoreUrl = () => {
    const currentLang = i18n.language;
    const lang = currentLang === 'fr' ? 'fr' : 'en';
    const englishKey = getEnglishKey(heading);
    
    if (!exploreMoreUrls[englishKey]?.[lang]) {
      console.warn(`No explore more URL found for heading: ${heading} and language: ${lang}`);
      return exploreMoreUrls["Soft Boiled Eggs"][lang]; // Default fallback
    }
    return exploreMoreUrls[englishKey][lang];
  };

  const recipeIdeas = {
    "Soft Boiled Eggs": {
      en: [
        {
          title: "Perfect Soft Boiled Eggs",
          image: require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg"),
          url: "https://www.eggs.ca/recipes/basic-soft-boiled-eggs",
        },
        {
          title: "Ramen Eggs",
          image: require("../assets/images/EFC-app-soft-boiled-healthy-ramen.jpg"),
          url: "https://www.eggs.ca/recipes/ramen-eggs-soy-sauce-marinated-eggs",
        },
        {
          title: "Perfect Soft Boiled Eggs with Toast Soldiers",
          image: require("../assets/images/EFC-app-soft-boiled-eggs-soft-boiled-eggs-toast-soldiers.jpg"),
          url: "https://www.eggs.ca/recipes/perfect-soft-boiled-eggs-with-toast-soldiers",
        },
        {
          title: "Pesto Rice Bowl Topped With Soft Boiled Eggs",
          image: require("../assets/images/EFC-app-soft-boiled-eggs-pesto-rice-bowl.jpg"),
          url: "https://www.eggs.ca/recipes/pesto-rice-bowl-topped-with-soft-boiled-eggs",
        },
        {
          title: "Mushroom Tartlets with Soft Boiled Eggs",
          image: require("../assets/images/EFC-app-soft-boiled-egg-tartlets-with-mushroom.jpg"),
          url: "https://www.eggs.ca/recipes/mushroom-onion-and-soft-boiled-egg-tartlets",
        },
        {
          title: "Autumn Farro Bowl with Soft Boiled Egg",
          image: require("../assets/images/EFC-app-soft-boiled-autumn-farro-bowl.jpg"),
          url: "https://www.eggs.ca/recipes/autumn-farro-bowl-with-soft-boiled-egg",
        },
        {
          title: "Mediterranean Salad Bowl",
          image: require("../assets/images/EFC-app-mediterranean-salad-bowl.jpg"),
          url: "https://www.eggs.ca/recipes/mediterranean-salad-bowl",
        },
        {
          title: "Healthy Ramen Bowls",
          image: require("../assets/images/EFC-app-soft-boiled-healthy-ramen.jpg"),
          url: "https://www.eggs.ca/recipes/healthy-ramen-bowls",
        },
      ],
      fr: [
        {
          title: "Œufs à la coque parfaits",
          image: require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-mollets",
        },
        {
          title: "Œufs marinés style ramen",
          image: require("../assets/images/EFC-app-soft-boiled-healthy-ramen.jpg"),
          url: "https://www.lesoeufs.ca/recettes/ufs-marines-style-ramen",
        },
        {
          title: "Œufs à la coque cuits à la perfection avec mouillettes de pain grillé",
          image: require("../assets/images/EFC-app-soft-boiled-eggs-soft-boiled-eggs-toast-soldiers.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-a-la-coque-cuits-a-la-perfection-avec-mouillettes-de-pain-grille",
        },
        {
          title: "Bol de riz au pesto et œufs mollets",
          image: require("../assets/images/EFC-app-soft-boiled-eggs-pesto-rice-bowl.jpg"),
          url: "https://www.lesoeufs.ca/recettes/bol-de-riz-au-pesto-et-oeufs-mollets",
        },
        {
          title: "Tartelettes aux champignons et œufs à la coque",
          image: require("../assets/images/EFC-app-soft-boiled-egg-tartlets-with-mushroom.jpg"),
          url: "https://www.lesoeufs.ca/recettes/tartelettes-aux-champignons-oignons-et-oeufs-mollets",
        },
        {
          title: "Bol automnal de farro accompagné d'un œuf mollet",
          image: require("../assets/images/EFC-app-soft-boiled-autumn-farro-bowl.jpg"),
          url: "https://www.lesoeufs.ca/recettes/bol-automnal-de-farro-accompagne-dun-oeuf-mollet",
        },
        {
          title: "Bol de salade méditerranéenne",
          image: require("../assets/images/EFC-app-mediterranean-salad-bowl.jpg"),
          url: "https://www.lesoeufs.ca/recettes/bol-de-salade-mediterraneenne",
        },
        {
          title: "Nouilles ramen santé",
          image: require("../assets/images/EFC-app-soft-boiled-healthy-ramen.jpg"),
          url: "https://www.lesoeufs.ca/recettes/nouilles-ramen-sante",
        },
      ]
    },
    "Hard Boiled Eggs": {
      en: [
        {
          title: "Perfect Hard Boiled Eggs",
          image: require("../assets/images/EFC-app-hard-boiled-perfect-hard-boiled-egg.jpg"),
          url: "https://www.eggs.ca/recipes/basic-hard-boiled-eggs",
        },
        {
          title: "Pink Pickled Eggs",
          image: require("../assets/images/EFC=app-hard-boiled-pink-pickled-eggs.jpg"),
          url: "https://www.eggs.ca/recipes/pink-pickled-eggs",
        },
        {
          title: "Perfect Pickled Eggs",
          image: require("../assets/images/EFC-app-hard-boiled-perfect-pickled-eggs.jpg"),
          url: "https://www.eggs.ca/recipes/pickled-eggs",
        },
        {
          title: "Perfect Devilled Eggs",
          image: require("../assets/images/EFC-app-hard-boiled-perfect-devilled-eggs.jpg"),
          url: "https://www.eggs.ca/recipes/basic-devilled-eggs",
        },
        {
          title: "Niçoise Salad",
          image: require("../assets/images/EFC-app-hard-boiled-nicoise-salad.jpg"),
          url: "https://www.eggs.ca/recipes/nicoise-salad",
        },
        {
          title: "Curried Egg Salad Sandwich on Challah Bread",
          image: require("../assets/images/EFC-app-hard-boiled-curried-egg-salad-sandwich.jpg"),
          url: "https://www.eggs.ca/recipes/curried-egg-salad-sandwich-on-challah-bread",
        },
        {
          title: "Baked Scotch Eggs",
          image: require("../assets/images/EFC-app-hard-boiled-baked-scotch-egg.jpg"),
          url: "https://www.eggs.ca/recipes/baked-scotch-eggs",
        },
        {
          title: "Sunrise Egg Salad Melt",
          image: require("../assets/images/EFC-app-hard-boiled-sunrise-egg-salad-melt.jpg"),
          url: "https://www.eggs.ca/recipes/sunrise-egg-salad-melt",
        },
      ],
      fr: [
        {
          title: "Œufs cuits durs parfaits",
          image: require("../assets/images/EFC-app-hard-boiled-perfect-hard-boiled-egg.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-cuits-durs",
        },
        {
          title: "Œufs marinés rosés",
          image: require("../assets/images/EFC=app-hard-boiled-pink-pickled-eggs.jpg"),
          url: "https://www.lesoeufs.ca/recettes/ufs-marines-roses",
        },
        {
          title: "Œufs marinés parfaits",
          image: require("../assets/images/EFC-app-hard-boiled-perfect-pickled-eggs.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-marines",
        },
        {
          title: "Œufs farcis parfaits",
          image: require("../assets/images/EFC-app-hard-boiled-perfect-devilled-eggs.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-farcis-de-base",
        },
        {
          title: "Salade niçoise",
          image: require("../assets/images/EFC-app-hard-boiled-nicoise-salad.jpg"),
          url: "https://www.lesoeufs.ca/recettes/salade-nicoise",
        },
        {
          title: "Sandwich à la salade aux œufs au cari sur pain du sabbat",
          image: require("../assets/images/EFC-app-hard-boiled-curried-egg-salad-sandwich.jpg"),
          url: "https://www.lesoeufs.ca/recettes/sandwich-a-la-salade-aux-ufs-au-cari-sur-pain-du-sabbat",
        },
        {
          title: "Œufs au four à l'écossaise",
          image: require("../assets/images/EFC-app-hard-boiled-baked-scotch-egg.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-au-four-a-lecossaise",
        },
        {
          title: "Sandwich ouvert aux œufs et au fromage fondant",
          image: require("../assets/images/EFC-app-hard-boiled-sunrise-egg-salad-melt.jpg"),
          url: "https://www.lesoeufs.ca/recettes/sandwich-ouvert-aux-oeufs-et-au-fromage-fondant",
        },
      ]
    },
    "Poached Eggs": {
      en: [
        {
          title: "Perfect Poached Eggs",
          image: require("../assets/images/EFC-app-paoched-perfect-poached-eggs.jpg"),
          url: "https://www.eggs.ca/recipes/basic-poached-eggs",
        },
        {
          title: "Baked Beans on Toast with Spinach and Poached Eggs",
          image: require("../assets/images/EFC-app-poached-baked-beans-on-toast.jpg"),
          url: "https://www.eggs.ca/recipes/baked-beans-on-toast-with-spinach-and-poached-eggs",
        },
        {
          title: "Mushroom Spaetzle with Poached Egg",
          image: require("../assets/images/EFC-app-poached-mushroom-spaetzle.jpg"),
          url: "https://www.eggs.ca/recipes/mushroom-spaetzle-with-poached-egg",
        },
        {
          title: "Poached Egg, Asparagus, and Bacon Vinaigrette",
          image: require("../assets/images/EFC-app-poached-poached-egg-asparagus-and-bacon-vinaigrette.jpg"),
          url: "https://www.eggs.ca/recipes/poached-egg-asparagus-and-bacon-vinaigrette",
        },
        {
          title: "Pesto Pizza with Poached Eggs",
          image: require("../assets/images/EFC-app-poached-pesto-pizza.jpg"),
          url: "https://www.eggs.ca/recipes/pesto-pizza-with-poached-eggs",
        },
        {
          title: "Indian Spiced Rice with Poached Eggs",
          image: require("../assets/images/EFC-app-paoched-indian-spiced-rice.jpg"),
          url: "https://www.eggs.ca/recipes/indian-spiced-rice-with-poached-eggs",
        },
        {
          title: "Roasted Mediterranean Veggies with Poached Eggs and Feta",
          image: require("../assets/images/EFC-app-poached-roasted-mediterranean-veggies.jpg"),
          url: "https://www.eggs.ca/recipes/roasted-mediterranean-veggies-with-poached-eggs-and-fetaa",
        },
        {
          title: "BLT Eggs Benedict",
          image: require("../assets/images/EFC-app-poached-BLT-eggs-benedict.jpg"),
          url: "https://www.eggs.ca/recipes/blt-eggs-benedict",
        },
      ],
      fr: [
        {
          title: "Œufs pochés parfaits",
          image: require("../assets/images/EFC-app-paoched-perfect-poached-eggs.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-poches-de-base",
        },
        {
          title: "Fèves au lard sur pain grillé avec épinards et œufs pochés",
          image: require("../assets/images/EFC-app-poached-baked-beans-on-toast.jpg"),
          url: "https://www.lesoeufs.ca/recettes/feves-au-lard-sur-pain-grille-avec-epinards-et-oeufs-poches",
        },
        {
          title: "Spätzles aux champignons avec œuf poché",
          image: require("../assets/images/EFC-app-poached-mushroom-spaetzle.jpg"),
          url: "https://www.lesoeufs.ca/recettes/spaetzles-aux-champignons-avec-oeuf-poche",
        },
        {
          title: "Œufs pochés aux asperges et à la vinaigrette au bacon",
          image: require("../assets/images/EFC-app-poached-poached-egg-asparagus-and-bacon-vinaigrette.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-poches-aux-asperges-et-a-la-vinaigrette-au-bacon",
        },
        {
          title: "Pizza au pesto avec œufs pochés",
          image: require("../assets/images/EFC-app-poached-pesto-pizza.jpg"),
          url: "https://www.lesoeufs.ca/recettes/pizza-au-pesto-avec-oeufs-poches",
        },
        {
          title: "Riz épicé à l'indienne avec œufs pochés",
          image: require("../assets/images/EFC-app-paoched-indian-spiced-rice.jpg"),
          url: "https://www.lesoeufs.ca/recettes/riz-epice-a-lindienne-avec-oeufs-poches",
        },
        {
          title: "Légumes grillés accompagnés d’œufs pochés et de féta",
          image: require("../assets/images/EFC-app-paoched-indian-spiced-rice.jpg"),
          url: "https://www.lesoeufs.ca/recettes/legumes-grilles-accompagnes-doeufs-poches-et-de-feta",
        },
        {
          title: "Œufs BLT à la bénédictine",
          image: require("../assets/images/EFC-app-paoched-indian-spiced-rice.jpg"),
          url: "https://www.lesoeufs.ca/recettes/oeufs-blt-a-la-benedictine",
        },
      ],
    }
  }

  const mainImages = {
    "Soft Boiled Eggs": require("../assets/images/EFC-app-soft-boiled-eggs-perfect-soft-boiled-egg.jpg"),
    "Hard Boiled Eggs": require("../assets/images/EFC-app-hard-boiled-perfect-hard-boiled-egg.jpg"),
    "Poached Eggs": require("../assets/images/EFC-app-paoched-perfect-poached-eggs.jpg"),
  };

  const exploreMoreUrls = {
    "Soft Boiled Eggs": {
      en: "https://www.eggs.ca/recipe-category/soft-boiled-eggs/",
      fr: "https://www.lesoeufs.ca/categorie-de-recette/les-oeufs-mollets-parfaits/"
    },
    "Hard Boiled Eggs": {
      en: "https://www.eggs.ca/recipe-category/hard-boiled-eggs/",
      fr: "https://www.lesoeufs.ca/categorie-de-recette/les-oeufs-cuits-durs/"
    },
    "Poached Eggs": {
      en: "https://www.eggs.ca/recipe-category/poached-eggs/",
      fr: "https://www.lesoeufs.ca/categorie-de-recette/oeufs-poches/"
    }
  };

  const handleExploreMorePress = () => {
    const url = getExploreMoreUrl();
    openRecipeUrl(url);
  };

  const handleImagePress = (url) => {
    if (!url) {
      console.warn('No URL provided for recipe');
      return;
    }
    setShareUrl(url),
    openRecipeUrl(url);
  };

  const openRecipeUrl = (url) => {
    if (!url) {
      console.warn('Cannot open undefined URL');
      return;
    }
    setWebUrl(url);
    setShowWebView(true);
  };
  

  const handleBackPress = () => {
    if (showWebView) {
      setShowWebView(false);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require("../assets/images/Logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.successCard}>
            <Text style={styles.successText}>{pageTitle}</Text>
            <Image
              source={getMainImage(heading)}
              style={styles.mainImage}
            />
          </View>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{i18n.t('More Delicious Ideas')}</Text>
          </View>
          <View style={styles.recipeGrid}>
            {getRecipeIdeas(heading).map((recipe, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recipeItem} 
                onPress={() => handleImagePress(recipe.url)}
              >
                <Image source={recipe.image} style={styles.recipeImage} />
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.moreEggsButton} 
            onPress={handleExploreMorePress}
          >
            <Text style={styles.moreEggsText}>
              {i18n.t('Explore More')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Image
          source={require("../assets/images/btnback-arrow.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <BottomBar />
      <Modal
        visible={showWebView}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWebView(false)}
      >
        <View style={styles.modalOverlay}>
          <ShareButton url={shareUrl} />
          
          <View style={styles.bottomModal}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowWebView(false)}
              >
                <Image
                  source={require("../assets/images/xcircle1.png")}
                  style={styles.closeButtonImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
              </View>
            )}
            
            {Platform.OS === "web" ? (
              <iframe
                src={webUrl}
                style={{ width: "100%", height: "100%" }}
                onLoad={() => setLoading(false)}
              />
            ) : (
              <WebView
                source={{ uri: webUrl }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                style={styles.webView}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 140,
    height: 50,
  },
  successCard: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  sectionTitleContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: "Kaleko-Bold",
  },
  recipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  recipeItem: {
    width: "48%",
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 16,
    fontFamily: "Kaleko-Bold",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  moreEggsButton: {
    backgroundColor: "#FFD700",
    width: 250,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 110,
  },
  moreEggsText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomModal: {
    width: "100%",
    height: "92%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    backgroundColor: '#FFFFFF',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 6,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonImage: {
    width: 24,
    height: 24,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default SuccessPage;