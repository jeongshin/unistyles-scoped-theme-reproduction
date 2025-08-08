import {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useStreamText} from './useStreamText';

export function Parent({}: PropsWithChildren) {
  const {chunks} = useStreamText(
    'Hello from Parent! This is a test of the streaming text functionality.',
  );

  return (
    <View style={styles.root}>
      <Text style={styles.rootText}>{chunks}</Text>
      <Text style={styles.rootText}>{chunks.join('')}</Text>
      <Text style={styles.rootText}>
        {['Static ', 'text ', 'works ', 'fine']}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create(theme => {
  return {
    root: {
      backgroundColor: theme.background_primary,
      width: '100%',
    },
    rootText: {
      fontSize: 20,
      color: theme.text_primary,
    },
  };
});
