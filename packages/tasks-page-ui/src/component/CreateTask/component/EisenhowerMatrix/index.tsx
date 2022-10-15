import IconBorderInner from '@moon-ui/icon/IconBorderInner';
import List from '@moon-ui/list';
import Toggle from '@moon-ui/toggle';

// Hooks
import { useIntl } from '@dreamer/translation';

// Enums
import { EisenhowerMatrix } from '@dreamer/tasks-page-common';
import Button from '@moon-ui/button/src/DefaultButton';

import styles from './index.module.scss';
import Radio from '@moon-ui/radio';

type Props = {
  value?: EisenhowerMatrix;
  setValue: (value?: EisenhowerMatrix) => void;
};

const EisenhowerMatrixComponent = ({ value, setValue }: Props) => {
  const intl = useIntl();
  return (
    <>
      <List.ItemMeta
        logo={<IconBorderInner />}
        title={intl.formatMessage({
          defaultMessage: 'Eisenhower Matrix',
          id: 'label-eisenhower-matrix',
        })}
        description={intl.formatMessage({
          defaultMessage: 'To organize tasks by urgency and importance',
          id: 'msg-eisenhower-matrix-explanation',
        })}
        rightComponent={
          <Toggle
            checked={Boolean(value)}
            onChange={checked => {
              if (checked) {
                setValue(EisenhowerMatrix.Do);
              } else {
                setValue(undefined);
              }
            }}
          />
        }
      />
      {value && (
        <div className={styles.buttonGroup}>
          <Radio
            isButton
            value={value}
            onChangeValue={(value: EisenhowerMatrix) => setValue(value)}
            options={[
              { label: 'Do', value: EisenhowerMatrix.Do },
              { label: 'Schedule', value: EisenhowerMatrix.Schedule },
              { label: 'Delegate', value: EisenhowerMatrix.Delegate },
              { label: 'Eliminate', value: EisenhowerMatrix.Eliminate },
            ]}
            classNameOption={styles.button}
            getClassNameActiveOption={option => {
              switch (option.value as EisenhowerMatrix) {
                case EisenhowerMatrix.Do: return styles.do
                case EisenhowerMatrix.Eliminate: return styles.eliminate
                case EisenhowerMatrix.Delegate: return styles.delegate
                case EisenhowerMatrix.Schedule: return styles.schedule
              }
            }}
          />
        </div>
      )}
      {/* {Boolean(value) && ( */}
      {/*   <div className={styles.buttonGroup}> */}
      {/*     <Button className={styles.button} type="ghost"> */}
      {/*       Do */}
      {/*     </Button> */}
      {/*     <Button className={styles.button} type="ghost"> */}
      {/*       Schedule */}
      {/*     </Button> */}
      {/*     <Button className={styles.button} type="ghost"> */}
      {/*       Delegate */}
      {/*     </Button> */}
      {/*     <Button className={styles.button} type="ghost"> */}
      {/*       Eliminate */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* )} */}
    </>
  );
};

export default EisenhowerMatrixComponent;
