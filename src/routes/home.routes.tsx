import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons} from '@expo/vector-icons';
import { useContext } from 'react';
import { theme } from "../styles/theme";

import { Profile } from "../screens/Profile";
import { Home } from "../screens/Home";
import { CreatePost } from "../screens/CreatePost";
import { Comments } from "../screens/Comments";
import { Context } from "../context";
import { ViewPost } from "../screens/ViewPost";
import { Search } from "../screens/Search";
import { Activities } from "../screens/Activities";
import { Followers } from "../screens/Followers";

export function HomeRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const { userId } = useContext(Context);

  function HomeScreen() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="CreatePost" component={CreatePost} />
        <Screen name="Comments" component={Comments} />
        <Screen name="Profile" component={Profile} />
        <Screen name="ViewPost" component={ViewPost} />
        <Screen name="Followers" component={Followers} />
      </Navigator>
    );
  }

  function ProfileScreen() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Profile" component={Profile} initialParams={{ idUser: userId }} />
        <Screen name="Comments" component={Comments} />
        <Screen name="ViewPost" component={ViewPost} />
        <Screen name="Followers" component={Followers} />
      </Navigator>
    );
  }

  function SearchScreen() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Search" component={Search} />
        <Screen name="Profile" component={Profile} />
        <Screen name="Comments" component={Comments} />
        <Screen name="ViewPost" component={ViewPost} />
        <Screen name="Followers" component={Followers} />
      </Navigator>
    );
  }

  function ActivitiesScreen() {
    return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Activities" component={Activities} />
      </Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Pesquisar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Atividades') {
            iconName = focused ? 'notifications' : 'notifications-outline'
          }
          return <Ionicons name={iconName} color={color} size={size} />
        },
        tabBarActiveTintColor: theme.blue,
        tabBarInactiveTintColor: theme.gray,
      })}
    >
      <Tab.Screen name="Feed" component={HomeScreen} />
      <Tab.Screen name="Pesquisar" component={SearchScreen} />
      <Tab.Screen name="Atividades" component={ActivitiesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}