import {TrainingPlayNext} from './TrainingPlayNext';
import {FrontendCommonState} from '../../FrontendCommonState';
import {ProcessActionExtractor} from '../../../redux-system/process/ProcessActionExtractor';
import {media} from '../../../../test/fixtures/dto/Media';
import * as _ from 'lodash';
import {training} from '../../../../test/fixtures/dto/Training';

describe('TrainingPlayNext process', () => {
  it('should play next media', () => {
    const process = new TrainingPlayNext();
    const list = _.times(10, () => media());
    const tr = training();
    tr.media.entries = list;
    expect(
      process.handle(
        ProcessActionExtractor.dispatch(TrainingPlayNext, {training: tr}),
        {currentMedia: list[2]} as FrontendCommonState,
        {} as FrontendCommonState
      )
    ).toEqual(
      expect.objectContaining({
        currentMedia: list[3],
        autoplay: true,
      })
    );
  });
  it('should not switch to next media if last', () => {
    const process = new TrainingPlayNext();
    const list = _.times(10, () => media());
    const tr = training();
    tr.media.entries = list;
    expect(
      process.handle(
        ProcessActionExtractor.dispatch(TrainingPlayNext, {training: tr}),
        {currentMedia: list[9]} as FrontendCommonState,
        {} as FrontendCommonState
      )
    ).toEqual(
      expect.objectContaining({
        currentMedia: list[9],
      })
    );
  });
});
