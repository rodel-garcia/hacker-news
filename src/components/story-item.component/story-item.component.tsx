import { FC } from 'react';
import { AppStory } from '../../app.model';

import style from './story-item.component.module.scss';

const StoryItemComponent: FC<{ story: AppStory }> = ({ story }) => {
  return (
    <div className={style['story-item']}>
      <div className={style['story-item__photo']}>
        <img src={`assets/img/${story.image}`} alt='dummy-img' />
      </div>
      <div className={style['story-item__content']}>
        <span className={style['story-item__content-time']}>{new Date(story.timestamp).toLocaleTimeString()}</span>
        <a href={story.url}>
          <h2 className={style['story-item__content-title']}>{story.title}</h2>
        </a>
        <span className={style['story-item__content-author']}>
          by: {story.authorId} {story.authorKarma && `(${story.authorKarma})`}
        </span>
        {story.score && <span className={style['story-item__content-score']}>score: {story.score}</span>}
      </div>
    </div>
  );
};

export default StoryItemComponent;
