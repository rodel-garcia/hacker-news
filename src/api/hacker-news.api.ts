import { StoryItem, User } from '../app.model';

const API_URL = 'https://hacker-news.firebaseio.com/v0';

const fetStories = (): Promise<number[]> => {
  return sendRequest(`${API_URL}/topstories.json`);
};
const fetchStoryItem = async (item: string): Promise<StoryItem> => {
  return sendRequest(`${API_URL}/item/${item}.json`);
};
const fetchUser = async (userId: string): Promise<User> => {
  return sendRequest(`${API_URL}/user/${userId}.json`);
};

const sendRequest = async (url: string) =>
  fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error fetching data');
  });

export { fetStories, fetchStoryItem, fetchUser };
