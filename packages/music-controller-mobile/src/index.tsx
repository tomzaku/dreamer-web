import React from 'react';

// Hooks
import { MessageDescriptor, useIntl } from '@dreamer/translation';

// Components
import IconBird from '@moon-ui/icon/IconBird';
import IconCafe from '@moon-ui/icon/IconCafe';
import IconFire from '@moon-ui/icon/IconFire';
import IconRainy from '@moon-ui/icon/IconRainy';
import IconSunny from '@moon-ui/icon/IconSunny';
import IconThunder from '@moon-ui/icon/IconThunder';
import SoundItem from './component/SoundItem';
import Drawer from '@moon-ui/drawer';
import { MobileHeader } from '@dreamer/header';

import styles from './index.module.scss';
import { setSoundVolume, toggleSound, TypeSound } from '@dreamer/music-controller-common';

type SoundInfo = Record<
  TypeSound,
  {
    logo: React.ReactNode;
    logoActive: React.ReactNode;
    message: MessageDescriptor;
  }
>;

const soundInfo: SoundInfo = {
  [TypeSound.Rain]: {
    logo: <IconRainy className={styles.iconInactive} />,
    logoActive: <IconRainy className={styles.iconActive} />,
    message: {
      id: 'music-controller-mobile.label-rain',
      defaultMessage: 'Rain',
    },
  },
  [TypeSound.RainAndThunder]: {
    logo: <IconThunder className={styles.iconInactive} />,
    logoActive: <IconThunder className={styles.iconActive} />,
    message: {
      id: 'music-controller-mobile.label-thunder',
      defaultMessage: 'Thunder',
    },
  },
  [TypeSound.InterviewInACafe]: {
    logo: <IconCafe className={styles.iconInactive} />,
    logoActive: <IconCafe className={styles.iconActive} />,
    message: {
      id: 'music-controller-mobile.label-cafe',
      defaultMessage: 'Cafe',
    },
  },
  [TypeSound.Fireplace]: {
    logo: <IconFire className={styles.iconInactive} />,
    logoActive: <IconFire className={styles.iconActive} />,
    message: {
      id: 'music-controller-mobile.label-fire',
      defaultMessage: 'Fire',
    },
  },
  [TypeSound.Cricket]: {
    logo: <IconSunny className={styles.iconInactive} />,
    logoActive: <IconSunny className={styles.iconActive} />,
    message: {
      id: 'music-controller-mobile.label-sunny',
      defaultMessage: 'Sunny',
    },
  },
  [TypeSound.Bird]: {
    logo: <IconBird className={styles.iconInactive} />,
    logoActive: <IconBird className={styles.iconActive} />,
    message: {
      id: 'music-controller-mobile.label-bird',
      defaultMessage: 'Bird',
    },
  },
};

export default function MusicControllerMobile({
  visible,
  onClickBackButton,
}: {
  visible: boolean;
  onClickBackButton?: () => void;
}) {
  const intl = useIntl();
  const [soundActiveIndex, setSoundActiveIndexes] = React.useState<
    Record<string, boolean>
  >({});
  const [volumeSound, setVolumeSound] = React.useState<Record<string, number>>(
    {}
  );

  return (
    <Drawer visible={visible}>
      <MobileHeader
        onClickBackButton={onClickBackButton}
        title={intl.formatMessage({
          id: 'music-controller-mobile.label-music-title',
          defaultMessage: 'Music',
        })}
      />
      <div>
        {Object.entries(soundInfo).map(
          ([typeSound, { logo, logoActive, message }], index) => (
            <SoundItem
              key={message.id}
              title={intl.formatMessage(message)}
              logo={soundActiveIndex[index] ? logoActive : logo}
              active={soundActiveIndex[index]}
              volume={volumeSound[index]}
              onChangeVolume={volume => {
                setVolumeSound({
                  ...volumeSound,
                  [index]: volume,
                });
                setSoundVolume(typeSound as TypeSound, volume)
              }}
              onChange={() => {
                setSoundActiveIndexes({
                  ...soundActiveIndex,
                  [index]: !soundActiveIndex[index],
                });
                toggleSound(typeSound as TypeSound, !soundActiveIndex[index]);
              }}
            />
          )
        )}
      </div>
    </Drawer>
  );
}
