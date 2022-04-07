import style from './app.module.scss';
import StoryListComponent from './components/story-list.component/story-list.component';

const App = () => {
  return (
    <div className={style.app}>
      <header>
        <h1>Hacker News</h1>
        <hr />
      </header>
      <StoryListComponent />
    </div>
  );
};

export default App;
