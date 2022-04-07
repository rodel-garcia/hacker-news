import { useEffect, useState } from 'react';
import { fetchStoryItem, fetchUser, fetStories } from '../../api/hacker-news.api';
import { AppStory, User } from '../../app.model';
import { getTenRandomItems } from '../../app.util';

import StoryItemComponent from '../story-item.component/story-item.component';

import style from './story-list.component.module.scss';

const StoryListComponent = () => {
  const [storyList, setStoryList] = useState([] as AppStory[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetStories()
      .then((storyIds) => {
        const randomStoryIds = getTenRandomItems(storyIds);
        const stories = [] as AppStory[];
        Promise.all(setPromises(randomStoryIds, stories))
          .then((users) => {
            setLoading(false);
            patchUserKarma(users, stories);
            setStoryList(stories.sort((a, b) => a.score - b.score));
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }, []);

  const patchUserKarma = (users: User[], stories: AppStory[]) => {
    users.forEach((user) => {
      const currentUser = stories.findIndex((story) => story.authorId === user.id);
      if (currentUser) {
        stories[currentUser]['authorKarma'] = user.karma;
      }
    });
  };

  const setPromises = (ids: string[], stories: AppStory[]) => {
    let arr = [...Array(10).keys()];
    arr[0] = 10;
    arr = arr.sort(() => Math.random() - 0.5);

    return ids.map((id, index) =>
      fetchStoryItem('' + id).then((storyItem) => {
        stories.push({
          id: storyItem.id,
          title: storyItem.title,
          url: storyItem.url,
          timestamp: storyItem.time,
          score: storyItem.score,
          authorId: storyItem.by,
          image: `dummy-${arr[index]}.jpg`,
        } as AppStory);
        return fetchUser(storyItem.by);
      })
    );
  };

  return (
    <div className={style['story-list']}>
      {storyList.length && !loading ? (
        storyList.map((story) => <StoryItemComponent key={story.id} story={story} />)
      ) : (
        <div className={style['spinner-wrapper']}>
          <div className={style['lds-ripple']}>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryListComponent;
