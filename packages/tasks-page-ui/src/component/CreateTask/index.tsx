import React from 'react';

// Components
import Button from '@moon-ui/button';
import Typography from '@moon-ui/typography';
import Input from '@moon-ui/input';
import { useIntl } from 'react-intl';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';

// Utils
import cx from 'classnames';

import HiImg from '../../../assert/hi.png';
import styles from './index.module.scss';
import RecommendedTaskItem from '../RecommendedTaskItem';

const recommendedTasks = [
  {
    title: 'Learning Speaking',
    project: 'English',
  },
  {
    title: 'Learning Writting',
    project: 'English',
  },
];

const ONE_MINUTE = 60 * 1000;
const INIT_DURATION = 1;

export default function CreateTask({ className }: { className?: string }) {
  const intl = useIntl();
  const [focus, setFocus] = React.useState(false);
  const [taskText, setTaskText] = React.useState('');
  const [duration, setDuration] = React.useState(INIT_DURATION);
  const { createTask } = useTask();
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.section}>
        <div className={styles.header}>
          <img src={HiImg} className={styles.hiImg} />
          <div>
            <Typography.Title primary noMargin level={4}>
              {intl.formatMessage(
                {
                  id: 'CreateTask.label-morning-greeting',
                  defaultMessage: 'Good morning, {name}',
                },
                { name: 'Guest' }
              )}
            </Typography.Title>
            <Typography.Paragraph noMargin isDescription>
              {intl.formatMessage({
                id: 'CreateTask.msg-morning-greeting-description',
                defaultMessage: 'What are you up to?',
              })}
            </Typography.Paragraph>
          </div>
        </div>
        <div className={styles.menu} />
        <Input
          placeholder={intl.formatMessage({
            id: 'CreateTask.label-create-task-input-placeholder',
            defaultMessage: 'Write your task today',
          })}
          className={styles.input}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={e => setTaskText(e.currentTarget.value)}
          value={taskText}
        />
        <hr className={styles.dashed} />
        <div className={styles.footer}>
          <div>
            <Input
              className={styles.durationInput}
              border="dash"
              value={duration}
              onChange={e => {
                const value = e.currentTarget.value;
                if (Number(value) || value === '') {
                  setDuration(Number(e.currentTarget.value));
                }
              }}
            />
            <Typography.Text>
              {intl.formatMessage({
                id: 'CreateTask.label-morning-greeting-minutes',
                defaultMessage: 'minutes',
              })}
            </Typography.Text>
          </div>
          <Button
            onClick={() => {
              createTask({
                name: taskText,
                duration: duration * ONE_MINUTE,
                projectId: '0',
              });
              setDuration(INIT_DURATION);
              setTaskText('')
            }}
          >
            {intl.formatMessage({
              id: 'CreateTask.label-submit',
              defaultMessage: 'Submit',
            })}
          </Button>
        </div>
      </div>
      {!taskText && !focus ? null : (
        <>
          <div className={styles.divider} />
          <div className={styles.section}>
            <Typography.Paragraph isDescription noMargin>
              {intl.formatMessage({
                id: 'CreateTask.label-recommendations',
                defaultMessage: 'Recommendations',
              })}
            </Typography.Paragraph>
            <div>
              {recommendedTasks.map(({ title, project }) => (
                <RecommendedTaskItem
                  key={title}
                  title={title}
                  project={project}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

