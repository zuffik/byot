import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {TabItem} from './TabItem';
import {Home} from '../icons/material/Home';
import {useTranslation} from 'react-i18next';
import {TabItemLarge} from './TabItemLarge';
import {Add} from '../icons/material/Add';
import {Face} from '../icons/material/Face';

interface Props {
  onHomePress: () => void;
  onCreateTrainingSetPress: () => void;
  onProfilePress: () => void;
}

interface State {}

const makeStyles = (props: Props, state: State) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      shadowColor: Colors.grey50,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
      backgroundColor: Colors.white,
      paddingTop: 6,
    },
    addIcon: {
      color: Colors.white,
      fontSize: 36,
    },
  });

export const Tabs: React.FC<Props> = (props: Props) => {
  const styles = makeStyles(props, {});
  const {t} = useTranslation();
  return (
    <View style={styles.root}>
      <TabItem
        icon={<Home color={Colors.grey40} size={24} />}
        label={t('Home')}
        onPress={props.onHomePress}
      />
      <TabItemLarge icon={<Add style={styles.addIcon} />} onPress={props.onCreateTrainingSetPress} />
      <TabItem
        icon={<Face color={Colors.grey40} size={24} />}
        label={t('Profile')}
        onPress={props.onProfilePress}
      />
    </View>
  );
};
