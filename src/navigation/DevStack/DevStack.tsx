import React from 'react';
import { DevComponentList } from "$core/DevMenu/DevComponents/DevComponentsList";
import { useTheme } from "$hooks";
import { DevComponents } from "$navigation/navigationNames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DevText } from '$core/DevMenu/DevComponents/DevText';
import { useAttachScreen } from '$navigation/AttachScreen';
import { DevDeeplinking } from '$core/DevMenu/DevComponents/DevDeeplinking';
import { DevToastScreen } from '$core/DevMenu/DevComponents/DevToastScreen';
import { DevSignRawExamples } from '$core/DevMenu/DevComponents/DevSignRawExamples';

const Stack = createNativeStackNavigator<any>();

export const DevStack = () => {
  const attachedScreen = useAttachScreen();
  const theme = useTheme();

  const initialRouteName = attachedScreen.pathname ?? DevComponents.DevComponentList;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        contentStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name={DevComponents.DevComponentList} 
        component={DevComponentList} 
      />
      <Stack.Screen 
        name={DevComponents.DevText} 
        component={DevText} 
      />
      <Stack.Screen 
        name={DevComponents.DevDeeplinking}
        component={DevDeeplinking}
      />
      <Stack.Screen 
        name={DevComponents.DevToast}
        component={DevToastScreen}
      />
      <Stack.Screen 
        name={DevComponents.DevSignRawExamples}
        component={DevSignRawExamples}
      />
    </Stack.Navigator>
  )
}