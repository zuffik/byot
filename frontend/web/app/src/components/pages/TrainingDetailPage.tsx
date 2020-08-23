import * as React from 'react';
import {ControlPanelMainContent} from '../control-panel/base/ControlPanelMainContent';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Router} from '../../router/Router';
import {WebAppState} from '../../redux/WebAppState';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {TrainingFetch} from '../../redux/process/training/TrainingFetch';
import {TrainingDetail} from '../training/training/TrainingDetail';
import {IMedia} from '@byot-frontend/common/src/types/interfaces/IMedia';
import {TrainingRemove} from '../../redux/process/training/TrainingRemove';
import {TrainingPlayNext} from '@byot-frontend/common/src/redux/process/media/TrainingPlayNext';
import {TrainingSetPlayingMedia} from '@byot-frontend/common/src/redux/process/media/TrainingSetPlayingMedia';
import {MediaPlayer} from '../player/MediaPlayer';

interface Props {}

export const TrainingDetailPage: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const {trainingId} = useParams<typeof Router.training.detail.params>();
  React.useEffect(() => {
    dispatch(ProcessActionExtractor.dispatch(TrainingFetch, {id: trainingId}));
  }, [trainingId, dispatch]);
  const training = useSelector((state: WebAppState) => state.trainingDetail);
  const currentPlayingMedia = useSelector((state: WebAppState) => state.currentMedia);
  const onDelete = () => dispatch(ProcessActionExtractor.dispatch(TrainingRemove, {id: trainingId}));
  const isRemoving = useSelector((state: WebAppState) => state.is.processingTraining);
  const autoplay = useSelector((state: WebAppState) => state.autoplay);
  const onMediaClick = (media: IMedia) =>
    dispatch(ProcessActionExtractor.dispatch(TrainingSetPlayingMedia, {media}));
  const onMediaFinishedPlaying = () =>
    dispatch(
      ProcessActionExtractor.dispatch(TrainingPlayNext, {
        training: training.data!,
      })
    );
  return (
    <ControlPanelMainContent>
      <TrainingDetail
        mediaPlayer={
          currentPlayingMedia && (
            <MediaPlayer
              autoplay={autoplay}
              media={currentPlayingMedia!}
              onMediaFinishedPlaying={onMediaFinishedPlaying}
            />
          )
        }
        isRemoving={isRemoving}
        onDelete={onDelete}
        training={training.data!}
        media={training.data?.media?.entries || []}
        isLoading={training.isProcessing || !training.hasData}
        onMediaClick={onMediaClick}
        currentMedia={currentPlayingMedia!}
      />
    </ControlPanelMainContent>
  );
};
