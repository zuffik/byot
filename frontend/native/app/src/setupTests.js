jest.mock('react-native-localize', () => ({
  __esModule: true,
  getLocales: () => {}
}));
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');
jest.mock('@ui-kitten/components', () => {
  const {Text, TouchableOpacity} = require('react-native');
  return {
    __esModule: true,
    Text,
    Button: TouchableOpacity,
    useTheme: jest.fn(() => ({
      'text-hint-color': '#fff'
    }))
  };
})
