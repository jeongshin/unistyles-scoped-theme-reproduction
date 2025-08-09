import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {StyleSheet, useUnistyles} from 'react-native-unistyles';

export function Buttons() {
  const [buttons, setButtons] = useState<string[] | null>(null);

  return (
    <View style={{gap: 20}}>
      {buttons ? (
        buttons.map((title, index) => (
          // works well!
          // <ScopedTheme key={index} name="dark">
          //   <Button key={index} title={title} />
          // </ScopedTheme>

          // scoped theme does not work here
          <Button key={index} title={title} />
        ))
      ) : (
        <Button
          title="Load Buttons"
          onPress={() => setButtons(['Button 1', 'Button 2', 'Button 3'])}
        />
      )}
    </View>
  );
}

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

function Button({title, onPress}: ButtonProps) {
  const {theme} = useUnistyles();

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text
        style={
          styles.button_title
        }>{`${title} : ${theme.background_primary}`}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create(theme => {
  return {
    button: {
      width: '100%',
      backgroundColor: theme.background_primary,
      padding: 20,
    },
    button_title: {
      fontSize: 20,
      color: theme.text_primary,
    },
  };
});
