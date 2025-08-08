import {Text, View} from 'react-native';
import {ScopedTheme, StyleSheet} from 'react-native-unistyles';
import {Parent} from './Parent';

StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  themes: {
    light: {
      background_primary: '#ffffff',
      text_primary: '#000000',
    },
    dark: {
      background_primary: '#000000',
      text_primary: '#ffffff',
    },
  },
});

type AppThemes = {
  dark: {
    background_primary: string;
    text_primary: string;
  };
  light: {
    background_primary: string;
    text_primary: string;
  };
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

export function Test() {
  return (
    <View style={styles.root}>
      <Text style={styles.rootText}>Root Text</Text>
      <ScopedTheme name="dark">
        <Parent />
      </ScopedTheme>
    </View>
  );
}

const styles = StyleSheet.create((theme, runtime) => {
  return {
    root: {
      flex: 1,
      backgroundColor: theme.background_primary,
      paddingTop: runtime.insets.top,
    },
    rootText: {
      fontSize: 20,
      color: theme.text_primary,
    },
  };
});
