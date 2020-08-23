import {TrainingSetPlayingMedia} from './TrainingSetPlayingMedia';
import {FrontendCommonState} from '../../FrontendCommonState';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {media} from '../../../../test/fixtures/dto/Media';

describe('TrainingSetPlayingMedia process', () => {
  it('should set current media', () => {
    const process = new TrainingSetPlayingMedia();
    const m = media();
    expect(
      process.handle(
        ProcessActionExtractor.dispatch(TrainingSetPlayingMedia, {media: m}),
        {} as FrontendCommonState,
        {} as FrontendCommonState
      )
    ).toEqual(
      expect.objectContaining({
        currentMedia: m,
      })
    );
  });
});
