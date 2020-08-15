jest.mock('react-native-localize', () => ({
  __esModule: true,
  getLocales: () => {}
}));
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');
