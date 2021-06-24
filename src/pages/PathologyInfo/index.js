/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import {SvgXml} from 'react-native-svg';

import Button from '../../components/ReadMoreButton';
import LoadingModal from '../../components/LoadingModal';

import playIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/bt-play.svg';

import {colors} from '../../global';

import {
  Container,
  Scroll,
  MainText,
  MainTextContainer,
  Title,
  Row,
  PathologyImage,
  ContainerVideo,
  ThumbnailFilter,
  ThumbnailImage,
} from './styles';

const screen = Dimensions.get('screen');

const TeamInfo = ({route}) => {
  const {pathologyInfo} = route.params;

  const [readMore, setReadMore] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const [video, setVideo] = useState({
    width: undefined,
    height: undefined,
    duration: undefined,
  });
  const [thumbnailUrl, setThumbnailUrl] = useState(undefined);
  const [videoUrl, setVideoUrl] = useState(undefined);

  useEffect(() => {
    setImageHeight(screen.width * 0.9 * 0.5625 - 5);
    setImageWidth(screen.width * 0.9);
    setImageLoading(pathologyInfo.image ? true : false);

    if (pathologyInfo.video) {
      setImageLoading(true);

      global
        .fetch(`https://player.vimeo.com/video/${pathologyInfo.video}/config`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setThumbnailUrl(res.video.thumbs['640']);
          setVideoUrl(
            res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
          );
          setVideo(res.video);
          setImageLoading(false);
          console.log('video: ', res.video);
          console.log('video_height: ', res.video.height);
          console.log('video_width: ', res.video.width);
        });
    }
  }, [pathologyInfo]);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        {pathologyInfo.image && (
          <PathologyImage
            height={imageHeight}
            source={{uri: pathologyInfo.image}}
            onLoadEnd={() => setImageLoading(false)}
          />
        )}

        {pathologyInfo.video && (
          <ContainerVideo>
            <ThumbnailImage height={imageHeight} source={{uri: thumbnailUrl}} />
            <ThumbnailFilter height={imageHeight}>
              <SvgXml xml={playIcon} width={85} height={85} />
            </ThumbnailFilter>
            <VideoPlayer
              endWithThumbnail
              thumbnail={{uri: thumbnailUrl}}
              video={{uri: videoUrl}}
              videoWidth={640}
              videoHeight={360}
              duration={video.duration}
              hideControlsOnStart
              pauseOnPress
              customStyles={{
                seekBarBackground: {
                  backgroundColor: `${colors.grey}`,
                },
                seekBarProgress: {
                  backgroundColor: `${colors.mustard}`,
                },
                seekBarKnob: {
                  backgroundColor: `${colors.mustard}`,
                },
                controls: {
                  backgroundColor: `${colors.darkGrey}`,
                  opacity: 0.85,
                },
                controlIcon: {
                  color: `${colors.mustard}`,
                },
                playButton: {
                  borderTopColor: `${colors.mustard}`,
                  borderRightColor: `${colors.mustard}`,
                  borderBottomColor: `${colors.mustard}`,
                  borderLeftColor: `${colors.mustard}`,
                  borderTopWidth: 2,
                  borderRightWidth: 2,
                  borderBottomWidth: 2,
                  borderLeftWidth: 2,
                  backgroundColor: 'transparent',
                },
                playArrow: {
                  color: `${colors.mustard}`,
                },
                wrapper: {
                  width: '100%',
                  marginTop: 30,
                },
                video: {
                  backgroundColor: 'black',
                },
                videoWrapper: {
                  borderRadius: 4,
                  overflow: 'hidden',
                },
                thumbnail: {
                  borderRadius: 4,
                  overflow: 'hidden',
                  opacity: 0,
                },
              }}
            />
          </ContainerVideo>
        )}

        <Row>
          <Title>{pathologyInfo.title}</Title>
        </Row>

        <MainTextContainer readMore={readMore}>
          <MainText>{pathologyInfo.description}</MainText>
        </MainTextContainer>

        <Row>
          <Button
            style={{marginBottom: 52}}
            type="read_more"
            buttonColor={colors.grey}
            small
            onPress={() => setReadMore(!readMore)}>
            {readMore ? 'Ler menos' : 'Leia mais'}
          </Button>
        </Row>
      </Scroll>
      <LoadingModal visible={imageLoading} />
    </Container>
  );
};

export default TeamInfo;
