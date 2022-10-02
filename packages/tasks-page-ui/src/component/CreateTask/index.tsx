import React from 'react';

// Components
import Button from '@moon-ui/button';
import Typography from '@moon-ui/typography';
import Input from '@moon-ui/input';
import { useIntl } from '@dreamer/translation';

// Hooks
import { useTask } from '@dreamer/tasks-page-common';
import { detectMobile, useKeyListener } from '@dreamer/global';

// Utils
import cx from 'classnames';

import HiImg from '../../../assert/hi.png';
import styles from './index.module.scss';
import RecommendedTaskItem from '../RecommendedTaskItem';

const ONE_MINUTE = 60 * 1000;
const INIT_DURATION = 0;

export default function CreateTask({ className }: { className?: string }) {
  const intl = useIntl();
  const [focus, setFocus] = React.useState(false);
  const [taskText, setTaskText] = React.useState('');
  const [duration, setDuration] = React.useState(INIT_DURATION);
  const { createTask, getRecommendedTasks } = useTask();
  const recommendedTasks = getRecommendedTasks(taskText);
  const isValidated = Boolean(taskText);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const addTask = () => {
    if (!isValidated) return;
    createTask({
      name: taskText,
      duration: duration * ONE_MINUTE,
      projectId: '-999',
    });
    setTaskText('');
    /* inputRef.current?.focus(); */
  };
  useKeyListener(e => {
    if (e.key === 'a') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }
  });
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
                  defaultMessage: 'Good morning, {{name}}',
                },
                { name: 'Guest' }
              )}
            </Typography.Title>
            <Typography.Paragraph noMargin isDescription>
              {intl.formatMessage({
                id: 'CreateTask.msg-morning-greeting-description',
                defaultMessage: 'What is your goal today?',
              })}
            </Typography.Paragraph>
          </div>
        </div>
        <div className={styles.menu} />
        <Input
          ref={inputRef}
          placeholder={intl.formatMessage({
            id: 'CreateTask.label-create-task-input-placeholder',
            defaultMessage: 'Write your task today',
          })}
          className={styles.input}
          onFocus={() => {
            setFocus(true);
            if (detectMobile()) {
              inputRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }}
          onBlur={() => setFocus(false)}
          onChange={e => setTaskText(e.currentTarget.value)}
          value={taskText}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addTask();
              setFocus(true);
            }
          }}
        />
        <hr className={styles.dashed} />
        <div className={styles.footer}>
          <div>
            <Input
              type="number"
              className={styles.durationInput}
              border="dash"
              placeholder="0"
              value={duration === 0 ? '' : duration}
              onChange={e => {
                const value = e.currentTarget.value;
                if (Number(value) || value === '') {
                  setDuration(Number(e.currentTarget.value));
                }
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  addTask();
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
          <Button disabled={!isValidated} onClick={addTask}>
            {intl.formatMessage({
              id: 'CreateTask.label-submit',
              defaultMessage: 'Submit',
            })}
          </Button>
        </div>
      </div>
      <div
        className={cx(
          !taskText && !focus || recommendedTasks.length == 0 ? styles.hiddenRecommend : styles.recommend
        )}
      >
        <div className={styles.divider} />
        <div className={styles.section}>
          <Typography.Paragraph isDescription noMargin>
            {intl.formatMessage({
              id: 'CreateTask.label-recommendations',
              defaultMessage: 'Recommendations',
            })}
          </Typography.Paragraph>
          <div>
            {recommendedTasks.map(({ name, project, duration }, index) => (
              <RecommendedTaskItem
                key={`${name}-${index}`}
                title={name}
                project={project}
                duration={duration}
                onCopy={() => {
                  setTaskText(name);
                  setDuration(duration ? duration / ONE_MINUTE : 0);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
